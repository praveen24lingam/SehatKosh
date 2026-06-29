<<<<<<< HEAD
<div align="center">
  <h1>SehatKosh 🇮🇳</h1>
  <p><strong>Your Family's Universal Health Vault & AI Medical Assistant</strong></p>
</div>

<br />

## 🌟 The Idea
Healthcare in India often involves scattered paper prescriptions, expensive branded medicines, and complex medical reports that are hard for the average person to understand. **SehatKosh** is a comprehensive digital health locker designed to solve this. It not only organizes your family's health records but also uses AI to provide medical insights in local languages and helps you find generic alternatives to expensive medicines, saving you thousands of rupees every month.

---

## 🚀 Key Features (Current)

*   🏥 **Universal Health Locker:** Securely store, organize, and access all your prescriptions, lab reports, and medical documents in one place.
*   🤖 **Multilingual AI Health Assistant:** Powered by advanced AI to explain complex medical reports (like HbA1c levels), answer health queries, and provide insights in your local language.
*   💊 **Generic Medicine Finder:** Enter your prescribed branded medicine and instantly discover cheaper, high-quality generic alternatives (like Jan Aushadhi), complete with cost-saving calculations.
*   👨‍👩‍👧‍👦 **Family Profiles:** Manage the health records and profiles of your entire family from a single, unified dashboard.
*   🔔 **Smart Reminders:** Never miss a dose or an appointment with integrated medication and checkup reminders.
*   🔒 **Privacy & Security:** End-to-end encrypted storage ensuring your sensitive health data remains completely private.
*   ⚡ **Modern, Fast UI:** A premium, fully responsive interface built with Next.js and Framer Motion for a seamless user experience.

---

## 🔮 Future Scope (Planned Features)

We are continuously evolving SehatKosh. Here is what we plan to integrate next:

*   🪪 **Full ABHA Integration:** Seamlessly link and sync your Ayushman Bharat Health Account (ABHA) records.
*   🏛️ **Govt Scheme Checker:** An automated system to check your eligibility for over 50+ government health schemes and subsidies.
*   📱 **Offline PWA Support:** Access critical health records even without an active internet connection.
*   🏥 **Tele-consultation Integration:** Book and consult with doctors directly from the app.
*   📊 **Health Trends Dashboard:** Visual graphs tracking vital signs (BP, Sugar, etc.) over time based on uploaded reports.

---

## 💻 Tech Stack

*   **Frontend:** Next.js (App Router), React 19, Tailwind CSS, Framer Motion
*   **Backend / BaaS:** Supabase (PostgreSQL, Auth, Storage)
*   **AI Integration:** Google Generative AI (Gemini)
*   **State Management:** Zustand
*   **Internationalization:** `next-intl` for local Indian languages
*   **Styling:** Shadcn UI, Base UI

---

## 📂 Project Structure

```text
sehatkosh/
├── src/
│   ├── app/
│   │   ├── (auth)/         # Authentication pages (Login, Register)
│   │   ├── (dashboard)/    # Main user dashboard and analytics
│   │   ├── api/            # Next.js API routes (AI, proxy, etc.)
│   │   ├── chat/           # AI Health Assistant interface
│   │   ├── family/         # Family profile management
│   │   ├── health-card/    # Digital Health Card & QR generation
│   │   ├── reminders/      # Medication and appointment reminders
│   │   ├── settings/       # User preferences and localization
│   │   └── page.tsx        # Landing page
│   ├── components/         # Reusable UI components (Shadcn, etc.)
│   ├── lib/                # Utility functions and Supabase client
│   ├── store/              # Zustand state management slices
│   └── types/              # TypeScript definitions
├── public/                 # Static assets (images, icons)
└── ...config files         # Tailwind, Next.js, ESLint configurations
```

---

## 🛠️ Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   npm, yarn, or pnpm
*   Supabase Account (for Database & Auth)
*   Google Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/sehatkosh.git
    cd sehatkosh
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install / pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    GEMINI_API_KEY=your_gemini_api_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the application.
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 8d2d8951c19ab2e8168f26f39e8d2da0b6bb60a5
