<template>
    <div class="min-h-full bg-gray-50 dark:bg-slate-900">
        <div class="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 image-section">
            <div class="max-w-7xl mx-auto px-4 sm:px-8 py-8">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 class="text-3xl font-bold text-white">Produktverwaltung</h1>
                        <p class="mt-1 text-sm text-gray-200">
                            Verwalten Sie alle Produkte und deren Dokumentation
                        </p>
                    </div>
                    <button @click="showAddProductModal = true"
                        class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary bg-primary-hover focus:outline-none focus:ring-2 focus-ring-primary focus:ring-offset-2 transition-colors">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Produkt hinzufügen
                    </button>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-8 py-8">
            <div v-if="error"
                class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-red-700 dark:text-red-300">{{ error }}</p>
                </div>
            </div>

            <!-- Success Message -->
            <div v-if="successMessage"
                class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p class="text-green-700 dark:text-green-300">{{ successMessage }}</p>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="flex justify-center items-center py-12">
                <div class="animate-spin">
                    <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>

            <!-- Products Grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <article v-for="product in products" :key="product.id"
                    class="relative rounded-lg transition-all shadow-sm hover:shadow-md bg-white dark:bg-slate-800 overflow-hidden group">
                    <!-- Product Header -->
                    <div class="p-6">
                        <div class="flex items-start justify-between gap-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex-shrink-0 h-12 w-12 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                                    <img v-if="product.logo" :src="product.logo" :alt="product.name"
                                        class="h-8 w-8 object-contain" />
                                    <svg v-else class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                        {{ product.name }}
                                    </h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">
                                        /{{ product.slug }}
                                    </p>
                                </div>
                            </div>
                            <!-- Actions Dropdown -->
                            <div class="relative" data-product-menu>
                                <button @click.stop="toggleProductMenu(product.id)"
                                    class="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </button>
                                <div v-if="activeProductMenu === product.id"
                                    class="absolute right-0 mt-1 w-48 bg-white dark:bg-slate-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10">
                                    <button @click="editProduct(product)"
                                        class="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-600 flex items-center gap-2 rounded-t-lg">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Bearbeiten
                                    </button>
                                    <button @click="viewProductDocs(product)"
                                        class="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-600 flex items-center gap-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Dokumentation
                                    </button>
                                    <hr class="border-gray-200 dark:border-gray-600" />
                                    <button @click="confirmDeleteProduct(product)"
                                        class="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 rounded-b-lg">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Löschen
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Description -->
                        <p class="mt-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {{ product.description }}
                        </p>
                    </div>

                    <!-- Product Footer -->
                    <div
                        class="px-6 py-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between text-sm">
                            <div class="flex items-center gap-4">
                                <span class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    {{ getDocCount(product.id) }} Artikel
                                </span>
                                <span class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                    </svg>
                                    {{ getChapterCount(product.id) }} Kapitel
                                </span>
                            </div>
                            <router-link :to="'/product/' + product.slug"
                                class="text-primary text-primary-hover font-medium flex items-center gap-1">
                                Ansehen
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7" />
                                </svg>
                            </router-link>
                        </div>
                    </div>
                </article>

                <!-- Empty State -->
                <div v-if="products.length === 0" class="col-span-full">
                    <div class="text-center py-12 bg-white dark:bg-slate-800 rounded-lg">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">Keine Produkte</h3>
                        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Erstellen Sie Ihr erstes Produkt, um loszulegen.
                        </p>
                        <button @click="showAddProductModal = true"
                            class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary bg-primary-hover transition-colors">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Produkt erstellen
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add/Edit Product Modal -->
        <div v-if="showAddProductModal"
            class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ editingProduct ? 'Produkt bearbeiten' : 'Neues Produkt erstellen' }}
                    </h3>
                    <button @click="closeProductModal"
                        class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form @submit.prevent="saveProduct" class="space-y-4">
                    <div>
                        <label for="productName"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Name *
                        </label>
                        <input id="productName" v-model="productForm.name" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus-ring-primary"
                            placeholder="z.B. Shop Management">
                    </div>
                    <div>
                        <label for="productSlug"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Slug *
                        </label>
                        <div class="flex">
                            <span
                                class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-600 text-gray-500 dark:text-gray-400 text-sm">
                                /product/
                            </span>
                            <input id="productSlug" v-model="productForm.slug" type="text" required
                                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus-ring-primary"
                                placeholder="shop-management">
                        </div>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Nur Kleinbuchstaben, Zahlen und Bindestriche
                        </p>
                    </div>
                    <div>
                        <label for="productDescription"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Beschreibung *
                        </label>
                        <textarea id="productDescription" v-model="productForm.description" rows="3" required
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus-ring-primary resize-none"
                            placeholder="Kurze Beschreibung des Produkts..."></textarea>
                    </div>
                    <div>
                        <label for="productLogo"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Logo URL
                        </label>
                        <input id="productLogo" v-model="productForm.logo" type="text"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus-ring-primary"
                            placeholder="/logo.png oder https://...">
                        <div v-if="productForm.logo" class="mt-2 flex items-center gap-2">
                            <img :src="productForm.logo" alt="Logo Preview" class="h-8 w-8 object-contain rounded" />
                            <span class="text-xs text-gray-500 dark:text-gray-400">Vorschau</span>
                        </div>
                    </div>
                    <div class="flex justify-end gap-3 pt-4">
                        <button type="button" @click="closeProductModal"
                            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                            Abbrechen
                        </button>
                        <button type="submit" :disabled="isSubmitting"
                            class="px-4 py-2 text-sm font-medium text-white bg-primary bg-primary-hover rounded-lg transition-colors disabled:opacity-50">
                            {{ isSubmitting ? 'Wird gespeichert...' : (editingProduct ? 'Speichern' : 'Erstellen') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal"
            class="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
            <div class="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6">
                <div
                    class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30">
                    <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
                    Produkt löschen?
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                    Möchten Sie das Produkt <strong>{{ productToDelete?.name }}</strong> wirklich löschen?
                    Alle zugehörigen Artikel und Kapitel werden ebenfalls gelöscht.
                </p>
                <div class="flex justify-center gap-3">
                    <button @click="showDeleteModal = false"
                        class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                        Abbrechen
                    </button>
                    <button @click="deleteProduct" :disabled="isSubmitting"
                        class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50">
                        {{ isSubmitting ? 'Wird gelöscht...' : 'Löschen' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Product, Doc, Chapter } from '@/types'
import { productsService } from '@/services/productsService'
import { docsService } from '@/services/docsService'

const router = useRouter()

const products = ref<Product[]>([])
const docs = ref<Doc[]>([])
const chapters = ref<Chapter[]>([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const showAddProductModal = ref(false)
const showDeleteModal = ref(false)
const activeProductMenu = ref<string | null>(null)
const editingProduct = ref<Product | null>(null)
const productToDelete = ref<Product | null>(null)

const productForm = ref({
    id: '',
    name: '',
    slug: '',
    description: '',
    logo: ''
})

// Auto-generate slug from name
watch(() => productForm.value.name, (newName) => {
    if (!editingProduct.value) {
        productForm.value.slug = newName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
    }
})

const loadData = async () => {
    isLoading.value = true
    error.value = null
    try {
        const [productsData, docsData] = await Promise.all([
            productsService.getAllProducts(),
            docsService.getAllDocs()
        ])
        products.value = productsData
        docs.value = docsData.filter(d => d.type === 'article') as Doc[]
        //   chapters.value = docsData.filter(d => d.type === 'chapter') as unknown as Chapter[]
    } catch (err: any) {
        error.value = err.message || 'Fehler beim Laden der Daten'
    } finally {
        isLoading.value = false
    }
}

const getDocCount = (productId: string) => {
    return docs.value.filter(d => d.productId === productId).length
}

const getChapterCount = (productId: string) => {
    return chapters.value.filter(c => c.productId === productId).length
}

const toggleProductMenu = (productId: string) => {
    activeProductMenu.value = activeProductMenu.value === productId ? null : productId
}

const closeProductMenu = () => {
    activeProductMenu.value = null
}

const editProduct = (product: Product) => {
    editingProduct.value = product
    productForm.value = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        logo: product.logo
    }
    showAddProductModal.value = true
    closeProductMenu()
}

const viewProductDocs = (product: Product) => {
    router.push(`/product/${product.slug}`)
    closeProductMenu()
}

const confirmDeleteProduct = (product: Product) => {
    productToDelete.value = product
    showDeleteModal.value = true
    closeProductMenu()
}

const saveProduct = async () => {
    isSubmitting.value = true
    error.value = null

    try {
        // Hier würde normalerweise ein API-Call kommen
        // Für jetzt simulieren wir das Speichern
        if (editingProduct.value) {
            // Update existing product
            const index = products.value.findIndex(p => p.id === editingProduct.value!.id)
            if (index !== -1) {
                products.value[index] = {
                    ...productForm.value,
                    id: editingProduct.value.id
                }
            }
            successMessage.value = 'Produkt erfolgreich aktualisiert'
        } else {
            // Create new product
            const newProduct: Product = {
                id: productForm.value.slug,
                name: productForm.value.name,
                slug: productForm.value.slug,
                description: productForm.value.description,
                logo: productForm.value.logo || '/logo.png'
            }
            products.value.push(newProduct)
            successMessage.value = 'Produkt erfolgreich erstellt'
        }

        closeProductModal()
        setTimeout(() => { successMessage.value = null }, 3000)
    } catch (err: any) {
        error.value = err.message || 'Fehler beim Speichern des Produkts'
    } finally {
        isSubmitting.value = false
    }
}

const deleteProduct = async () => {
    if (!productToDelete.value) return

    isSubmitting.value = true
    error.value = null

    try {
        // Hier würde normalerweise ein API-Call kommen
        products.value = products.value.filter(p => p.id !== productToDelete.value!.id)
        successMessage.value = 'Produkt erfolgreich gelöscht'
        showDeleteModal.value = false
        productToDelete.value = null
        setTimeout(() => { successMessage.value = null }, 3000)
    } catch (err: any) {
        error.value = err.message || 'Fehler beim Löschen des Produkts'
    } finally {
        isSubmitting.value = false
    }
}

const closeProductModal = () => {
    showAddProductModal.value = false
    editingProduct.value = null
    productForm.value = {
        id: '',
        name: '',
        slug: '',
        description: '',
        logo: ''
    }
}

// Close menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('[data-product-menu]')) {
        closeProductMenu()
    }
}

onMounted(() => {
    loadData()
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.image-section {
    background-image:
        linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
        url('/bg-image2.jpeg');
    background-size: cover;
    background-position: center;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

<script setup lang="ts">

</script>