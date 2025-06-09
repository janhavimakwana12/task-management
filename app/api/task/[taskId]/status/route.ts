import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function PATCH(req: NextRequest, { params }: { params: { taskId: string } }){
    const  { status } = await req.json();
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.split(' ')[1]

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try{
        const {taskId} = await params;
        const updatedTask = await axios.patch(`http://localhost:4000/tasks/${taskId}`, { status });
        return NextResponse.json({ message: "Task status updated successfully", task: updatedTask.data });
    }catch(error){
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}