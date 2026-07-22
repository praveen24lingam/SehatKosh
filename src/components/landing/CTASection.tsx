'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] px-6 py-20 md:py-28">
      {/* Background radial gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(13,148,136,0.2)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="mb-5 text-[30px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white md:text-[42px]">
            Apni Sehat, Apni Bhasha Mein.
          </h2>
          <p className="mx-auto mb-9 max-w-xl text-[17px] leading-[1.65] text-white/70 md:text-lg">
            Report ki photo kheencho ya sawaal poochho — AI aasan Hindi mein jawab dega. Abhi shuru karo.
          </p>
          
          <Link
            href="/chat"
            className="inline-block bg-[#0D9488] text-white px-10 py-5 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(13,148,136,0.3)] transition-all mb-4"
          >
            Get Started Free
          </Link>
          
          <div className="text-white/60 text-sm">
            Free forever. No credit card needed.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
