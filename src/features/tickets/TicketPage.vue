<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import Nav from '../../components/Nav.vue'
import Card from '../../components/Card.vue'
import Button from '../../components/Button.vue'
import TicketForm from './TicketForm.vue'
import { useTickets, type TicketInput } from './store'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const store = useTickets()
const { tickets } = storeToRefs(store)
const toast = useToast()

const ticketId = computed(() => route.params.id as string)

const ticket = computed(() => tickets.value.find((t) => t.id === ticketId.value))

const model = ref<TicketInput>({
  title: ticket.value?.title ?? '',
  description: ticket.value?.description ?? '',
  status: ticket.value?.status ?? 'open',
  priority: ticket.value?.priority ?? 'medium'
})

watch(ticket, (value) => {
  if (!value) return
  model.value = {
    title: value.title,
    description: value.description,
    status: value.status,
    priority: value.priority
  }
})

const saving = ref(false)

function handleSubmit() {
  if (!ticket.value) return
  saving.value = true
  try {
    store.update(ticket.value.id, { ...model.value })
    toast.success('Ticket updated')
  } catch (err) {
    console.error(err)
    toast.error('Please fix the highlighted fields')
  } finally {
    saving.value = false
  }
}

function goBack() {
  router.push('/tickets')
}
</script>

<template>
  <div class="layout">
    <Nav />
    <main class="layout-main">
      <div class="container" style="max-width: 720px;">
        <Card v-if="!ticket">
          <h1>Ticket not found</h1>
          <p style="color: var(--text-muted);">
            The ticket you are looking for may have been removed.
          </p>
          <Button variant="secondary" @click="goBack">Back to tickets</Button>
        </Card>

        <Card v-else>
          <div class="ticket-edit-header">
            <div>
              <h1>Edit ticket</h1>
              <p>Update the ticket details and save to keep everyone informed.</p>
            </div>
            <Button variant="ghost" @click="goBack">Close</Button>
          </div>
          <TicketForm
            v-model="model"
            :loading="saving"
            title="Edit ticket"
            @submit="handleSubmit"
          >
            <template #submit>
              {{ saving ? 'Saving...' : 'Save changes' }}
            </template>
          </TicketForm>
        </Card>
      </div>
    </main>
  </div>
</template>

