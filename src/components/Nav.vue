<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
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

        <!-- Simple text toggle instead of icons -->
        <button
          class="nav-toggle"
          @click="toggleMenu"
          aria-label="Toggle menu"
        >
          {{ menuOpen ? 'Close' : 'Menu' }}
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

          <!-- Removed user icon -->
          <span class="nav-user-label">{{ session?.user?.email || 'User' }}</span>

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

<style scoped>
.nav-user-label {
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.95rem;
}

.nav-toggle {
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.4rem 0.8rem;
  font-weight: 600;
  color: var(--text-strong);
  cursor: pointer;
  transition: background 0.2s ease;
}

.nav-toggle:hover {
  background: var(--brand-soft);
}
</style>
