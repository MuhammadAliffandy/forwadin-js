import { authConfig } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import type { NextApiRequest, NextApiResponse } from 'next'
interface FetchParams {
    url: string,
    body: any,
    method: string
}
// type FetchServer = (request:NextRequest, response:NextResponse, ) => void
const fetchServer = async (request: NextRequest, response: NextResponse, { url, body, method }: FetchParams) => {
    const session = await getServerSession(
        request as unknown as NextApiRequest,
        {
            ...response,
            getHeader: (name: string) => response.headers?.get(name),
            setHeader: (name: string, value: string) => response.headers?.set(name, value),
        } as unknown as NextApiResponse,
        authConfig
    );
    if (!session?.user) {
        return null
    }
    const result = await fetch(process.env.BACKEND_URL + url, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + session?.user.token
        },
        body: JSON.stringify(body)
    })
    return result

}
export { fetchServer }