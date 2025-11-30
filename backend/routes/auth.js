import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import pool from '../db.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

const SALT_ROUNDS = 12;
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY_DAYS = 7;

const generateTokens = async (userId) => {
    const accessToken = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = crypto.randomBytes(64).toString('hex');
    const refreshTokenHash = crypto
        .createHash('sha256')
        .update(refreshToken)
        .digest('hex');

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

    await pool.query(
        `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) 
         VALUES ($1, $2, $3)`,
        [userId, refreshTokenHash, expiresAt]
    );

    return { accessToken, refreshToken };
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
};

router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email und Passwort sind erforderlich'
            });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({
                error: 'Ungültiges Email-Format'
            });
        }

        if (!isStrongPassword(password)) {
            return res.status(400).json({
                error: 'Passwort muss mindestens 8 Zeichen, einen Großbuchstaben, einen Kleinbuchstaben und eine Zahl enthalten'
            });
        }

        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email.toLowerCase()]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                error: 'Email bereits registriert'
            });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        const result = await pool.query(
            `INSERT INTO users (email, password_hash, name, role) 
             VALUES ($1, $2, $3, 'user') 
             RETURNING id, email, name, role, created_at`,
            [email.toLowerCase(), passwordHash, name || null]
        );

        const user = result.rows[0];
        const tokens = await generateTokens(user.id);

        res.status(201).json({
            message: 'Registrierung erfolgreich',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            ...tokens
        });
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email und Passwort sind erforderlich'
            });
        }

        const result = await pool.query(
            'SELECT id, email, name, role, password_hash, is_active FROM users WHERE email = $1',
            [email.toLowerCase()]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                error: 'Ungültige Anmeldedaten'
            });
        }

        const user = result.rows[0];

        if (!user.is_active) {
            return res.status(401).json({
                error: 'Benutzerkonto deaktiviert'
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            return res.status(401).json({
                error: 'Ungültige Anmeldedaten'
            });
        }

        const tokens = await generateTokens(user.id);

        res.json({
            message: 'Anmeldung erfolgreich',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            ...tokens
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

router.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                error: 'Refresh-Token erforderlich'
            });
        }

        const tokenHash = crypto
            .createHash('sha256')
            .update(refreshToken)
            .digest('hex');

        const tokenResult = await pool.query(
            `SELECT rt.id, rt.user_id, rt.expires_at, rt.revoked,
                    u.email, u.name, u.role, u.is_active
             FROM refresh_tokens rt
             JOIN users u ON rt.user_id = u.id
             WHERE rt.token_hash = $1`,
            [tokenHash]
        );

        if (tokenResult.rows.length === 0) {
            return res.status(401).json({
                error: 'Ungültiger Refresh-Token'
            });
        }

        const storedToken = tokenResult.rows[0];

        if (storedToken.revoked) {
            await pool.query(
                'UPDATE refresh_tokens SET revoked = true WHERE user_id = $1',
                [storedToken.user_id]
            );
            return res.status(401).json({
                error: 'Token wurde widerrufen - bitte erneut anmelden'
            });
        }

        if (new Date() > new Date(storedToken.expires_at)) {
            return res.status(401).json({
                error: 'Refresh-Token abgelaufen'
            });
        }

        if (!storedToken.is_active) {
            return res.status(401).json({
                error: 'Benutzerkonto deaktiviert'
            });
        }

        await pool.query(
            'UPDATE refresh_tokens SET revoked = true WHERE id = $1',
            [storedToken.id]
        );

        const tokens = await generateTokens(storedToken.user_id);

        res.json({
            user: {
                id: storedToken.user_id,
                email: storedToken.email,
                name: storedToken.name,
                role: storedToken.role
            },
            ...tokens
        });
    } catch (error) {
        console.error('Refresh Error:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

router.post('/logout', authenticate, async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (refreshToken) {
            const tokenHash = crypto
                .createHash('sha256')
                .update(refreshToken)
                .digest('hex');

            await pool.query(
                'UPDATE refresh_tokens SET revoked = true WHERE token_hash = $1 AND user_id = $2',
                [tokenHash, req.user.id]
            );
        }

        res.json({ message: 'Abmeldung erfolgreich' });
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

router.post('/logout-all', authenticate, async (req, res) => {
    try {
        await pool.query(
            'UPDATE refresh_tokens SET revoked = true WHERE user_id = $1',
            [req.user.id]
        );

        res.json({ message: 'Von allen Geräten abgemeldet' });
    } catch (error) {
        console.error('Logout-All Error:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

router.get('/me', authenticate, (req, res) => {
    res.json({
        user: {
            id: req.user.id,
            email: req.user.email,
            name: req.user.name,
            role: req.user.role
        }
    });
});

router.put('/password', authenticate, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                error: 'Aktuelles und neues Passwort erforderlich'
            });
        }

        if (!isStrongPassword(newPassword)) {
            return res.status(400).json({
                error: 'Neues Passwort muss mindestens 8 Zeichen, einen Großbuchstaben, einen Kleinbuchstaben und eine Zahl enthalten'
            });
        }

        const userResult = await pool.query(
            'SELECT password_hash FROM users WHERE id = $1',
            [req.user.id]
        );

        const isValidPassword = await bcrypt.compare(
            currentPassword,
            userResult.rows[0].password_hash
        );

        if (!isValidPassword) {
            return res.status(401).json({
                error: 'Aktuelles Passwort ist falsch'
            });
        }

        const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

        await pool.query(
            'UPDATE users SET password_hash = $1 WHERE id = $2',
            [newPasswordHash, req.user.id]
        );

        await pool.query(
            'UPDATE refresh_tokens SET revoked = true WHERE user_id = $1',
            [req.user.id]
        );

        res.json({ message: 'Passwort erfolgreich geändert' });
    } catch (error) {
        console.error('Password Change Error:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

router.get('/users', authenticate, authorize('admin'), async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, email, name, role, is_active, created_at, updated_at 
             FROM users 
             ORDER BY created_at DESC`
        );

        res.json({ users: result.rows });
    } catch (error) {
        console.error('Get Users Error:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

router.put('/users/:id/role', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const validRoles = ['user', 'editor', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                error: 'Ungültige Rolle'
            });
        }

        if (parseInt(id) === req.user.id && role !== 'admin') {
            return res.status(400).json({
                error: 'Sie können Ihre eigene Admin-Rolle nicht entfernen'
            });
        }

        const result = await pool.query(
            `UPDATE users SET role = $1 WHERE id = $2 
             RETURNING id, email, name, role, is_active`,
            [role, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Benutzer nicht gefunden' });
        }

        res.json({ user: result.rows[0] });
    } catch (error) {
        console.error('Update Role Error:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

router.put('/users/:id/status', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        if (parseInt(id) === req.user.id) {
            return res.status(400).json({
                error: 'Sie können Ihr eigenes Konto nicht deaktivieren'
            });
        }

        const result = await pool.query(
            `UPDATE users SET is_active = $1 WHERE id = $2 
             RETURNING id, email, name, role, is_active`,
            [isActive, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Benutzer nicht gefunden' });
        }

        if (!isActive) {
            await pool.query(
                'UPDATE refresh_tokens SET revoked = true WHERE user_id = $1',
                [id]
            );
        }

        res.json({ user: result.rows[0] });
    } catch (error) {
        console.error('Update Status Error:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

router.delete('/users/:id', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { id } = req.params;

        if (parseInt(id) === req.user.id) {
            return res.status(400).json({
                error: 'Sie können Ihr eigenes Konto nicht löschen'
            });
        }

        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Benutzer nicht gefunden' });
        }

        res.json({ message: 'Benutzer gelöscht' });
    } catch (error) {
        console.error('Delete User Error:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

export default router;