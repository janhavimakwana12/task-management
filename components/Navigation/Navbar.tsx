import { cookies } from "next/headers"
import NavLinks from "./NavLinks";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Navbar(){
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const session = await getServerSession(authOptions)
    const isLoggedIn = !!token || !!session;

    return <nav className="bg-blue-600">
        <div className="mx-auto max-w-7xl px-2 py-2 sm:px-6 lg:px-8 flex space-x-4">
            <div className="flex-1 self-center">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
                </svg>
            </div>
            <NavLinks isLoggedIn={isLoggedIn}/>
        </div>
    </nav>
}