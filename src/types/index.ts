// User and Profile Types
export interface Profile {
  id: string
  username: string
  full_name?: string
  avatar_url?: string
  bio?: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

// Article Types
export interface Article {
  id: string
  title: string
  content: string
  excerpt?: string
  author_id: string
  published_at?: string
  is_published: boolean
  featured: boolean
  tags: string[]
  category?: string
  read_time?: number
  image_url?: string
  created_at: string
  updated_at: string
  author?: {
    username: string
    full_name?: string
    avatar_url?: string
  }
}

export interface ArticleFormData {
  title: string
  content: string
  excerpt?: string
  category?: string
  tags: string[]
  featured: boolean
  is_published: boolean
  image_url?: string
}

// Like Types
export interface Like {
  id: string
  user_id: string
  article_id: string
  created_at: string
}

// Comment Types
export interface Comment {
  id: string
  user_id: string
  article_id: string
  parent_id?: string
  content: string
  is_moderated: boolean
  moderated_by?: string
  created_at: string
  updated_at: string
  author?: {
    username: string
    full_name?: string
    avatar_url?: string
  }
  replies?: Comment[]
}

export interface CommentFormData {
  content: string
  parent_id?: string
}

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