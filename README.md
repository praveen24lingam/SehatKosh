<div align="center">

# SehatKosh 🇮🇳

### **Snap your medical report. Understand it in your own language.**

**अपनी रिपोर्ट की फोटो खींचो — सेहत साथी उसे आसान हिंदी में समझाएगा।**

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4)](https://ai.google.dev)
[![PWA](https://img.shields.io/badge/PWA-installable-5A0FC8)](#-installable-pwa)

</div>

---

## 🌟 What is SehatKosh?

**SehatKosh** (स्वास्थ्य कोष) is a Hindi-first AI health assistant built for Indian families.

Point your phone camera at a **lab report, a printed prescription, or a medicine box** — and the in-app assistant, **"Sehat Saathi"**, reads it and explains it back to you in simple Hindi or Hinglish. What the values mean. What is normal and what needs attention. What that tablet is generally used for.

It also answers everyday health questions in plain language — fever, periods, pregnancy, diabetes, BP, thyroid, daily habits — and points people toward government health schemes like **Ayushman Bharat (PM-JAY)** and **Jan Aushadhi**.

No login. No forms. Open the app, take a photo, get an answer.

> This is a single-purpose app by design. It does one thing — make printed medical information understandable to people who do not read English — and tries to do it safely.

---

## 🩺 The Problem

**A lab report is written for a doctor, not for the patient.**

An Indian family pays for a blood test, receives a page of abbreviations — `Hb 9.2 g/dL`, `HbA1c 7.8%`, `TSH 6.4` — and has no idea what any of it means until the next doctor's visit, which may be days away or may never happen.

- **Medical documents are unreadable to ordinary people.** Reports, prescriptions and medicine labels use English medical jargon. For a Hindi-speaking family, the paper in their hand is effectively blank.
- **Health apps are English-first.** Almost every digital health product in India assumes an English-reading, urban, smartphone-fluent user. The "next billion" users — the ones who need this information the most — are designed out from the first screen.
- **The alternative is unsafe self-diagnosis.** In the absence of a plain-language explanation, people turn to Google, YouTube and WhatsApp forwards, and end up self-medicating on bad information.

SehatKosh sits in that gap: **not a doctor, not a search engine — a patient translator.**

---

## ✨ Key Features

### 📸 Document Scan & Explanation
Capture or upload a photo of a printed medical document. The vision model first classifies it — blood report, printed prescription, tablet box, discharge summary — and then explains it in a fixed, readable structure:

```
DOCUMENT:      Kaunsa document hai
MUKHYA BAATEIN: Important values ya dawaiyan
MATLAB KYA HAI: Aam bhasha mein saral explanation
DHYAN DEIN:    Kya normal hai, kis par nazar rakhni hai
⚕️ Apne doctor se zaroor milein
```

- **Lab / blood reports** — key values pulled out, each with its normal range, and a plain-language explanation of what the value indicates.
- **Printed prescriptions** — the medicine names are read out and explained; dose and timing are never invented, only what the doctor wrote counts.
- **Medicine / tablet boxes** — name, salt, what it is generally used for, common side effects and cautions.

### ✋ Handwritten Documents Are Politely Declined
Handwritten prescriptions are detected before analysis and refused on purpose — misreading a handwritten drug name is dangerous. The assistant asks the user to type the medicine name instead.

### 💬 Hindi / Hinglish AI Chat
The assistant defaults to Hindi or Roman-script Hinglish for **both** text answers and document analysis. It replies in English only if the user writes in English or asks for it — and even then it keeps the language simple and avoids jargon.

### ❓ General Health Q&A
Everyday health questions answered in a consistent **KYA / KYUN / KAISE BACHEIN** (what / why / how to prevent) shape — fever, common conditions like diabetes, BP and thyroid, women's health including periods and maternity basics, and daily habits around food, sleep, hygiene and exercise.

### 🏛️ Government Scheme Information
General, educational information about **Ayushman Bharat (PM-JAY)** and **Jan Aushadhi (PMBJP)**, plus curated links to official sources (`pmjay.gov.in`, `janaushadhi.gov.in`, MoHFW, National Health Portal) on the home screen. The assistant will **never** claim to have checked anyone's eligibility, application status, or a live medicine price — it explains how things generally work and sends the user to the official source.

### 🎙️ Voice Input — Speak Instead of Typing
Typing Devanagari on a phone keyboard is slow, and it is a real barrier for the users this app is built for. So the mic button lets people simply *talk*.

Tap the mic to record (the button turns red and pulses), tap again to stop. The audio is transcribed by **Gemini** and the text lands in the input box — **for the user to read and edit, never auto-sent**. If you had already typed something, the transcript is appended to it rather than replacing it.

Transcription runs through Gemini rather than the browser's built-in Web Speech API, because Web Speech is Chrome-only, silently unavailable in several Android webviews, and handles Hindi — and especially Hinglish — poorly. Audio is captured with `MediaRecorder`, re-encoded client-side to 16 kHz mono WAV, and sent to a dedicated `/api/transcribe` route. Recordings are capped at 60 seconds, and the transcription prompt is explicitly forbidden from *answering* the health question in the audio — it only writes down what was said.

Mic permission is requested on first use, and every failure path (permission denied, no microphone, silence, network error, unsupported browser) surfaces a friendly toast in Hindi or English.

### 📱 Mobile Camera Capture
The camera button uses `capture="environment"` so phones open the rear camera directly — the intended flow is *point at the report and shoot*. A separate gallery button handles existing photos. Images are downscaled to a 1600px longest edge and re-encoded before upload, so large phone photos still send on a weak connection.

### 📥 Installable PWA
A web manifest, maskable icons, theme colour and a minimal service worker make the app installable to the home screen with an offline fallback page. API responses are deliberately **not** cached — health answers must always be fresh.

### 🌐 Bilingual UI
An app-wide Hindi / English toggle (persisted in `localStorage`) covering navigation, prompts, placeholders and error messages. Devanagari is a first-class typographic citizen — Mukta is loaded alongside Inter and Sora and resolves per-glyph, so Hindi never renders in a fallback face.

---

## 🛠️ Tech Stack

| Layer | Choice |
|---|---|
| **Framework** | Next.js 16.2 (App Router, Turbopack) |
| **UI** | React 19.2, TypeScript 5 |
| **AI** | Google Gemini `gemini-2.5-flash` via `@google/generative-ai` — chat, vision (documents) and audio (voice transcription) |
| **Voice** | `MediaRecorder` + Web Audio API → 16 kHz mono WAV, transcribed by Gemini |
| **Styling** | Tailwind CSS v4 + a custom CSS-variable design system |
| **Animation** | Framer Motion 12 |
| **Icons** | lucide-react |
| **State** | Zustand 5 (chat, language, local profile) |
| **Toasts** | sonner |
| **PWA** | `public/manifest.json` + a hand-written service worker |

**On Supabase:** `@supabase/ssr` and `@supabase/supabase-js` are still installed and thin client helpers exist in `src/lib/supabase/`, but **no page, component or route handler currently calls them**. The app today makes zero database calls — nothing is stored server-side, and there is no authentication. Chat history lives only in the browser tab.

---

## 🔄 How It Works

```
  User opens app  →  Home (schemes + quick actions)  →  Chat
                                                          │
                          ┌───────────────────────────────┴──────────────┐
                          │                                              │
                  📸 Snap / upload a photo                      💬 Type a question
                          │                                              ▲
                          │                                🎙️ or tap the mic and speak
                          │                                              │
                          │                                  POST /api/transcribe
                          │                                  Gemini → text in the input box
                          │                                  (user reviews & edits, then sends)
                          │                                              │
                  POST /api/chat (image)                        POST /api/chat (text)
                          │                                              │
              Gemini vision: classify the document              Gemini chat, guided by the
              (type + printed vs handwritten)                   Sehat Saathi system prompt
                          │                                              │
              fully handwritten? → politely decline                      │
                          │                                              │
              any printed text → explain under the system prompt         │
                          │                                              │
                          └───────────────► Hindi / Hinglish answer ◄────┘
                                                    +
                                          ⚕️ "Apne doctor se zaroor milein"
```

1. **Open the app.** The landing page explains the idea; the home screen shows quick actions and verified government-scheme links.
2. **Go to Chat.** Suggestion cards offer the common intents — analyse a report, scan a medicine, understand symptoms, ask about schemes.
3. **Snap a report.** The camera button opens the rear camera; the photo is downscaled client-side and posted to `/api/chat`.
4. **Or just talk.** Tap the mic, speak in Hindi or Hinglish, tap again to stop. The transcript appears in the input box to review and edit before sending.
5. **Read the explanation.** The answer comes back in Hindi/Hinglish, structured, with out-of-range values highlighted and a reminder to see a doctor.

---

## 📸 Screenshots

| Landing | Home |
|---|---|
| ![Landing](./screenshots/landing.png) | ![Dashboard](./screenshots/dashboard.png) |

| Chat — empty state | Report explanation |
|---|---|
| ![Chat](./screenshots/chat.png) | ![Report Analysis](./screenshots/report-analysis.png) |

| Medicine box scan | Mobile / PWA |
|---|---|
| ![Medicine Scan](./screenshots/medicine-scan.png) | ![Mobile](./screenshots/mobile.png) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm
- A **Google Gemini API key** — get one free at [aistudio.google.com](https://aistudio.google.com/app/apikey)

### 1. Clone and install

```bash
git clone <your-repo-url>
cd sehat-kosh
npm install
```

### 2. Environment variables

Create a `.env.local` file in the project root:

```env
# Required — the app throws at startup without this
GEMINI_API_KEY=your_google_gemini_api_key
```

That is the **only** variable the running app actually reads. Supabase keys may still be present in older `.env.local` files; they are unused, and no database or storage setup is needed to run SehatKosh today.

### 3. Run it

```bash
npm run dev      # dev server at http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000). Head to `/chat` and send a photo of any printed report.

> **Tip:** to test the camera flow properly, open the dev server on your phone over your local network — `capture="environment"` and the mic only behave correctly on a real device (and require HTTPS or `localhost`).

### 4. Build for production

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

---

## ⚠️ Safety & Disclaimer

**SehatKosh is an educational tool, not a medical service.**

- It **does not diagnose.** The assistant is explicitly instructed never to name a disease from a report — only to explain what is written on it.
- It **does not prescribe.** No medicine recommendations, no dosages, no "take this instead".
- It **does not check eligibility or look anything up.** It has no database, no user records and no live price or scheme data. It never pretends otherwise.
- It **does not invent numbers.** Prices, percentages and statistics are refused rather than guessed; users are pointed at official sources.
- It **refuses handwritten documents**, because misreading a handwritten drug name can cause real harm.
- It **escalates emergencies.** Chest pain, breathlessness, fainting, heavy bleeding, or a child with fever and convulsions trigger an immediate instruction to seek care or call **102 / 108**.
- Every substantive health answer ends with **"⚕️ अपने डॉक्टर से ज़रूर मिलें"** — *please do see your doctor.*

AI output can be wrong. Nothing here replaces a qualified medical professional. **Always consult a doctor before acting on anything this app tells you.**

---

## 🏆 About This Project

Built for **Build for Good 2026** under the **SWASTHYA (health) track**, in the context of the **Sama Digital Foundation** community.

This is a hackathon project. It was deliberately scoped down from a broader "family health vault" idea to a single, sharp, demonstrable use case: **let someone who cannot read English understand their own medical report.** Features that did not serve that one job — record storage, family profiles, vaccination schedules, reminders and authentication — were removed rather than half-built.

---

## 🔮 Future Scope

Things that are genuinely buildable from here:

- **Text-to-speech replies** — read the explanation aloud for users who cannot read Hindi text either. This closes the loop with the existing voice input.
- **More Indian languages** — the system prompt is language-driven, so Bengali, Marathi, Tamil and Telugu are largely a prompt-and-UI-strings problem.
- **Multi-page report handling** — capture several pages of one report and explain them as a single document.
- **Optional local report history** — save past explanations in IndexedDB, on-device only, so nothing needs a server or an account.
- **Real Jan Aushadhi lookup** — a genuine data source for generic-medicine availability and nearby Kendras, replacing today's honest "check the official site" answer.
- **Offline queueing** — let a user snap a report without network and send it automatically when connectivity returns.
- **Sharper report extraction** — structured value/range parsing so out-of-range results can be rendered as a visual chart, not just prose.
- **Accessibility pass** — larger-text mode and a low-literacy, icon-led navigation variant.

---

## 📁 Project Structure

```text
sehat-kosh/
├── src/
│   ├── app/
│   │   ├── (dashboard)/            # home, chat, settings (shared layout)
│   │   ├── api/chat/route.ts       # chat + document analysis (text & vision)
│   │   ├── api/transcribe/route.ts # voice → text (audio)
│   │   ├── layout.tsx              # fonts, metadata, PWA manifest, service worker
│   │   └── page.tsx                # landing page
│   ├── components/                 # landing/, dashboard/, chat/, layout/, shared/, ui/
│   ├── lib/
│   │   ├── gemini/                 # client (model config) + prompts (Sehat Saathi)
│   │   ├── image.ts                # client-side downscale & re-encode
│   │   └── audio.ts                # MediaRecorder capture → 16 kHz mono WAV
│   ├── hooks/useVoiceInput.ts      # recording state machine + transcription
│   ├── store/                      # Zustand: chat, language, local profile
│   └── types/
└── public/                    # manifest.json, sw.js, icons
```

---

<div align="center">
<br />
<sub>Built with care for the families that every other health app forgot.</sub>
<br />
<sub><b>सेहत की जानकारी, सबकी भाषा में।</b></sub>
</div>
