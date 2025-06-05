'use client';
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLinks (props: {isLoggedIn: boolean}) {
    const pathname = usePathname();
    return <> {props.isLoggedIn
        ? <Link href="#" className="bg-red-500 rounded-md px-3 py-2 text-sm font-medium text-white">Logout</Link>
        : <>
        <Link href="/login" className={`${pathname === "/login" ? "bg-white text-blue-700": "bg-blue-700 text-white"} rounded-md px-3 py-2 text-sm font-bold`}>Login</Link>
        <Link href="/register" className={`${pathname === "/register" ? "bg-white text-blue-700": "bg-blue-700 text-white"} rounded-md px-3 py-2 text-sm font-medium`}>Signup</Link>
        </>}
    </>
}