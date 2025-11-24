<template>
    <div class="min-h-screen bg-gray-50 dark:bg-slate-900 lg:pr-80">
        <div class="max-w-4xl mx-auto px-8 py-12">
            <div class="prose prose-sm dark:prose-invert max-w-none">
                <div class="dark:bg-slate-800 dark:border-gray-700 top-0 z-20">
                    <div class="max-w-4xl mx-auto py-4">
                        <nav class="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <router-link to="/" class="hover:text-gray-900 dark:hover:text-gray-200">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </router-link>
                            <span>›</span>
                            <router-link to="/" class="hover:text-gray-900 dark:hover:text-gray-200">
                                Core Features
                            </router-link>
                            <span>›</span>
                            <span class="text-red-600 dark:text-red-400 font-medium">{{ docData?.title }}</span>
                        </nav>
                        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">{{ docData?.title }}</h1>
                    </div>
                </div>
                <p class="text-gray-700 dark:text-gray-300 text-lg mb-8">{{ docData?.description }}</p>
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
                    <span
                        class="text-lg font-semibold text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-500">{{
                            previousDoc?.title }}</span>
                </router-link>
                <div v-else></div>
                <router-link v-if="nextDoc" :to="{ name: 'doc', params: { id: nextDoc.id } }"
                    class="group flex flex-col items-end p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-all">
                    <span
                        class="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 mb-2">Next
                        »</span>
                    <span
                        class="text-lg font-semibold text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-500">{{
                            nextDoc?.title }}</span>
                </router-link>
            </div>
        </div>
    </div>
    <div
        class="hidden lg:flex fixed right-0 top-0 w-80 h-screen bg-gray-50 dark:bg-slate-900 border-l border-gray-200 dark:border-gray-700 px-6 py-10 flex-col overflow-y-auto p60">
        <div class="space-y-6">
            <div>
                <h3 class="text-sm font-semibold text-red-600 dark:text-red-400 uppercase mb-3">
                    Overview
                </h3>
                <nav class="space-y-2">
                    <a href="#section-0"
                        class="block text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium">
                        {{ docData?.title }}
                    </a>
                    <a href="#section-1"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        Service Architecture
                    </a>
                    <a href="#subsection-0-0"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-6">
                        Service Types
                    </a>
                    <a href="#subsection-0-1"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-6">
                        API Services
                    </a>
                </nav>
            </div>
            <div>
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Creating Services
                </h3>
                <nav class="space-y-2">
                    <a href="#subsection-1-0"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        Service Creation Process
                    </a>
                    <a href="#subsection-1-1"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        Service Templates
                    </a>
                </nav>
            </div>
            <div>
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Service Management
                </h3>
                <nav class="space-y-2">
                    <a href="#subsection-2-0"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        Service Lifecycle
                    </a>
                    <a href="#subsection-2-1"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        Service Configuration
                    </a>
                    <a href="#subsection-2-2"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        Service Monitoring
                    </a>
                </nav>
            </div>
            <div>
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Service Integration
                </h3>
                <nav class="space-y-2">
                    <a href="#subsection-3-0"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        Database Integration
                    </a>
                    <a href="#subsection-3-1"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        External API Integration
                    </a>
                    <a href="#subsection-3-2"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        Event System
                    </a>
                </nav>
            </div>
            <div>
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Service Security
                </h3>
                <nav class="space-y-2">
                    <a href="#subsection-4-0"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        Authentication & Authorization
                    </a>
                    <a href="#subsection-4-1"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        Input Validation
                    </a>
                    <a href="#subsection-4-2"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        Security Headers
                    </a>
                </nav>
            </div>
            <div>
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Service Testing
                </h3>
                <nav class="space-y-2">
                    <a href="#subsection-5-0"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        Unit Testing
                    </a>
                    <a href="#subsection-5-1"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        Integration Testing
                    </a>
                    <a href="#subsection-5-2"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        Load Testing
                    </a>
                </nav>
            </div>
            <div>
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Service Deployment
                </h3>
                <nav class="space-y-2">
                    <a href="#subsection-6-0"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        Deployment Strategies
                    </a>
                    <a href="#subsection-6-1"
                        class="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-3">
                        CI/CD Pipeline
                    </a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { demoDocuments } from '@/demo-data/docs'

const route = useRoute()
const docId = route.params.id as string

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

.p60 {
    padding-top: calc(60px + (var(--spacing) * 10));
}
</style>
