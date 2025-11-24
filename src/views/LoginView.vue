<template>
    <div class="min-h-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 image-sec">
        <div class="max-w-md w-full">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-10 space-y-8">
                <div class="flex justify-center">
                    <img src="../assets/logo-syscom.svg" alt="SysCom Logo" class="h-12 w-auto">
                </div>
                <div class="text-center">
                    <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Welcome back
                    </h2>
                    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Sign in to your SysCom account
                    </p>
                </div>
                <form class="space-y-5" @submit.prevent="handleLogin">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email or Username
                        </label>
                        <input id="username" v-model="username" name="username" type="text" required
                            class="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus-ring-primary focus:border-transparent sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                            placeholder="your@email.com or username">
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <input id="password" v-model="password" name="password" type="password" required
                            class="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus-ring-primary focus:border-transparent sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                            placeholder="••••••••">
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" v-model="rememberMe" name="remember-me" type="checkbox"
                                class="h-4 w-4 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-primary focus-ring-primary">
                            <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                Remember me
                            </label>
                        </div>
                        <div class="text-sm">
                            <a href="#"
                                class="font-medium transition-colors text-primary text-primary-hover">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <button type="submit" :disabled="isLoading"
                        class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary bg-primary-hover focus:outline-none focus:ring-2 focus-ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        {{ isLoading ? 'Signing in...' : 'Sign in' }}
                    </button>
                </form>
                <div class="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?
                        <router-link to="/signup"
                            class="font-medium transition-colors text-primary text-primary-hover">
                            Sign up
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const { setCSSVariables } = useTheme()

setCSSVariables()

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
    isLoading.value = true;

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const success = true;

        if (success) {
            router.push('/dashboard')
        }
    } finally {
        isLoading.value = false;
    }
}
</script>

<style scoped>
.image-sec {
    background-image:
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url('/bg-image2.jpeg');
    background-size: cover;
    background-position: center;
}
</style>