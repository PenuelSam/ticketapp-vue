<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Nav from '../../components/Nav.vue'
import Card from '../../components/Card.vue'
import Button from '../../components/Button.vue'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const form = reactive({
  email: '',
  password: '',
  confirm: ''
})

const errors = reactive<{ email?: string; password?: string; confirm?: string }>({})
const loading = ref(false)

function validate() {
  errors.email = !form.email.trim() ? 'Email required' : undefined
  errors.password = !form.password ? 'Password required' : undefined
  errors.confirm = form.password !== form.confirm ? 'Passwords must match' : undefined
  return !errors.email && !errors.password && !errors.confirm
}

async function onSubmit() {
  if (!validate()) return
  loading.value = true
  try {
    const session = {
      token: crypto.randomUUID(),
      user: { email: form.email.trim() },
      exp: Date.now() + 3600_000
    }
    localStorage.setItem('ticketapp_session', JSON.stringify(session))
    toast.success('Account created')
    router.push('/dashboard')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="layout">
    <Nav />
    <main class="layout-main auth-main">
      <div class="container auth-container">
        <Card>
          <h1 class="auth-title">Create your workspace</h1>
          <p class="auth-subtitle">Sign up to start tracking support tickets.</p>

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
                placeholder="Create a password"
                autocomplete="new-password"
              />
              <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
            </div>

            <div class="field">
              <label for="confirm">Confirm password</label>
              <input
                id="confirm"
                type="password"
                v-model="form.confirm"
                placeholder="Repeat your password"
                autocomplete="new-password"
              />
              <span v-if="errors.confirm" class="field-error">{{ errors.confirm }}</span>
            </div>

            <Button type="submit" variant="primary" fullWidth :disabled="loading">
              {{ loading ? 'Creating account...' : 'Create account' }}
            </Button>
          </form>

          <p class="auth-footer">
            Already have an account?
            <RouterLink to="/auth/login">Log in</RouterLink>
          </p>
        </Card>
      </div>
    </main>
  </div>
</template>

