import { NextResponse } from "next/server";
import axios from "axios";
import { generateToken } from "@/utils/functions";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try{
    const res = await axios.get(
      `http://localhost:4000/users?email=${email}&password=${password}`
    );
    const user = res.data[0];

    if (!user) {
      return NextResponse.json({ message: "Invalid credentialssss" }, { status: 401 });
    }
    const token = generateToken(email);
    return NextResponse.json({ message: "Login successful", user, token });
  }catch(error){
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
