<template>
    <header class="bg-white dark:bg-gray-800 fixed top-0 left-0 right-0 z-50">
        <div class="mx-auto px-3 sm:px-3 2xl:px-3">
            <div class="flex justify-between items-center h-15">
                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center logo-container">
                        <img class="logo-image" src="../assets/logo-syscom.svg" alt="Logo">
                       <!-- <span class="logo-text">Control Cloud</span>-->
                    </div>
                </div>
                <div class="hidden md:flex flex-1 max-w-2xl mx-8">
                    <div class="relative w-full search-container">
                        <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clip-rule="evenodd" />
                        </svg>
                        <input type="text" placeholder="Search files and folders..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" />
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <button
                        class="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                        <svg viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <div class="relative">
                        <button
                            class="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors">
                            <div
                                class="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                A
                            </div>
                            <span class="hidden sm:block text-md font-medium text-gray-700 dark:text-gray-200">Alex</span>
                            <svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <button
                        class="md:hidden p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
