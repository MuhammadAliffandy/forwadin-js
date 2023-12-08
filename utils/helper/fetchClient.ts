
import { CustomerService, Session, User } from "next-auth"
import { getSession, signIn, signOut, useSession } from "next-auth/react"
import { toast } from "react-toastify"
let isRefreshing = false
interface FetchClientParams {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: string | FormData | null,
    url: string,
    user: User | CustomerService | undefined,
    isFormData?: boolean
}
const fetchClient = async ({ method, body = null, url, user, isFormData = false }: FetchClientParams): Promise<Response | null> => {
    try {
        if (user) {
            let headers: any = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
            }
            if (isFormData) {
                headers = {
                    'Authorization': 'Bearer ' + user.token,
                }
            }
            const result = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
                method: method,
                headers: headers,
                body: body,
            })
            if (result.status === 401 || result.status === 403) {
                //renew the session
                // return null
                if (isRefreshing) return null
                if (user?.refreshToken) {
                    console.log('refresh token')
                    isRefreshing = true
                    const refresh = await signIn('refresh', {
                        redirect: false,
                        user: JSON.stringify(user)
                    })
                    isRefreshing = false
                    if (refresh?.error) {
                        signOut()
                        window.location.replace('/signin')
                    } else {
                        window.location = window.location
                    }
                } else {
                    signOut()
                    window.location.replace('/signin')
                }
            }
            return result
        }
        return null
    } catch (error) {
        toast.error('Failed to fetch, check your internet connection')
        console.log(error)
        return null
    }
}


export { fetchClient }