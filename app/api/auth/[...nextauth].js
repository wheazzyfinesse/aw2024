import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import nextAuth from 'next-auth';
import { prisma } from '@/lib/prisma';



import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";


const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log(credentials)
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("No user found with the email");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return credentials; // Return user object to create a session
            },
            callbacks: {
                async session({ session, token, user }) {
                    if (token) {
                        session.id = token.id;
                    }
                    return session;
                },
                async jwt({ token, user }) {
                    if (user) {
                        token.id = user.id;
                    }
                    return token;
                },
            },

        }),
    ],
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
};


const handler = nextAuth(authOptions)

export { handler as GET, handler as POST }