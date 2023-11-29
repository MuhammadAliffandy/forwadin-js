import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { CustomerService, NextAuthOptions, User } from 'next-auth'
import { DeviceData, DeviceSession, SubscriptionTypes } from "@/utils/types";

interface Subscription {
    status: number,
    name?: string
}
declare module "next-auth" {
    interface User {
        id: string | undefined,
        role: 111 | 222 | 999, // 111 admin, 222 cs, 999 su
        googleToken?: string,
        token: string | undefined,
        refreshToken: string | undefined,
        device: DeviceSession[],
        subscription: Subscription
    }
    interface CustomerService {
        id: string | undefined,
        role: 222,
        token: string | undefined,
        refreshToken: string | undefined,
        sessionId: string | undefined,
        deviceId: string | undefined,
    }
    interface Session extends DefaultSession {
        user?: User;
        customerService?: CustomerService
    }
}
interface GetSession {
    sessionId: string,
    device: {
        id: string
    }
}
const getDeviceSession = async (data: GetSession[], token: string) => {
    const newArray = await Promise.all(
        data.map(async (ses) => {
            const fetchDeviceDetails = await fetch(process.env.BACKEND_URL + '/devices/' + ses.device.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })

            if (fetchDeviceDetails.ok) {
                const body: DeviceData = await fetchDeviceDetails.json()
                const device = {
                    id: ses.device.id,
                    sessionId: ses.sessionId,
                    name: body.name,
                    phone: body.phone
                }
                return device
            }
        })
    )
    return newArray as any
}
export const authConfig: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: 'profile email https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly',
                }
            }
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

                const userData: User | CustomerService = JSON.parse(credentials?.user!)
                // todo
                const result = await fetch(process.env.BACKEND_URL + '/auth/refresh-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ refreshToken: userData.refreshToken })
                })

                if (result.ok) {
                    console.log('refresh')
                    console.log(userData)
                    const resultData = await result.json()
                    if (userData.role === 111) {
                        console.log('refresh CS')
                        return {
                            ...userData,
                            id: resultData.id,
                            token: resultData.accessToken
                        }
                    }
                    const userSubscription = await fetch(process.env.BACKEND_URL + '/users/' + userData.id + '/subscription/', {
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
                                device = await getDeviceSession(fetchSessionData, resultData.accessToken)
                            }
                        }
                    }
                    const user = {
                        ...userData,
                        id: resultData.id,
                        role: resultData.role,
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
                        role: resultData.role,
                        token: resultData.accessToken,
                        refreshToken: resultData.refreshToken,
                        subscription: {},
                        device: []
                    }
                    const userSubscription = await fetch(process.env.BACKEND_URL + '/users/' + user.id + '/subscription/', {
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
                                user.device = await getDeviceSession(fetchSessionData, resultData.accessToken)
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
        }),
        CredentialsProvider({
            id: 'customerService',
            name: 'CustomerService',
            credentials: {
                username: {},
                password: {}
            },
            authorize: async (credentials: any) => {
                console.log('masuk cs 1')
                console.log(credentials)
                const result = await fetch(process.env.BACKEND_URL + '/customer-services/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ identifier: credentials?.identifier, password: credentials?.password })
                })
                console.log('masuk cs 2')
                console.log(result.status)
                if (!result.ok) return null
                const resultData = await result.json()
                console.log('ini resultData')
                console.log(resultData)
                const customerService: CustomerService = {
                    id: resultData.id,
                    role: resultData.role,
                    token: resultData.accessToken,
                    refreshToken: resultData.refreshToken,
                    deviceId: resultData.deviceId,
                    sessionId: resultData.sessionId
                }
                console.log('masuk CS 3')
                console.log(customerService)
                return customerService as any
            }
        })
    ],
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async session({ session, token }: any) {
            console.log(token)
            if (token.user)
                session.user = token.user
            if (token.customerService)
                session.customerService = token.customerService
            return session;
        },
        async jwt({ token, user, trigger, session }) {

            if (trigger === 'update') {
                token.user = session.user
            }
            console.log('jwt user')
            console.log(user)
            if (user) {
                if (user.role === 222) {
                    token.customerService = user
                }
                else if (user.role === 111) {
                    token.user = user;
                }
            }
            console.log(token)
            return token;
        },
        async signIn({ user, account }: any) {
            console.log('signIn user')
            console.log(user)
            if (account?.provider === 'google') {
                // console.log(account.access_token)
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
                    user.role = resultData.role
                    user.id = resultData.id
                    user.token = resultData.accessToken
                    user.refreshToken = resultData.refreshToken
                    const userSubscription = await fetch(process.env.BACKEND_URL + '/users/' + user.id + '/subscription/', {
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
                                user.device = await getDeviceSession(fetchSessionData, resultData.accessToken)
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
                    user.googleToken = account.access_token
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