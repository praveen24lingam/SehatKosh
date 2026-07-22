'use client';

import { motion } from 'framer-motion';
import { FileText, Languages, Search } from 'lucide-react';

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
  return (
    <section className="px-6 py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mb-14 max-w-2xl text-center md:mb-16"
        >
          <h2 className="mb-5 text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0F172A] md:text-[42px]">
            The Problem Millions of Indians Face
          </h2>
          <p className="text-[17px] leading-[1.65] text-[#475569] md:text-lg">
            Health information is written in a language most people cannot read — so they guess, or they ask the internet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {problems.map((problem, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-[#0D9488]/25 hover:shadow-lg"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${problem.bg}`}>
                <problem.icon className={`w-6 h-6 ${problem.color}`} />
              </div>
              <h3 className="mb-2.5 text-[17px] font-bold leading-snug tracking-[-0.01em] text-[#0F172A]">
                {problem.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-[#475569]">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
