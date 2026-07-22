<div align="center">
  <h1>SehatKosh 🇮🇳</h1>
  <p><strong>Your Family's Digital Health Vault & AI Medical Assistant</strong></p>
</div>

<br />

## 🌟 Overview

**SehatKosh** is a bilingual (Hindi / English / Hinglish) web application that helps Indian families organize their health in one place. Users can store medical records for every family member, chat with an AI health assistant that understands questions and reports in plain language, and automatically track a child's national immunization schedule.

---

## 🩺 Problem Statement

Healthcare for the average Indian family is fragmented: prescriptions and lab reports are scattered across paper and phones, medical reports are hard to interpret without a doctor, branded medicines are expensive, and childhood vaccination schedules are easy to miss. There is no single, simple, local-language place to keep a family's health information organized and understandable.

---

## 💡 Solution

SehatKosh brings this together into a single, mobile-first app:

- A **digital vault** for each family member's health records.
- An **AI health assistant** that answers questions and explains uploaded reports in the user's own language.
- **Automatic vaccination scheduling** for children, based on India's Universal Immunization Programme (UIP).

---

## 🚀 Features Currently Implemented

- 🔐 **Authentication** — Email/password sign-up, login, and password-reset request via Supabase Auth. Protected routes are guarded by Next.js middleware.
- 🧭 **Guided Onboarding** — A multi-step onboarding wizard captures the user's profile (personal details, health metrics, lifestyle, medical history, goals) and stores it on the user account.
- 🌐 **Bilingual UI** — App-wide Hindi/English toggle with a dedicated language-selection screen; persisted across sessions.
- 🤖 **AI Health Assistant (Gemini)** — Chat interface powered by Google Gemini that:
  - Answers general health questions in Hindi, English, or Hinglish.
  - Analyzes uploaded document images (e.g., printed lab reports, tablet boxes) via the vision model and rejects handwritten documents.
  - Uses function-calling to take actions such as adding family members, marking vaccines as done, and saving record summaries — with the user's own profile injected as context.
- 👨‍👩‍👧‍👦 **Family Vault** — Add, list, view, and delete family members; each member has a detail page.
- 📁 **Health Records** — Upload record images per family member to Supabase Storage and list them on the member's page.
- 💉 **Vaccination Tracking** — When a child (age ≤ 5) is added, a UIP-based vaccination schedule is auto-generated. Schedules are computed from date of birth, statuses (upcoming/due/overdue/done) are derived, and vaccines can be marked as completed.
- 📊 **Dashboard** — Personalized greeting, AI insights entry point, quick actions, and a vaccination summary.
- ⚙️ **Settings** — Profile summary, language toggle, preference toggles, and logout.
- 🎨 **Landing Page** — Fully responsive marketing site (hero, problem, solution, features, stats, testimonial, CTA) with Framer Motion animations.
- 🎙️ **Voice Input** — Browser Web Speech API hook for speech-to-text in the chat input (where supported).

---

## 💻 Tech Stack

- **Framework:** Next.js 16 (App Router) with Turbopack, React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 with extensive inline styling; Framer Motion for animations; `lucide-react` icons
- **Backend / BaaS:** Supabase — PostgreSQL, Auth (email/password), and Storage
- **AI:** Google Generative AI (Gemini `gemini-2.5-flash`) for chat, vision, and function-calling
- **State Management:** Zustand (with `persist` for auth, language, and settings)
- **Notifications / UX:** `sonner` toasts, `qrcode` generation
- **Internationalization:** In-app Hindi/English strings (no i18n library)

---

## 🏗️ Project Architecture

SehatKosh is a full-stack Next.js App Router application. It uses two complementary data-access patterns:

1. **Server API routes** (`src/app/api/*`) — Create a request-scoped Supabase client from cookies, verify the session, and perform CRUD against Postgres/Storage.
2. **Direct client Supabase calls** — Auth and some UI flows call the browser Supabase client directly (e.g., sign-up, onboarding profile updates).

Route protection is enforced by middleware, which redirects unauthenticated users to `/login` for all non-public routes. Client UI state (current user, language, settings) is held in Zustand stores and persisted to `localStorage`.

---

## 📂 Folder Structure

```text
sehat-kosh/
├── src/
│   ├── app/
│   │   ├── (auth)/          # login, signup, forgot-password, onboarding, language
│   │   ├── (dashboard)/     # dashboard, chat, family, family/[memberId], settings (shared layout)
│   │   ├── api/             # Route handlers: chat, family, records, vaccinations
│   │   ├── layout.tsx       # Root layout (fonts, Toaster)
│   │   ├── page.tsx         # Landing page
│   │   └── globals.css
│   ├── components/          # landing/, dashboard/, family/, chat/, vaccination/, layout/, shared/, ui/
│   ├── lib/
│   │   ├── supabase/        # Browser & server Supabase clients
│   │   ├── gemini/          # Gemini client, tool declarations, prompts
│   │   ├── constants/       # UIP vaccination schedule
│   │   └── utils/           # Formatting & vaccination helpers
│   ├── store/               # Zustand stores (auth, language, settings, chat)
│   ├── types/               # TypeScript models (database, chat, vaccination)
│   ├── hooks/               # useVoiceInput
│   └── proxy.ts             # Auth route guard (Next.js 16 middleware convention)
├── public/                  # Static assets, manifest.json
└── ...config               # next.config.js, tsconfig.json, postcss.config.mjs, eslint.config
```

> Note: The application lives in the `sehat-kosh/` subdirectory of the repository.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase project (Database, Auth, and Storage enabled)
- A Google Gemini API key

### Installation

```bash
# From the repository, enter the app directory
cd sehat-kosh

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file inside `sehat-kosh/` with the variables the app actually uses:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_google_gemini_api_key
```

### Supabase Setup

- Create the required tables (`users`, `family_members`, `health_records`, `vaccinations`).
- Create a **Storage bucket named `health-records`** — record image uploads depend on it.

### Running Locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Build & Production

```bash
npm run build   # Production build
npm run start   # Serve the production build
npm run lint    # Lint the codebase
```

---

## 🔮 Future Scope

- **Digital Health Card & QR** — A shareable per-member health card (UI components already exist).
- **Real Jan Aushadhi Finder** — Replace the current placeholder responses with live generic-medicine data.
- **Government Scheme Checker** — Real eligibility checks against actual scheme data.
- **ABHA Integration** — Link Ayushman Bharat Health Account records.
- **Health Trends** — Visualize vitals extracted from uploaded reports over time.
- **Offline / PWA Support** — Complete the PWA setup (a web manifest already exists).

---

<div align="center">
  <sub>Built for a hackathon • Focused on accessible, local-language family healthcare.</sub>
</div>
