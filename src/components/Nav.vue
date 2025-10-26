<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Button from './Button.vue'
import { useAuth } from '../features/auth/useAuth'

const route = useRoute()
const { isAuthenticated, logout } = useAuth()

const authed = computed(() => isAuthenticated())

const links = computed(() => {
  if (!authed.value) {
    return [
      { to: '/auth/login', label: 'Login' },
      { to: '/auth/signup', label: 'Sign Up' }
    ]
  }
  return [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/tickets', label: 'Tickets' }
  ]
})

function isActive(to: string) {
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <nav>
    <div class="container nav-inner">
      <RouterLink to="/" class="brand">
        <span>TicketApp</span>
        Vue
      </RouterLink>
      <div class="nav-links">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :class="[{ active: isActive(link.to) }]"
        >
          {{ link.label }}
        </RouterLink>
        <Button v-if="authed" variant="ghost" type="button" @click="logout">
          Logout
        </Button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-links .active {
  color: var(--brand);
}
</style>
