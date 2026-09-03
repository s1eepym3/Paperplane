<div align="center">

# ✈️ Paperplane
### *Digital Origami for Intentional Correspondence*

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_14+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Neon_Postgres-00E599?style=for-the-badge&logo=postgresql&logoColor=black" alt="Neon Postgres" />
</p>

<p align="center">
  <b>A tactile, story-driven web experience built to deliver thoughtful dispatches across the wire.</b>
  <br />
  Disguised as modern software — felt like a handwritten letter.
</p>

---

</div>

## ✦ The Concept

Remember folding a piece of notebook paper, scribbling something that meant everything, and sailing it across the room? 

**Paperplane** is an exploration of digital intimacy and kinetic UI. Rather than standard transactional notifications or bulky event schedulers, Paperplane treats digital messages as **single-edition interactive letters**. Every transition, card boundary, and micro-animation is crafted to recreate the anticipation of unfolding a physical envelope.

> *"In an era of instant pings, intentional correspondence is an art form."*

---

## 🎨 Aesthetic & Design Philosophy

The visual identity of Paperplane bridges raw **Neobrutalism** with gentle, warm romanticism — an aesthetic dubbed **Soft-Neobrutalism**:

- **Bold Tactility**: Solid `2px` ink borders and zero-blur offset drop shadows inspired by *Causehouse* and editorial zines.
- **Sunset Hues**: A calibrated color harmony featuring buttery center glows (`#fde047`), blushing edges (`#f43f5e`), and warm off-white canvases (`#fff2f4`).
- **Bounded Physics**: Intentional containment where animations dynamically scale and clip within card contours (`overflow-hidden`), ensuring a cohesive experience on both mobile viewports and desktop ultrawides.

---

## ✦ Key Mechanics

### ✉️ The Unfolding Flow (Scene Architecture)
- **Scene 01: The Seal** — A minimalist introductory note designed to spark curiosity without clutter.
- **Scene 02: The Interactive Inquiry** — A kinetic prompt featuring weighted interaction physics:
  - Persistent affirmative momentum.
  - Reluctant evasive states that playfully diminish as curiosity grows.
- **Scene 03: The Celebration** — Haptic-like visual release upon affirmation.
- **Scene 04: The Reveal (Itinerary & Details)** — An unfolding envelope revealing sequential schedule nodes, dress cues, and locations.
- **Scene 05: The Feedback Loop** — A discrete channel for the recipient to suggest subtle itinerary recalibrations.

### 📮 Silent Telegraph (Dispatch Receipts)
Integrated with serverless event hooks to quietly ping the sender via email when:
- An envelope is opened & accepted.
- Custom adjustments or recommendations are submitted.

### 🔒 Ephemeral & Private Link Tokens
- No public feed, no social discovery, and zero indexing.
- Each dispatch lives exclusively behind a unique, cryptographic URL token.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | Server components, edge routing, & API handlers |
| **Language** | TypeScript | Strict type safety across dispatch payloads |
| **Styling** | Tailwind CSS | Soft-Neobrutalist tokens and tailored shadows |
| **Animation** | Framer Motion | Smooth scene transitions & kinetic layout physics |
| **Database** | Neon Serverless PostgreSQL | Scalable cloud database with connection pooling |
| **ORM** | Prisma | Schema modelling and database migrations |
| **Dispatch Webhook** | Resend API | Asynchronous serverless email notifications |

---

## 🚀 Local Flight Setup

### 1. Clone & Install
```bash
git clone https://github.com/s1eepym3/Paperplane.git
cd Paperplane
npm install
```

### 2. Configure Environment
Create a `.env` file in the root directory:
```env
# Runtime connection (Neon Pooled Connection)
DATABASE_URL="postgresql://user:password@ep-xxx-pooler.region.neon.tech/neondb?sslmode=require"

# Migration connection (Neon Direct Connection)
DIRECT_URL="postgresql://user:password@ep-xxx.region.neon.tech/neondb?sslmode=require"

# Dispatch Notifications (Optional)
RESEND_API_KEY="re_xxxxxxxxxxxx"
NOTIFICATION_EMAIL="your-email@example.com"
```

### 3. Initialize Database
```bash
# Push schema migrations to Neon
npm run build
```

### 4. Launch Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` to craft or test dispatches.

---

## 📂 Project Architecture

```plaintext
├── app/
│   ├── api/invitations/      # Token resolution, acceptance, & suggestions API
│   ├── create/               # Dispatch crafting interface
│   ├── i/[token]/            # Dynamic private letter experience
│   │   ├── status/           # Real-time sender dashboard
│   │   └── suggest/          # Recipient feedback channel
│   └── i/demo/               # Static playground experience
├── features/
│   └── invitation/
│       ├── components/       # Kinetic scene components (Envelope, Scenes)
│       └── demo-data.ts      # Sample sandbox payload
├── lib/
│   ├── prisma.ts             # Neon-adapted Prisma client
│   └── notifications.ts      # Resend notification dispatcher
└── prisma/
    └── schema.prisma         # Minimalist dispatch relational schema
```

---

<div align="center">
  <p><sub>Crafted with care, folded with intention.</sub></p>
</div>
