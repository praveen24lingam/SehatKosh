import { FunctionDeclaration, SchemaType } from '@google/generative-ai'

export const sehatTools: FunctionDeclaration[] = [
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
  }
]
