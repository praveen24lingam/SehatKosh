import { uipSchedule } from '../constants/uipSchedule'

export function generateVaccinationSchedule(dob: Date) {
  return uipSchedule.map(vaccine => {
    const scheduledDate = new Date(dob)
    scheduledDate.setDate(scheduledDate.getDate() + vaccine.offsetDays)
    
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
      vaccineName: vaccine.name,
      doseNumber: vaccine.doseNumber,
      ageInDays: vaccine.offsetDays,
      description: vaccine.notes,
      scheduledDate,
      status,
      given_date: null,
    }
  })
}
