

// API Response Types
export interface ApiResponse<T> {
  data?: T
  error?: string
  loading?: boolean
}

// Search and Filter Types
export interface SearchFilters {
  query?: string
  category?: string
  tags?: string[]
  author?: string
  featured?: boolean
  published?: boolean
}

// Pagination Types
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

// Form Validation Types
export interface ValidationError {
  field: string
  message: string
}

export interface FormState<T> {
  data: T
  errors: ValidationError[]
  loading: boolean
}

// Real-time Subscription Types
export interface RealtimeEvent<T> {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new: T | null
  old: T | null
  table: string
}