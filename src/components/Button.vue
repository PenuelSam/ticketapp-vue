<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import classNames from 'classnames'

type Variant = 'primary' | 'secondary' | 'ghost'

const props = defineProps<{ variant?: Variant; as?: string }>()

const attrs = useAttrs()
const element = computed(() => props.as ?? 'button')

const classes = computed(() =>
  classNames('btn', {
    'btn-primary': props.variant === 'primary' || !props.variant,
    'btn-secondary': props.variant === 'secondary',
    'btn-ghost': props.variant === 'ghost'
  })
)
</script>

<template>
  <component :is="element" v-bind="attrs" :class="classes">
    <slot />
  </component>
</template>
