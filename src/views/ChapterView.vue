<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { chapters, allDocItems } from '@/demo-data/docs'
import { useTheme } from '@/composables/useTheme'
import type { DocItem } from '@/types'

const route = useRoute()
const router = useRouter()
const { setCSSVariables } = useTheme()

setCSSVariables()

const sortBy = ref<'name' | 'recent'>('recent')

const chapterId = route.params.id as string
const currentChapter = computed(() => chapters.find(c => c.id === chapterId))

const chapterItems = computed(() => {
    if (!currentChapter.value) return []
    return allDocItems.filter(item => item.parentId === chapterId)
})

const sortedItems = computed(() => {
    if (sortBy.value === 'name') {
        return [...chapterItems.value].sort((a, b) => a.title.localeCompare(b.title))
    }
    return [...chapterItems.value].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
})

const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
}

const navigateToItem = (item: DocItem) => {
    if (item.type === 'chapter') {
        router.push({ name: 'chapter', params: { id: item.id } })
    } else {
        router.push({ name: 'doc', params: { id: item.id } })
    }
}

const getItemIcon = (item: DocItem) => {
    if (item.type === 'chapter') {
        return `<path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd" /><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />`
    }
    return `<path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414l4 4A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />`
}
</script>

<template>
    <div v-if="currentChapter" class="min-h-full bg-gray-50 dark:bg-slate-900 lg:pr-80">
        <div class="max-w-4xl mx-auto px-8 pt-6 pb-12">
            <div class="max-w-4xl mx-auto pt-4 pb-3">
                <nav class="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <router-link to="/" class="hover:text-gray-900 dark:hover:text-gray-200">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </router-link>
                    <span>›</span>
                    <span class="font-medium text-primary">{{ currentChapter.title }}</span>
                </nav>
                <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">{{ currentChapter.title }}</h1>
                <p class="text-gray-700 dark:text-gray-300 text-lg mb-8">{{ sortedItems.length }} Artikel</p>
            </div>

            <div class="space-y-4">
                <div v-for="item in sortedItems" :key="item.id" @click="navigateToItem(item)"
                    class="group cursor-pointer flex items-start gap-6 p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-all hover:shadow-lg bg-white dark:bg-slate-800">
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-2">
                            <svg class="w-5 h-5" :class="item.type === 'chapter' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'" fill="currentColor" viewBox="0 0 20 20" v-html="getItemIcon(item)">
                            </svg>
                            <h3
                                class="text-xl font-semibold text-gray-900 dark:text-white text-primary-hover transition-colors">
                                {{ item.title }}
                            </h3>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {{ item.description }}
                        </p>
                        <div class="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"
                                        clip-rule="evenodd" />
                                </svg>
                                Created {{ formatDate(item.createdAt) }}
                            </div>
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                                Updated {{ formatDate(item.updatedAt) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <aside
        class="hidden lg:flex fixed right-0 top-0 w-80 h-screen bg-gray-50 dark:bg-slate-900 border-l border-gray-200 dark:border-gray-700 px-6 py-10 flex-col overflow-y-auto p60">
        <div v-if="currentChapter" class="space-y-6">
            <div>
                <h2 class="text-sm font-semibold uppercase mb-3 text-primary">
                    {{ currentChapter.title }}
                </h2>
                <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {{ currentChapter.description }}
                </p>
            </div>

            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Inhalte ({{ sortedItems.length }})
                </h3>
                <nav aria-label="Chapter contents">
                    <ul class="space-y-2 list-none m-0 p-0">
                        <li v-for="item in sortedItems" :key="item.id">
                            <a @click="navigateToItem(item)"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors cursor-pointer">
                                {{ item.title }}
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </aside>
</template>

<style scoped>
a {
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.p60 {
    padding-top: calc(60px + (var(--spacing) * 10));
}
</style>
