<template>
    <div class="w-64 h-screen bg-white dark:bg-gray-800 flex flex-col fixed left-0 top-15 sidebar">
        <nav class="flex-1 overflow-y-auto">
            <div class="px-4 py-4">
                <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {{ currentProduct?.name || 'Documentation' }}
                </h2>
            </div>
            <div class="px-2 space-y-1">
                <div v-for="chapter in topLevelChapters" :key="chapter.id" class="space-y-0.5">
                    <div class="flex items-center justify-between group">
                        <button @click="navigateToItem(chapter)"
                            class="flex-1 flex items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                            <svg class="w-4 h-4 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                    clip-rule="evenodd" />
                                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                            </svg>
                            <span class="font-medium">{{ chapter.title }}</span>
                        </button>
                        <button @click="toggleChapter(chapter.id)"
                            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors mr-2">
                            <svg :class="['w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform', expandedChapters.includes(chapter.id) ? 'rotate-180' : '']"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                    <div v-show="expandedChapters.includes(chapter.id)"
                        class="ml-6 space-y-0.5 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
                        <button v-for="child in getChapterChildren(chapter.id)" :key="child.id"
                            @click="navigateToItem(child)"
                            class="w-full flex items-center gap-2 px-3 py-1.5 text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors">
                            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414l4 4A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                            </svg>
                            <span>{{ child.title }}</span>
                        </button>
                    </div>
                </div>
                <button v-for="article in topLevelArticles" :key="article.id" @click="navigateToItem(article)"
                    class="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                    <svg class="w-4 h-4 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414l4 4A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    </svg>
                    <span>{{ article.title }}</span>
                </button>
            </div>
        </nav>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { products, allDocItems } from '@/demo-data/docs'
import type { DocItem } from '@/types'

const route = useRoute()
const router = useRouter()
useTheme().setCSSVariables("sidebar")

const expandedChapters = ref<string[]>([])
const slug = computed(() => route.params.slug as string)
const chapterId = computed(() => route.params.id as string)

const currentProduct = computed(() => {
    if (slug.value) {
        return products.find(p => p.slug === slug.value)
    }

    if (chapterId.value) {
        const chapter = allDocItems.find(item => item.id === chapterId.value)
        if (chapter) {
            return products.find(p => p.id === chapter.productId)
        }
    }
    return undefined
})

const productItems = computed(() => {
    const productId = currentProduct.value?.id
    if (!productId) return []
    return allDocItems.filter(item => item.productId === productId && !item.parentId)
})

const topLevelChapters = computed(() => productItems.value.filter(item => item.type === 'chapter'))
const topLevelArticles = computed(() => productItems.value.filter(item => item.type === 'article'))

const toggleChapter = (chapterId: string) => {
    const index = expandedChapters.value.indexOf(chapterId)
    if (index > -1) {
        expandedChapters.value.splice(index, 1)
    } else {
        expandedChapters.value.push(chapterId)
    }
}

const getChapterChildren = (chapterId: string) => {
    return allDocItems.filter(item => item.parentId === chapterId)
}

const navigateToItem = (item: DocItem) => {
    if (item.type === 'chapter') {
        router.push({ name: 'chapter', params: { id: item.id } })
    } else {
        router.push({ name: 'doc', params: { id: item.id } })
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
