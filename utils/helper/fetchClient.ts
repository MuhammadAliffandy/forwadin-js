import { Session, User } from "next-auth"
import { getSession, signIn, signOut, useSession } from "next-auth/react"
import { toast } from "react-toastify"

interface FetchClientParams {
    method: string,
    body?: string | null,
    url: string,
    user?: User | undefined
}
const fetchClient = async ({ method, body = null, url, user }: FetchClientParams): Promise<Response | null> => {
    try {
        if (user) {
            const result = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
                body: body,
            })
            if (result.status === 401 || result.status === 403) {
                //renew the session
                if (user?.refreshToken) {
                    console.log('refresh token')
                    const refresh = await signIn('refresh', {
                        redirect: false,
                        refreshToken: user.refreshToken,
                        device: user.device
                    })
                    if (refresh?.error) {
                        signOut()
                        window.location.replace('/signin')
                    }
                    else {
                        console.log('sukses refresh token')
                        const newSession = await getSession()
                        const newResult = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
                            method: method,
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + newSession?.user?.token
                            },
                            body: body,
                        })
                        if (newResult.status === 200) {
                            return newResult
                        } else {
                            signOut()
                            window.location.replace('/signin')
                        }
                    }
                } else {
                    signOut()
                    window.location.replace('/signin')
                }
            }
            return result
        }
        const session = await getSession()
        const result = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.user?.token
            },
            body: body,
        })
        if (result.status === 401 || result.status === 403) {
            //renew the session
            if (session?.user?.refreshToken) {
                console.log('refresh token')
                const refresh = await signIn('refresh', {
                    redirect: false,
                    refreshToken: session.user.refreshToken,
                    device: session.user.device
                })
                if (refresh?.error) {
                    signOut()
                    window.location.replace('/signin')
                }
                else {
                    console.log('sukses refresh token')
                    const newSession = await getSession()
                    const newResult = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + newSession?.user?.token
                        },
                        body: body,
                    })
                    if (newResult.status === 200) {
                        return newResult
                    } else {
                        signOut()
                        window.location.replace('/signin')
                    }
                }
            } else {
                signOut()
                window.location.replace('/signin')
            }
        }
        return result
    } catch (error) {
        toast.error('Failed to fetch, check your internet connection')
        console.log(error)
        return null
    }
}


export { fetchClient }