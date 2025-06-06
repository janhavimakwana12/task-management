import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.toLowerCase() || ''

  const res = await fetch('http://localhost:4000/tasks')
  const tasks = await res.json()

  const filtered = tasks.filter((task: any) =>
    task.title.toLowerCase().includes(query) ||
    task.description.toLowerCase().includes(query)
  )

  return NextResponse.json({ tasks: filtered })
}
