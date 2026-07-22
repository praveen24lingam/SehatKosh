'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, Check, ScanLine, ShieldCheck } from 'lucide-react';

const trustPoints = ['Scan & Explain', 'Hindi / Hinglish', 'Built for Bharat 🇮🇳'];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-28 pb-20 md:pt-36 md:pb-28 lg:flex lg:min-h-[88vh] lg:items-center">
      {/* ── Background treatment ─────────────────────────────────────────
          Soft teal wash plus a faint dot grid that fades out, so the space
          behind the content reads as designed rather than blank.          */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(13,148,136,0.14)_0%,rgba(13,148,136,0.04)_38%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.45] [background-image:radial-gradient(rgba(15,23,42,0.14)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(75%_60%_at_50%_35%,black_0%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 -z-10 h-[420px] w-[420px] rounded-full bg-[#14B8A6]/20 blur-[90px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-16 -z-10 h-[380px] w-[380px] rounded-full bg-[#0D9488]/15 blur-[90px]"
      />

      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ── Copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0D9488]/20 bg-[#0D9488]/10 px-3.5 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.14em] text-[#0D9488]">
              <ScanLine size={13} strokeWidth={2.5} />
              AI Health Assistant
            </span>

            <h1 className="mb-4 text-[40px] font-extrabold leading-[1.04] tracking-[-0.03em] text-[#0F172A] sm:text-[48px] lg:text-[58px]">
              Samajhein<br />
              <span className="text-[#0D9488]">Apni Sehat.</span>
            </h1>

            <p className="mb-4 text-[15px] font-semibold tracking-[0.01em] text-[#0D9488] md:text-base">
              Understand Your Health, in Hindi
            </p>

            <p className="mb-8 max-w-xl text-[17px] leading-[1.65] text-[#475569] md:text-lg">
              Apni medical report, prescription ya dawai ki photo kheencho — AI use aasan Hindi
              mein samjhaayega. Sehat se jude sawaal poochho, saral jawab pao.
            </p>

            <div className="mb-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/chat"
                className="rounded-xl bg-[#0D9488] px-7 py-3.5 text-center text-[15px] font-bold tracking-[0.01em] text-white shadow-[0_8px_20px_rgba(13,148,136,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#0F766E] hover:shadow-[0_12px_28px_rgba(13,148,136,0.3)]"
              >
                Get Started
              </Link>
              <a
                href="#how-it-works"
                className="rounded-xl border border-[#E2E8F0] bg-white px-7 py-3.5 text-center text-[15px] font-bold tracking-[0.01em] text-[#0F172A] transition-all hover:-translate-y-0.5 hover:border-[#0D9488]/30 hover:shadow-md"
              >
                See How It Works
              </a>
            </div>

            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2.5 lg:justify-start">
              {trustPoints.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-[13px] font-semibold text-[#475569]">
                  <Check size={15} strokeWidth={3} className="text-[#0D9488]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── App preview ──
              A CSS-only mock of the chat explaining a report. No image assets,
              so it stays crisp at any density and adds nothing to page weight. */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[320px] lg:max-w-[360px]"
            aria-hidden
          >
            <div className="absolute -inset-6 -z-10 rounded-[48px] bg-[#0D9488]/10 blur-2xl" />

            <div className="rounded-[36px] border border-[#E2E8F0] bg-white p-2.5 shadow-[0_28px_60px_-18px_rgba(15,23,42,0.22)]">
              <div className="overflow-hidden rounded-[28px] bg-[#F8FAFC]">
                {/* App bar */}
                <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-white px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#14B8A6] to-[#0D9488] text-white">
                      <ShieldCheck size={15} strokeWidth={2.5} />
                    </span>
                    <span className="text-[13px] font-bold tracking-[-0.01em] text-[#0F172A]">Sehat Saathi</span>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488]" />
                </div>

                <div className="space-y-3 p-4">
                  {/* User: a scanned report */}
                  <div className="ml-auto w-[72%] rounded-2xl rounded-br-md bg-gradient-to-br from-[#14B8A6] to-[#0D9488] p-2.5 shadow-sm">
                    <div className="rounded-lg bg-white/95 p-2.5">
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <Camera size={11} className="text-[#0D9488]" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#0D9488]">
                          Blood Report
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-1.5 w-full rounded-full bg-[#E2E8F0]" />
                        <div className="h-1.5 w-4/5 rounded-full bg-[#E2E8F0]" />
                        <div className="h-1.5 w-3/5 rounded-full bg-[#E2E8F0]" />
                      </div>
                    </div>
                  </div>

                  {/* AI: the explanation */}
                  <div className="w-[86%] rounded-2xl rounded-bl-md border border-[#E2E8F0] border-t-[3px] border-t-[#0D9488] bg-white p-3 shadow-sm">
                    <p className="mb-2 text-[11px] font-bold leading-snug text-[#0F172A]">
                      Aapki report saral bhasha mein
                    </p>
                    <div className="mb-2.5 space-y-1.5">
                      <div className="h-1.5 w-full rounded-full bg-[#E2E8F0]" />
                      <div className="h-1.5 w-[92%] rounded-full bg-[#E2E8F0]" />
                      <div className="h-1.5 w-3/4 rounded-full bg-[#E2E8F0]" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-[#CCFBF1] px-2 py-1.5">
                      <Check size={11} strokeWidth={3} className="shrink-0 text-[#0D9488]" />
                      <span className="text-[9.5px] font-semibold leading-tight text-[#0F766E]">
                        Hb normal range mein hai
                      </span>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2.5">
                    <Camera size={13} className="shrink-0 text-[#94A3B8]" />
                    <span className="text-[10px] font-medium text-[#94A3B8]">Sawaal poochein...</span>
                    <span className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#0D9488]">
                      <Check size={11} strokeWidth={3} className="text-white" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
