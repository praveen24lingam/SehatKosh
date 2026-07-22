'use client'

import { motion } from 'framer-motion'
import { useLanguageStore } from '@/store/useLanguageStore'
import { useAppMotion, enterDelay } from '@/lib/motion'
import { FileSearch, Pill, Stethoscope, Landmark, MessageCircleQuestion } from 'lucide-react'

interface ChatActionCardsProps {
  onSelect: (text: string) => void
}

interface ActionCard {
  /** Shown on the card. */
  label: string
  /** Small line under the label. */
  hint: string
  /** What actually gets sent to the assistant when the card is tapped. */
  prompt: string
  icon: React.ElementType
}

export function ChatActionCards({ onSelect }: ChatActionCardsProps) {
  const { language } = useLanguageStore()
  const { cardInteraction } = useAppMotion()

  const actions: ActionCard[] = language === 'hindi' ? [
    {
      label: 'मेडिकल रिपोर्ट समझें',
      hint: 'ब्लड या लैब रिपोर्ट की फोटो भेजें',
      prompt: 'मैं अपनी मेडिकल रिपोर्ट समझना चाहता हूँ। कृपया आसान भाषा में समझाइए।',
      icon: FileSearch
    },
    {
      label: 'दवाई / टैबलेट स्कैन करें',
      hint: 'दवाई के डिब्बे की जानकारी पाएं',
      prompt: 'मैं अपनी दवाई के डिब्बे की जानकारी जानना चाहता हूँ। यह दवाई आमतौर पर किस काम आती है?',
      icon: Pill
    },
    {
      label: 'अपने लक्षण समझें',
      hint: 'सिर्फ सामान्य जानकारी, कोई निदान नहीं',
      prompt: 'मुझे मेरे लक्षणों के बारे में सामान्य जानकारी चाहिए — ये क्यों होते हैं और कब डॉक्टर को दिखाना चाहिए?',
      icon: Stethoscope
    },
    {
      label: 'सरकारी स्वास्थ्य योजनाएं',
      hint: 'PM-JAY और दूसरी योजनाओं की जानकारी',
      prompt: 'सरकारी स्वास्थ्य योजनाओं के बारे में सामान्य जानकारी दीजिए।',
      icon: Landmark
    },
    {
      label: 'सेहत से जुड़ा सवाल पूछें',
      hint: 'बुखार, पीरियड्स, डायबिटीज़ और बहुत कुछ',
      prompt: 'मुझे सेहत से जुड़ा एक सवाल पूछना है।',
      icon: MessageCircleQuestion
    }
  ] : [
    {
      label: 'Analyze Medical Report',
      hint: 'Upload a blood or lab report photo',
      prompt: 'I want to understand my medical report. Please explain it in simple language.',
      icon: FileSearch
    },
    {
      label: 'Scan Medicine / Tablet',
      hint: 'Get details from a medicine box',
      prompt: 'I want to know about my medicine box. What is this medicine generally used for?',
      icon: Pill
    },
    {
      label: 'Understand Symptoms',
      hint: 'General information only, no diagnosis',
      prompt: 'I would like general information about my symptoms — why they happen and when I should see a doctor.',
      icon: Stethoscope
    },
    {
      label: 'Find Government Health Schemes',
      hint: 'PM-JAY and other scheme information',
      prompt: 'Please give me general information about government health schemes.',
      icon: Landmark
    },
    {
      label: 'Ask a Health Question',
      hint: 'Fever, periods, diabetes and more',
      prompt: 'I have a health question to ask.',
      icon: MessageCircleQuestion
    }
  ]

  return (
    <div style={{ width: '100%', fontFamily: 'Inter, sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .action-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        /* The catch-all card closes the grid so the last row never looks orphaned. */
        .action-card--wide {
          grid-column: span 2;
        }
        @media (max-width: 640px) {
          .action-cards-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 10px;
          }
          .action-card--wide {
            grid-column: span 1;
          }
        }

        .action-card {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          padding: 16px;
          text-align: left;
          cursor: pointer;
          background: #FFFFFF;
          border: 1px solid rgba(15,23,42, 0.07);
          border-radius: 16px;
          box-shadow: 0 1px 2px rgba(15,23,42, 0.04);
          outline: none;
          /* Transform is driven by Framer Motion; CSS only handles the
             surface treatment so the two never fight over the same property. */
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .action-card:hover {
          border-color: rgba(13,148,136, 0.28);
          box-shadow: 0 8px 20px rgba(15,23,42, 0.06);
        }
        .action-card:focus-visible {
          border-color: #0D9488;
          box-shadow: 0 0 0 3px rgba(13,148,136, 0.15);
        }

        .action-icon-wrap {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(13,148,136, 0.08);
          color: #0D9488;
          transition: background 0.2s ease;
        }
        .action-card:hover .action-icon-wrap {
          background: rgba(13,148,136, 0.14);
        }

        .action-card-label {
          font-size: 15px;
          font-weight: 600;
          line-height: 1.35;
          color: #0F172A;
          letter-spacing: -0.1px;
        }
        .action-card-hint {
          font-size: 13px;
          font-weight: 400;
          line-height: 1.45;
          color: #94A3B8;
        }
      `}} />

      <div className="action-cards-grid">
        {actions.map((action, idx) => {
          const Icon = action.icon
          const isLast = idx === actions.length - 1
          return (
            <motion.button
              key={action.label}
              onClick={() => onSelect(action.prompt)}
              className={`action-card app-enter${isLast ? ' action-card--wide' : ''}`}
              style={enterDelay(idx)}
              {...cardInteraction}
            >
              <span className="action-icon-wrap">
                <Icon size={18} strokeWidth={2} />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                <span className={`action-card-label ${language === 'hindi' ? 'font-hindi' : ''}`}>
                  {action.label}
                </span>
                <span className={`action-card-hint ${language === 'hindi' ? 'font-hindi' : ''}`}>
                  {action.hint}
                </span>
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
