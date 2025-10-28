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
  (e: 'cancel'): void
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

watch(
  state,
  () => {
    emit('update:modelValue', { ...state })
  },
  { deep: true }
)

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
  <form class="form" @submit.prevent="handleSubmit" novalidate>
    <!-- TITLE -->
    <div class="field">
      <label for="title">Title</label>
      <input id="title" v-model="state.title" placeholder="Brief ticket summary" />
      <span v-if="errors.title" class="field-error">{{ errors.title }}</span>
    </div>

    <!-- DESCRIPTION -->
    <div class="field">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="state.description"
        placeholder="Describe the issue or request"
      />
      <span v-if="errors.description" class="field-error">{{ errors.description }}</span>
    </div>

    <!-- STATUS & PRIORITY -->
    <div class="form-row">
      <div class="field">
        <label for="status">Status</label>
        <select id="status" v-model="state.status">
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <span v-if="errors.status" class="field-error">{{ errors.status }}</span>
      </div>

      <div class="field">
        <label for="priority">Priority</label>
        <select id="priority" v-model="state.priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>

    <!-- ACTIONS -->
    <div class="form-actions">
      <Button type="button" variant="ghost" @click="$emit('cancel')">Cancel</Button>
      <Button type="submit" variant="primary">
        <slot name="submit">{{ props.loading ? 'Saving...' : 'Create Ticket' }}</slot>
      </Button>
    </div>
  </form>
</template>

<style scoped>

.form-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.form-row .field {
  flex: 1;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}

.field select {
  background: #f9fafb;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
}

.field select:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  background: #fff;
}
</style>
