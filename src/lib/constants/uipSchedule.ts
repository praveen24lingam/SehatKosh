export interface UIPVaccine {
  name: string
  offsetDays: number
  doseNumber: number
  notes: string
}

export const uipSchedule: UIPVaccine[] = [
  // At Birth (0 days)
  { name: 'BCG', offsetDays: 0, doseNumber: 1, notes: 'Protects against Tuberculosis' },
  { name: 'OPV', offsetDays: 0, doseNumber: 0, notes: 'Oral Polio Vaccine - Birth Dose' },
  { name: 'Hepatitis B', offsetDays: 0, doseNumber: 1, notes: 'Birth Dose' },

  // 6 Weeks (42 days)
  { name: 'OPV', offsetDays: 42, doseNumber: 1, notes: 'Oral Polio Vaccine' },
  { name: 'Pentavalent', offsetDays: 42, doseNumber: 1, notes: 'Protects against Diphtheria, Pertussis, Tetanus, Hep-B, Hib' },
  { name: 'Rotavirus', offsetDays: 42, doseNumber: 1, notes: 'Protects against severe diarrhea' },
  { name: 'fIPV', offsetDays: 42, doseNumber: 1, notes: 'Inactivated Polio Vaccine' },

  // 10 Weeks (70 days)
  { name: 'OPV', offsetDays: 70, doseNumber: 2, notes: 'Oral Polio Vaccine' },
  { name: 'Pentavalent', offsetDays: 70, doseNumber: 2, notes: 'Protects against Diphtheria, Pertussis, Tetanus, Hep-B, Hib' },
  { name: 'Rotavirus', offsetDays: 70, doseNumber: 2, notes: 'Protects against severe diarrhea' },

  // 14 Weeks (98 days)
  { name: 'OPV', offsetDays: 98, doseNumber: 3, notes: 'Oral Polio Vaccine' },
  { name: 'Pentavalent', offsetDays: 98, doseNumber: 3, notes: 'Protects against Diphtheria, Pertussis, Tetanus, Hep-B, Hib' },
  { name: 'Rotavirus', offsetDays: 98, doseNumber: 3, notes: 'Protects against severe diarrhea' },
  { name: 'fIPV', offsetDays: 98, doseNumber: 2, notes: 'Inactivated Polio Vaccine' },

  // 9-12 Months (approx 270 days)
  { name: 'MR', offsetDays: 274, doseNumber: 1, notes: 'Measles & Rubella' },
  { name: 'JE', offsetDays: 274, doseNumber: 1, notes: 'Japanese Encephalitis' },

  // 16-24 Months (approx 480 days)
  { name: 'MR', offsetDays: 486, doseNumber: 2, notes: 'Measles & Rubella' },
  { name: 'JE', offsetDays: 486, doseNumber: 2, notes: 'Japanese Encephalitis' },
  { name: 'DPT Booster', offsetDays: 486, doseNumber: 1, notes: 'Diphtheria, Pertussis, Tetanus' },
  { name: 'OPV Booster', offsetDays: 486, doseNumber: 1, notes: 'Oral Polio Vaccine' },

  // 5-6 Years (approx 1825 days)
  { name: 'DPT Booster', offsetDays: 1825, doseNumber: 2, notes: 'Diphtheria, Pertussis, Tetanus' },
]
