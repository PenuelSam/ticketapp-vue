<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import Nav from '../../components/Nav.vue'
import Footer from '../../components/Footer.vue'
import Card from '../../components/Card.vue'
import Button from '../../components/Button.vue'
import Badge from '../../components/Badge.vue'
import TicketForm from './TicketForm.vue'
import { useTickets, type TicketInput } from './store'
import { useToast } from 'vue-toastification'

const router = useRouter()
const store = useTickets()
const { tickets } = storeToRefs(store)
const toast = useToast()

const createModel = ref<TicketInput>({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium'
})

const creating = ref(false)
const showCreate = ref(false)

function openCreate() {
  showCreate.value = true
}

function resetForm() {
  createModel.value = {
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  }
}

async function handleCreate() {
  creating.value = true
  try {
    store.create({ ...createModel.value })
    toast.success('Ticket created')
    resetForm()
    showCreate.value = false
  } catch (err) {
    console.error(err)
    toast.error('Please fix the highlighted fields')
  } finally {
    creating.value = false
  }
}

function handleEdit(id: string) {
  router.push(`/tickets/${id}`)
}

function handleDelete(id: string) {
  const before = tickets.value.length
  store.remove(id)
  if (tickets.value.length < before) {
    toast.info('Ticket removed')
  }
}

const hasTickets = computed(() => tickets.value.length > 0)
</script>

<template>
  <div class="layout">
    <Nav />
    <main class="layout-main">
      <div class="container">
        <div class="ticket-header">
          <div>
            <h1>Tickets</h1>
            <p>Track and update the progress of every request.</p>
          </div>
          <Button variant="primary" @click="showCreate = !showCreate">
            {{ showCreate ? 'Close' : 'New Ticket' }}
          </Button>
        </div>

        <!-- CREATE FORM -->
        <Card v-if="showCreate" class="ticket-form-card">
          <TicketForm
            v-model="createModel"
            @submit="handleCreate"
            @cancel="showCreate = false"
            :loading="creating"
          >
            <template #submit>
              {{ creating ? 'Creating...' : 'Create Ticket' }}
            </template>
          </TicketForm>
        </Card>

        <!-- EMPTY STATE -->
        <Card v-else-if="!hasTickets" class="table-empty">
          No tickets yet. Create your first ticket to get started.
        </Card>

        <!-- TICKET GRID -->
        <div v-else class="ticket-grid">
          <Card
            v-for="ticket in tickets"
            :key="ticket.id"
            class="ticket-card"
          >
            <div class="ticket-top">
              <div class="ticket-info">
                <Badge :status="ticket.status" />
                <h2>{{ ticket.title }}</h2>
                <p>{{ ticket.description || 'No description provided.' }}</p>
              </div>
              <div class="ticket-priority">
                <span>Priority:</span>
                <div>{{ ticket.priority }}</div>
              </div>
            </div>

            <div class="ticket-bottom">
              <div class="ticket-updated">
                Updated {{ new Date(ticket.updatedAt).toLocaleString() }}
              </div>
              <div class="ticket-actions">
                <Button variant="secondary" @click="handleEdit(ticket.id)">Edit</Button>
                <Button variant="ghost" @click="handleDelete(ticket.id)">Delete</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

