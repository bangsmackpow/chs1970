import { getGalleryItems, getGalleryItemById } from '@/lib/r2-service'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  const category = url.searchParams.get('category') || undefined
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = parseInt(url.searchParams.get('limit') || '20', 10)

  if (id) {
    const item = await getGalleryItemById(parseInt(id, 10))
    if (!item) {
      return Response.json({ error: 'Gallery item not found' }, { status: 404 })
    }
    return Response.json({ success: true, data: item })
  }

  const results = await getGalleryItems(category, page, limit)

  return Response.json({
    success: true,
    data: results,
    category,
    page,
  })
}
