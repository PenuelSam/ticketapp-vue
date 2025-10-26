<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import Nav from '../components/Nav.vue'
import Card from '../components/Card.vue'
import Button from '../components/Button.vue'
import { useTickets } from '../features/tickets/store'
import { useAuth } from '../features/auth/useAuth'
import { RouterLink } from 'vue-router'

const { tickets } = storeToRefs(useTickets())
const { getSession } = useAuth()

const session = computed(() => getSession())

const metrics = computed(() => {
  const total = tickets.value.length
  const open = tickets.value.filter((t) => t.status === 'open').length
  const resolved = tickets.value.filter((t) => t.status === 'closed').length

  return [
    {
      label: 'Total tickets',
      value: total,
      description: 'All requests currently tracked in the workspace.'
    },
    {
      label: 'Open',
      value: open,
      description: 'Tickets awaiting an initial response or action.'
    },
    {
      label: 'Resolved',
      value: resolved,
      description: 'Tickets marked as closed by the team.'
    }
  ]
})
</script>

<template>
  <div class="layout">
    <Nav />
    <main class="layout-main">
      <div class="container">
        <!-- DASHBOARD HEADER -->
        <section class="dashboard-header">
          <h1 class="dashboard-title">
            Welcome back<span v-if="session?.user?.email">, {{ session.user.email }}</span>!
          </h1>
          <p class="dashboard-text">
            View the health of your support pipeline at a glance. Stay ahead of the queue and keep
            your customers delighted.
          </p>
          <div class="dashboard-actions">
            <Button as="RouterLink" to="/tickets" variant="primary">Manage tickets</Button>
            <Button as="RouterLink" to="/tickets" variant="secondary">View all tickets</Button>
          </div>
        </section>

        <!-- METRIC CARDS -->
        <section class="card-grid">
          <Card v-for="metric in metrics" :key="metric.label">
            <span class="metric-label">{{ metric.label }}</span>
            <div class="metric-value">{{ metric.value }}</div>
            <p class="metric-description">{{ metric.description }}</p>
          </Card>
        </section>
      </div>
    </main>
  </div>
</template>
