import { FunctionDeclaration, SchemaType } from '@google/generative-ai'

export const sehatTools: FunctionDeclaration[] = [
  {
    name: 'add_family_member',
    description: 'Add a new family member or child profile to the database.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        name: { type: SchemaType.STRING, description: "The person's full name." },
        relation: { type: SchemaType.STRING, description: "Relation to the user (e.g., father, mother, spouse, child, sibling, other)." },
        dob: { type: SchemaType.STRING, description: "Date of birth in YYYY-MM-DD format. If age is given, estimate the DOB." },
        gender: { type: SchemaType.STRING, description: "male, female, or other." },
        blood_group: { type: SchemaType.STRING, description: "Optional blood group (e.g., A+, O-)." }
      },
      required: ['name', 'relation', 'gender']
    }
  },
  {
    name: 'add_reminder',
    description: 'Create a medicine or doctor appointment reminder.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        type: { type: SchemaType.STRING, description: "Must be 'medicine' or 'appointment'." },
        title: { type: SchemaType.STRING, description: "Name of the medicine or doctor." },
        time: { type: SchemaType.STRING, description: "Time of the reminder in HH:MM format." },
        frequency: { type: SchemaType.STRING, description: "e.g., 'daily', 'weekly', 'once'." }
      },
      required: ['type', 'title', 'time']
    }
  },
  {
    name: 'update_vaccine_status',
    description: 'Mark a specific vaccine as completed/done for a family member.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        vaccine_name: { type: SchemaType.STRING, description: "Name of the vaccine (e.g., BCG, OPV)." },
        member_name: { type: SchemaType.STRING, description: "Name of the child/member." }
      },
      required: ['vaccine_name', 'member_name']
    }
  },
  {
    name: 'search_generic_medicines',
    description: 'Search for generic Jan Aushadhi alternatives for a branded medicine.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        medicine_name: { type: SchemaType.STRING, description: "The branded medicine name." }
      },
      required: ['medicine_name']
    }
  },
  {
    name: 'check_government_schemes',
    description: 'Check government health scheme eligibility based on user profile.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        age: { type: SchemaType.NUMBER, description: "Age of the person." },
        gender: { type: SchemaType.STRING, description: "Gender of the person." },
        disease: { type: SchemaType.STRING, description: "Optional specific disease or condition." }
      },
      required: ['age']
    }
  },
  {
    name: 'save_health_record',
    description: 'Save a medical document or report analysis to the health locker.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        member_name: { type: SchemaType.STRING, description: "Name of the family member." },
        title: { type: SchemaType.STRING, description: "Title of the record." },
        record_type: { type: SchemaType.STRING, description: "e.g., prescription, blood_report." },
        summary: { type: SchemaType.STRING, description: "The extracted summary of the document." }
      },
      required: ['member_name', 'title', 'record_type']
    }
  }
]
