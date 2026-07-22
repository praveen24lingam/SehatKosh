import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { SolutionSection } from '@/components/landing/SolutionSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A] overflow-x-hidden relative">
      <Navbar />
      
      {/* 
        Section 1: Hero
        Bold headline, CTA buttons, Phone mockup, Gradient decor
      */}
      <HeroSection />

      {/*
        Section 2: Problem
        Cards explaining why health information is hard to understand
      */}
      <ProblemSection />

      {/*
        Section 3: Solution
        How SehatKosh works (Steps)
      */}
      <SolutionSection />

      {/*
        Section 4: Features
        Tabbed UI for Scan & Explain and Ask in Hindi
      */}
      <FeaturesSection />

      {/*
        Section 5: CTA
        Final call to action and Footer
      */}
      <CTASection />
      <Footer />
    </main>
  );
}
