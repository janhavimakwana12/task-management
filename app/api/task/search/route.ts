import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.toLowerCase() || '';
  const queryStatus = searchParams.get('queryStatus')?.toLowerCase() || '';

  try{
    const res = await fetch('http://localhost:4000/tasks')
    const tasks = await res.json()

    if(!!queryStatus){
      const filtered = tasks.filter((task: any) => task.status.toLowerCase().includes(queryStatus))
      return NextResponse.json({ tasks: filtered });
    }
    const filtered = tasks.filter((task: any) => task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    )

    filtered ?? filtered.sort((a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    return NextResponse.json({ tasks: filtered });
  }catch(error){
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
