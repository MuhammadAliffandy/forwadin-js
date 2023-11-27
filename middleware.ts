
import { User } from "next-auth"
import middleware, { withAuth } from 'next-auth/middleware'
import { getToken } from "next-auth/jwt"
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const requireDevice = ['/contact', '/group', '/incoming', '/messenger', '/outgoing', '/auto-reply', '/broadcast', '/campaign']
const signUrl = ['/signin', '/signup']
const adminProtectedUrl = ["/dashboard/:path*", "/subscription", '/dashboard']
const subscriptionUrl = ['/subscription', '/dashboard']
export default withAuth(
    async function middleware(req) {
        const token = req.nextauth.token
        const pathName = req.nextUrl.pathname
        console.log('run middleware ' + pathName)
        const isAuthenticated = !!token;
        console.log(isAuthenticated)
        if (isAuthenticated) {
            if (signUrl.some(path => pathName.startsWith(path))) {
                return NextResponse.redirect(new URL("/dashboard", req.url))
            }
            const user = token.user as any as User
            if (!subscriptionUrl.some(path => pathName.startsWith(path)) && user.subscription.status === 0) return NextResponse.redirect(new URL('/dashboard', req.url))
            if (requireDevice.some(path => pathName.startsWith('/dashboard' + path))
                && user.device.length === 0)
                return NextResponse.redirect(new URL('/dashboard/device', req.url))
            return NextResponse.next()
        } else {
            if (adminProtectedUrl.some(path => pathName.startsWith(path)))
                return NextResponse.redirect(new URL('/signin', req.url))
            return NextResponse.next()
        }
    },
    {
        callbacks: {
            authorized: () => true
        },
    }
)
export const config = { matcher: ['/signin', '/signup', '/dashboard/:path*', '/subscription', '/dashboard'] }


// export default async function middleware(req: NextRequest) {
//     console.log('await')
//     const token = await getToken({ req })
//     console.log('executed')
//     if (authUrl.some(path => req.nextUrl.pathname.startsWith(path)) && token) {
//         console.log('masuk')
//         return NextResponse.redirect(new URL("/dashboard", req.url));
//     }
//     if (adminProtectedUrl.some(path => req.nextUrl.pathname.startsWith(path)) && !token)
//         return NextResponse.redirect(new URL('/signin', req.url))
//     if (token) {
//         const user = token.user as any as User
//         console.log(user.role)
//         if (req.nextUrl.pathname !== '/dashboard' && user.subscription.status === 0) return NextResponse.redirect(new URL('/dashboard', req.url))
//         if (requireDevice.some(path => req.nextUrl.pathname.startsWith('/dashboard' + path))
//             && user.device.length === 0)
//             return NextResponse.redirect(new URL('/dashboard/device', req.url))
//         return NextResponse.next()
//     }
//     return NextResponse.next()

// }
// export const config = { matcher: "/" }