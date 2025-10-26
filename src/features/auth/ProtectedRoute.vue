<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from './useAuth'

const props = withDefaults(defineProps<{ redirect?: string }>(), {
  redirect: '/auth/login'
})

const router = useRouter()
const { isAuthenticated } = useAuth()
const authed = computed(() => isAuthenticated())

watchEffect(() => {
  if (!authed.value) {
    localStorage.removeItem('ticketapp_session')
    router.replace(props.redirect)
  }
})
</script>

<template>
  <slot v-if="authed" />
</template>
