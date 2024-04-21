
import { CustomerService, Session, User } from "next-auth"
import { signIn, signOut } from "next-auth/react"
import { toast } from "react-toastify"
let isRefreshing = false

const fetchClient = async ({ method, body = null, url, user, isFormData = false }) => {
    try {
        if (user) {
            let headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
            }
            if (isFormData) {
                headers = {
                    'Authorization': 'Bearer ' + user.token,
                }
            }
            const result = await fetch(process.env.BASE_URL_DEV + url, {
                method: method,
                headers: headers,
                body: body,
            })
            if (result.status === 401) {
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
                        // signOut()
                        // window.location.replace('/signin')
                    } else {
                        window.location = window.location
                    }
                } else {
                    // signOut()
                    // window.location.replace('/signin')
                }
            }
            return result
        }
        return null
    } catch (error) {
        toast.error('Server error, please contact CS for further assistance')
        return null
    }
}


export { fetchClient }