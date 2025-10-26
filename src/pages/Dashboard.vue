<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import Nav from '../components/Nav.vue'
import Card from '../components/Card.vue'
import Button from '../components/Button.vue'
import { useTickets } from '../features/tickets/store'
import { useAuth } from '../features/auth/useAuth'

const router = useRouter()
const store = useTickets()
const { tickets } = storeToRefs(store)
const { getSession, logout } = useAuth()

const total = computed(() => tickets.value.length)
const openCount = computed(() => tickets.value.filter((t) => t.status === 'open').length)
const progressCount = computed(() => tickets.value.filter((t) => t.status === 'in_progress').length)
const closedCount = computed(() => tickets.value.filter((t) => t.status === 'closed').length)

const userEmail = computed(() => getSession()?.user?.email ?? 'you')

function goToTickets() {
  router.push('/tickets')
}
</script>

<template>
  <div>
    <Nav />
    <section class="section">
      <div class="container grid" style="gap: 2.5rem;">
        <header class="grid" style="gap: 1rem;">
          <p style="margin: 0; color: var(--brand); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">
            Welcome back, {{ userEmail }}
          </p>
          <h1 style="margin: 0;">Your support desk at a glance</h1>
          <p style="margin: 0; color: var(--muted); max-width: 640px;">
            Keep your queue under control with real-time updates on ticket health. Everything you need to
            respond faster and keep customers delighted lives here.
          </p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <Button variant="primary" type="button" @click="goToTickets">Manage tickets</Button>
            <Button variant="ghost" type="button" @click="logout">Logout</Button>
          </div>
        </header>

        <section class="stats">
          <Card>
            <span>Total tickets</span>
            <h3>{{ total }}</h3>
          </Card>
          <Card>
            <span>Open</span>
            <h3 style="color: var(--status-open);">{{ openCount }}</h3>
          </Card>
          <Card>
            <span>In progress</span>
            <h3 style="color: var(--status-progress);">{{ progressCount }}</h3>
          </Card>
          <Card>
            <span>Closed</span>
            <h3 style="color: var(--status-closed);">{{ closedCount }}</h3>
          </Card>
        </section>
      </div>
    </section>
  </div>
</template>
