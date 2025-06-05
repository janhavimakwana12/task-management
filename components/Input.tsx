'use client';
import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    className?: string;
}

export default function Input({className, ...props}: InputProps){
    return (
        <input
            {...props}
            className={clsx("text-sm border-2 border-gray-300 focus:border-gray-400 py-1 px-2 outline-none placeholder:text-sm placeholder:font-medium placeholder:text-slate-400", className)}
        />
    )
}