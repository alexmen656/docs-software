<template>
    <div class="hidden lg:flex w-64 h-screen bg-white dark:bg-gray-800 flex-col fixed left-0 top-15 sidebar">
        <nav class="flex-1 overflow-y-auto" aria-label="Documentation navigation">
            <div class="px-4 py-4">
                <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {{ currentProduct?.name || 'Documentation' }}
                </h2>
            </div>
            <ul class="px-2 space-y-1 list-none m-0 p-0">
                <li v-for="chapter in topLevelChapters" :key="chapter.id" class="space-y-0.5">
                    <div class="flex items-center justify-between group">
                        <button @click="navigateToItem(chapter)"
                            class="flex-1 flex items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                            <svg class="w-4 h-4 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20"
                                aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                    clip-rule="evenodd" />
                                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                            </svg>
                            <span class="font-medium">{{ chapter.title }}</span>
                        </button>
                        <button @click="toggleChapter(chapter.id)" @keydown.enter.prevent="toggleChapter(chapter.id)"
                            @keydown.space.prevent="toggleChapter(chapter.id)"
                            :aria-expanded="expandedChapters.includes(chapter.id)"
                            :aria-controls="'chapter-content-' + chapter.id"
                            :aria-label="expandedChapters.includes(chapter.id) ? 'Collapse ' + chapter.title : 'Expand ' + chapter.title"
                            data-bs-toggle="collapse"
                            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors mr-2">
                            <svg :class="['w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform', expandedChapters.includes(chapter.id) ? 'rotate-180' : '']"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                    <div :id="'chapter-content-' + chapter.id"
                        :class="{ 'show': expandedChapters.includes(chapter.id) }" role="region"
                        :aria-labelledby="'chapter-toggle-' + chapter.id"><!--class="collapse"-->
                        <ul v-show="expandedChapters.includes(chapter.id)"
                            class="ml-6 space-y-0.5 border-l-2 border-gray-200 dark:border-gray-700 pl-2 list-none m-0 p-0">
                            <li v-for="child in getChapterChildren(chapter.id)" :key="child.id">
                                <button @click="navigateToItem(child)"
                                    class="w-full flex items-center gap-2 px-3 py-1.5 text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:underline dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors">
                                    <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"
                                        aria-hidden="true">
                                        <path
                                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414l4 4A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                    </svg>
                                    <span>{{ child.title }}</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </li>
                <li v-for="article in topLevelArticles" :key="article.id">
                    <button @click="navigateToItem(article)"
                        class="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:underline dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                        <svg class="w-4 h-4 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                            aria-hidden="true">
                            <path
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414l4 4A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        </svg>
                        <span>{{ article.title }}</span>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
    <div v-if="isMobileMenuOpen" class="lg:hidden fixed inset-0 top-15 z-40 bg-black/50 dark:bg-black/70"
        @click="closeMobileMenu"></div>
    <div v-show="isMobileMenuOpen"
        class="lg:hidden w-64 h-screen bg-white dark:bg-gray-800 flex flex-col fixed left-0 top-15 sidebar z-40 transition-transform duration-300">
        <nav class="flex-1 overflow-y-auto" aria-label="Documentation navigation">
            <div class="px-4 py-4">
                <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {{ currentProduct?.name || 'Documentation' }}
                </h2>
            </div>
            <ul class="px-2 space-y-1 list-none m-0 p-0">
                <li v-for="chapter in topLevelChapters" :key="chapter.id" class="space-y-0.5">
                    <div class="flex items-center justify-between group">
                        <button @click="navigateToItem(chapter); closeMobileMenu()"
                            class="flex-1 flex items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                            <svg class="w-4 h-4 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20"
                                aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                    clip-rule="evenodd" />
                                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                            </svg>
                            <span class="font-medium">{{ chapter.title }}</span>
                        </button>
                        <button @click="toggleChapter(chapter.id)" @keydown.enter.prevent="toggleChapter(chapter.id)"
                            @keydown.space.prevent="toggleChapter(chapter.id)"
                            :aria-expanded="expandedChapters.includes(chapter.id)"
                            :aria-controls="'chapter-content-mobile-' + chapter.id"
                            :aria-label="expandedChapters.includes(chapter.id) ? 'Collapse ' + chapter.title : 'Expand ' + chapter.title"
                            data-bs-toggle="collapse"
                            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors mr-2">
                            <svg :class="['w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform', expandedChapters.includes(chapter.id) ? 'rotate-180' : '']"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                    <div :id="'chapter-content-mobile-' + chapter.id"
                        :class="{ 'show': expandedChapters.includes(chapter.id) }" role="region"
                        :aria-labelledby="'chapter-toggle-mobile-' + chapter.id"><!--class="collapse"-->
                        <ul v-show="expandedChapters.includes(chapter.id)"
                            class="ml-6 space-y-0.5 border-l-2 border-gray-200 dark:border-gray-700 pl-2 list-none m-0 p-0">
                            <li v-for="child in getChapterChildren(chapter.id)" :key="child.id">
                                <button @click="navigateToItem(child); closeMobileMenu()"
                                    :tabindex="expandedChapters.includes(chapter.id) ? 0 : -1"
                                    class="w-full flex items-center gap-2 px-3 py-1.5 text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:underline dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors">
                                    <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"
                                        aria-hidden="true">
                                        <path
                                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414l4 4A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                    </svg>
                                    <span>{{ child.title }}</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </li>
                <li v-for="article in topLevelArticles" :key="article.id">
                    <button @click="navigateToItem(article); closeMobileMenu()"
                        class="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:underline dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                        <svg class="w-4 h-4 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                            aria-hidden="true">
                            <path
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414l4 4A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        </svg>
                        <span>{{ article.title }}</span>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useMobileMenu } from '@/composables/useMobileMenu'
import { productsService } from '@/services/productsService'
import { docsService } from '@/services/docsService'
import type { DocItem, Product } from '@/types'

const route = useRoute()
const router = useRouter()
const { isMobileMenuOpen, closeMobileMenu } = useMobileMenu()
useTheme().setCSSVariables("sidebar")

const expandedChapters = ref<string[]>([])
const products = ref<Product[]>([])
const allDocItems = ref<DocItem[]>([])
const isLoading = ref(false)

const slug = computed(() => route.params.slug as string)
const chapterId = computed(() => route.params.id as string)

const loadData = async () => {
    isLoading.value = true
    try {
        const [productList, docItems] = await Promise.all([
            productsService.getAllProducts(),
            docsService.getAllDocItems(),
        ])
        products.value = productList
        allDocItems.value = docItems
    } catch (error) {
        console.error('Error loading sidebar data:', error)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    loadData()
})

const currentProduct = computed(() => {
    if (slug.value) {
        return products.value.find(p => p.slug === slug.value)
    }

    if (chapterId.value) {
        const chapter = allDocItems.value.find(item => item.id === chapterId.value)
        if (chapter) {
            return products.value.find(p => p.id === chapter.productId)
        }
    }
    return undefined
})

const productItems = computed(() => {
    const productId = currentProduct.value?.id
    if (!productId) return []
    return allDocItems.value.filter(item => item.productId === productId && !item.parentId)
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
    return allDocItems.value.filter(item => item.parentId === chapterId)
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
