<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import Nav from '../../components/Nav.vue'
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
  <div>
    <Nav />
    <section class="section">
      <div class="container">
        <header class="grid" style="gap: 1rem; align-items: center; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
          <div>
            <h1 style="margin: 0;">Tickets</h1>
            <p style="margin: 0; color: var(--muted);">Manage, triage, and resolve support tickets.</p>
          </div>
          <div style="justify-self: end;">
            <Button v-if="!showCreate" variant="primary" type="button" @click="openCreate">Create New Ticket</Button>
          </div>
        </header>

        <div v-if="showCreate" style="margin-top: 2rem;">
          <TicketForm
            v-model="createModel"
            title="Create ticket"
            :loading="creating"
            @submit="handleCreate"
          >
            <template #submit>
              {{ creating ? 'Creating...' : 'Create Ticket' }}
            </template>
          </TicketForm>
        </div>

        <Card v-if="!hasTickets" style="margin-top: 2rem; text-align: center;">
          <p style="margin: 0; color: var(--muted);">No tickets yet. Create your first ticket to get started.</p>
        </Card>

        <div v-else style="margin-top: 2rem;">
          <Card>
            <div style="overflow-x: auto;">
              <table class="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Updated</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="ticket in tickets" :key="ticket.id">
                    <td style="font-weight: 600;">{{ ticket.title }}</td>
                    <td><Badge :status="ticket.status" /></td>
                    <td style="text-transform: capitalize;">{{ ticket.priority }}</td>
                    <td>{{ new Date(ticket.updatedAt).toLocaleString() }}</td>
                    <td>
                      <div class="table-actions">
                        <Button variant="ghost" type="button" @click="handleEdit(ticket.id)">Edit</Button>
                        <Button variant="secondary" type="button" @click="handleDelete(ticket.id)">Delete</Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>
