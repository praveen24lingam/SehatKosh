'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0F172A] pt-12 pb-8 px-6 border-t border-white/10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8 mb-12">
          {/* Brand & Description */}
          <div className="max-w-sm">
            <div className="text-white text-2xl font-extrabold tracking-tight mb-4">
              SehatKosh
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Scan a printed medical document or ask a health question, and get a simple answer in Hindi. Proudly built for Good 2026 🇮🇳.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-12 md:gap-24">
            <div className="flex flex-col gap-3">
              <div className="text-white font-semibold mb-2">Product</div>
              <a href="#features" className="text-white/60 text-sm hover:text-white transition-colors">
                Scan &amp; Explain
              </a>
              <a href="#features" className="text-white/60 text-sm hover:text-white transition-colors">
                Ask in Hindi
              </a>
              <a href="#how-it-works" className="text-white/60 text-sm hover:text-white transition-colors">
                How it Works
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-white font-semibold mb-2">Get Started</div>
              <Link href="/chat" className="text-white/60 text-sm hover:text-white transition-colors">
                AI Chat
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center md:text-left text-white/60 text-sm">
          <div>© 2026 SehatKosh. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
