import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export function useAuth() {
  const router = useRouter()
  const toast = useToast()

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem('ticketapp_session') || 'null')
    } catch (error) {
      console.warn('Failed to parse session', error)
      return null
    }
  }

  function isAuthenticated() {
    const session = getSession()
    return Boolean(session && (!session.exp || Date.now() < session.exp))
  }

  function login(email: string, password: string) {
    if (!email || !password) {
      throw {
        email: !email ? 'Email required' : undefined,
        password: !password ? 'Password required' : undefined
      }
    }

    const session = {
      token: crypto.randomUUID(),
      user: { email },
      exp: Date.now() + 3600_000
    }

    localStorage.setItem('ticketapp_session', JSON.stringify(session))
    toast.success('Login successful')
    router.push('/dashboard')
  }

  function logout() {
    localStorage.removeItem('ticketapp_session')
    router.push('/')
  }

  return { login, logout, getSession, isAuthenticated }
}
