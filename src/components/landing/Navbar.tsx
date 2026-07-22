'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-[#E2E8F0] py-4'
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-[#0F172A] text-2xl font-extrabold tracking-tight">
            SehatKosh
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8">
            <a href="#how-it-works" className="text-[#475569] font-semibold hover:text-[#0D9488] transition-colors">
              How it Works
            </a>
            <a href="#features" className="text-[#475569] font-semibold hover:text-[#0D9488] transition-colors">
              Features
            </a>
          </div>
        </div>

        {/* Right CTA - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/chat"
            className="bg-[#0F172A] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#0D9488] transition-colors hover-lift"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#0F172A] p-2"
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
            className="md:hidden bg-white border-b border-[#E2E8F0] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              <a 
                href="#how-it-works" 
                className="text-[#475569] font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a 
                href="#features" 
                className="text-[#475569] font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <hr className="border-[#E2E8F0]" />
              <Link
                href="/chat"
                className="bg-[#0F172A] text-white text-center px-5 py-3 rounded-xl font-semibold hover:bg-[#0D9488] transition-colors"
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
