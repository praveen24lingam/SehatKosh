'use client';

import { motion } from 'framer-motion';
import { FileText, Languages, Search } from 'lucide-react';
import { useAppMotion, useReveal } from '@/lib/motion';

const problems = [
  {
    icon: FileText,
    title: "Reports samajh nahi aati",
    description: "Lab reports aur prescriptions technical English mein hote hain jo aam log nahi samajh paate.",
    color: "text-teal-600",
    bg: "bg-teal-50"
  },
  {
    icon: Languages,
    title: "English-first apps",
    description: "Zyada health apps English mein hain, Hindi bolne waale families ke liye nahi.",
    color: "text-teal-600",
    bg: "bg-teal-50"
  },
  {
    icon: Search,
    title: "Google pe galat ilaaj",
    description: "Log WhatsApp/Google pe khud diagnose karte hain, jo unsafe hai.",
    color: "text-teal-600",
    bg: "bg-teal-50"
  }
];

export function ProblemSection() {
  const { parent, item, viewport } = useReveal();
  const { cardInteraction } = useAppMotion();

  return (
    <section className="px-6 py-20 md:py-28 bg-white">
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
            The Problem Millions of Indians Face
          </motion.h2>
          <motion.p
            variants={item}
            className="text-[17px] leading-[1.6] tracking-[-0.005em] text-[var(--foreground-secondary)] md:text-[18px]"
          >
            Health information is written in a language most people cannot read — so they guess, or they ask the internet.
          </motion.p>
        </motion.div>

        <motion.div
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={item}
              {...cardInteraction}
              className="surface-card p-7"
            >
              <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${problem.bg}`}>
                <problem.icon className={`h-6 w-6 ${problem.color}`} />
              </div>
              <h3 className="mb-2.5 text-[17px] font-bold leading-snug tracking-[-0.015em] text-[var(--foreground)]">
                {problem.title}
              </h3>
              <p className="text-[15px] leading-[1.6] text-[var(--foreground-secondary)]">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
