'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, Check, ScanLine, ShieldCheck } from 'lucide-react';
import { useAppMotion, useReveal } from '@/lib/motion';

const trustPoints = ['Scan & Explain', 'Hindi / Hinglish', 'Built for Bharat 🇮🇳'];

const MotionLink = motion.create(Link);

export function HeroSection() {
  // Slightly wider stagger than the scroll sections: the hero is the first
  // thing on screen, so the sequence should read as deliberate.
  const { parent, item, reduce } = useReveal(0.09);
  const { pressInteraction } = useAppMotion();

  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-16 md:pt-32 md:pb-24 lg:flex lg:min-h-[86vh] lg:items-center">
      {/* ── Background treatment ─────────────────────────────────────────
          Teal glow behind the content, faint dot grid for texture, and two
          soft blurred orbs for depth. All decorative, all pointer-inert.  */}
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="hero-dots pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 -z-10 h-[420px] w-[420px] rounded-full bg-[var(--accent-light)]/20 blur-[90px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-16 -z-10 h-[380px] w-[380px] rounded-full bg-[var(--primary)]/15 blur-[90px]"
      />

      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ── Copy ──
              Children stagger in order: badge → headline → tagline →
              paragraph → buttons → trust points. */}
          <motion.div
            variants={parent}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.span
              variants={item}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3.5 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.14em] text-[var(--primary)]"
            >
              <ScanLine size={13} strokeWidth={2.5} />
              AI Health Assistant
            </motion.span>

            <motion.h1
              variants={item}
              className="mb-4 text-[42px] font-extrabold leading-[1.05] tracking-[-0.02em] text-[var(--foreground)] sm:text-[50px] lg:text-[60px]"
            >
              Samajhein<br />
              <span className="text-[var(--primary)]">Apni Sehat.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mb-3 text-[15px] font-semibold tracking-[0.01em] text-[var(--primary)] md:text-base"
            >
              Understand Your Health, in Hindi
            </motion.p>

            <motion.p
              variants={item}
              className="mb-7 max-w-xl text-[17px] leading-[1.6] tracking-[-0.005em] text-[var(--foreground-secondary)] md:text-[18px]"
            >
              Apni medical report, prescription ya dawai ki photo kheencho — AI use aasan Hindi
              mein samjhaayega. Sehat se jude sawaal poochho, saral jawab pao.
            </motion.p>

            <motion.div
              variants={item}
              className="mb-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            >
              <MotionLink
                href="/chat"
                {...pressInteraction}
                className="rounded-xl bg-[var(--primary)] px-7 py-3.5 text-center text-[15px] font-bold tracking-[0.01em] text-white shadow-[0_8px_20px_rgb(var(--teal-rgb) / 0.25)] transition-[background-color,box-shadow] duration-200 hover:bg-[var(--primary-hover)] hover:shadow-[0_12px_28px_rgb(var(--teal-rgb) / 0.32)]"
              >
                Get Started
              </MotionLink>
              <motion.a
                href="#how-it-works"
                {...pressInteraction}
                className="rounded-xl border border-[var(--border)] bg-white px-7 py-3.5 text-center text-[15px] font-bold tracking-[0.01em] text-[var(--foreground)] shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-200 hover:border-[var(--primary)]/30 hover:shadow-[var(--shadow-card-hover)]"
              >
                See How It Works
              </motion.a>
            </motion.div>

            <motion.ul
              variants={item}
              className="flex flex-wrap justify-center gap-x-5 gap-y-2.5 lg:justify-start"
            >
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-1.5 text-[13px] font-semibold tracking-[-0.005em] text-[var(--foreground-secondary)]"
                >
                  <Check size={15} strokeWidth={3} className="text-[var(--primary)]" />
                  {point}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ── App preview ──
              A CSS-only mock of the chat explaining a report. No image assets,
              so it stays crisp at any density and adds nothing to page weight. */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[320px] lg:max-w-[360px]"
            aria-hidden
          >
            <div className="absolute -inset-6 -z-10 rounded-[48px] bg-[var(--primary)]/10 blur-2xl" />

            <div className="rounded-[36px] border border-[var(--border)] bg-white p-2.5 shadow-[0_28px_60px_-18px_rgb(var(--slate-rgb) / 0.22)]">
              <div className="overflow-hidden rounded-[28px] bg-[var(--background)]">
                {/* App bar */}
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-white px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent-light)] to-[var(--primary)] text-white">
                      <ShieldCheck size={15} strokeWidth={2.5} />
                    </span>
                    <span className="text-[13px] font-bold tracking-[-0.01em] text-[var(--foreground)]">Sehat Saathi</span>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                </div>

                <div className="space-y-3 p-4">
                  {/* User: a scanned report */}
                  <div className="ml-auto w-[72%] rounded-2xl rounded-br-md bg-gradient-to-br from-[var(--accent-light)] to-[var(--primary)] p-2.5 shadow-sm">
                    <div className="rounded-lg bg-white/95 p-2.5">
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <Camera size={11} className="text-[var(--primary)]" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--primary)]">
                          Blood Report
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
                        <div className="h-1.5 w-4/5 rounded-full bg-[var(--border)]" />
                        <div className="h-1.5 w-3/5 rounded-full bg-[var(--border)]" />
                      </div>
                    </div>
                  </div>

                  {/* AI: the explanation */}
                  <div className="w-[86%] rounded-2xl rounded-bl-md border border-[var(--border)] border-t-[3px] border-t-[var(--primary)] bg-white p-3 shadow-sm">
                    <p className="mb-2 text-[11px] font-bold leading-snug text-[var(--foreground)]">
                      Aapki report saral bhasha mein
                    </p>
                    <div className="mb-2.5 space-y-1.5">
                      <div className="h-1.5 w-full rounded-full bg-[var(--border)]" />
                      <div className="h-1.5 w-[92%] rounded-full bg-[var(--border)]" />
                      <div className="h-1.5 w-3/4 rounded-full bg-[var(--border)]" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-[var(--primary-muted)] px-2 py-1.5">
                      <Check size={11} strokeWidth={3} className="shrink-0 text-[var(--primary)]" />
                      <span className="text-[9.5px] font-semibold leading-tight text-[var(--primary-hover)]">
                        Hb normal range mein hai
                      </span>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 py-2.5">
                    <Camera size={13} className="shrink-0 text-[var(--icon-muted)]" />
                    <span className="text-[10px] font-medium text-[var(--icon-muted)]">Sawaal poochein...</span>
                    <span className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[var(--primary)]">
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
