<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  as: {
    type: String,
    default: 'button' // can be 'RouterLink', 'a', etc.
  },
  to: {
    type: [String, Object],
    default: undefined
  },
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary' // primary | secondary | ghost
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const classes = computed(() => [
  'button',
  `button-${props.variant}`,
  { 'button-full': props.fullWidth }
])
</script>

<template>
  <component
    :is="as === 'RouterLink' ? RouterLink : as"
    :to="to"
    :type="as === 'button' ? type : undefined"
    :disabled="disabled"
    :class="classes"
  >
    <slot />
  </component>
</template>

<style scoped>
.button-full {
  width: 100%;
}
.button-ghost {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-strong);
}
.button-ghost:hover {
  background: var(--brand-soft);
  color: var(--brand);
}
</style>
