import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService, { type User } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isEditor = computed(() => user.value?.role === 'editor' || user.value?.role === 'admin')
  const userRole = computed(() => user.value?.role ?? null)

  async function register(email: string, password: string, name?: string) {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.register(email, password, name)
      user.value = response.user
      return response
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Registrierung fehlgeschlagen'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function login(email: string, password: string) {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.login(email, password)
      user.value = response.user
      return response
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Anmeldung fehlgeschlagen'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    isLoading.value = true
    try {
      await authService.logout()
    } finally {
      user.value = null
      isLoading.value = false
    }
  }

  async function logoutAll() {
    isLoading.value = true
    try {
      await authService.logoutAll()
    } finally {
      user.value = null
      isLoading.value = false
    }
  }

  async function fetchCurrentUser() {
    if (!authService.isLoggedIn()) {
      user.value = null
      return null
    }

    isLoading.value = true
    try {
      const currentUser = await authService.getCurrentUser()
      user.value = currentUser
      return currentUser
    } catch (err) {
      user.value = null
      authService.clearTokens()
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function changePassword(currentPassword: string, newPassword: string) {
    isLoading.value = true
    error.value = null
    try {
      await authService.changePassword(currentPassword, newPassword)
      user.value = null
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Passwortänderung fehlgeschlagen'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  function initialize() {
    if (authService.isLoggedIn()) {
      fetchCurrentUser()
    }
  }

  return {
    user,
    isLoading,
    error,
    isLoggedIn,
    isAdmin,
    isEditor,
    userRole,
    register,
    login,
    logout,
    logoutAll,
    fetchCurrentUser,
    changePassword,
    clearError,
    initialize,
  }
})
