import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest){
    const { title, description } = await req.json();
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.split(' ')[1]
    try{
        if(!token){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const newTask = await axios.post(`http://localhost:4000/tasks`, { title, description, status: "todo", createdAt: new Date().toISOString(), id: Date.now().toString() });
        return NextResponse.json({ message: "Task created successfully", task: newTask.data });
    }catch(error){
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest){
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.split(' ')[1]
    if(!token){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try{
        const res = await axios.get('http://localhost:4000/tasks');
        let tasks = res.data.sort((a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        return NextResponse.json({tasks: tasks});
    }catch(error){
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}