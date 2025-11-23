<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'

const route = useRoute()

/*const showHeader = computed(() => {
  return !['landing', 'login', 'signup'].includes(route.name as string)
})*/

const showSidebar = computed(() => {
  return !['landing', 'login', 'signup'].includes(route.name as string)
})
</script>

<template>
  <div id="app" class="min-h-screen" :class="showSidebar ? 'app-with-sidebar' : 'bg-gray-50 dark:bg-gray-900'">
    <AppHeader /><!--v-if="showHeader" -->
    <div class="flex h-full">
      <AppSidebar v-if="showSidebar" />
      <!--  <main :class="showSidebar ? 'ml-64 w-full main-content' : 'w-full'">
      <main class="ml-64 w-full main-content">-->

      <main :class="showSidebar ? 'ml-64 w-full main-content' : 'w-full p60'">
        <RouterView /><!--pt-15-->
      </main>
    </div>
    <footer class="bg-gray-800 dark:bg-slate-900 text-gray-300 py-12">
      <div class="max-w-7xl mx-auto px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="font-semibold text-white mb-4">CMS Documentation</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">Getting Started</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Services</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Codespaces</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-white mb-4">API Documentation</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">APIs Overview</a></li>
              <li><a href="#" class="hover:text-white transition-colors">External APIs</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Internal APIs</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-white mb-4">Resources</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">CMS Platform ↗</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Support ↗</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Status ↗</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-white mb-4">Development</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">Changelog</a></li>
              <li><a href="#" class="hover:text-white transition-colors">GitHub ↗</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 pt-8 text-center text-sm">
          <p class="text-gray-400">Copyright © 2025 Alex Polan. Built with Syscom.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-with-sidebar {
  background: #eff3f6;
}

@media (prefers-color-scheme: dark) {
  .app-with-sidebar {
    background: #1f2937;
  }
}

.main-content {
  border-top-left-radius: 16px;
  /*24*/
  background: white;
  overflow: hidden;
  margin-top: 60px;
  min-height: calc(100vh - 60px);
}

@media (prefers-color-scheme: dark) {
  .main-content {
    background: #1e293b;
  }
}

.p60 {
  padding-top: 60px;
}
</style>