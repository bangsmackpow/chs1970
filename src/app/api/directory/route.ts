export const runtime = 'edge'

import { getAllClassmates } from '@/lib/db-service'

export async function GET() {
  try {
    const classmates = await getAllClassmates()

    return Response.json({
      success: true,
      data: classmates,
    })
  } catch (error) {
    console.error('Directory fetch error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
