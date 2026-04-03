import { getCloudflareContext } from '@opennextjs/cloudflare'

export async function GET(request: Request) {
  const { env } = await getCloudflareContext()

  const url = new URL(request.url)
  const key = url.searchParams.get('key')

  if (!key) {
    return new Response('Missing key parameter', { status: 400 })
  }

  try {
    const object = await env.R2_BUCKET.get(key)

    if (!object) {
      return new Response('Image not found', { status: 404 })
    }

    const contentType = object.httpMetadata?.contentType || 'application/octet-stream'

    return new Response(object.body as ReadableStream, {
      headers: {
        'Content-Type': contentType,
        'etag': object.httpEtag,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('R2 fetch error:', error)
    return new Response('Failed to fetch image', { status: 500 })
  }
}
