<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import Nav from '../../components/Nav.vue'
import Card from '../../components/Card.vue'
import Button from '../../components/Button.vue'
import { useAuth } from './useAuth'

const { login } = useAuth()
const route = useRoute()

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive<{ email?: string; password?: string }>({})
const general = ref('')
const loading = ref(false)

async function onSubmit() {
  general.value = ''
  errors.email = undefined
  errors.password = undefined
  loading.value = true
  try {
    await login(form.email.trim(), form.password)
  } catch (err) {
    const e = err as Record<string, string | undefined>
    if (e.email) errors.email = e.email
    if (e.password) errors.password = e.password
    if (!e.email && !e.password) {
      general.value = 'Unable to login with provided credentials.'
    }
  } finally {
    loading.value = false
  }
}

const reason = route.query.reason as string | undefined
const showExpired = reason === 'expired'
</script>

<template>
  <div>
    <Nav />
    <section class="section">
      <div class="container" style="max-width: 480px;">
        <Card>
          <h2>Welcome back</h2>
          <p v-if="showExpired" class="form-error">Your session expired. Please login again.</p>
          <p v-if="general" class="form-error">{{ general }}</p>
          <form class="grid" style="gap: 1.5rem;" @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" v-model="form.email" type="email" placeholder="you@example.com" autocomplete="email" />
              <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" v-model="form.password" type="password" placeholder="••••••••" autocomplete="current-password" />
              <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
            </div>
            <Button type="submit" :disabled="loading" :aria-busy="loading">
              {{ loading ? 'Signing in...' : 'Login' }}
            </Button>
            <p style="margin: 0; color: var(--muted);">
              Need an account?
              <RouterLink to="/auth/signup">Create one</RouterLink>
            </p>
          </form>
        </Card>
      </div>
    </section>
  </div>
</template>
