"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import GoogleSignupSignInButton from "../GoogleSignupButton";
import { SignupFormValues } from "@/types";
import { signup } from "@/app/service/actions";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>();
  const router = useRouter();

  const onSubmit = async(data: SignupFormValues) => {
    try{
      const response = await signup(data);
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      await axios.post('/api/sync-token', { token: response.token })
      router.push('/tasks');
    }catch(error){
      console.log(error);
    }
  };

  const password = watch('password');

  return (
    <div className="mx-auto my-auto w-80 h-[calc(100%-52px)]">
      <div className="py-14">
        <p className="text-2xl text-blue-700 mb-3 font-bold">Signup</p>
        <form onSubmit={handleSubmit(onSubmit)} className="border-2 rounded-md border-blue-700 py-4 px-2">
          <div className="py-2 px-2">
            <input
              {...register("fName", { required: "First Name is required" })}
              type="text"
              id="fname-input"
              aria-label="fname-input"
              className={`w-full text-sm border-2 border-gray-300 focus:border-gray-400 py-1 px-2 outline-none placeholder:text-sm placeholder:font-medium placeholder:text-slate-400 ${
                errors.fName ? "border-red-500 focus:border-red-500" : "border-gray-400"
              }`}
              placeholder="First Name"
            />
            {errors.fName && (
              <span className="text-red-500 text-xs mt-1">
                {errors.fName.message}
              </span>
            )}
          </div>
          <div className="py-2 px-2">
            <input
              {...register("lName", { required: "Last Name is required" })}
              type="text"
              id="lname-input"
              aria-label="lname-input"
              className={`w-full text-sm border-2 border-gray-300 focus:border-gray-400 py-1 px-2 outline-none placeholder:text-sm placeholder:font-medium placeholder:text-slate-400 ${
                errors.lName ? "border-red-500 focus:border-red-500" : "border-gray-400"
              }`}
              placeholder="Last Name"
            />
            {errors.lName && (
              <span className="text-red-500 text-xs mt-1">
                {errors.lName.message}
              </span>
            )}
          </div>
          <div className="py-2 px-2">
            <input
              {...register("email", { required: "Email is required", pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              } })}
              type="email"
              id="email-input"
              aria-label="email-input"
              className={`w-full text-sm border-2 border-gray-300 focus:border-gray-400 py-1 px-2 outline-none placeholder:text-sm placeholder:font-medium placeholder:text-slate-400 ${
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
              type="password"
              id="password-input"
              aria-label="password-input"
              className={`w-full text-sm border-2 border-gray-300 focus:border-gray-400 py-1 px-2 outline-none placeholder:text-sm placeholder:font-medium placeholder:text-slate-400 ${
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
          <div className="py-2 px-2">
            <input
              {...register("cpassword", { required: "Confirmed Password is required"
                ,validate: (value) =>
                value === password || 'Passwords do not match', })}
              type="password"
              id="cpassword-input"
              aria-label="cpassword-input"
              className={`w-full text-sm border-2 border-gray-300 focus:border-gray-400 py-1 px-2 outline-none placeholder:text-sm placeholder:font-medium placeholder:text-slate-400 ${
                errors.cpassword ? "border-red-500 focus:border-red-500" : "border-gray-400"
              }`}
              placeholder="Confirmed Password"
            />
            {errors.cpassword && (
              <span className="text-red-500 text-xs mt-1">
                {errors.cpassword.message}
              </span>
            )}
            </div>
          <div className="py-2 px-2 ">
            <button type="submit" className="cursor-pointer w-full bg-blue-700 text-white font-medium text-sm p-2">
              Signup
            </button>
          </div>
          <div className="py-2 px-2">
            <p className="text-center text-sm font-medium">
              Already have an account?{" "}
              <Link className="text-blue-700" href="/login">
                Login
              </Link>
            </p>
          </div>
          <div className="py-2 px-2 flex">
            <GoogleSignupSignInButton type="Signup" />
          </div>
        </form>
      </div>
    </div>
  );
}
