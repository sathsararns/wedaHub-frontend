# WedaHub Frontend

React 19 + Vite single-page app. Customer, provider, and admin interfaces for
browsing services, booking (form or AI chat), tracking bookings, and reviews.

## Prerequisites

- Node.js 18+
- Backend running at `http://localhost:3000` (see [backend/README.md](../backend/README.md))

## Setup

```bash
npm install
```

Create a `.env` file in this directory:

```env
VITE_API_URL=http://localhost:3000/api

VITE_CLOUDINARY_CLOUD_NAME=<your-cloud-name>
VITE_CLOUDINARY_UPLOAD_PRESET=<your-upload-preset>
VITE_GEOAPIFY_KEY=<your-geoapify-key>
```

`VITE_API_URL` must point at the backend. Cloudinary is used for image uploads,
Geoapify for location autocomplete.

## Run

```bash
npm run dev      # Vite dev server, normally http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # eslint
```

Keep port `5173` — both backends allowlist exactly that origin in CORS.

## Test

```bash
npm test         # node --test tests/*.test.js
```

## Key pages & flows

| Page | Notes |
|---|---|
| Home / Services / Providers | Browse and search providers |
| Booking (`BookingPage.jsx`) | Classic form booking |
| AI Chat (`AIChatPage.jsx`, `services/aiChatService.js`) | Conversational booking via `POST /api/ai/chat` |
| My Bookings (`MyBookingsPage.jsx`) | Customer booking tracking |
| Provider Dashboard / Bookings / Profile | Provider-side management |
| Admin (`pages/admin`) | User/provider management |
| Auth (`loginPage.jsx`, `Signup.jsx`) | JWT stored client-side, sent as bearer |

Route guards live in `routes/ProtectedRoute.jsx`; API calls in `services/`.

## Project structure

```text
frontend/src/
  main.jsx / App.jsx / App.css / index.css
  routes/        AppRoutes, ProtectedRoute
  pages/         One file per screen (Home, Booking, AIChat, Profile, admin, auth, …)
  components/    Shared UI
  context/ / hooks/
  services/      One axios module per backend resource (auth, booking, aiChat, review, …)
  layouts/ / constants/ / lib/ / Utils/ / assets/
```

## Troubleshooting

- Blank data / network errors — backend down or wrong `VITE_API_URL`.
- CORS errors — frontend must be served from `http://localhost:5173`.
- Map autocomplete broken — check `VITE_GEOAPIFY_KEY`.
- Image upload fails — check Cloudinary `VITE_` variables.
