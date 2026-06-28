export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  messageType: 'text' | 'image' | 'document'
  timestamp: Date
  responseType?: 'health_qa' | 'document_analysis' | 
                'jan_aushadhi' | 'yojana' | 'record_save' |
                'medicine_info' | 'handwritten_reject'
  data?: Record<string, unknown>
  imageUrl?: string
}

export interface ChatResponse {
  success: boolean
  response: string
  responseType: string
  data?: Record<string, unknown>
}
