<div align="center">
  <h1>SehatKosh 🇮🇳</h1>
  <p><strong>Your Family's Universal Health Vault & AI Medical Assistant</strong></p>
</div>

<br />

## 🌟 The Idea
Healthcare in India often involves scattered paper prescriptions, expensive branded medicines, and complex medical reports that are hard for the average person to understand. **SehatKosh** is a comprehensive digital health locker designed to solve this. It not only organizes your family's health records but also uses AI to provide medical insights in local languages and helps you find generic alternatives to expensive medicines, saving you thousands of rupees every month.

---

## 🚀 Key Features

*   🏥 **Universal Health Locker:** Securely store, organize, and access all your prescriptions, lab reports, and medical documents in one place.
*   🤖 **Multilingual AI Health Assistant:** Powered by advanced AI to explain complex medical reports (like HbA1c levels), answer health queries, and provide insights in your local language.
*   💊 **Generic Medicine Finder:** Enter your prescribed branded medicine and instantly discover cheaper, high-quality generic alternatives (like Jan Aushadhi), complete with cost-saving calculations.
*   👨‍👩‍👧‍👦 **Family Profiles:** Manage the health records and profiles of your entire family from a single, unified dashboard.
*   🔔 **Smart Reminders:** Never miss a dose or an appointment with integrated medication and checkup reminders.
*   🔒 **Privacy & Security:** End-to-end encrypted storage ensuring your sensitive health data remains completely private.
*   ⚡ **Premium UI/UX:** A stunning, fully responsive interface featuring modern glassmorphism, fluid micro-animations, and rich typography for a world-class user experience.

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
*   **Styling:** Modern CSS (Glassmorphism, CSS Variables, Tailwind)
*   **Internationalization:** Multi-language support (English, Hindi)

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
│   ├── components/         # Reusable UI components
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
    git clone https://github.com/praveen24lingam/SehatKosh.git
    cd SehatKosh
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
