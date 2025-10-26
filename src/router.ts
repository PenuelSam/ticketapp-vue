import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/pages/Landing.vue'
import Login from '@/features/auth/Login.vue'
import Signup from '@/features/auth/Signup.vue'
import Dashboard from '@/pages/Dashboard.vue'
import TicketList from '@/features/tickets/TicketList.vue'
import TicketPage from '@/features/tickets/TicketPage.vue'
import { useAuth } from './features/auth/useAuth'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Landing },
    { path: '/auth/login', component: Login },
    { path: '/auth/signup', component: Signup },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/tickets', component: TicketList, meta: { requiresAuth: true } },
    { path: '/tickets/:id', component: TicketPage, meta: { requiresAuth: true } },
  ],
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()
  if (to.meta.requiresAuth && !isAuthenticated()) {
    localStorage.removeItem('ticketapp_session')
    next('/auth/login?reason=expired')
  } else {
    next()
  }
})

export default router
