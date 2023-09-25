import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from 'next-auth'
declare module "next-auth" {
    interface User {
        id: string,
        token: string
    }

    interface Session extends DefaultSession {
        user?: User;
    }
}
export const authConfig: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier: {},
            },
            authorize: async (credentials: any) => {
                // TODO: Perform API call to backend
                const result = await fetch(process.env.BACKEND_URL + '/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ identifier: credentials.identifier, password: credentials.password })

                })
                // const user = { id: '1', identifier: 'asd', password: 'asd' }
                const resultData = await result.json()
                const user = {
                    id: resultData.id,
                    token: resultData.accessToken,
                    refreshToken: resultData.refreshToken
                }
                if (user && result.ok) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async session({ session, token }: any) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET
}
const handler = NextAuth(authConfig)
export { handler as GET, handler as POST }