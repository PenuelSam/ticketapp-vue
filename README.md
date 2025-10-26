# TicketApp Vue

TicketApp Vue is a Vue 3 + TypeScript single-page application that mirrors the original TicketApp React
experience. It offers authentication scaffolding, ticket CRUD powered by Pinia, and a polished design
system so customer support teams can manage work effortlessly.

## Overview

- LocalStorage-backed authentication and ticket persistence for instant demos.
- Hero landing page, dashboard metrics, ticket list, and ticket detail editor.
- Shared design system with responsive layouts and accessible form controls.
- Toast notifications for key interactions and confirmations.

## Libraries Used

- [Vue 3](https://vuejs.org/) with the Composition API
- [Vite](https://vitejs.dev/) for lightning-fast dev and builds
- [Vue Router](https://router.vuejs.org/) for routing
- [Pinia](https://pinia.vuejs.org/) for ticket state management
- [Vue Toastification](https://github.com/Maronato/vue-toastification) for alerts
- [classnames](https://github.com/JedWatson/classnames) for conditional styling
- TypeScript for type safety end-to-end

## Setup

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`. The project stores data in `localStorage`, so clearing your
browser storage resets the workspace.

## Routes

| Path | Description |
| --- | --- |
| `/` | Marketing landing page with hero and feature highlights |
| `/auth/login` | Simulated login form |
| `/auth/signup` | Simulated signup with confirm password |
| `/dashboard` | Auth-protected overview with ticket metrics |
| `/tickets` | Ticket list with create/delete controls |
| `/tickets/:id` | Ticket editor for existing items |

## Example Credentials

Authentication accepts any email/password combination. Use something like `agent@example.com` / `secret` to
get started quickly.

## Accessibility & Design Notes

- Semantic HTML, labels, and described errors to aid screen reader workflows.
- High-contrast badge and button variants mapped to status tokens.
- Responsive grid utilities scale from single-column mobile to multi-column desktop.
- Keyboard-friendly navigation through buttons and links with visible focus states inherited from the
  browser.

## Known Issues

- Because authentication is simulated, sessions are cleared on browser storage deletion.
- Toast notifications rely on the browser; disable popup blockers if messages do not appear.
- `npm install` requires network access to the npm registry.
