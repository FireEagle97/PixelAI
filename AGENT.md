# AGENT.md — pixelAI

Read this file at the start of every new session before taking any action.

---

## Project Overview

**pixelAI** is a full-stack AI-powered image SaaS platform. Users upload images and apply AI transformations using Cloudinary's AI APIs. The app uses a credit-based economy: users start with 10 free credits, and each transformation costs 1 credit. Additional credits are purchased via Stripe.

### Five transformation types
| Key | Label | Cloudinary effect |
|-----|-------|-------------------|
| `restore` | Image Restore | `restore` |
| `fill` | Generative Fill | `generative-fill` |
| `remove` | Object Remove | `remove` prompt |
| `recolor` | Object Recolor | `recolor` prompt |
| `removeBackground` | Background Remove | `background-removal` |

All images are stored in the `pixelai` Cloudinary folder.

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js App Router | 14.2.5 |
| Language | TypeScript | 5 (`strict: true`) |
| Styling | Tailwind CSS + shadcn/ui | 3.4 |
| Auth | NextAuth v5 beta + PrismaAdapter | ^5.0.0-beta.20 |
| ORM | Prisma | 5.19 |
| Database | MongoDB | (via Prisma) |
| AI / Images | Cloudinary + next-cloudinary | latest |
| Payments | Stripe | 17 |
| Email | Resend | latest |
| Forms | React Hook Form + Zod | latest |
| UI primitives | Radix UI (via shadcn/ui) | latest |
| Icons | lucide-react, react-icons | latest |
| Toasts | Sonner | latest |

**Path alias**: `@/*` resolves to the project root (not `src/`). There is no `src/` directory.

---

## Folder Structure

```
pixelAI/
├── app/
│   ├── (auth)/              # Public auth pages (login, register, reset, verify)
│   ├── (protected)/         # Authenticated-only pages (transformations, profile, credits, admin)
│   │   └── transformations/
│   │       ├── add/[type]/  # Dynamic AI transformation form page
│   │       └── [id]/        # Image detail + update
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth handler
│   │   ├── webhooks/stripe/      # Stripe webhook — creates Transaction + updates credits
│   │   ├── admin/                # Admin-only endpoint
│   │   └── data/                 # Returns session data
│   ├── context/             # AuthProvider.tsx (currently commented out, unused)
│   ├── globals.css
│   ├── layout.tsx           # Root layout — wraps app with SessionProvider
│   └── page.tsx             # Home — image gallery (requires auth)
├── components/
│   ├── auth/                # Auth UI: LoginForm, RegisterForm, RoleGate, Social, etc.
│   ├── shared/              # App UI: TransformationForm, MediaUploader, Collection, Sidebar, etc.
│   └── ui/                  # shadcn/ui primitives (never edit directly)
├── constants/
│   └── index.ts             # navLinks, plans, transformationTypes, aspectRatioOptions, creditFee
├── data/                    # Server-side DB query helpers (no business logic)
│   └── user.ts              # getUserByEmail, getUserById, updateCredits
├── hooks/
│   ├── use-current-role.ts
│   ├── use-current-session.ts  # useCurrentUser() — client-side hook
│   └── use-toast.ts
├── lib/
│   ├── actions/             # All Server Actions (image, transaction, auth flows)
│   │   ├── image.actions.ts        # addImage, updateImage, deleteImage, getAllImages, getUserImages
│   │   └── transaction.action.ts   # checkoutCredits, createTransaction
│   ├── auth.ts              # currentUser(), currentRole() — server helpers
│   ├── db.ts                # Prisma singleton — THE only way to access the DB
│   ├── mail.ts              # Resend email helpers
│   ├── tokens.ts            # Auth token generation
│   └── utils.ts             # cn, handleError, dataUrl, formUrlQuery, debounce, download, deepMergeObjects
├── prisma/
│   └── schema.prisma        # MongoDB datasource + all models
├── schemas/
│   └── index.ts             # All Zod schemas (LoginSchema, RegisterSchema, etc.)
├── types/
│   └── index.d.ts           # Global TypeScript declarations
├── auth.config.ts           # NextAuth providers config (GitHub, Google, Credentials)
├── auth.ts                  # Full NextAuth config with PrismaAdapter + JWT/session callbacks
├── middleware.ts            # Route protection — runs on every request
├── routes.ts                # publicRoutes, authRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT
├── next.config.mjs          # Primary Next.js config (GitHub avatar remote patterns)
└── next.config.js           # Secondary config (Google + Cloudinary remote patterns)
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `auth.ts` | NextAuth full config; extends JWT/session with `role` and `creditBalance` |
| `auth.config.ts` | Provider definitions only (safe to use in Edge middleware) |
| `middleware.ts` | Protects all non-public routes; redirects unauthenticated users to `/login` |
| `routes.ts` | Defines which routes are public, auth-only, or API auth |
| `lib/db.ts` | Prisma singleton — only DB access point |
| `lib/utils.ts` | Shared utilities: `cn()`, `handleError()`, `debounce()`, `formUrlQuery()` |
| `constants/index.ts` | App-wide constants: nav, plans, transformation configs, credit cost |
| `prisma/schema.prisma` | MongoDB models: User, Image, Transaction, Account, Session, tokens |
| `lib/actions/image.actions.ts` | CRUD Server Actions for images; calls Cloudinary + Prisma |
| `lib/actions/transaction.action.ts` | Stripe checkout + transaction creation + credit update |
| `data/user.ts` | Low-level DB queries for user data; `updateCredits()` is the only way to modify credits |
| `schemas/index.ts` | All Zod validation schemas |
| `types/index.d.ts` | Global type declarations (TransformationTypeKey, Transformations, etc.) |
| `components/shared/TransformationForm.tsx` | Reference implementation for RHF + Zod forms in this project |

---

## Authentication & Authorization

- **NextAuth v5 beta** — JWT strategy, MongoDB via PrismaAdapter
- **Providers**: GitHub OAuth, Google OAuth, Credentials (email + bcrypt)
- **Roles**: `USER` (default) and `ADMIN` — stored on the `User` model, exposed via JWT
- **Server-side session**: `currentUser()` and `currentRole()` from `@/lib/auth.ts`
- **Client-side session**: `useCurrentUser()` from `@/hooks/use-current-session.ts`
- **Route protection**: `middleware.ts` handles redirects; `routes.ts` defines the route lists
- **Email verification** and **2FA** code exists but is commented out — do not remove it

---

## Database Models (Prisma + MongoDB)

| Model | Key fields |
|-------|-----------|
| `User` | `id`, `email`, `role` (USER/ADMIN), `creditBalance` (default 10), `planId` |
| `Image` | `title`, `transformationType`, `publicId`, `secureURL`, `config` (Json), `authorId` |
| `Transaction` | `stripeId`, `amount`, `plan`, `credits`, `buyerId` |
| `Account`, `Session` | NextAuth adapter — do not modify |
| `VerificationToken`, `PasswordResetToken`, `TwoFactorToken` | Auth support — do not modify |

---

## Credits System

- Each user starts with **10 credits** (set in `prisma/schema.prisma` default)
- Each AI transformation costs **1 credit** (`creditFee = -1` in `constants/index.ts`)
- Credits are deducted via `updateCredits()` in `data/user.ts`
- Credits are purchased via Stripe; three plans defined in `constants/index.ts`:
  - Free (10 credits)
  - Pro ($40 — 120 credits)
  - Premium ($199 — 2000 credits)
- Stripe webhook at `app/api/webhooks/stripe/route.ts` calls `createTransaction()` on success

---

## Development Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint (next/core-web-vitals)
npx prisma generate  # Regenerate Prisma client (runs automatically via postinstall)
npx prisma studio    # Open Prisma visual DB browser
```

