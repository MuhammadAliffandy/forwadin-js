export { default } from "next-auth/middleware"
import { User } from "next-auth"
import { getToken } from "next-auth/jwt"
import { getSession } from "next-auth/react"
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
const requireDevice = ['/contacts', '/group', '/incoming', '/messenger', '/outgoing', '/auto-reply', '/broadcast']
export const middleware = async (request: NextRequest) => {
    const pathName = request.nextUrl.pathname
    if (requireDevice.some((path) => pathName.startsWith('/dashboard' + path))) {
        // const getSession()
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET
        })
        if (token) {
            const user = token?.user as User
            if (user.device.length > 0) {
                return NextResponse.next()
            }
            return NextResponse.redirect(new URL("/dashboard/device", request.url));
        }
    }
    return NextResponse.next()
}

export const config = { matcher: ["/dashboard/:path*", "/subscription"] }