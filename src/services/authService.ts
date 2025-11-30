import axios from '../axios'

export interface User {
  id: number
  email: string
  name: string | null
  role: 'user' | 'editor' | 'admin'
}

export interface AuthResponse {
  message: string
  user: User
  accessToken: string
  refreshToken: string
}

export interface TokenResponse {
  user: User
  accessToken: string
  refreshToken: string
}

const TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

class AuthService {
  private refreshPromise: Promise<TokenResponse> | null = null

  async register(email: string, password: string, name?: string): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>('/api/auth/register', {
      email,
      password,
      name,
    })
    this.setTokens(response.data.accessToken, response.data.refreshToken)
    return response.data
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>('/api/auth/login', {
      email,
      password,
    })
    this.setTokens(response.data.accessToken, response.data.refreshToken)
    return response.data
  }

  async logout(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken()
      if (refreshToken) {
        await axios.post('/api/auth/logout', { refreshToken })
      }
    } finally {
      this.clearTokens()
    }
  }

  async logoutAll(): Promise<void> {
    try {
      await axios.post('/api/auth/logout-all')
    } finally {
      this.clearTokens()
    }
  }

  async refreshAccessToken(): Promise<TokenResponse> {
    if (this.refreshPromise) {
      return this.refreshPromise
    }

    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      throw new Error('Kein Refresh-Token vorhanden')
    }

    this.refreshPromise = axios
      .post<TokenResponse>('/api/auth/refresh', { refreshToken })
      .then((response) => {
        this.setTokens(response.data.accessToken, response.data.refreshToken)
        return response.data
      })
      .finally(() => {
        this.refreshPromise = null
      })

    return this.refreshPromise
  }

  async getCurrentUser(): Promise<User> {
    const response = await axios.get<{ user: User }>('/api/auth/me')
    return response.data.user
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await axios.put('/api/auth/password', {
      currentPassword,
      newPassword,
    })

    this.clearTokens()
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }

  getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  }

  clearTokens(): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken()
  }
}

export const authService = new AuthService()
export default authService
