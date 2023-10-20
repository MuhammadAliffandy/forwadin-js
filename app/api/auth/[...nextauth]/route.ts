import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions, User } from 'next-auth'
import { fetchServer } from "@/utils/helper/fetchServer";
interface SessionDevice {
    id: string,
    sessionId: string
}
declare module "next-auth" {
    interface User {
        id: string | undefined,
        token: string | undefined,
        refreshToken: string | undefined,
        device?: SessionDevice[]
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
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            id: 'refresh',
            name: 'Refresh',
            credentials: {
                refreshToken: {},
                device: {}
            },
            authorize: async (credentials: any) => {
                const result = await fetch(process.env.BACKEND_URL + '/auth/refresh-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ refreshToken: credentials?.refreshToken })
                })
                const resultData = await result.json()
                const user = {
                    id: resultData.id,
                    token: resultData.accessToken,
                    refreshToken: credentials?.refreshToken,
                    device: credentials?.device
                }
                if (user && result.ok) {
                    return user
                } else {
                    return null
                }
            },
        }),
        CredentialsProvider({
            id: 'credentials',
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
                const resultData = await result.json()
                const user = {
                    id: resultData.id,
                    token: resultData.accessToken,
                    refreshToken: resultData.refreshToken,
                    device: []
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
        async jwt({ token, user, trigger, session, account }) {
            // Token OAUTH
            // Klo login google

            if (trigger === 'update') {
                token.user = session.user
            }
            if (user) {
                token.user = user;
            }
            return token;
        },
        async signIn({ user, account }: any) {
            if (account?.provider === 'google') {
                // call backend
                const result = await fetch(process.env.BACKEND_URL + '/auth/google', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        accessToken: account.access_token
                    })
                })
                const resultData = await result.json()
                if (result.ok) {
                    user.id = resultData.id
                    user.token = resultData.accessToken
                    user.refreshToken = resultData.refreshToken
                    return user
                } else {
                    return null
                }
            }
            return user
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}
const handler = NextAuth(authConfig)
export { handler as GET, handler as POST }