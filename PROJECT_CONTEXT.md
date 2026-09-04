# ✈️ PROJECT_CONTEXT.md: Complete System & Architecture Specification

> **Target Audience**: AI Coding Assistants, Senior Software Engineers, and Technical Reviewers.  
> **Purpose**: Single-source-of-truth document enabling any agent or developer to understand, maintain, debug, and extend the entire codebase without prior repository exploration.

---

## 1. Executive Summary & Philosophy

- **Project Name**: Paperplane (formerly *Plan Your Date*)
- **Codebase Identity**: `paperplane`
- **Core Concept**: A personal, story-driven, interactive digital letter application disguised as modern software. It allows a **Creator** to author an intentional date invitation or micro-event, producing a cryptographic single-use link for a **Recipient**.
- **UX Philosophy**:
  - **Not a CRUD/Admin app**: Prioritizes emotional resonance, tactile delight, and digital intimacy over dashboard complexity.
  - **Asymmetrical Interaction**: Creator drafts the itinerary upfront. Recipient experiences an unfolding narrative (Greeting ➔ Interactive Question ➔ Celebration ➔ Envelope Reveal ➔ Itinerary Details) and can either accept or submit polite recalibrations.
  - **Design Style**: **Soft-Neobrutalism** (tactile `2px border-ink` boundaries, zero-blur solid drop shadows, warm sunset radial gradients with buttery yellow center and blushing rose edges).

---

## 2. Complete File Tree & Module Architecture

```plaintext
planyourdate/ (Repository: Paperplane)
├── app/
│   ├── api/
│   │   └── invitations/
│   │       ├── route.ts                     # POST: Validates input, generates token, inserts invitation + itinerary
│   │       └── [token]/
│   │           ├── route.ts                 # GET: Fetches invitation details by token
│   │           ├── accept/
│   │           │   └── route.ts             # POST: Updates status to ACCEPTED, awaits Resend email dispatch
│   │           └── suggest/
│   │               └── route.ts             # POST: Creates recipient suggestion record, awaits Resend email dispatch
│   ├── create/
│   │   └── page.tsx                         # Creator interface for authoring invitations
│   ├── i/
│   │   ├── [token]/
│   │   │   ├── page.tsx                     # Server-rendered dynamic invitation entry point
│   │   │   ├── not-found.tsx                # Custom 404 handler for invalid tokens
│   │   │   ├── status/
│   │   │   │   └── page.tsx                 # Creator live tracking dashboard (status, accepted timestamp, suggestions)
│   │   │   └── suggest/
│   │   │       └── page.tsx                 # Recipient suggestion submission page
│   │   └── demo/
│   │       ├── page.tsx                     # Static sandbox invitation experience (bypasses DB)
│   │       └── suggest/
│   │           └── page.tsx                 # Static sandbox suggestion form
│   ├── globals.css                          # Global CSS, Tailwind directives, radial sunset gradients
│   ├── layout.tsx                           # Root HTML layout, font setup, meta tags
│   └── page.tsx                             # Landing page with Neobrutalist CTAs ("View demo", "Create plan")
├── features/
│   └── invitation/
│       ├── components/
│       │   ├── motion/
│       │   │   ├── BreathingButton.tsx      # Idle breathing loop wrapper (scale 1 -> 1.03 -> 1) for primary CTAs
│       │   │   ├── HeartTrailLayer.tsx      # Fixed z-50 pointerdown particle layer spawning floating hearts (cap 12)
│       │   │   ├── InCardMotes.tsx          # Drifting ambient hearts/sparkles behind card content (opacity 0.15-0.3)
│       │   │   ├── PaperplaneMascot.tsx     # Protagonist mascot: choreographed scene transitions & envelope takeoff
│       │   │   ├── useTilt.ts               # Spring physics 3D tilt hook (±4deg) disabled on touch & reduced motion
│       │   │   └── WordReveal.tsx           # Word-by-word handwritten text reveal with ink blur simulation


│       │   ├── AmbientSky.tsx               # Living sky background reactive to scene states (Golden Hour, Sunset, Twilight)
│       │   ├── CelebrationScene.tsx         # Scene 3: Wax seal heart stamp & joyful acceptance feedback
│       │   ├── CreateInvitationForm.tsx     # Form for authoring dates & dynamic itinerary rows
│       │   ├── DatePlanScene.tsx            # Scene 5: Flight path timeline, pinned polaroids, & handwriting annotations
│       │   ├── EnvelopeScene.tsx            # Scene 4: 3D folding craft envelope with warm inner glow emission
│       │   ├── GreetingScene.tsx            # Scene 1: Folded letter notebook page with washi tape & spring physics
│       │   ├── InvitationExperience.tsx     # State machine coordinator managing scene transitions with Framer Motion
│       │   ├── QuestionScene.tsx            # Scene 2: Polaroid frame, vintage stamp Yes button, & shy handwritten No button
│       │   └── SuggestForm.tsx              # Category checkboxes & feedback textarea with scrapbook tokens
│       ├── demo-data.ts                     # Static mock invitation payload used for sandboxing
│       └── types.ts                         # Shared TypeScript domain contracts
├── lib/
│   ├── generated/prisma/                    # Auto-generated Prisma client output
│   ├── invitations.ts                       # Domain transforms (toInvitationPayload, defaultIntro generator)
│   ├── notifications.ts                     # Resend REST API integration via native fetch
│   ├── prisma.ts                            # Singleton Prisma Client with @prisma/adapter-neon serverless adapter
│   └── tokens.ts                            # Cryptographic base64url token generator (crypto.randomBytes)
├── prisma/
│   ├── migrations/                          # SQL migration history
│   ├── schema.prisma                        # PostgreSQL schema definition
│   └── seed.ts                              # Database seed script
├── public/                                  # Static media & favicon assets
├── package.json                             # Dependencies, build scripts ("prisma generate && prisma migrate deploy && next build")
├── postcss.config.js                        # PostCSS configuration
├── prisma.config.ts                         # Prisma CLI configuration for direct migrations (DIRECT_URL)
├── tailwind.config.ts                       # Custom design tokens, colors (cream, linen, roseSoft, roseDeep, ink), & brutal shadows
├── tsconfig.json                            # TypeScript configuration with path aliases (@/*)
└── vercel.json                              # Vercel deployment settings
```

