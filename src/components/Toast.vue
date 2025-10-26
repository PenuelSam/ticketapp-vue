<script setup lang="ts">
import { useToast } from 'vue-toastification'

const toast = useToast()

const expose = defineExpose<{ toast: ReturnType<typeof useToast> }>()
expose({ toast })
</script>

<template>
  <slot :toast="toast" />
</template>
