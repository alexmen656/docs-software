<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import AppFooter from './components/AppFooter.vue'
import AdminSidebar from './admin/components/AdminSidebar.vue'
import AdminHeader from './admin/components/AdminHeader.vue'
import { useTheme } from './composables/useTheme'

const route = useRoute()

onMounted(() => {
  useTheme().setCSSVariables()
})

const showSidebar = computed(() => {
  return !['landing', 'login', 'signup'].includes(route.name as string) ? route.meta.requiresAdmin !== true : false
})

const showAdminSidebar = computed(() => {
  return !['landing', 'login', 'signup'].includes(route.name as string) ? route.meta.requiresAdmin === true : false
})

const showFooter = computed(() => {
  return ['landing', 'signup'].includes(route.name as string)
})

const showHeader = computed(() => {
  return route.path.startsWith('/admin') ? false : true
})

const showAdminHeader = computed(() => {
  return route.path.startsWith('/admin') ? true : false
})
</script>

<template>
  <div id="app" class="min-h-screen"
    :class="showSidebar || showAdminSidebar ? 'app-with-sidebar' : 'bg-gray-50 dark:bg-gray-900'">
    <!--{{ showHeader }}
    {{ showAdminHeader }}-->
    <AppHeader v-if="showHeader" />
    <AdminHeader v-if="showAdminHeader" />
    <div class="flex h-full">
      <AppSidebar v-if="showSidebar" />
      <AdminSidebar v-if="showAdminSidebar" />
      <main :class="showSidebar || showAdminSidebar ? 'lg:ml-64 w-full main-content' : 'w-full p60'">
        <RouterView />
      </main>
    </div>
    <AppFooter v-if="showFooter"></AppFooter>
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
  background: white;
  overflow: hidden;
  margin-top: 60px;
  min-height: calc(100vh - 60px);
}

@media (width >=64rem) {
  .main-content {
    border-top-left-radius: 16px;
  }
}

@media (prefers-color-scheme: dark) {
  .main-content {
    background: #1e293b;
  }
}

.p60 {
  margin-top: 60px;
  min-height: calc(100vh - 60px);
}
</style>