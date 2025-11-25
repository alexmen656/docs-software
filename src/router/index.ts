import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import ProductView from '../views/ProductView.vue'
import ChapterView from '../views/ChapterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      meta: { requiresGuest: true },
    },
    {
      path: '/product/:slug',
      name: 'product',
      component: ProductView,
      meta: { requiresGuest: true },
    },
    {
      path: '/chapter/:id',
      name: 'chapter',
      component: ChapterView,
      meta: { requiresGuest: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/detail/:id',
      name: 'doc',
      component: () => import('../views/DetailView.vue'),
      meta: { requiresGuest: true },
    },
  ],
})

export default router
