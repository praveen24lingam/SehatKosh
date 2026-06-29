export interface User {
  id: string
  phone_number: string
  name: string | null
  language: 'hindi' | 'english'
  created_at: string
}

export interface FamilyMember {
  id: string
  user_id: string
  name: string
  relation: 'self' | 'father' | 'mother' | 'child' | 
            'spouse' | 'grandparent' | 'other'
  dob: string | null
  blood_group: string | null
  allergies: string[]
  chronic_conditions: string[]
  emergency_contact: string | null
  gender: string | null
  created_at: string
}

export interface HealthRecord {
  id: string
  member_id: string
  record_type: 'blood_report' | 'prescription' | 
               'tablet_box' | 'discharge_summary' | 'other'
  title: string
  date: string
  image_url: string | null
  ai_summary: string | null
  raw_data: Record<string, unknown> | null
  created_at: string
}

export interface Vaccination {
  id: string
  member_id: string
  vaccine_name: string
  dose_number: number
  scheduled_date: string | null
  given_date: string | null
  status: 'done' | 'due' | 'overdue' | 'upcoming'
  notes: string | null
  created_at: string
}

export interface DoseReminder {
  id: string
  user_id: string
  member_id: string
  medicine_name: string
  time_of_day: 'morning' | 'afternoon' | 'evening' | 'night'
  time_label: string
  days: 'daily' | 'mon-fri' | 'alternate'
  is_active: boolean
  last_taken_date: string | null
  created_at: string
}

export interface SchemeSaved {
  id: string
  user_id: string
  scheme_name: string
  scheme_name_hindi: string | null
  benefit_description: string | null
  amount: string | null
  official_link: string | null
  last_verified: string
  created_at: string
}

export interface JanAushadhiHistory {
  id: string
  user_id: string
  branded_name: string
  generic_name: string | null
  monthly_savings: number | null
  yearly_savings: number | null
  created_at: string
}