---

## 3. Technology Stack & Runtime Matrix

| Layer | Component | Implementation Notes |
| :--- | :--- | :--- |
| **Framework** | Next.js 14+ (App Router) | Uses Server Components for data pre-fetching and Client Components for Framer Motion |
| **Language** | TypeScript | Full strictness enabled, end-to-end typed payloads |
| **Styling** | Tailwind CSS (Vanilla) | Customized with Soft-Neobrutalist color tokens and solid box shadows |
| **Animations** | Framer Motion | Scene transitions using `AnimatePresence`, blur reveals, and kinetic scaling |
| **Database** | Neon PostgreSQL | Serverless Postgres utilizing pooled connections for query execution |
| **ORM** | Prisma v7+ | Custom output in `lib/generated/prisma` configured with `@prisma/adapter-neon` |
| **Notifications** | Resend API | Integrated via native `fetch` in `lib/notifications.ts` (zero heavy external SDK overhead) |
| **Hosting** | Vercel Serverless | Auto-executes migrations on build: `prisma generate && prisma migrate deploy && next build` |

---

## 4. Database Schema Specification (`prisma/schema.prisma`)

```prisma
datasource db {
  provider = "postgresql"
}

generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}

enum InvitationStatus {
  PENDING
  ACCEPTED
}

model Invitation {
  id              String           @id @default(cuid())
  token           String           @unique               // 10-char base64url slug
  receiverName    String
  greeting        String
  intro           String
  question        String
  date            String
  time            String
  locationName    String
  locationAddress String
  mapsUrl         String?
  dressCode       String?
  budgetNote      String?
  personalMessage String?
  status          InvitationStatus @default(PENDING)     // Transitions from PENDING -> ACCEPTED
  createdAt       DateTime         @default(now())
  acceptedAt      DateTime?
  itinerary       ItineraryItem[]
  suggestions     Suggestion[]
}

model ItineraryItem {
  id           String     @id @default(cuid())
  invitationId String
  invitation   Invitation @relation(fields: [invitationId], references: [id], onDelete: Cascade)
  sortOrder    Int
  time         String
  title        String
  description  String
}

model Suggestion {
  id           String     @id @default(cuid())
  invitationId String
  invitation   Invitation @relation(fields: [invitationId], references: [id], onDelete: Cascade)
  categories   String[]   // e.g. ["Tanggal", "Jam", "Tempat", "Aktivitas", "Lainnya"]
  note         String
  createdAt    DateTime   @default(now())
}
```

