'use server';
import { redirect } from "next/navigation";
import { LoginFormValues, SignupFormValues } from "@/types";
import api from "@/utils/api";
import { cookies } from "next/headers";

export async function logout(){
    try{
        (await cookies()).delete('auth_token')
    }catch(error){
       console.log("##error",error);
    }
}

export async function signup(formData: SignupFormValues){
    const response = await api.post('http://localhost:3000/api/signup', {
        name: formData.fName + " " + formData.lName,
        email: formData.email,
        password: formData.password
    });
    return response.data;
}

export async function login(formData: LoginFormValues){
    return await api.post('http://localhost:3000/api/login', {
            email: formData.email,
            password: formData.password
        }).then((res) => {
            return res.data;
        }).catch((error) => {
            throw(new Error(error.response.data.message));
        });
}