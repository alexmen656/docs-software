<template>
    <header class="bg-white dark:bg-gray-800 fixed top-0 left-0 right-0 z-50">
        <div class="mx-auto px-4 sm:px-3 2xl:px-3">
            <div class="flex justify-between items-center h-15">
                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center logo-container"
                        @click="router.push({ name: 'landing' })" style="cursor: pointer;">
                        <img class="logo-image" src="../assets/logo-syscom.svg" alt="Logo">
                    </div>
                </div>
                <div v-if="showSearch" class="hidden md:flex flex-1 max-w-2xl mx-8">
                    <div class="relative w-full search-container">
                        <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clip-rule="evenodd" />
                        </svg>
                        <input type="text" placeholder="Search the docs..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" />
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="relative group">
                        <button
                            class="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors">
                            <span
                                class="w-8 h-8 overflow-hidden flex items-center justify-center text-xl">🇺🇸</span>
                            <span
                                class="hidden sm:block text-md font-medium text-gray-700 dark:text-gray-200">English</span>
                            <svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                        <div
                            class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                            <button
                                class="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                                <span class="text-lg">🇺🇸</span>
                                <span class="text-sm">English</span>
                            </button>
                            <button
                                class="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                                <span class="text-lg">🇩🇪</span>
                                <span class="text-sm">Deutsch</span>
                            </button>
                            <button
                                class="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                                <span class="text-lg">🇸🇰</span>
                                <span class="text-sm">Slovak</span>
                            </button>
                        </div>
                    </div>
                    <button
                        class="md:hidden p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <button>
                        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"
                            class="toggleIcon_g3eP lightToggleIcon_pyhR">
                            <path fill="currentColor"
                                d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z">
                            </path>
                        </svg>
                    </button>
                    <button @click="router.push('/login')" class="text-white font-semibold py-2 px-4 rounded-lg bg-primary bg-primary-hover">
                        Log In
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const { setCSSVariables } = useTheme()

setCSSVariables()
const showSearch = window.location.pathname !== '/' && window.location.pathname !== '/landing'
</script>

<style scoped>
.logo-text {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.8px;
    line-height: 1;
    transition: color 0.2s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #ea0e2b;
    cursor: pointer;
}

.logo-image {
    height: 34px;
    width: auto;
    transition: transform 0.2s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.logo-container {
    display: flex;
    align-items: center;
    gap: 14px;
    height: 100%;
    justify-content: flex-start;
    padding: 4px 0;
}

header {
    background: #eff3f6;
}

@media (prefers-color-scheme: dark) {
    header {
        background: #1f2937;
    }
}
</style>
