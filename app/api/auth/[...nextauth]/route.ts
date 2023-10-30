import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions, User } from 'next-auth'
import { DeviceData, SubscriptionTypes } from "@/utils/types";
interface DeviceSession {
    id: string,
    sessionId: string
}
interface Subscription {
    status: number,
    name?: string
}
declare module "next-auth" {
    interface User {
        id: string | undefined,
        token: string | undefined,
        refreshToken: string | undefined,
        device: DeviceSession[],
        subscription: Subscription
    }

    interface Session extends DefaultSession {
        user?: User;
    }
}
interface GetSession {
    sessionId: string,
    device: {
        id: string
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
                user: {}
            },
            authorize: async (credentials) => {
                let device: DeviceSession[] = []
                let subscription: Subscription = {
                    status: 0
                }
                const userData: User = JSON.parse(credentials?.user!)
                const result = await fetch(process.env.BACKEND_URL + '/auth/refresh-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ refreshToken: userData.refreshToken })
                })
                if (result.ok) {
                    const resultData = await result.json()

                    const userSubscription = await fetch(process.env.BACKEND_URL + '/users/subscription/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + resultData.accessToken
                        },
                    })
                    if (userSubscription.ok) {
                        const userSubscriptionResult = await userSubscription.json()
                        subscription = {
                            status: 1,
                            name: userSubscriptionResult.subscriptionPlan.name
                        }
                        const fetchSession = await fetch(process.env.BACKEND_URL + '/sessions', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + resultData.accessToken
                            },
                        })
                        if (fetchSession.ok) {
                            const fetchSessionData: GetSession[] = await fetchSession.json()
                            if (fetchSessionData.length) {
                                device = fetchSessionData.map(ses => { ses.sessionId, ses.device.id }) as any
                            }
                        }
                    }
                    const user = {
                        ...userData,
                        id: resultData.id,
                        token: resultData.accessToken,
                        device: device,
                        subscription: subscription
                    }
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
                password: {}
            },
            authorize: async (credentials) => {
                const result = await fetch(process.env.BACKEND_URL + '/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ identifier: credentials?.identifier, password: credentials?.password })
                })
                if (result.ok) {
                    const resultData = await result.json()
                    const user = {
                        id: resultData.id,
                        token: resultData.accessToken,
                        refreshToken: resultData.refreshToken,
                        subscription: {},
                        device: []
                    }
                    const userSubscription = await fetch(process.env.BACKEND_URL + '/users/subscription/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + resultData.accessToken
                        },
                    })
                    if (userSubscription.ok) {
                        const userSubscriptionResult = await userSubscription.json()
                        user.subscription = {
                            status: 1,
                            name: userSubscriptionResult.subscriptionPlan.name
                        }
                        const fetchSession = await fetch(process.env.BACKEND_URL + '/sessions', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + resultData.accessToken
                            },
                        })
                        if (fetchSession.ok) {
                            const fetchSessionData: GetSession[] = await fetchSession.json()
                            if (fetchSessionData.length) {
                                user.device = fetchSessionData.map(ses => { ses.sessionId, ses.device.id }) as any
                            } else {
                                user.device = []
                            }
                        } else {
                            user.device = []
                        }
                    } else {
                        user.subscription = {
                            status: 0
                        }
                    }
                    return user as any
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
        async jwt({ token, user, trigger, session }) {
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
                    const userSubscription = await fetch(process.env.BACKEND_URL + '/users/subscription/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + resultData.accessToken
                        },
                    })
                    if (userSubscription.ok) {
                        const userSubscriptionResult = await userSubscription.json()
                        user.subscription = {
                            status: 1,
                            name: userSubscriptionResult.subscriptionPlan.name
                        }
                        const fetchSession = await fetch(process.env.BACKEND_URL + '/sessions', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + resultData.accessToken
                            },
                        })
                        if (fetchSession.ok) {
                            const fetchSessionData: GetSession[] = await fetchSession.json()
                            if (fetchSessionData.length) {
                                user.device = fetchSessionData.map(ses => { ses.sessionId, ses.device.id }) as any
                            } else {
                                user.device = []
                            }
                        } else {
                            user.device = []
                        }
                    } else {
                        user.subscription = {
                            status: 0
                        }
                    }
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