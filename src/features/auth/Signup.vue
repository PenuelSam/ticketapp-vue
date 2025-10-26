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
  <div>
    <Nav />
    <section class="section">
      <div class="container" style="max-width: 480px;">
        <Card>
          <h2>Create your account</h2>
          <form class="grid" style="gap: 1.5rem;" @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" v-model="form.email" type="email" placeholder="you@example.com" autocomplete="email" />
              <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" v-model="form.password" type="password" autocomplete="new-password" />
              <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
            </div>
            <div class="form-group">
              <label for="confirm">Confirm password</label>
              <input id="confirm" v-model="form.confirm" type="password" autocomplete="new-password" />
              <span v-if="errors.confirm" class="form-error">{{ errors.confirm }}</span>
            </div>
            <Button type="submit" :disabled="loading" :aria-busy="loading">
              {{ loading ? 'Creating account...' : 'Sign Up' }}
            </Button>
            <p style="margin: 0; color: var(--muted);">
              Already registered?
              <RouterLink to="/auth/login">Login</RouterLink>
            </p>
          </form>
        </Card>
      </div>
    </section>
  </div>
</template>
