<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { FiMenu, FiX, FiUser } from 'vue-icons/fi' // lucide icons also fine
import Button from './Button.vue'
import { useAuth } from '../features/auth/useAuth'

const router = useRouter()
const route = useRoute()
const { logout, isAuthenticated, getSession } = useAuth()

const menuOpen = ref(false)
const authed = computed(() => isAuthenticated())
const session = computed(() => (authed.value ? getSession() : null))

function handleLogout() {
  logout()
  router.push('/')
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function isActive(to: string) {
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <header class="nav">
    <nav class="navbar" aria-label="Primary navigation">
      <div class="nav-brand">
        <RouterLink to="/" class="nav-logo">TicketFlow</RouterLink>

        <button
          class="nav-toggle"
          @click="toggleMenu"
          aria-label="Toggle menu"
        >
          <component :is="menuOpen ? FiX : FiMenu" size="22" />
        </button>
      </div>

      <div class="nav-links" :class="{ open: menuOpen }">
        <template v-if="authed">
          <RouterLink
            to="/dashboard"
            :class="{ active: isActive('/dashboard') }"
            @click="closeMenu"
          >
            Dashboard
          </RouterLink>
          <RouterLink
            to="/tickets"
            :class="{ active: isActive('/tickets') }"
            @click="closeMenu"
          >
            Tickets
          </RouterLink>

          <div class="nav-user">
            <FiUser size="20" />
          </div>

          <Button variant="ghost" type="button" @click="handleLogout">
            Logout
          </Button>
        </template>

        <template v-else>
          <RouterLink
            to="/auth/login"
            class="button button-secondary"
            @click="closeMenu"
          >
            Log in
          </RouterLink>
        </template>
      </div>
    </nav>
  </header>
</template>
