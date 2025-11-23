<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { products } from '@/demo-data/docs'
import type { Product } from '@/types'

const router = useRouter()
const productList = ref<Product[]>(products)

const navigateToProduct = (slug: string) => {
  router.push({ name: 'product', params: { slug } })
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-slate-900">
    <div class="px-8 py-12">
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Knowledge Hub</h1>
        <p class="text-gray-600 dark:text-gray-400">Wählen Sie einen Bereich, um die entsprechenden Dokumentationen zu erkunden</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in productList"
          :key="product.id"
          @click="navigateToProduct(product.slug)"
          class="group cursor-pointer rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all hover:shadow-lg dark:hover:shadow-lg"
        >
          <div class="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute top-3 right-3 bg-white dark:bg-gray-900 rounded-full p-2">
              <svg class="w-4 h-4 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414l4 4A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
              </svg>
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ product.name }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ product.description }}
            </p>
            <div class="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
              Dokumentation anschauen
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>