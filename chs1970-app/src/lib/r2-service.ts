import { getCloudflareContext } from '@opennextjs/cloudflare'
import { GalleryItem } from './types'

export async function getGalleryItems(
  category?: string,
  page: number = 1,
  limit: number = 20
): Promise<{ items: GalleryItem[]; total: number }> {
  const { env } = await getCloudflareContext()

  let query = `
    SELECT id, title, caption, category, date_taken, r2_object_key, 
           thumbnail_r2_key, width, height, tags
    FROM gallery_metadata
  `
  let countQuery = `SELECT COUNT(*) as total FROM gallery_metadata`
  const params: (string | number)[] = []

  if (category) {
    query += ` WHERE category = ?`
    countQuery += ` WHERE category = ?`
    params.push(category)
  }

  query += ` ORDER BY date_taken DESC, id DESC LIMIT ? OFFSET ?`
  params.push(limit, (page - 1) * limit)

  const [items, countResult] = await Promise.all([
    env.DB.prepare(query).bind(...params).all<GalleryItem>(),
    env.DB.prepare(countQuery).bind(...(category ? [category] : [])).first<{ total: number }>(),
  ])

  return {
    items: items.results || [],
    total: countResult?.total || 0,
  }
}

export async function getGalleryItemById(id: number): Promise<GalleryItem | null> {
  const { env } = await getCloudflareContext()

  return env.DB.prepare(
    `SELECT * FROM gallery_metadata WHERE id = ?`
  ).bind(id).first<GalleryItem>()
}