---

## 5. Core Application Flows & State Machine

### Flow A: Creator Flow (Authoring & Monitoring)
1. **Creation (`/create`)**:
   - Creator fills `CreateInvitationForm.tsx` (receiver name, greeting, date/time, location, personal note, and dynamic itinerary items).
   - Submit dispatches `POST /api/invitations`.
   - Server returns `{ url: "/i/[token]" }`.
   - Creator receives a shareable link (`/i/[token]`) and a tracking link (`/i/[token]/status`).
2. **Status Monitoring (`/i/[token]/status`)**:
   - Server Component reads directly via `prisma.invitation.findUnique`.
   - Displays real-time acceptance state (`PENDING` vs `ACCEPTED` with timestamp).
   - Renders chronological list of recipient suggestions with highlighted category badges.
   - Includes full mock fallback for `token === 'demo'`.

### Flow B: Recipient Flow (`/i/[token]` ➔ `InvitationExperience.tsx`)
Managed by a strict linear scene state machine: `InvitationScene = 'greeting' | 'question' | 'celebration' | 'envelope' | 'plan'`.

```
[greeting]  ──(Click "Open")──>  [question]  ──(Click "Yes")──>  [celebration]
                                                                        │
                                                                   (1800ms timer)
                                                                        ▼
[plan]  <──(Click Envelope)──  [envelope]  <────────────────────────────┘
```

1. **Scene 1: Greeting (`GreetingScene.tsx`)**:
   - Displays label `"A little note"`, recipient greeting, and personal introduction.
   - Button with hover lift triggers transition to `question`.
2. **Scene 2: Interactive Question (`QuestionScene.tsx`)**:
   - Prompts recipient with the question (e.g., *"Mau pergi date sama aku?"*).
   - **Kinetic Button Mechanics**:
     - State `noAttempts` tracks rejections (0 to 5).
     - **Yes Button Scale**: `yesScale = 1 + noAttempts * 1.5` (At attempt 5, scale reaches `8.5x`, blanketing the entire card).
     - **No Button Scale**: `noScale = Math.max(0, 1 - noAttempts * 0.2)` (At attempt 5, scale hits `0` with `opacity: 0` and `pointerEvents: none`).
     - **Card Boundary Containment**: The parent container in `InvitationExperience.tsx` explicitly specifies `overflow-hidden`. As the Yes button scales up, its visual geometry is cleanly masked within the rounded white card borders without bleeding into the background on mobile or desktop.
     - Playful dynamic status copy changes per attempt:
       - 0: *"Silakan pilih jawabanmu di bawah ini."*
       - 1: *"Eh? Yakin? 🥺"*
       - 2: *"Coba pikir-pikir lagi... 😭"*
       - 3: *"Kok tega banget sih... 💔"*
       - 4: *"Tombol No-nya mau hilang lho! 😤"*
       - 5+: *"Yahh kan, tombol No-nya hilang 🥺"*
   - Clicking "Yes" triggers `acceptInvitation()`, sending `POST /api/invitations/[token]/accept`, transitions to `celebration`, and sets an auto-timer (1800ms) to advance to `envelope`.
3. **Scene 3: Celebration (`CelebrationScene.tsx`)**:
   - Displays pulsed heart icon and *"Yay, makasih sudah bilang yes"*.
4. **Scene 4: Envelope Tap (`EnvelopeScene.tsx`)**:
   - Renders a 3D-angled Neobrutalist envelope with interactive hover flap.
   - Clicking envelope advances to `plan`.
