import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: () => import('@/views/ProjectInfoView.vue'),
    },
    {
      path: '/consumption',
      name: 'consumption',
      component: () => import('@/views/ConsumptionView.vue'),
    },
    {
      path: '/solar_arrays',
      name: 'solar_arrays',
      component: () => import('@/views/SolarArraysView.vue'),
    },
    {
      path: '/inverters_setup',
      name: 'inverters_setup',
      component: () => import('@/views/InvertersSetupView.vue'),
    },
    {
      path: '/economic_balance',
      name: 'economic_balance',
      component: () => import('@/views/EconomicBalanceView.vue'),
    },
    {
      path: '/inventory/panels',
      name: 'panels',
      component: () => import('@/views/inventory/PanelsView.vue'),
    },
    {
      path: '/inventory/monophase_inverters',
      name: 'monophase_inverters',
      component: () => import('@/views/inventory/MonophaseInvertersView.vue'),
    },
  ],
})

export default router
