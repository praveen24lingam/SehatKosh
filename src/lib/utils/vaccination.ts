export const NIS_SCHEDULE = [
  { 
    vaccineName: 'BCG', 
    doseNumber: 1, 
    ageInDays: 0,
    description: 'Birth pe'
  },
  { 
    vaccineName: 'OPV', 
    doseNumber: 0,
    ageInDays: 0,
    description: 'Birth pe (zero dose)'
  },
  { 
    vaccineName: 'Hepatitis B', 
    doseNumber: 1,
    ageInDays: 0,
    description: 'Birth pe'
  },
  { 
    vaccineName: 'OPV', 
    doseNumber: 1,
    ageInDays: 42, // 6 weeks
    description: '6 hafte pe'
  },
  { 
    vaccineName: 'Pentavalent', 
    doseNumber: 1,
    ageInDays: 42,
    description: '6 hafte pe'
  },
  { 
    vaccineName: 'Rotavirus', 
    doseNumber: 1,
    ageInDays: 42,
    description: '6 hafte pe'
  },
  { 
    vaccineName: 'IPV', 
    doseNumber: 1,
    ageInDays: 42,
    description: '6 hafte pe'
  },
  { 
    vaccineName: 'OPV', 
    doseNumber: 2,
    ageInDays: 70, // 10 weeks
    description: '10 hafte pe'
  },
  { 
    vaccineName: 'Pentavalent', 
    doseNumber: 2,
    ageInDays: 70,
    description: '10 hafte pe'
  },
  { 
    vaccineName: 'Rotavirus', 
    doseNumber: 2,
    ageInDays: 70,
    description: '10 hafte pe'
  },
  { 
    vaccineName: 'OPV', 
    doseNumber: 3,
    ageInDays: 98, // 14 weeks
    description: '14 hafte pe'
  },
  { 
    vaccineName: 'Pentavalent', 
    doseNumber: 3,
    ageInDays: 98,
    description: '14 hafte pe'
  },
  { 
    vaccineName: 'Rotavirus', 
    doseNumber: 3,
    ageInDays: 98,
    description: '14 hafte pe'
  },
  { 
    vaccineName: 'IPV', 
    doseNumber: 2,
    ageInDays: 98,
    description: '14 hafte pe'
  },
  { 
    vaccineName: 'Measles-Rubella', 
    doseNumber: 1,
    ageInDays: 274, // 9 months
    description: '9 mahine pe'
  },
  { 
    vaccineName: 'Vitamin A', 
    doseNumber: 1,
    ageInDays: 274,
    description: '9 mahine pe'
  },
  { 
    vaccineName: 'DPT Booster', 
    doseNumber: 1,
    ageInDays: 548, // 18 months
    description: '18 mahine pe'
  },
  { 
    vaccineName: 'OPV Booster', 
    doseNumber: 1,
    ageInDays: 548,
    description: '18 mahine pe'
  },
  { 
    vaccineName: 'Measles-Rubella', 
    doseNumber: 2,
    ageInDays: 548,
    description: '18 mahine pe'
  },
]

export function generateVaccinationSchedule(dob: Date) {
  return NIS_SCHEDULE.map(vaccine => {
    const scheduledDate = new Date(dob)
    scheduledDate.setDate(scheduledDate.getDate() + vaccine.ageInDays)
    
    const today = new Date()
    let status: 'done' | 'due' | 'overdue' | 'upcoming'
    
    if (scheduledDate < today) {
      status = 'overdue'
    } else if (
      scheduledDate.getTime() - today.getTime() < 15 * 24 * 60 * 60 * 1000
    ) {
      status = 'due'
    } else {
      status = 'upcoming'
    }
    
    return {
      ...vaccine,
      scheduledDate,
      status,
      given_date: null,
    }
  })
}
