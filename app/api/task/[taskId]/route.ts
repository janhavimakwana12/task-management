import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


export async function PATCH(req: NextRequest, { params }: { params: { taskId: string } }) {
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.split(' ')[1]

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const {taskId} = await params;

    const { title, description } = await req.json();
    try{
        const res = await axios.patch(
            `http://localhost:4000/tasks/${taskId}`, {title, description}
            );
            const taskDetails = res.data[0];
            return NextResponse.json({ taskDetails, message: "Task updated successfully" });
    }catch(error){
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest, { params }: { params: { taskId: string } }) {
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.split(' ')[1]

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const {taskId} = await params;
    try{
        const res = await axios.get(
            `http://localhost:4000/tasks?id=${taskId}`
            );
            const taskDetails = res.data[0];

            return NextResponse.json({ taskDetails });
    }catch(error){
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { taskId: string } }) {
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.split(' ')[1]

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    try{
        await axios.delete(
            `http://localhost:4000/tasks/${params.taskId}`
            );
        return NextResponse.json({ message: "Task deleted successfully" });
    }catch(error){
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


