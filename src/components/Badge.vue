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
.badge {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
}
.badge-open {
  background: #81c7843b;
  color: #81c784;
}
.badge-progress {
  background: #ffc10733;
  color: #ffc107;
}
.badge-closed {
  background: #9e9e9e27;
  color: #9e9e9e;
}
</style>