5. **Scene 5: Date Plan (`DatePlanScene.tsx`)**:
   - Sequentially animates detail cards (Date, Time, Location with address, Dress code, Budget note).
   - Renders sorted itinerary schedule cards with category tags.
   - Provides celebratory CTA and link to suggestion channel: `coba {receiverName} beri rekomendasi plannya` (`/i/[token]/suggest`).

### Flow C: Suggestion Flow (`/i/[token]/suggest` ➔ `SuggestForm.tsx`)
- Recipient selects applicable category chips (`Tanggal`, `Jam`, `Tempat`, `Aktivitas`, `Lainnya`).
- Types custom notes into textarea.
- Submit sends `POST /api/invitations/[token]/suggest`.
- Awaits database write + Resend email dispatch to Creator.
- Renders confirmation: *"Makasih sudah kirim saran. ❤️ Aku akan sesuaikan rencananya lagi ya."*

### Flow D: Sandboxed Demo Flow (`/i/demo`)
- Accessible via `/i/demo`.
- Hardcoded against `features/invitation/demo-data.ts`.
- Bypasses database queries in `accept`, `suggest`, and `status` routes by intercepting `token === 'demo'`.
- Allows full interactive testing on staging/production without polluting database records.

---

## 6. API Route Contracts

### `POST /api/invitations`
- **Payload**:
  ```json
  {
    "receiverName": "Nura",
    "greeting": "Hi, Nura",
    "intro": "Optional intro text",
    "question": "Wanna go on a date?",
    "date": "Jumat, 01 Januari 2027",
    "time": "19:00",
    "locationName": "Penthouse on 19th",
    "locationAddress": "Grand Jali Junction",
    "dressCode": "Casual cute",
    "budgetNote": "Handled",
    "personalMessage": "Can't wait!",
    "itinerary": [
      { "time": "19:00", "title": "Dinner", "description": "Table for two" }
    ]
  }
  ```
- **Response `201`**: `{ "invitation": { ... }, "url": "/i/aB3x9kLm1Q" }`

### `GET /api/invitations/[token]`
- **Response `200`**: `{ "invitation": { ... }, "status": "PENDING", "acceptedAt": null }`
- **Response `404`**: `{ "error": "Invitation not found." }`

### `POST /api/invitations/[token]/accept`
- **Logic**:
  - If `token === 'demo'`, returns mock accepted response immediately.
  - Finds invitation; if already `ACCEPTED`, returns current state.
  - Updates DB: `status = ACCEPTED`, `acceptedAt = new Date()`.
  - **Awaits** `sendEmailNotification()` with HTML payload detailing acceptance.
- **Response `200`**: `{ "status": "ACCEPTED", "acceptedAt": "2026-09-03T10:00:00.000Z" }`

### `POST /api/invitations/[token]/suggest`
- **Payload**:
  ```json
  {
    "categories": ["Jam", "Tempat"],
    "note": "Can we meet at 19:30 instead?"
  }
  ```
- **Logic**:
  - If `token === 'demo'`, returns mock suggestion response immediately.
  - Inserts `Suggestion` record connected to invitation.
  - **Awaits** `sendEmailNotification()` with categories and note content.
- **Response `201`**: `{ "id": "cuid...", "createdAt": "2026-09-03T10:00:00.000Z" }`

---

## 7. Design System & CSS Specifications

### Extended Palette (`tailwind.config.ts`)
```typescript
colors: {
  paper: '#FDFBF7',             // Off-white, textured paper base
  'ink-soft': '#3E3A39',        // Warm charcoal for intimate typography
  'sunset-peach': '#FFDAB9',    // Soft warm nostalgic glow
  'twilight-indigo': '#2C3E50', // Evening / night accent
  'accent-rose': '#E0BFB8',     // Dried flower rose accent
  'gold-foil': '#D4AF37',       // Foil stamp metallic accent
}
```

