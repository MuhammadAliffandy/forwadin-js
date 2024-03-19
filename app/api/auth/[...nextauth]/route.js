import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getDevice} from '../../repository/deviceRepository'
import { getUserSubscriptionById} from '../../repository/userRepository'
import { getAllSession} from '../../repository/sessionRepository'
import {refreshTokenAuth  , loginAuth , googleAuth} from '../../repository/authRepository'

const getDeviceSession = async (data, token) => {

    const newArray = await Promise.all(
        data.map(async (ses) => {
            const fetchDeviceDetails = await getDevice( token , ses.device.id)

            if (fetchDeviceDetails.ok) {
                // console.log('ini get device session ' + ses.device.id)
                const body= await fetchDeviceDetails.json()
                // console.log(body)
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
    return newArray
}
export const authConfig= {
    session: {
        strategy: "jwt",
        maxAge: 43200
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: 'profile email https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly',
                    expire_in: 43200
                }
            },
        }),
        CredentialsProvider({
            id: 'refresh',
            name: 'Refresh',
            credentials: {
                user: {}
            },
            authorize: async (credentials) => {
                let device= []
                let subscription = {
                    status: 0
                }
                console.log('refresh session 1')
                const userData = JSON.parse(credentials?.user)
                console.log('refresh session 2')
                console.log(userData.refreshToken)
                // todo

                const data = { refreshToken: userData.refreshToken }

                const result = await refreshTokenAuth(data)

                console.log('refresh session 3')
                if (result.ok) {
                    console.log('refresh')
                    const resultData = await result.json()
                    if (userData.role === 222) {
                        console.log('refresh CS')
                        console.log(resultData)

                        const fetchSessionCS = await fetch(process.env.BACKEND_URL + "/customer-services/" + (userData).id, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + resultData.accessToken
                            },
                        })
                        if (!fetchSessionCS.ok) return null
                        const sessionCSData = await fetchSessionCS.json()
                        console.log('ini session cs')
                        const sessionCS = sessionCSData.user.devices[0].sessions[0].sessionId
                        const csData = {
                            ...userData,
                            sessionId: (sessionCS ? sessionCS : null),
                            id: resultData.id,
                            token: resultData.accessToken
                        }

                        console.log(csData)
                        return csData
                    }

                    const userSubscription = await getUserSubscriptionById(resultData.accessToken , (userData).id)

                    if (userSubscription.ok) {
                        const userSubscriptionResult = await userSubscription.json()
                        subscription = {
                            status: 1,
                            name: userSubscriptionResult.subscriptionPlan.name
                        }
                        const fetchSession = await getAllSession(resultData.accessToken) 
                        if (fetchSession.ok) {
                            const fetchSessionData = await fetchSession.json()
                            if (fetchSessionData.length) {
                                device = await getDeviceSession(fetchSessionData, resultData.accessToken)
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
                    console.log('refresh admin')

                    // console.log(user)
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

                const data = { identifier: credentials?.identifier, password: credentials?.password };

                const result = await loginAuth(data)
                if (result.ok) {
                    const resultData = await result.json()
                    console.log('masuk credentials')
                    console.log(resultData)
                    const user = {
                        id: resultData.id,
                        role: resultData.role,
                        token: resultData.accessToken,
                        refreshToken: resultData.refreshToken,
                        subscription: {},
                        device: []
                    }
                    const userSubscription = await getUserSubscriptionById(resultData.accessToken , user.id)
                    if (userSubscription.ok) {
                        const userSubscriptionResult = await userSubscription.json()
                        user.subscription = {
                            status: 1,
                            name: userSubscriptionResult.subscriptionPlan.name
                        }
                        const fetchSession = await getAllSession(resultData.accessToken) 
                        if (fetchSession.ok) {
                            const fetchSessionData = await fetchSession.json()
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
                    return user 
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
            authorize: async (credentials) => {
                try {

                    console.log('masuk cs 1')
                    const result = await fetch(process.env.BACKEND_URL + '/customer-services/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ identifier: credentials?.identifier, password: credentials?.password })
                    })
                    console.log(credentials)
                    if (!result.ok) return null
                    const resultData = await result.json()
                    console.log('masuk cs 3')
                    const csProfile = await fetch(process.env.BACKEND_URL + '/customer-services/' + resultData.id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json', 'Authorization': 'Bearer ' + resultData.accessToken
                        }
                    })
                    if (!result.ok) {
                        return null
                    }
                    const csProfileData = await csProfile.json()
                    const customerService= {
                        id: resultData.id,
                        user: csProfileData.user,
                        email: csProfileData.email,
                        username: csProfileData.username,
                        role: resultData.role,
                        token: resultData.accessToken,
                        refreshToken: resultData.refreshToken,
                        deviceId: resultData.deviceId,
                        sessionId: resultData.sessionId,
                        createdAt: csProfileData.createdAt,
                        updatedAt: csProfileData.updatedAt
                    }
                    return customerService 

                } catch (error) {
                    console.log(error)
                    return null
                }
            }

        })
    ],
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async session({ session, token }) {
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
            if (user) {
                if (user.role === 222) {
                    token.customerService = user
                }
                else if (user.role === 111 || user.role === 999) {
                    token.user = user;
                }
            }
            return token;
        },
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                // return null

                const data = {
                    accessToken: account.access_token
                }
                const result = await googleAuth(data)
                const resultData = await result.json()
                if (result.ok) {
                    user.device = []
                    user.role = resultData.role
                    user.id = resultData.id
                    user.token = resultData.accessToken
                    user.refreshToken = resultData.refreshToken
                    const userSubscription = await getUserSubscriptionById(resultData.accessToken , user.id)
                    if (userSubscription.ok) {
                        const userSubscriptionResult = await userSubscription.json()
                        user.subscription = {
                            status: 1,
                            name: userSubscriptionResult.subscriptionPlan.name
                        }
                        const fetchSession = await getAllSession(resultData.accessToken)
                        if (fetchSession.ok) {
                            const fetchSessionData = await fetchSession.json()
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