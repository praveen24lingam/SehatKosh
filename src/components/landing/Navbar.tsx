'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { DURATION, EASE_OUT, useAppMotion } from '@/lib/motion';

const MotionLink = motion.create(Link);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pressInteraction } = useAppMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-[var(--border)] py-4'
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-[22px] font-extrabold tracking-[-0.02em] text-[var(--foreground)]">
            SehatKosh
          </Link>

          {/* Desktop Links */}
          <div className="hidden gap-8 md:flex">
            <a
              href="#how-it-works"
              className="text-[15px] font-semibold tracking-[-0.005em] text-[var(--foreground-secondary)] transition-colors hover:text-[var(--primary)]"
            >
              How it Works
            </a>
            <a
              href="#features"
              className="text-[15px] font-semibold tracking-[-0.005em] text-[var(--foreground-secondary)] transition-colors hover:text-[var(--primary)]"
            >
              Features
            </a>
          </div>
        </div>

        {/* Right CTA - Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <MotionLink
            href="/chat"
            {...pressInteraction}
            className="rounded-xl bg-[var(--foreground)] px-5 py-2.5 text-[15px] font-semibold tracking-[-0.005em] text-white transition-colors duration-200 hover:bg-[var(--primary)]"
          >
            Get Started
          </MotionLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="p-2 text-[var(--foreground)] md:hidden"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DURATION.base, ease: EASE_OUT }}
            className="overflow-hidden border-b border-[var(--border)] bg-white md:hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              <a 
                href="#how-it-works" 
                className="text-[var(--foreground-secondary)] font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a 
                href="#features" 
                className="text-[var(--foreground-secondary)] font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <hr className="border-[var(--border)]" />
              <Link
                href="/chat"
                className="bg-[var(--foreground)] text-white text-center px-5 py-3 rounded-xl font-semibold hover:bg-[var(--primary)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
