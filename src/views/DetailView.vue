<template>
    <div class="min-h-full bg-gray-50 dark:bg-slate-900 lg:pr-80">
        <div class="max-w-4xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6 pb-8 sm:pb-12">
            <div class="prose prose-sm dark:prose-invert max-w-none">
                <div class="dark:border-gray-700 top-0 z-20">
                    <div class="max-w-4xl mx-auto py-4">
                        <nav aria-label="Breadcrumb" class="mb-4">
                            <ol
                                class="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 list-none m-0 p-0">
                                <li>
                                    <router-link to="/" class="hover:text-gray-900 dark:hover:text-gray-200">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path
                                                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                        <span class="sr-only">Home</span>
                                    </router-link>
                                </li>
                                <li aria-hidden="true">›</li>
                                <li>
                                    <router-link to="/" class="hover:text-gray-900 dark:hover:text-gray-200">
                                        Core Features
                                    </router-link>
                                </li>
                                <li aria-hidden="true">›</li>
                                <li aria-current="page" class="font-medium text-primary">{{ docData?.title }}</li>
                            </ol>
                        </nav>
                        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">{{ docData?.title }}</h1>
                    </div>
                </div>
                <p class="text-gray-700 dark:text-gray-300 text-lg mb-6 sm:mb-8">{{ docData?.description }}</p>
                <div id="section-0" class="space-y-6">
                    <div class="space-y-3">
                        <h2 id="section-1" class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                            Overview</h2>
                        <p class="text-gray-700 dark:text-gray-300">Services act as the server-side foundation
                            for your applications, offering:</p>
                        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                            <li>API endpoints for frontend applications</li>
                            <li>Data processing and validation</li>
                            <li>Integration with external services</li>
                            <li>Background task processing</li>
                            <li>Real-time communication capabilities</li>
                        </ul>
                    </div>

                    <div class="space-y-3">
                        <h2 id="section-1" class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                            Overview</h2>
                        <p class="text-gray-700 dark:text-gray-300">Services act as the server-side foundation
                            for your applications, offering:</p>
                        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                            <li>API endpoints for frontend applications</li>
                            <li>Data processing and validation</li>
                            <li>Integration with external services</li>
                            <li>Background task processing</li>
                            <li>Real-time communication capabilities</li>
                        </ul>
                    </div>
                    <div class="space-y-3">
                        <h2 id="section-1" class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                            Overview</h2>
                        <p class="text-gray-700 dark:text-gray-300">Services act as the server-side foundation
                            for your applications, offering:</p>
                        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                            <li>API endpoints for frontend applications</li>
                            <li>Data processing and validation</li>
                            <li>Integration with external services</li>
                            <li>Background task processing</li>
                            <li>Real-time communication capabilities</li>
                        </ul>
                    </div>
                    <div class="space-y-3">
                        <h2 id="section-1" class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                            Overview</h2>
                        <p class="text-gray-700 dark:text-gray-300">Services act as the server-side foundation
                            for your applications, offering:</p>
                        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                            <li>API endpoints for frontend applications</li>
                            <li>Data processing and validation</li>
                            <li>Integration with external services</li>
                            <li>Background task processing</li>
                            <li>Real-time communication capabilities</li>
                        </ul>
                    </div>
                    <div class="space-y-3">
                        <h2 id="section-1" class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                            Overview</h2>
                        <p class="text-gray-700 dark:text-gray-300">Services act as the server-side foundation
                            for your applications, offering:</p>
                        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                            <li>API endpoints for frontend applications</li>
                            <li>Data processing and validation</li>
                            <li>Integration with external services</li>
                            <li>Background task processing</li>
                            <li>Real-time communication capabilities</li>
                        </ul>
                    </div>
                    <div class="space-y-3">
                        <h2 id="section-2" class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                            Service Architecture</h2>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2">Service Types</h3>
                        <h4 class="font-semibold text-gray-900 dark:text-white mt-3 mb-1">API Services</h4>
                        <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-2">
                            <li>REST API endpoints</li>
                            <li>GraphQL resolvers</li>
                            <li>WebSocket connections</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                <router-link v-if="previousDoc" :to="{ name: 'doc', params: { id: previousDoc.id } }"
                    class="group flex flex-col items-start p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-all">
                    <span
                        class="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 mb-2">«
                        Previous</span>
                    <span class="text-lg font-semibold text-primary text-primary-hover">{{
                        previousDoc?.title }}</span>
                </router-link>
                <div v-else></div>
                <router-link v-if="nextDoc" :to="{ name: 'doc', params: { id: nextDoc.id } }"
                    class="group flex flex-col items-end p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-all">
                    <span
                        class="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 mb-2">Next
                        »</span>
                    <span class="text-lg font-semibold text-primary text-primary-hover">{{
                        nextDoc?.title }}</span>
                </router-link>
            </div>
        </div>
    </div>
    <aside
        class="hidden lg:flex fixed right-0 top-0 w-80 h-screen bg-gray-50 dark:bg-slate-900 border-l border-gray-200 dark:border-gray-700 px-6 py-10 flex-col overflow-y-auto p60">
        <nav aria-label="Table of contents">
            <ul class="space-y-6 list-none m-0 p-0">
                <li>
                    <h2 class="text-sm font-semibold uppercase mb-3 text-primary">
                        Overview
                    </h2>
                    <ul class="space-y-2 list-none m-0 p-0">
                        <li>
                            <a href="#section-0"
                                class="block text-sm text-gray-700 dark:text-gray-300 transition-colors font-medium text-primary-hover">
                                {{ docData?.title }}
                            </a>
                        </li>
                        <li>
                            <a href="#section-1"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                Service Architecture
                            </a>
                        </li>
                        <li>
                            <a href="#subsection-0-0"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-6">
                                Service Types
                            </a>
                        </li>
                        <li>
                            <a href="#subsection-0-1"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-6">
                                API Services
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Creating Services
                    </h2>
                    <ul class="space-y-2 list-none m-0 p-0">
                        <li>
                            <a href="#subsection-1-0"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                Service Creation Process
                            </a>
                        </li>
                        <li>
                            <a href="#subsection-1-1"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                Service Templates
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Service Management
                    </h2>
                    <ul class="space-y-2 list-none m-0 p-0">
                        <li>
                            <a href="#subsection-2-0"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                Service Lifecycle
                            </a>
                        </li>
                        <li>
                            <a href="#subsection-2-1"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                Service Configuration
                            </a>
                        </li>
                        <li>
                            <a href="#subsection-2-2"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                Service Monitoring
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Service Integration
                    </h2>
                    <ul class="space-y-2 list-none m-0 p-0">
                        <li>
                            <a href="#subsection-3-0"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                Database Integration
                            </a>
                        </li>
                        <li>
                            <a href="#subsection-3-1"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                External API Integrations
                            </a>
                        </li>
                        <li>
                            <a href="#subsection-3-2"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                Event System
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Service Security
                    </h2>
                    <ul class="space-y-2 list-none m-0 p-0">
                        <li>
                            <a href="#subsection-4-0"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                Authentication & Authorization
                            </a>
                        </li>
                        <li>
                            <a href="#subsection-4-1"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                Input Validation
                            </a>
                        </li>
                        <li>
                            <a href="#subsection-4-2"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                Security Headers
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Service Testing
                    </h2>
                    <ul class="space-y-2 list-none m-0 p-0">
                        <li>
                            <a href="#subsection-5-0"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                Unit Testing
                            </a>
                        </li>
                        <li>
                            <a href="#subsection-5-1"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                Integration Testing
                            </a>
                        </li>
                        <li>
                            <a href="#subsection-5-2"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                Load Testing
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Service Deployment
                    </h2>
                    <ul class="space-y-2 list-none m-0 p-0">
                        <li>
                            <a href="#subsection-6-0"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                Deployment Strategies
                            </a>
                        </li>
                        <li>
                            <a href="#subsection-6-1"
                                class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                                CI/CD Pipeline
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { demoDocuments } from '@/demo-data/docs'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const docId = route.params.id as string
const { setCSSVariables } = useTheme()

setCSSVariables()

const docData = computed(() => {
    return demoDocuments.find(doc => doc.id === docId)
})

const currentIndex = computed(() => {
    return demoDocuments.findIndex(doc => doc.id === docId)
})

const previousDoc = computed(() => {
    const index = currentIndex.value
    if (index > 0) {
        return demoDocuments[index - 1]
    }
    return null
})

const nextDoc = computed(() => {
    const index = currentIndex.value
    if (index < demoDocuments.length - 1) {
        return demoDocuments[index + 1]
    }
    return null
})
</script>

<style scoped>
a {
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

.p60 {
    padding-top: calc(60px + (var(--spacing) * 10));
}
</style>
