
import { User } from "next-auth"
import middleware, { withAuth } from 'next-auth/middleware'
import { getToken } from "next-auth/jwt"
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
const requireDevice = ['/contacts', '/group', '/incoming', '/messenger', '/outgoing', '/auto-reply', '/broadcast']
const authUrl = ['/signin', '/signup']
const adminProtectedUrl = ["/dashboard/:path*", "/subscription"]
// export const middleware = async (request: NextRequest) => {
//     const pathName = request.nextUrl.pathname
//     if (authUrl.some((path) => pathName.startsWith(path))) {
//         const token = await getToken({
//             req: request,
//             secret: process.env.NEXTAUTH_SECRET
//         })
//         console.log('masuk middleware auth')
//         if (token)
//             return NextResponse.redirect('/dashboard')
//     }
//     if (requireDevice.some((path) => pathName.startsWith('/dashboard' + path))) {
//         // const getSession()
//         const token = await getToken({
//             req: request,
//             secret: process.env.NEXTAUTH_SECRET
//         })
//         if (token) {
//             const user = token?.user as User
//             if (user.device?.length > 0) {
//                 return NextResponse.next()
//             }
//             return NextResponse.redirect(new URL("/dashboard/device", request.url));
//         }
//     }
//     return NextResponse.next()
// }
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


