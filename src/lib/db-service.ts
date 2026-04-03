import { getCloudflareContext } from '@opennextjs/cloudflare'
import { Classmate, Memorial, TimelineEvent } from './types'

export async function searchClassmates(
  query: string,
  page: number = 1,
  limit: number = 20
): Promise<{ items: Classmate[]; total: number }> {
  const { env } = await getCloudflareContext()
  const searchQuery = `%${query}%`
  const offset = (page - 1) * limit

  const sql = `
    SELECT id, first_name, last_name, maiden_name, status, bio, 
           email, phone, address, photo_url, r2_photo_key
    FROM classmates
    WHERE last_name LIKE ? 
       OR first_name LIKE ? 
       OR maiden_name LIKE ?
       OR bio LIKE ?
    ORDER BY last_name ASC, first_name ASC
    LIMIT ? OFFSET ?
  `

  const countSql = `
    SELECT COUNT(*) as total
    FROM classmates
    WHERE last_name LIKE ? 
       OR first_name LIKE ? 
       OR maiden_name LIKE ?
       OR bio LIKE ?
  `

  const [results, countResult] = await Promise.all([
    env.DB.prepare(sql).bind(searchQuery, searchQuery, searchQuery, searchQuery, limit, offset).all<Classmate>(),
    env.DB.prepare(countSql).bind(searchQuery, searchQuery, searchQuery, searchQuery).first<{ total: number }>(),
  ])

  return {
    items: results.results || [],
    total: countResult?.total || 0,
  }
}

export async function getClassmatesByStatus(
  status: 'alive' | 'deceased' | 'unknown'
): Promise<Classmate[]> {
  const { env } = await getCloudflareContext()
  const results = await env.DB.prepare(
    `SELECT * FROM classmates WHERE status = ? ORDER BY last_name ASC, first_name ASC`
  ).bind(status).all<Classmate>()

  return results.results || []
}

export async function getMemorials(): Promise<Memorial[]> {
  const { env } = await getCloudflareContext()
  const results = await env.DB.prepare(`
    SELECT m.*, c.first_name, c.last_name
    FROM memorials m
    JOIN classmates c ON m.classmate_id = c.id
    ORDER BY m.date_of_passing DESC
  `).all<Memorial>()

  return results.results || []
}

export async function getTimelineEvents(
  category?: string
): Promise<TimelineEvent[]> {
  const { env } = await getCloudflareContext()
  let sql = `SELECT * FROM timeline_events ORDER BY event_date ASC`
  const params: string[] = []

  if (category) {
    sql = `SELECT * FROM timeline_events WHERE category = ? ORDER BY event_date ASC`
    params.push(category)
  }

  const results = await env.DB.prepare(sql).bind(...params).all<TimelineEvent>()
  return results.results || []
}

export async function getAllClassmates(): Promise<Classmate[]> {
  const { env } = await getCloudflareContext()
  const results = await env.DB.prepare(
    `SELECT * FROM classmates ORDER BY last_name ASC, first_name ASC`
  ).all<Classmate>()

  return results.results || []
}
