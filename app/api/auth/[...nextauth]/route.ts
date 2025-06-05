import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { generateToken } from "@/utils/functions";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     signIn: '/login'
    // },
    callbacks:{
        async signIn({user}){
            const res = await axios.get(`http://localhost:4000/users?email=${user.email}`);
            let dbUser = res.data[0];

            if(!dbUser){
                const token = generateToken(user.email!);
                const newUser = await axios.post('http://localhost:4000/users', {
                    email: user.email,
                    name: user.name,
                    authProvider : 'google',
                    token
                });
                dbUser = newUser.data
            }
            (await cookies()).set('auth_token', dbUser.token, {
                httpOnly: true,
                path: '/',
                maxAge: 60*60*24
            })
            return true;
        },
        async session({session}){
            const token = (await cookies()).get('auth_token')?.value
            if(session.user){
                session.user.backendToken = token ?? "";
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };