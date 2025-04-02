import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PanelsView from '@/views/inventory/PanelsView.vue'
import MonophaseInvertersView from '@/views/inventory/MonophaseInvertersView.vue'
import ProjectInfoView from '@/views/ProjectInfoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/project_info',
      name: 'project_info',
      component: ProjectInfoView,
    },
    {
      path: '/inventory/panels',
      name: 'panels',
      component: PanelsView,
    },
    {
      path: '/inventory/monophase_inverters',
      name: 'monophase_inverters',
      component: MonophaseInvertersView,
    },
  ],
})

export default router
