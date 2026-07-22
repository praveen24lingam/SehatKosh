'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAppMotion, useReveal } from '@/lib/motion';

const MotionLink = motion.create(Link);

export function CTASection() {
  const { parent, item, viewport } = useReveal();
  const { pressInteraction } = useAppMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--foreground)] px-6 py-20 md:py-28">
      {/* Background radial gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] bg-[radial-gradient(circle,rgb(var(--teal-rgb) / 0.2)_0%,transparent_70%)]"
      />
      {/* Faint dot texture, mirroring the hero so both bookends feel related. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(60%_60%_at_50%_50%,#000_0%,transparent_100%)]"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div variants={parent} initial="hidden" whileInView="show" viewport={viewport}>
          <motion.h2
            variants={item}
            className="mb-4 text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white md:text-[40px]"
          >
            Apni Sehat, Apni Bhasha Mein.
          </motion.h2>
          <motion.p
            variants={item}
            className="mx-auto mb-9 max-w-xl text-[17px] leading-[1.6] tracking-[-0.005em] text-white/70 md:text-[18px]"
          >
            Report ki photo kheencho ya sawaal poochho — AI aasan Hindi mein jawab dega. Abhi shuru karo.
          </motion.p>

          <motion.div variants={item} className="mb-4">
            <MotionLink
              href="/chat"
              {...pressInteraction}
              className="inline-block rounded-xl bg-[var(--primary)] px-10 py-5 text-[17px] font-bold tracking-[-0.005em] text-white shadow-[0_10px_24px_rgb(var(--teal-rgb) / 0.28)] transition-[background-color,box-shadow] duration-200 hover:bg-[var(--primary-hover)] hover:shadow-[0_14px_32px_rgb(var(--teal-rgb) / 0.4)]"
            >
              Get Started Free
            </MotionLink>
          </motion.div>

          <motion.div variants={item} className="text-[13px] font-medium text-white/60">
            Free forever. No credit card needed.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
