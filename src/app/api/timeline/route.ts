export const runtime = 'edge'

import { getTimelineEvents } from '@/lib/db-service'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const category = url.searchParams.get('category') || undefined

  const events = await getTimelineEvents(category)

  return Response.json({
    success: true,
    data: events,
  })
}
