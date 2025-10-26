<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Button from './Button.vue'
import { useAuth } from '../features/auth/useAuth'

const { logout, isAuthenticated, getSession } = useAuth()
const router = useRouter()
const menuOpen = ref(false)

const authed = isAuthenticated()
const user = authed ? getSession() : null

function handleLogout() {
  logout()
  router.push('/')
}
</script>

<template>
  <header class="nav">
    <nav class="navbar" aria-label="Primary navigation">
      <div class="nav-brand">
        <RouterLink to="/" class="nav-logo">TicketFlow</RouterLink>

        <button
          class="nav-toggle"
          @click="menuOpen = !menuOpen"
          aria-label="Toggle menu"
        >
          <span v-if="menuOpen" style="font-size: 1.5rem;">✖</span>
          <span v-else style="font-size: 1.5rem;">☰</span>
        </button>
      </div>

      <div class="nav-links" :class="{ open: menuOpen }">
        <template v-if="authed">
          <RouterLink to="/dashboard" @click="menuOpen = false">Dashboard</RouterLink>
          <RouterLink to="/tickets" @click="menuOpen = false">Tickets</RouterLink>

          <!-- User Icon -->
          <div class="nav-user" title="User">
            <span style="font-size: 1rem;">👤</span>
          </div>

          <Button variant="ghost" @click="handleLogout">
            Logout
          </Button>
        </template>

        <template v-else>
          <RouterLink
            to="/auth/login"
            class="button button-secondary"
            @click="menuOpen = false"
          >
            Log in
          </RouterLink>
        </template>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-toggle span {
  display: block;
  line-height: 1;
}
</style>
