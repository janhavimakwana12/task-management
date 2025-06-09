'use client';
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { logout } from "@/app/service/actions";
import { useRouter } from 'next/navigation'

export default function NavLinks (props: {isLoggedIn: boolean}) {
    const pathname = usePathname();
    const router = useRouter()
    const handleLogout = async() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        await logout();
        router.push('/login');
        await signOut();
    }

    return <> {props.isLoggedIn
        ? <button onClick={handleLogout} className="cursor-pointer bg-red-500 rounded-md px-3 py-2 text-sm font-medium text-white">Logout</button>
        : <>
        <Link href="/login"  className={`${pathname === "/login" ? "bg-white text-blue-700": "bg-blue-700 text-white"} rounded-md px-3 py-2 text-sm font-bold`}>Login</Link>
        <Link href="/register" className={`${pathname === "/register" ? "bg-white text-blue-700": "bg-blue-700 text-white"} rounded-md px-3 py-2 text-sm font-medium`}>Signup</Link>
        </>}
    </>
}