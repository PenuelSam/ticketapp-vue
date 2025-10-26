<script setup lang="ts">
import { computed } from 'vue'
import classNames from 'classnames'

const props = defineProps<{ status: 'open' | 'in_progress' | 'closed' }>()

const label = computed(() => {
  if (props.status === 'open') return 'Open'
  if (props.status === 'in_progress') return 'In Progress'
  return 'Closed'
})

const classes = computed(() =>
  classNames('badge', {
    'badge-open': props.status === 'open',
    'badge-progress': props.status === 'in_progress',
    'badge-closed': props.status === 'closed'
  })
)
</script>

<template>
  <span :class="classes">{{ label }}</span>
</template>

<style scoped>
.badge-open {
  background: rgba(34, 197, 94, 0.15);
  color: var(--status-open);
}

.badge-progress {
  background: rgba(245, 158, 11, 0.15);
  color: var(--status-progress);
}

.badge-closed {
  background: rgba(156, 163, 175, 0.2);
  color: var(--status-closed);
}
</style>
