import { getSession, signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"

interface FetchClientParams {
    method: string,
    body?: string | null,
    url: string
}
const fetchClient = async ({ method, body = null, url }: FetchClientParams) => {
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
        signOut()
        window.location.replace('/signin')
    }
    return result
}

export { fetchClient }