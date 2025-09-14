# HealthTrack Frontend

Fully functional, responsive React + Tailwind frontend matching the provided UI designs, with clear placeholders for backend integration.

## Setup

1. Install dependencies:
   - `npm install`
2. Start dev server:
   - `npm start`

## Folder Structure

```
src/
  components/      reusable UI (Navbar, Footer, ui.jsx)
  pages/           routed pages (Home, About, Search, HospitalDetails, Login, Signup, Contact, ProfileSettings, Dashboard)
  hooks/           useAuth, useUser, useTracker, apiClient (mock)
  context/         AuthContext provider
  mock/            mock data JSON
  index.js, index.css, App.js
```

## Backend Integration Guide

- All API access flows through hooks in `src/hooks/`.
- Replace mock functions with real endpoints:
  - `useAuth.js`
    - Replace login/signup calls with `POST /api/login` and `POST /api/signup`.
  - `useUser.js`
    - Replace `fetchUser()` with real `GET /api/user`.
    - Replace `updateUser()` with `PUT /api/user`.
  - `useTracker.js`
    - Replace `listHospitals()` with `GET /api/hospitals`.
    - Replace `getHospitalById(id)` with `GET /api/hospitals/:id`.
- `apiClient.js` shows a commented example of swapping to Axios:
  - Example: Replace `mockGet('/user')` with `api.get('/user')` and return the data.

## Forms and Validation

- Forms use `react-hook-form` with basic required/min-length validation.
- Submit handlers contain `// TODO` comments indicating exact endpoints to wire.

## Responsiveness

- Tailwind responsive classes (`sm: md: lg: xl:`) are used across pages.
- Assumptions: standard container width at `max-w-7xl`, cards use `shadow-card`, buttons use `primary` brand color `#17B2E5` to match designs.

## Notes

- All data currently comes from `src/mock/data.json` via hooks. Replace with real APIs when ready.
