import { createRouter, createWebHistory } from 'vue-router'
import FinishView from '../views/FinishView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/finish',
      name: 'finish',
      component: FinishView
    },
    {
      path: '/',
      name: 'chat',
      component: () => import('../views/ChatView.vue')
    }
  ]
})

export default router
