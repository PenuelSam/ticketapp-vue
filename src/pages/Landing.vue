<script setup lang="ts">
import Nav from '../components/Nav.vue'
import Button from '../components/Button.vue'
import Card from '../components/Card.vue'
import circle1 from '../assets/circle1.svg'
import circle2 from '../assets/circle2.svg'
</script>

<template>
  <div>
    <Nav />
    <section class="hero">
      <div class="decorations">
        <img :src="circle1" alt="" class="circle-1" />
        <img :src="circle2" alt="" class="circle-2" />
      </div>
      <div class="container hero-content">
        <div>
          <h1>Customer support, elevated.</h1>
          <p>
            TicketApp Vue helps support teams capture, prioritize, and resolve customer requests with
            speed. Collaborate effortlessly and keep everyone in the loop.
          </p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <Button variant="primary" as="router-link" to="/auth/signup">Get started</Button>
            <Button variant="secondary" as="router-link" to="/auth/login">View demo</Button>
          </div>
        </div>
        <Card>
          <h3 style="margin-top: 0;">Designed for modern teams</h3>
          <ul style="margin: 1.25rem 0 0; padding-left: 1.25rem; color: var(--muted); line-height: 1.6;">
            <li>Visualize workload with live ticket counts.</li>
            <li>Share context-rich updates with your teammates.</li>
            <li>Stay focused with smart priorities and filters.</li>
          </ul>
        </Card>
      </div>
    </section>
    <section class="section" style="padding-top: 2rem;">
      <div class="container grid" style="gap: 2.5rem;">
        <div>
          <h2>Built to delight customers</h2>
          <p style="color: var(--muted); line-height: 1.6;">
            From the first response to final resolution, TicketApp Vue keeps service teams aligned. Automate
            the busywork so you can focus on empathy and expertise.
          </p>
        </div>
        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem;">
          <Card>
            <h3 style="margin-top: 0;">Frictionless onboarding</h3>
            <p style="color: var(--muted);">Start tracking tickets in minutes with an intuitive workspace.</p>
          </Card>
          <Card>
            <h3 style="margin-top: 0;">Insights that matter</h3>
            <p style="color: var(--muted);">Understand queue health and keep stakeholders informed.</p>
          </Card>
          <Card>
            <h3 style="margin-top: 0;">Team accountability</h3>
            <p style="color: var(--muted);">Assign owners, capture notes, and close the loop together.</p>
          </Card>
        </div>
      </div>
    </section>
    <footer>
      <div class="container">
        <p>© {{ new Date().getFullYear() }} TicketApp Vue. Built with Vue 3 + TypeScript.</p>
      </div>
    </footer>
  </div>
</template>
