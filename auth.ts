import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"

import Credentials from "next-auth/providers/credentials"
import { db } from "@/lib/prisma"
import { comparePassword, hashPassword } from "@/lib/bcrypt"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                role: { label: "Role", type: "text" },
            },
            authorize: async (credentials) => {
                if (
                    !credentials ||
                    !credentials.email ||
                    !credentials.password ||
                    !credentials.role
                ) {
                    return null
                }

                const email = credentials.email as string
                const role = credentials.role as string
                const user = await db.user.findUnique({
                    where: {
                        email,
                    },
                })

                if (!user) {
                    return null
                }

                const isMatch = await comparePassword(
                    credentials.password as string,
                    user.password as string
                )

                if (!isMatch) {
                    throw new Error("Incorrect password.")
                }

                if (user.role !== role) {
                    throw new Error(`User does not have the ${role} role`)
                }

                return user
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,

    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            if (user) {
                token.sub = user.id // Standard JWT `sub` claim
                token.name = user.name // Standard JWT `name` claim
                token.email = user.email // Optional
                token.role = user.role // Include role in the token
            }
            return token
        },
        async session({ session, token }: { session: any; token: JWT }) {
            session.user = {
                id: token.sub,
                name: token.name,
                email: token.email,
                role: token.role, // Include role in the session
            }
            session.token = token
            return session
        },
    },
})
