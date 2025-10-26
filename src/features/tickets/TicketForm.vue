<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import Button from '../../components/Button.vue'
import Card from '../../components/Card.vue'
import { validateTicket } from '../../lib/validate'
import type { TicketInput } from './store'

const props = withDefaults(
  defineProps<{
    modelValue: TicketInput
    loading?: boolean
    title?: string
  }>(),
  {
    loading: false,
    title: ''
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: TicketInput): void
  (e: 'submit'): void
}>()

const state = reactive({
  title: props.modelValue.title,
  description: props.modelValue.description,
  status: props.modelValue.status,
  priority: props.modelValue.priority
})

const errors = reactive<Record<string, string | undefined>>({})

watch(
  () => props.modelValue,
  (value) => {
    state.title = value.title
    state.description = value.description
    state.status = value.status
    state.priority = value.priority
  },
  { deep: true }
)

watch(state, () => {
  emit('update:modelValue', { ...state })
}, { deep: true })

function validate() {
  Object.assign(errors, { title: undefined, status: undefined, description: undefined })
  const result = validateTicket(state)
  Object.assign(errors, result)
  return Object.keys(result).length === 0
}

function handleSubmit() {
  if (!validate()) return
  emit('submit')
}

const heading = computed(() => props.title || 'Ticket')
</script>

<template>
  <Card>
    <form class="grid" style="gap: 1.5rem;" @submit.prevent="handleSubmit">
      <header>
        <h3 style="margin: 0 0 0.5rem;">{{ heading }}</h3>
        <p style="margin: 0; color: var(--muted);">Update the ticket details below.</p>
      </header>
      <div class="form-group">
        <label for="ticket-title">Title</label>
        <input id="ticket-title" v-model="state.title" placeholder="Ticket subject" />
        <span v-if="errors.title" class="form-error">{{ errors.title }}</span>
      </div>
      <div class="form-group">
        <label for="ticket-description">Description</label>
        <textarea id="ticket-description" v-model="state.description" placeholder="Describe the issue" />
        <span v-if="errors.description" class="form-error">{{ errors.description }}</span>
      </div>
      <div class="grid" style="gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
        <div class="form-group">
          <label for="ticket-status">Status</label>
          <select id="ticket-status" v-model="state.status">
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <span v-if="errors.status" class="form-error">{{ errors.status }}</span>
        </div>
        <div class="form-group">
          <label for="ticket-priority">Priority</label>
          <select id="ticket-priority" v-model="state.priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <Button type="submit" :disabled="props.loading" :aria-busy="props.loading">
        <slot name="submit">{{ props.loading ? 'Saving...' : 'Save Ticket' }}</slot>
      </Button>
    </form>
  </Card>
</template>
