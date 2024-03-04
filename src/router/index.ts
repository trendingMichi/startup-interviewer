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
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue'),
      props: { valid: true }
    },
    {
      path: '/',
      name: 'start',
      component: () => import('../views/StartView.vue')
    }
  ]
})

export default router
