import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PanelsView from '@/views/inventory/PanelsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/inventory/panels',
      name: 'panels',
      component: PanelsView,
    }
  ],
})

export default router
