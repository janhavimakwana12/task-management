import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { generateToken } from "@/utils/functions";

export async function POST(req: Request){
    const {email, name, password} = await req.json();
    try{
        const res = await axios.get(`http://localhost:4000/users?email=${email}`);

    if(res.data.length > 0){
        return NextResponse.json({message: "User already exists"}, {status: 401});
    }

    const token = generateToken(email)

    const newUser = await axios.post(`http://localhost:4000/users`, {
        email,
        name,
        password,
        authProvider: 'email',
        token,
    });
    return NextResponse.json({ message: "Signup successful", user: newUser.data, token });
    }catch(error){
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}