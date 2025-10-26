import { defineStore } from 'pinia'
import { validateTicket } from '../../lib/validate'

export interface TicketInput {
  title: string
  description: string
  status: 'open' | 'in_progress' | 'closed'
  priority: 'low' | 'medium' | 'high'
}

export interface Ticket extends TicketInput {
  id: string
  createdAt: string
  updatedAt: string
}

// Load and save helpers
function loadTickets(): Ticket[] {
  try {
    const raw = localStorage.getItem('ticketapp_tickets')
    const data = raw ? JSON.parse(raw) : []
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function saveTickets(tickets: Ticket[]) {
  localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets))
}

export const useTickets = defineStore('tickets', {
  // Always return a fresh array instance (prevents stale reactive state)
  state: () => ({
    tickets: loadTickets() as Ticket[]
  }),

  getters: {
    all: (state) => state.tickets,
    open: (state) => state.tickets.filter((t) => t.status === 'open'),
    closed: (state) => state.tickets.filter((t) => t.status === 'closed')
  },

  actions: {
    create(input: TicketInput) {
      const errors = validateTicket(input)
      if (Object.keys(errors).length) throw errors

      const now = new Date().toISOString()
      const ticket: Ticket = {
        id: crypto.randomUUID(),
        ...input,
        createdAt: now,
        updatedAt: now
      }

      // ✅ Create a brand-new array each time (no .push)
      const updated = [...(this.tickets ?? []), ticket]
      this.tickets = updated
      saveTickets(updated)
    },

    update(id: string, input: TicketInput) {
      const errors = validateTicket(input)
      if (Object.keys(errors).length) throw errors

      const updated = (this.tickets ?? []).map((t) =>
        t.id === id
          ? { ...t, ...input, updatedAt: new Date().toISOString() }
          : t
      )

      this.tickets = updated
      saveTickets(updated)
    },

    remove(id: string) {
      if (!confirm('Delete this ticket?')) return
      const updated = (this.tickets ?? []).filter((t) => t.id !== id)
      this.tickets = updated
      saveTickets(updated)
    },

    reset() {
      this.tickets = []
      saveTickets([])
    }
  }
})
