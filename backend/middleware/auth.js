import jwt from 'jsonwebtoken';
import pool from '../db.js';

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Kein Token bereitgestellt' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const result = await pool.query(
            'SELECT id, email, name, role, is_active FROM users WHERE id = $1',
            [decoded.userId]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Benutzer nicht gefunden' });
        }

        const user = result.rows[0];

        if (!user.is_active) {
            return res.status(401).json({ error: 'Benutzerkonto deaktiviert' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token abgelaufen' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Ungültiger Token' });
        }
        console.error('Auth Middleware Error:', error);
        return res.status(500).json({ error: 'Interner Serverfehler' });
    }
};

export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Nicht authentifiziert' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Keine Berechtigung für diese Aktion'
            });
        }

        next();
    };
};

export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next();
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const result = await pool.query(
            'SELECT id, email, name, role, is_active FROM users WHERE id = $1',
            [decoded.userId]
        );

        if (result.rows.length > 0 && result.rows[0].is_active) {
            req.user = result.rows[0];
        }

        next();
    } catch (error) {
        next();
    }
};