<template>
    <div class="min-h-full bg-gray-50 dark:bg-slate-900">
        <div class="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 image-section">
            <div class="max-w-7xl mx-auto px-4 sm:px-8 py-8">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Benutzerverwaltung</h1>
                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Verwalten Sie alle Benutzer und deren Berechtigungen
                        </p>
                    </div>
                    <button @click="showAddUserModal = true"
                        class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary bg-primary-hover focus:outline-none focus:ring-2 focus-ring-primary focus:ring-offset-2 transition-colors">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Benutzer hinzufügen
                    </button>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-8 py-8">
            <div v-if="error"
                class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-red-700 dark:text-red-300">{{ error }}</p>
                </div>
            </div>
            <div v-if="successMessage"
                class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p class="text-green-700 dark:text-green-300">{{ successMessage }}</p>
                </div>
            </div>
            <div v-if="isLoading" class="flex justify-center items-center py-12">
                <div class="animate-spin">
                    <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
            <div v-else class="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-slate-700">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Benutzer
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Rolle
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Erstellt am
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Aktionen
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                            <tr v-for="user in users" :key="user.id"
                                class="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div
                                            class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-600 flex items-center justify-center">
                                            <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
                                                {{ getInitials(user.name || user.email) }}
                                            </span>
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900 dark:text-white">
                                                {{ user.name || 'Kein Name' }}
                                            </div>
                                            <div class="text-sm text-gray-500 dark:text-gray-400">
                                                {{ user.email }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <select v-model="user.role" @change="updateUserRole(user)"
                                        :disabled="user.id === currentUserId"
                                        class="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus-ring-primary disabled:opacity-50 disabled:cursor-not-allowed">
                                        <option value="user">Benutzer</option>
                                        <option value="editor">Editor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <button @click="toggleUserStatus(user)" :disabled="user.id === currentUserId"
                                        :class="[
                                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
                                            user.is_active
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
                                            user.id === currentUserId ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-80'
                                        ]">
                                        <span class="w-2 h-2 rounded-full mr-1.5"
                                            :class="user.is_active ? 'bg-green-500' : 'bg-red-500'"></span>
                                        {{ user.is_active ? 'Aktiv' : 'Inaktiv' }}
                                    </button>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {{ formatDate(user.created_at) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button @click="confirmDeleteUser(user)" :disabled="user.id === currentUserId"
                                        class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="users.length === 0">
                                <td colspan="5" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                    Keine Benutzer gefunden
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div v-if="showAddUserModal"
            class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Neuen Benutzer hinzufügen</h3>
                    <button @click="closeAddUserModal"
                        class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form @submit.prevent="addUser" class="space-y-4">
                    <div>
                        <label for="newUserEmail"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            E-Mail *
                        </label>
                        <input id="newUserEmail" v-model="newUser.email" type="email" required
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus-ring-primary"
                            placeholder="benutzer@example.com">
                    </div>
                    <div>
                        <label for="newUserName"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Name
                        </label>
                        <input id="newUserName" v-model="newUser.name" type="text"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus-ring-primary"
                            placeholder="Max Mustermann">
                    </div>
                    <div>
                        <label for="newUserPassword"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Passwort *
                        </label>
                        <input id="newUserPassword" v-model="newUser.password" type="password" required
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus-ring-primary"
                            placeholder="••••••••">
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Min. 8 Zeichen, Groß-/Kleinbuchstaben und Zahl
                        </p>
                    </div>
                    <div>
                        <label for="newUserRole"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Rolle
                        </label>
                        <select id="newUserRole" v-model="newUser.role"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus-ring-primary">
                            <option value="user">Benutzer</option>
                            <option value="editor">Editor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div class="flex justify-end gap-3 pt-4">
                        <button type="button" @click="closeAddUserModal"
                            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                            Abbrechen
                        </button>
                        <button type="submit" :disabled="isSubmitting"
                            class="px-4 py-2 text-sm font-medium text-white bg-primary bg-primary-hover rounded-lg transition-colors disabled:opacity-50">
                            {{ isSubmitting ? 'Wird erstellt...' : 'Erstellen' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div v-if="showDeleteModal"
            class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6">
                <div
                    class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30">
                    <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
                    Benutzer löschen?
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                    Möchten Sie den Benutzer <strong>{{ userToDelete?.email }}</strong> wirklich löschen?
                    Diese Aktion kann nicht rückgängig gemacht werden.
                </p>
                <div class="flex justify-center gap-3">
                    <button @click="showDeleteModal = false"
                        class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                        Abbrechen
                    </button>
                    <button @click="deleteUser" :disabled="isSubmitting"
                        class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50">
                        {{ isSubmitting ? 'Wird gelöscht...' : 'Löschen' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '@/axios'
import { useAuthStore } from '@/stores/auth'

interface User {
    id: number
    email: string
    name: string | null
    role: 'user' | 'editor' | 'admin'
    is_active: boolean
    created_at: string
    updated_at: string
}

const authStore = useAuthStore()
const currentUserId = authStore.user?.id

const users = ref<User[]>([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const showAddUserModal = ref(false)
const showDeleteModal = ref(false)
const userToDelete = ref<User | null>(null)

const newUser = ref({
    email: '',
    name: '',
    password: '',
    role: 'user' as 'user' | 'editor' | 'admin'
})

const loadUsers = async () => {
    isLoading.value = true
    error.value = null
    try {
        const response = await axios.get<{ users: User[] }>('/api/auth/users')
        users.value = response.data.users
    } catch (err: any) {
        error.value = err.response?.data?.error || 'Fehler beim Laden der Benutzer'
    } finally {
        isLoading.value = false
    }
}

const addUser = async () => {
    isSubmitting.value = true
    error.value = null
    try {
        await axios.post('/api/auth/register', {
            email: newUser.value.email,
            password: newUser.value.password,
            name: newUser.value.name || undefined
        })

        if (newUser.value.role !== 'user') {
            await loadUsers()
            const createdUser = users.value.find(u => u.email === newUser.value.email.toLowerCase())
            if (createdUser) {
                await axios.put(`/api/auth/users/${createdUser.id}/role`, {
                    role: newUser.value.role
                })
            }
        }

        successMessage.value = 'Benutzer erfolgreich erstellt'
        closeAddUserModal()
        await loadUsers()

        setTimeout(() => { successMessage.value = null }, 3000)
    } catch (err: any) {
        error.value = err.response?.data?.error || 'Fehler beim Erstellen des Benutzers'
    } finally {
        isSubmitting.value = false
    }
}

const updateUserRole = async (user: User) => {
    error.value = null
    try {
        await axios.put(`/api/auth/users/${user.id}/role`, {
            role: user.role
        })
        successMessage.value = 'Rolle erfolgreich aktualisiert'
        setTimeout(() => { successMessage.value = null }, 3000)
    } catch (err: any) {
        error.value = err.response?.data?.error || 'Fehler beim Aktualisieren der Rolle'
        await loadUsers()
    }
}

const toggleUserStatus = async (user: User) => {
    if (user.id === currentUserId) return

    error.value = null
    try {
        await axios.put(`/api/auth/users/${user.id}/status`, {
            isActive: !user.is_active
        })
        user.is_active = !user.is_active
        successMessage.value = user.is_active ? 'Benutzer aktiviert' : 'Benutzer deaktiviert'
        setTimeout(() => { successMessage.value = null }, 3000)
    } catch (err: any) {
        error.value = err.response?.data?.error || 'Fehler beim Aktualisieren des Status'
    }
}

const confirmDeleteUser = (user: User) => {
    userToDelete.value = user
    showDeleteModal.value = true
}

const deleteUser = async () => {
    if (!userToDelete.value) return

    isSubmitting.value = true
    error.value = null
    try {
        await axios.delete(`/api/auth/users/${userToDelete.value.id}`)
        successMessage.value = 'Benutzer erfolgreich gelöscht'
        showDeleteModal.value = false
        userToDelete.value = null
        await loadUsers()
        setTimeout(() => { successMessage.value = null }, 3000)
    } catch (err: any) {
        error.value = err.response?.data?.error || 'Fehler beim Löschen des Benutzers'
    } finally {
        isSubmitting.value = false
    }
}

const closeAddUserModal = () => {
    showAddUserModal.value = false
    newUser.value = {
        email: '',
        name: '',
        password: '',
        role: 'user'
    }
}

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

onMounted(() => {
    loadUsers()
})
</script>

<style scoped>
.image-section {
    background-image:
        /*linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),*/
        linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
        url('/bg-image2.jpeg');
    background-size: cover;
    background-position: center;
}
</style>