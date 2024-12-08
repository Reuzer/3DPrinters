import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PrintersView from '@/views/PrintersView.vue'
import CoilsView from '@/views/CoilsView.vue'
import FiguresView from '@/views/FiguresView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/printers',
      name: 'printers',
      component: PrintersView
    },
    {
      path: '/coils',
      name: 'coils',
      component: CoilsView
    },
    {
      path: '/figures',
      name: 'figures',
      component: FiguresView
    }
  ],
})

export default router
