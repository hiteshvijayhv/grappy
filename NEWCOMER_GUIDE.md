# Grappy Newcomer Guide

## What this project is
Grappy is a React single-page application (SPA) that works like a lightweight Linktree clone. Users can register/login, maintain a profile image plus a list of links, and share public profile pages.

## High-level structure
- `src/index.js`: app entry point and ReactDOM render.
- `src/App.js`: router table defining all page routes.
- `src/components/*`: feature pages and shared UI (`Nav`).
- `*.css` files alongside components: component-scoped styling.

## Routing map
Routes are declared in `src/App.js`:
- `/` → `Home`
- `/register` → `Register`
- `/login` → `Login`
- `/:username/view` → public/share-like links page (`LinksPage`)
- `/:username/edit` → editor for links/profile (`Edit`)
- `/:username` → profile view (`Profile`)

## Data flow and external services
The frontend talks directly to a hosted API (`gosharee.herokuapp.com`) with `axios`.
- Register: POST `/register`
- Login: POST `/login`
- Read profile/links: GET `/:username`
- Save links/profile: POST `/:username`

Authentication state is kept in cookies (`jwttoken`, `username`) using `universal-cookie` and read by components to decide whether to show logged-in UI and which user routes to navigate to.

## Important components
- `Nav`: top bar + login/logout/edit/profile actions.
- `Home`: landing page and top-level logged-in detection.
- `Register` / `Login`: auth forms.
- `LinksPage`: shared/public links display.
- `Profile`: alternative public profile display variant.
- `Edit`: add/delete/edit links and upload profile image (`react-file-base64`).

## Things to know before changing code
1. API base URL usage is inconsistent (`http` in some files, `https` in others). Standardize this before larger refactors.
2. Auth checks are cookie-based and repeated in multiple components; consider centralizing into a shared auth hook/context.
3. Some files include unused imports/state, and the default CRA test no longer matches app UI.
4. Component logic and data-access are currently coupled; extracting an API client module will simplify testing and maintenance.

## Good next learning tasks
1. Create an `api.js` helper with one base URL and typed request helpers.
2. Add route guards for `/:username/edit` to avoid unauthorized editing states.
3. Replace default CRA test with meaningful tests for routing, login flow, and link rendering.
4. Add error/loading states for API requests in `Login`, `Register`, `Edit`, and profile pages.
5. Document backend contract (request/response shapes) in this repo for easier onboarding.
