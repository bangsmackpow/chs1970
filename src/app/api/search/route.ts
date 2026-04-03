import { getCloudflareContext } from '@opennextjs/cloudflare'
import { searchClassmates } from '@/lib/db-service'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { query = '', page = 1, limit = 20 } = body

    if (!query || query.trim().length === 0) {
      return Response.json({ error: 'Search query is required' }, { status: 400 })
    }

    const results = await searchClassmates(query, page, limit)

    return Response.json({
      success: true,
      data: results,
      query,
      page,
    })
  } catch (error) {
    console.error('Search error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const query = url.searchParams.get('q') || ''
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = parseInt(url.searchParams.get('limit') || '20', 10)

  if (!query) {
    return Response.json({ error: 'Search query is required' }, { status: 400 })
  }

  const results = await searchClassmates(query, page, limit)

  return Response.json({
    success: true,
    data: results,
    query,
    page,
  })
}
