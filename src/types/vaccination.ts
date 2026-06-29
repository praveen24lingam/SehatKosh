export interface NISVaccineEntry {
  vaccineName: string
  doseNumber: number
  ageInDays: number
  description: string
}

export interface ScheduledVaccine extends NISVaccineEntry {
  scheduledDate: Date
  status: 'done' | 'due' | 'overdue' | 'upcoming'
  given_date: string | null
}