### Cinematic Scrapbook Shadow Tokens (`tailwind.config.ts`)
```typescript
boxShadow: {
  lift: '0 10px 30px -10px rgba(0,0,0,0.15)', // Soft realistic physical depth
  tape: '0 2px 4px rgba(0,0,0,0.1)',          // Adhesive / tape aesthetic
  soft: '0 24px 80px rgba(82, 50, 45, 0.12)',
}
```

### Global Background Canvas (`app/globals.css`)
```css
body {
  min-height: 100vh;
  margin: 0;
  background:
    radial-gradient(circle at center, rgba(253, 224, 71, 0.45), transparent 35rem),   /* Center buttery yellow glow */
    radial-gradient(circle at top left, rgba(244, 63, 94, 0.35), transparent 35rem),   /* Top-left blush rose glow */
    radial-gradient(circle at bottom right, rgba(244, 63, 94, 0.35), transparent 35rem), /* Bottom-right blush rose glow */
    var(--background);
  color: var(--foreground);
}
```

### Interaction Patterns
- **Hover Lift**: Elements translate slightly up-left on hover while maintaining or increasing shadow depth:
  `hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalInkLg transition-all active:translate-x-0 active:translate-y-0`
- **Card Containers**:
  `rounded-[2rem] border-2 border-ink bg-white p-6 shadow-brutalInkLg md:p-8 overflow-hidden`

---

## 8. Critical Engineering Gotchas & Decisions

1. **Vercel Serverless Function Premature Freezing**:
   - *Problem*: Triggering `sendEmailNotification(...)` without `await` in serverless route handlers causes Vercel lambda containers to freeze/terminate immediately upon returning `NextResponse.json(...)`, killing pending outbound HTTP connections to Resend.
   - *Fix*: Both `/api/invitations/[token]/accept` and `/api/invitations/[token]/suggest` explicitly **`await`** `sendEmailNotification(...)` before executing the HTTP return statement.
2. **Mobile Screen Containment for Button Scaling**:
   - *Problem*: The "Yes" button expands up to `8.5x` scale. Without boundaries, it covers mobile viewports and causes horizontal scroll blowout.
   - *Fix*: The parent wrapper in `InvitationExperience.tsx` uses `overflow-hidden`. The scale expansion is clipped to the card's inner boundaries, providing an immersive card takeover without page distortion.
3. **Touch vs Click Event Handling in Mobile WebKit**:
   - *Problem*: Mobile Safari/Chrome synthesizes synthetic clicks after touch events, potentially double-firing state updates or bypassing button transitions.
   - *Fix*: `handleNoAction` in `QuestionScene.tsx` intercepts both `onTouchStart` and `onClick`, calling `event.preventDefault()` to ensure single, deterministic state increments per gesture.
4. **Neon Connection Pooling vs Prisma Migrations**:
   - *Database URL*: Neon pooled connection string (includes `-pooler` hostname) is mapped to `DATABASE_URL` for application queries.
   - *Direct URL*: Neon unpooled direct connection string is mapped to `DIRECT_URL` for Prisma CLI migrations (`prisma.config.ts`), preventing PgBouncer transaction pooling failures during DDL migrations.
5. **Resend Free Tier Sandbox Constraint**:
   - On unverified domains using `onboarding@resend.dev`, Resend exclusively authorizes dispatches to the account owner's registration email (`NOTIFICATION_EMAIL`).

---

## 9. Environment Configuration Matrix

| Variable | Required | Scope | Description |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | **Yes** | Server Runtime | Pooled PostgreSQL URL from Neon (`ep-xxx-pooler...neondb?sslmode=require`) |
| `DIRECT_URL` | **Yes** | Build/CLI | Direct unpooled PostgreSQL URL from Neon for migrations (`ep-xxx...neondb?sslmode=require`) |
| `RESEND_API_KEY` | Optional | Server Runtime | API key from Resend (`re_...`) for email dispatch |
| `NOTIFICATION_EMAIL` | Optional | Server Runtime | Destination email address to receive acceptance and suggestion notifications |

---

## 10. Local Development & Deployment Runbook

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client & apply migrations
npm run build

# 3. Start local development server
npm run dev

# 4. Verify TypeScript integrity
npx tsc --noEmit
```
