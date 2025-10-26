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

export const useTickets = defineStore('tickets', {
  state: () => ({
    tickets: JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]') as Ticket[]
  }),
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
      this.tickets.push(ticket)
      localStorage.setItem('ticketapp_tickets', JSON.stringify(this.tickets))
    },
    update(id: string, input: TicketInput) {
      const errors = validateTicket(input)
      if (Object.keys(errors).length) throw errors
      this.tickets = this.tickets.map((t) =>
        t.id === id
          ? {
              ...t,
              ...input,
              updatedAt: new Date().toISOString()
            }
          : t
      )
      localStorage.setItem('ticketapp_tickets', JSON.stringify(this.tickets))
    },
    remove(id: string) {
      if (!confirm('Delete this ticket?')) return
      this.tickets = this.tickets.filter((t) => t.id !== id)
      localStorage.setItem('ticketapp_tickets', JSON.stringify(this.tickets))
    }
  }
})
