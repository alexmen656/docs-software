<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { products, demoDocuments } from '@/demo-data/docs'
import type { Product } from '@/types'

const router = useRouter()
const productList = ref<Product[]>(products)
const searchQuery = ref('')

const filteredProducts = computed(() => {
    if (!searchQuery.value.trim()) return productList.value

    const query = searchQuery.value.toLowerCase()
    return productList.value.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    )
})

const filteredDocs = computed(() => {
    if (!searchQuery.value.trim()) return []

    const query = searchQuery.value.toLowerCase()
    return demoDocuments.filter(doc =>
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query)
    )
})

const hasSearchResults = computed(() => {
    return searchQuery.value.trim().length > 0
})

const navigateToProduct = (slug: string) => {
    router.push({ name: 'product', params: { slug } })
}

const navigateToDoc = (docId: string) => {
    router.push({ name: 'doc', params: { id: docId } })
}
</script>

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-slate-900">
        <div class="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 image-sec">
            <div class="max-w-7xl mx-auto px-8 py-24">
                <h1 class="text-5xl font-bold text-gray-900 text-white dark:text-white mb-8">Knowledge Hub</h1>
                <div class="relative">
                    <div class="relative">
                        <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input v-model="searchQuery" type="text" placeholder="Search documentation..."
                            class="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                    </div>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-8 py-12">
            <div v-if="hasSearchResults" class="mb-12">
                <div v-if="filteredDocs.length > 0" class="mb-12">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Documentation</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="doc in filteredDocs" :key="doc.id" @click="navigateToDoc(doc.id)"
                            class="group cursor-pointer rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all hover:shadow-lg p-6">
                            <h3
                                class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {{ doc.title }}
                            </h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                {{ doc.description }}
                            </p>
                        </div>
                    </div>
                </div>
                <div v-if="filteredProducts.length > 0" class="mb-12">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Products</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="product in filteredProducts" :key="product.id"
                            @click="navigateToProduct(product.slug)"
                            class="cursor-pointer rounded-lg transition-all shadow-sm hover:shadow-md p-6 bg-white dark:bg-slate-800">
                            <div class="flex items-center gap-3 mb-4">
                                <img height="36" width="36" :src="product.logo" :alt="'Logo of ' + product.name"
                                    class="flex-shrink-0" />
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    {{ product.name }}
                                </h3>
                            </div>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 break-words">
                                {{ product.description }}
                            </p>
                            <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                    {{demoDocuments.filter(d => d.productId === product.id).length}} Articles ·
                                    {{demoDocuments.filter(d => d.productId === product.id).length > 0 ?
                                        Math.ceil(demoDocuments.filter(d => d.productId === product.id).length / 3) : 0}}
                                    Sections
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Produkte</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="product in productList" :key="product.id" @click="navigateToProduct(product.slug)"
                        class="cursor-pointer rounded-lg transition-all shadow-sm hover:shadow-md p-6 bg-white dark:bg-slate-800">
                        <div class="flex items-center gap-3 mb-4">
                            <img height="42" width="42" :src="product.logo" :alt="'Logo of ' + product.name"
                                class="flex-shrink-0" />
                            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
                                {{ product.name }}
                            </h3>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 break-words">
                            {{ product.description }} lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                {{demoDocuments.filter(d => d.productId === product.id).length}} Articles ·
                                {{demoDocuments.filter(d => d.productId === product.id).length > 0 ?
                                    Math.ceil(demoDocuments.filter(d => d.productId === product.id).length / 3) : 0}}
                                Sections
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.image-sec {
    background-image:
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url('/bg-image2.jpeg');
    background-size: cover;
    background-position: center;
}
</style>