---

## Required Environment Variables

```env
# App
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# MongoDB
MONGODB_URL=

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET_ID=
GOOGLE_ID=
GOOGLE_SECRET_ID=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Resend (email)
RESEND_API_KEY=
```

---

## AI Agent Instructions

### Always do
- Read this file (`AGENT.md`) at the start of every new session
- Use the `@/` path alias for all imports (maps to project root)
- Access the database only through `db` from `@/lib/db.ts`
- Use `handleError()` from `@/lib/utils.ts` inside all `catch` blocks
- Use `cn()` from `@/lib/utils` for all conditional Tailwind class merging
- Validate all user input with a Zod schema from `@/schemas/index.ts` before any DB write
- Keep Server Actions in `lib/actions/` and return `{ success: "..." }` or `{ error: "..." }`
- Use `currentUser()` / `currentRole()` from `@/lib/auth.ts` for server-side auth checks
- Write named exports for all components and utilities
- Follow Conventional Commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`

### Never do
- Never touch `.env`, `.env.local`, or any other `.env.*` file
- Never modify `auth.ts`, `middleware.ts`, or `routes.ts` without explicit user instruction
- Never bypass route protection — never add a route to `publicRoutes` without explicit instruction
- Never instantiate `PrismaClient` directly — always use `db` from `@/lib/db.ts`
- Never import or use the `mongoose` package — it is an unused dependency, Prisma handles all DB access
- Never mutate `creditBalance` directly on the `User` model — always call `updateCredits()` in `data/user.ts`
- Never throw raw errors from Server Actions to the client
- Never leave `console.log` statements in committed code
- Never use `any` as a TypeScript type — use `unknown` with type narrowing instead
- Never add secrets or API keys to source files

---

## Known Quirks & Issues

| Issue | Detail |
|-------|--------|
| Two `next.config` files | `next.config.mjs` (primary) and `next.config.js` coexist. `.mjs` takes precedence in Next.js 14; Google and Cloudinary remote image patterns from `.js` may be ignored. Consolidate when possible. |
| Unused dependencies | `mongoose` and `svix` are in `package.json` but never used. Do not introduce usages of either. |
| Credits route disabled | The `/credits` nav link is set to `""` in `constants/index.ts` and shows "(Soon)" — the page exists but the nav entry is intentionally hidden. |
| 2FA commented out | Two-factor authentication logic exists in `lib/actions/login.ts` and related files but is fully commented out. Do not delete this code. |
| `app/context/AuthProvider.tsx` | Entirely commented out — `SessionProvider` is in `app/layout.tsx` instead. |
