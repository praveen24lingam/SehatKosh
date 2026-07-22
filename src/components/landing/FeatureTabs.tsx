'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, ScanLine, MessageCircle } from 'lucide-react';
import { DURATION, EASE_OUT, useAppMotion } from '@/lib/motion';

export interface TabItem {
  id: string;
  label: string;
  description: string;
  features: string[];
}

interface FeatureTabsProps {
  tabs: TabItem[];
}

// Placeholder icons shown in place of the removed feature mockup images.
const tabIcons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  'scan-explain': ScanLine,
  'ask-hindi': MessageCircle,
};

export function FeatureTabs({ tabs }: FeatureTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { pressInteraction, reduce } = useAppMotion();

  const activeContent = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="w-full">
      {/* Tabs Header */}
      <div className="hide-scrollbar mb-12 flex gap-2 overflow-x-auto pb-4 md:justify-center md:gap-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={isActive}
              {...pressInteraction}
              className={`whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold tracking-[-0.005em] transition-[background-color,border-color,color,box-shadow] duration-200 md:text-base ${
                isActive
                  ? 'bg-[var(--primary)] text-white shadow-[0_8px_20px_rgb(var(--teal-rgb) / 0.25)]'
                  : 'border border-[var(--border)] bg-white text-[var(--foreground-secondary)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)]'
              }`}
            >
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content — a signature panel, so it keeps the 24px panel radius
          while the cards elsewhere stay at 16px. */}
      <div className="min-h-[500px] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-white shadow-[var(--shadow-card)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: DURATION.base, ease: EASE_OUT }}
            className="grid grid-cols-1 items-center gap-8 p-8 md:grid-cols-2 md:p-12"
          >
            {/* Left: Illustration Placeholder */}
            <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--background)] md:h-[450px]">
              <div
                aria-hidden
                className="hero-dots pointer-events-none absolute inset-0 opacity-40"
              />
              {(() => {
                const Icon = tabIcons[activeContent.id] ?? Sparkles;
                return <Icon className="relative h-24 w-24 text-[var(--primary)]/30" strokeWidth={1.25} />;
              })()}
            </div>

            {/* Right: Features */}
            <div>
              <h3 className="mb-4 text-[24px] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--foreground)] md:text-[30px]">
                {activeContent.label}
              </h3>
              <p className="mb-8 text-[17px] leading-[1.6] tracking-[-0.005em] text-[var(--foreground-secondary)] md:text-[18px]">
                {activeContent.description}
              </p>

              <ul className="space-y-4">
                {activeContent.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-[var(--primary)]" />
                    <span className="text-[15px] font-medium leading-[1.6] text-[var(--foreground)]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
