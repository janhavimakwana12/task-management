"use client";
import { signIn } from "next-auth/react";

export default function GoogleSignupSignInButton(props:{type:string}) {
  return (
    <button onClick={() => signIn("google", {
      callbackUrl:'/tasks'
    })} className="cursor-pointer bg-blue-700 text-white rounded-md mx-auto font-medium text-sm p-2">
      {props.type} with <span className="font-bold">Google</span>
    </button>
  );
}
