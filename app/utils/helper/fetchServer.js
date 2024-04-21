import { authConfig } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

// type FetchServer = (request:NextRequest, response:NextResponse, ) => void
const fetchServer = async (request, response, { url, body, method }) => {
    const session = await getServerSession(
        request,
        {
            ...response,
            getHeader: (name) => response.headers?.get(name),
            setHeader: (name, value) => response.headers?.set(name, value),
        } ,
        authConfig
    );
    if (!session?.user) {
        return null
    }
    const fetchConfig = {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + session?.user.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    const result = await fetch(process.env.BASE_URL_DEV + url, fetchConfig)
    return result

}
export { fetchServer }