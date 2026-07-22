'use client';

import { motion } from 'framer-motion';
import { FeatureTabs, TabItem } from './FeatureTabs';

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
  return (
    <section id="features" className="px-6 py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mb-14 max-w-2xl text-center md:mb-16"
        >
          <h2 className="mb-5 text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0F172A] md:text-[42px]">
            Everything You Need to Understand Your Health
          </h2>
          <p className="text-[17px] leading-[1.65] text-[#475569] md:text-lg">
            One AI assistant that reads your documents and answers your questions — in the language you actually speak.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <FeatureTabs tabs={featureTabsData} />
        </motion.div>
      </div>
    </section>
  );
}
