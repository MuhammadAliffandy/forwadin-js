
import { User } from "next-auth"
import middleware, { withAuth } from 'next-auth/middleware'
import { getToken } from "next-auth/jwt"
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
const requireDevice = ['/contacts', '/group', '/incoming', '/messenger', '/outgoing', '/auto-reply', '/broadcast', '/campaign']
const authUrl = ['/signin', '/signup']
const adminProtectedUrl = ["/dashboard/:path*", "/subscription"]

export default withAuth(
    function middleware(req) {
        const user = req.nextauth.token?.user as any as User
        if (adminProtectedUrl.some((path) => req.nextUrl.pathname.startsWith(path)) && !user)
            return NextResponse.redirect(new URL('/signin', req.url))
        if (requireDevice.some(path => req.nextUrl.pathname.startsWith('/dashboard' + path))
            && user.device.length === 0)
            return NextResponse.redirect(new URL('/dashboard/device', req.url))
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: (params) => {
                let { token } = params
                return !!token
            }
        },
        pages: {
            signIn: '/signin'
        }
    },
)
// export { default } from "next-auth/middleware"
export const config = { matcher: ["/dashboard/:path*", "/subscription"] }


