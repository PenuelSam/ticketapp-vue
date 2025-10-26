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
  <div class="layout">
    <Nav />
    <main class="layout-main auth-main">
      <div class="container auth-container">
        <Card>
          <h1 class="auth-title">Welcome back</h1>
          <p class="auth-subtitle">Log in to continue managing your tickets.</p>

          <form class="form" @submit.prevent="onSubmit" novalidate>
            <div class="field">
              <label for="email">Email</label>
              <input
                id="email"
                type="email"
                v-model="form.email"
                placeholder="you@example.com"
                autocomplete="email"
              />
              <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
            </div>

            <div class="field">
              <label for="password">Password</label>
              <input
                id="password"
                type="password"
                v-model="form.password"
                placeholder="••••••"
                autocomplete="current-password"
              />
              <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
            </div>

            <Button type="submit" variant="primary" fullWidth :disabled="loading">
              {{ loading ? 'Signing in...' : 'Log In' }}
            </Button>
          </form>

          <p class="auth-footer">
            Need an account?
            <RouterLink to="/auth/signup">Sign up</RouterLink>
          </p>
        </Card>
      </div>
    </main>
  </div>
</template>

