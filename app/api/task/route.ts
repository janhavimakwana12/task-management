import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest){
    const { title, description } = await req.json();
    const token = req.cookies.get('token')?.value || await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });
    if(!token){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const newTask = await axios.post(`http://localhost:4000/tasks`, { title, description, status: "pending", createdAt: new Date().toISOString() });
    return NextResponse.json({ message: "Task created successfully", task: newTask.data });
}

export async function GET(req: NextRequest){
    try{
        const tasks = await axios.get('http://localhost:4000/tasks');
        return NextResponse.json({tasks: tasks.data});
    }catch(error){
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}