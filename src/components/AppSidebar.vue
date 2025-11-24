<template>
    <div class="w-64 h-screen bg-white dark:bg-gray-800 flex flex-col fixed left-0 top-15 sidebar">
        <nav class="flex-1 overflow-y-auto">
            <div class="px-4 py-4">
                <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Core Features
                </h2>
            </div>
            <div class="px-2 space-y-1">
                <button @click="toggleCategory('core')"
                    class="w-full flex items-center justify-between px-4 py-2.5 text-left font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors group">
                    <span class="flex items-center space-x-3">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Core Features</span>
                    </span>
                    <svg :class="['w-4 h-4 transition-transform', expandedCategories.includes('core') ? 'rotate-180' : '']"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 14l-7-7m0 0L5 14m7-7v12" />
                    </svg>
                </button>
                <div v-show="expandedCategories.includes('core')" class="space-y-0.5">
                    <div
                        class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer transition-colors">
                        <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span class="text-sm">Projects Management</span>
                    </div>
                    <div
                        class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded cursor-pointer transition-colors">
                        <svg class="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm font-medium text-red-600 dark:text-red-400">Services Management</span>
                    </div>
                    <div
                        class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer transition-colors">
                        <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 20l4-16m4 4l4 4m-4-4l-4 4m4-4l4-4" />
                        </svg>
                        <span class="text-sm">Codespaces Management</span>
                    </div>
                </div>
            </div>
            <div class="px-2 space-y-1 mt-6">
                <button @click="toggleCategory('other')"
                    class="w-full flex items-center justify-between px-4 py-2.5 text-left font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                    <span class="flex items-center space-x-3">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <span>Other Categories</span>
                    </span>
                    <svg :class="['w-4 h-4 transition-transform', expandedCategories.includes('other') ? 'rotate-180' : '']"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 14l-7-7m0 0L5 14m7-7v12" />
                    </svg>
                </button>
                <div v-show="expandedCategories.includes('other')" class="space-y-0.5">
                    <div
                        class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer transition-colors">
                        <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm">Documentation</span>
                    </div>
                    <div
                        class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer transition-colors">
                        <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <span class="text-sm">API Reference</span>
                    </div>
                    <div
                        class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer transition-colors">
                        <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
                        </svg>
                        <span class="text-sm">Tutorials</span>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const expandedCategories = ref(['core'])

const toggleCategory = (category: string) => {
    const index = expandedCategories.value.indexOf(category)
    if (index > -1) {
        expandedCategories.value.splice(index, 1)
    } else {
        expandedCategories.value.push(category)
    }
}
</script>

<style scoped>
.sidebar {
    background: #eff3f6;
}

@media (prefers-color-scheme: dark) {
    .sidebar {
        background: #1f2937;
    }
}

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}

@media (prefers-color-scheme: dark) {
    ::-webkit-scrollbar-thumb {
        background: #4b5563;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #6b7280;
    }
}
</style>
