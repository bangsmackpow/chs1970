import { D1Database, R2Bucket } from '@cloudflare/workers-types'

export interface Env {
  DB: D1Database
  R2_BUCKET: R2Bucket
}

export interface Classmate {
  id: number
  first_name: string
  last_name: string
  maiden_name: string | null
  status: 'alive' | 'deceased' | 'unknown'
  bio: string | null
  email: string | null
  phone: string | null
  address: string | null
  photo_url: string | null
  r2_photo_key: string | null
}

export interface Memorial {
  id: number
  classmate_id: number
  memorial_text: string
  date_of_passing: string | null
  obituary_url: string | null
  photo_url: string | null
  r2_photo_key: string | null
  candle_lit: number
  first_name: string
  last_name: string
}

export interface GalleryItem {
  id: number
  title: string
  caption: string | null
  category: 'Academics' | 'Sports' | 'Candid' | 'Events' | 'Newspaper'
  date_taken: string | null
  r2_object_key: string
  thumbnail_r2_key: string | null
  width: number | null
  height: number | null
  tags: string | null
}

export interface TimelineEvent {
  id: number
  title: string
  description: string
  event_date: string
  category: string | null
  image_r2_key: string | null
  source_url: string | null
}
