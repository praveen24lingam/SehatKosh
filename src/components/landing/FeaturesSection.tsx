'use client';

import { motion } from 'framer-motion';
import { FeatureTabs, TabItem } from './FeatureTabs';
import { useReveal } from '@/lib/motion';

const featureTabsData: TabItem[] = [
  {
    id: "scan-explain",
    label: "Scan & Explain",
    description: "Kisi bhi printed medical document ki photo kheencho — AI use aasan Hindi mein samjhaayega.",
    features: [
      "Lab reports padho — values, normal range aur matlab, sab Hindi mein.",
      "Printed prescriptions aur tablet box scan karo, dawai ka kaam samjho.",
      "Handwritten documents ko AI politely mana kar deta hai — galat padhne se behtar."
    ]
  },
  {
    id: "ask-hindi",
    label: "Ask in Hindi",
    description: "Sehat se jude sawaal apni bhasha mein poochho — Hindi, Hinglish ya English.",
    features: [
      "Bukhar, periods, common bimariyan — kisi bhi topic pe saral jawab.",
      "Safety-first: AI kabhi diagnosis nahi karta, hamesha doctor se milne ko kehta hai.",
      "Built for Bharat — roz-marra ki Hindi mein, medical jargon ke bina."
    ]
  }
];

export function FeaturesSection() {
  const { parent, item, viewport } = useReveal();

  return (
    <section id="features" className="px-6 py-20 md:py-28 bg-white">
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
            Everything You Need to Understand Your Health
          </motion.h2>
          <motion.p
            variants={item}
            className="text-[17px] leading-[1.6] tracking-[-0.005em] text-[var(--foreground-secondary)] md:text-[18px]"
          >
            One AI assistant that reads your documents and answers your questions — in the language you actually speak.
          </motion.p>
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <FeatureTabs tabs={featureTabsData} />
        </motion.div>
      </div>
    </section>
  );
}
