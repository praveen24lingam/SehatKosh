'use client';

import { motion } from 'framer-motion';
import { Camera, Sparkles, MessageCircle } from 'lucide-react';
import { useAppMotion, useReveal } from '@/lib/motion';

const steps = [
  {
    icon: Camera,
    title: "Photo Kheencho",
    description: "Report, prescription ya tablet box ki photo upload karo."
  },
  {
    icon: Sparkles,
    title: "AI Samjhaaye",
    description: "AI use padh ke aasan Hindi mein explain karta hai."
  },
  {
    icon: MessageCircle,
    title: "Sawaal Poochho",
    description: "Sehat se jude koi bhi sawaal poocho — bukhar, periods, common bimariyan — saral jawab pao."
  }
];

export function SolutionSection() {
  const { parent, item, viewport } = useReveal(0.09);
  const { cardInteraction } = useAppMotion();

  return (
    <section id="how-it-works" className="px-6 py-20 md:py-28 bg-[var(--background)]">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto mb-14 max-w-2xl text-center md:mb-16"
        >
          <motion.h2
            variants={item}
            className="mb-4 text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--foreground)] md:text-[40px]"
          >
            Teen Step. Saral Jawab.
          </motion.h2>
          <motion.p
            variants={item}
            className="text-[17px] leading-[1.6] tracking-[-0.005em] text-[var(--foreground-secondary)] md:text-[18px]"
          >
            No forms, no setup. Point your camera at a document and start asking questions.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (Desktop only) */}
          <div
            aria-hidden
            className="absolute left-[15%] right-[15%] top-[48px] -z-0 hidden h-[2px] border-t-2 border-dashed border-[var(--border)] md:block"
          />

          <motion.div
            variants={parent}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8"
          >
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                variants={item}
                {...cardInteraction}
                className="flex flex-col items-center text-center"
              >
                <div className="group relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border)] bg-white shadow-[var(--shadow-card)] transition-shadow duration-200 hover:shadow-[var(--shadow-card-hover)]">
                  <div className="absolute inset-0 scale-0 rounded-full bg-[var(--primary)]/5 transition-transform duration-300 group-hover:scale-100" />
                  <step.icon className="relative z-10 h-10 w-10 text-[var(--primary)]" />

                  {/* Step Number Badge */}
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--foreground)] text-sm font-bold text-white shadow-md">
                    {idx + 1}
                  </div>
                </div>

                <h3 className="mb-2.5 text-[19px] font-bold tracking-[-0.015em] text-[var(--foreground)]">
                  {step.title}
                </h3>
                <p className="max-w-[260px] text-[15px] leading-[1.6] text-[var(--foreground-secondary)]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
