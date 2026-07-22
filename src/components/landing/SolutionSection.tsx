'use client';

import { motion } from 'framer-motion';
import { Camera, Sparkles, MessageCircle } from 'lucide-react';

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
  return (
    <section id="how-it-works" className="px-6 py-20 md:py-28 bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mb-14 max-w-2xl text-center md:mb-16"
        >
          <h2 className="mb-5 text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0F172A] md:text-[42px]">
            Teen Step. Saral Jawab.
          </h2>
          <p className="text-[17px] leading-[1.65] text-[#475569] md:text-lg">
            No forms, no setup. Point your camera at a document and start asking questions.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-[#E2E8F0] -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.15 }}
                viewport={{ once: true, margin: "-50px" }}
                className="text-center flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full border border-[#E2E8F0] shadow-sm flex items-center justify-center mb-6 relative group hover:-translate-y-2 transition-transform">
                  <div className="absolute inset-0 bg-[#0D9488]/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <step.icon className="w-10 h-10 text-[#0D9488] relative z-10" />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#0F172A] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {idx + 1}
                  </div>
                </div>
                
                <h3 className="mb-2.5 text-[19px] font-bold tracking-[-0.01em] text-[#0F172A]">
                  {step.title}
                </h3>
                <p className="max-w-[260px] text-[15px] leading-[1.65] text-[#475569]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
