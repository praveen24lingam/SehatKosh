'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, ScanLine, MessageCircle } from 'lucide-react';

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

  const activeContent = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="w-full">
      {/* Tabs Header */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 md:gap-4 mb-12 pb-4 md:justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              whitespace-nowrap px-6 py-3 rounded-full text-sm md:text-base font-semibold transition-all
              ${
                activeTab === tab.id
                  ? 'bg-[#0D9488] text-white shadow-md'
                  : 'bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#0D9488] hover:text-[#0D9488]'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 items-center"
          >
            {/* Left: Illustration Placeholder */}
            <div className="relative w-full h-[300px] md:h-[450px] bg-[#F8FAFC] rounded-2xl flex items-center justify-center overflow-hidden">
              {(() => {
                const Icon = tabIcons[activeContent.id] ?? Sparkles;
                return <Icon className="w-24 h-24 text-[#0D9488]/30" strokeWidth={1.25} />;
              })()}
            </div>

            {/* Right: Features */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">
                {activeContent.label}
              </h3>
              <p className="text-[#475569] text-lg mb-8">
                {activeContent.description}
              </p>
              
              <ul className="space-y-4">
                {activeContent.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#0D9488] shrink-0" />
                    <span className="text-[#0F172A] font-medium leading-relaxed">
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
