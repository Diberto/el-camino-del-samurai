# El Camino Del Samurai: Strapi Headless CMS Integration Spec

## Overview
This specification documents the Strapi v4/v5 adapter integration for the Blog CMS, media upload engine, settings manager, and provider switcher within the `DatabaseService` architecture.

---

## 1. Strapi Adapter Specifications (`StrapiAdapter`)

### 1.1 Class Signature & Endpoint Mapping
- File: `src/services/adapters/strapi-adapter.js`
- Default API Base URL: `http://localhost:1337` (configurable via `localStorage.getItem('strapi_base_url')`).

| Action | HTTP Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| Auth Login | `POST` | `/api/auth/local` | Authenticates with `identifier` and `password`, storing `jwt` token. |
| Get Posts | `GET` | `/api/posts?populate=*&sort=createdAt:desc` | Retrieves blog posts array formatted for the public site. |
| Save Post (Create) | `POST` | `/api/posts` | Body: `{ data: { title, slug, excerpt, content, status } }`. |
| Save Post (Update) | `PUT` | `/api/posts/:id` | Body: `{ data: { title, excerpt, content, status } }`. |
| Delete Post | `DELETE` | `/api/posts/:id` | Removes target post record. |
| Upload Media | `POST` | `/api/upload` | Multipart FormData with converted `.webp` file. |
| Get Settings | `GET` | `/api/settings` | Retrieves global site settings & section toggles. |
| Save Settings | `POST`/`PUT` | `/api/settings` | Updates site settings schema. |

---

## 2. Dynamic Provider Switcher Component

### 2.1 UI Placement
- Integrated into the Admin Sidebar ([admin.html](file:///d:/Documentos/Work/hummus/samurai/el-camino-del-samurai/admin.html)).
- Allows selecting between:
  - **PocketBase (Default)**
  - **Strapi CMS**
  - **SQLite Local (Emulator)**

---

## 3. Verification & Build Plan

1. **Vite Production Build**: Execute `cmd.exe /c "npm run build"` to verify module resolution and compilation of `strapi-adapter.js`.
2. **Provider Switcher Functional Test**: Confirm switching to `strapi` instantiates `StrapiAdapter` seamlessly in `DatabaseService`.
