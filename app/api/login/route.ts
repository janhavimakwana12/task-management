import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { generateToken } from "@/utils/functions";

export async function POST(req: Request){
    const {email, password} = await req.json();
    const res = await axios.get(`http://localhost:4000/users?email=${email}&password=${password}`);
    const user = res.data[0];

    if(!user){
        return NextResponse.json({error: "Invalid credentials"}, {status: 401});
    }
    const token = generateToken(email);
    (await cookies()).set('auth_token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ message: 'Login successful', user });
}