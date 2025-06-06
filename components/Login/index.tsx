"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import GoogleSignupSignInButton from "../GoogleSignupButton";
import { LoginFormValues } from "@/types";
import { login } from "@/app/service/actions";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const router = useRouter();

  const onSubmit = async(data: LoginFormValues) => {
    try{
      const response = await login(data);
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      await axios.post('/api/sync-token', { token: response.token })
      window.location.href = '/tasks';
    }catch(error){
      console.log(error);
    }
  };

  return (
    <div className="mx-auto my-auto w-80 h-[calc(100%-52px)]">
      <div className="py-20">
        <p className="text-2xl text-blue-700 mb-3 font-bold">Login</p>
        <form onSubmit={handleSubmit(onSubmit)} className="border-2 rounded-md border-blue-700 py-4 px-2">
          <div className="py-2 px-2">
            <input
              {...register("email", { required: "Email is required",pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              } })}
              type="email"
              id="email-input"
              aria-label="email-input"
              className={`w-full text-sm border-2 border-gray-300 focus:border-gray-400 py-1 px-2 outline-none placeholder:text-sm placeholder:font-medium placeholder:text-slate-400 outline-none border-b text-sm ${
                errors.email ? "border-red-500 focus:border-red-500" : "border-gray-400"
              }`}
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="py-2 px-2">
            <input
            {...register("password", { required: "Password is required" })}
              type="text"
              id="password-input"
              aria-label="password-input"
              className={`w-full text-sm border-2 border-gray-300 focus:border-gray-400 py-1 px-2 outline-none placeholder:text-sm placeholder:font-medium placeholder:text-slate-400 outline-none border-b text-sm ${
                errors.password ? "border-red-500 focus:border-red-500" : "border-gray-400"
              }`}
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="py-2 px-2 ">
            <button type="submit" className="cursor-pointer w-full bg-blue-700 text-white font-medium text-sm p-2">
              Login
            </button>
          </div>
          <div className="py-2 px-2">
            <p className="text-center text-sm font-medium">
              Dont't have an account?{" "}
              <Link className="text-blue-700" href="/register">
                Signup
              </Link>
            </p>
          </div>
          <div className="py-2 px-2 flex">
            <GoogleSignupSignInButton type="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}
