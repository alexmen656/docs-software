<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { products, demoDocuments } from '@/demo-data/docs'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const router = useRouter()
const { setCSSVariables } = useTheme()

setCSSVariables()

const sortBy = ref<'name' | 'recent'>('recent')

const slug = route.params.slug as string
const currentProduct = computed(() => products.find(p => p.slug === slug))
const productDocs = computed(() => {
    const productId = currentProduct.value?.id
    if (!productId) return []
    return demoDocuments.filter(doc => doc.productId === productId)
})

const sortedDocs = computed(() => {
    if (sortBy.value === 'name') {
        return [...productDocs.value].sort((a, b) => a.title.localeCompare(b.title))
    }
    return [...productDocs.value].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
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

/*const navigateToDoc = (docId: string) => {
    router.push({ name: 'doc', params: { id: docId } })
}*/
</script>

<template>
    <div v-if="currentProduct" class="min-h-full bg-gray-50 dark:bg-slate-900 lg:pr-80">
        <div class="max-w-4xl mx-auto px-8 pt-6 pb-12">
            <div class="max-w-4xl mx-auto py-4">
                <nav class="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <router-link to="/" class="hover:text-gray-900 dark:hover:text-gray-200">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </router-link>
                    <span>›</span>
                    <span class="font-medium text-primary">{{ currentProduct.name }}</span>
                </nav>
                <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">{{ currentProduct.name }}</h1>
                <p class="text-gray-700 dark:text-gray-300 text-lg mb-8"><!--{{ currentProduct.description }}-->{{
                    sortedDocs.length }} Artikel</p>
            </div>

            <!--   <div class="flex items-center justify-between mb-8">
                <div>
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Dokumentationen</h2>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">{{ sortedDocs.length }} Artikel</p>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Sort</span>
                    <button @click="sortBy = 'name'" :class="[
                        'px-3 py-1 text-sm rounded border transition-colors',
                        sortBy === 'name'
                            ? 'border-gray-400 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white'
                            : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    ]">
                        Name
                    </button>
                    <button @click="sortBy = 'recent'"
                        class="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </button>
                </div>
            </div>-->

            <div class="space-y-4">
                <router-link v-for="doc in sortedDocs" :key="doc.id" :to="{ name: 'doc', params: { id: doc.id } }"
                    class="group flex items-start gap-6 p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-all hover:shadow-lg bg-white dark:bg-slate-800">
                    <div
                        class="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                        <img :src="doc.image" :alt="doc.title"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div class="absolute top-2 right-2 bg-white dark:bg-gray-900 rounded-full p-1.5">
                            <svg class="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path
                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414l4 4A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                            </svg>
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3
                            class="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-primary-hover transition-colors">
                            {{ doc.title }}
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {{ doc.description }}
                        </p>
                        <div class="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"
                                        clip-rule="evenodd" />
                                </svg>
                                Created {{ formatDate(doc.createdAt) }}
                            </div>
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                                Updated {{ formatDate(doc.updatedAt) }}
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>

    <div
        class="hidden lg:flex fixed right-0 top-0 w-80 h-screen bg-gray-50 dark:bg-slate-900 border-l border-gray-200 dark:border-gray-700 px-6 py-10 flex-col overflow-y-auto p60">
        <div v-if="currentProduct" class="space-y-6">
            <div>
                <h3 class="text-sm font-semibold uppercase mb-3 text-primary">
                    {{ currentProduct.name }}
                </h3>
                <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {{ currentProduct.description }}
                </p>
            </div>

            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Dokumentationen ({{ sortedDocs.length }})
                </h3>
                <nav class="space-y-2">
                    <router-link v-for="doc in sortedDocs" :key="doc.id" :to="{ name: 'doc', params: { id: doc.id } }"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                        {{ doc.title }}
                    </router-link>
                </nav>
            </div>
        </div>
    </div>
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
