import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
const signUrl = ['/signin', '/signup', '/customer-service/signin']

const adminPath = {
    requireDevice: ['/contact', '/group', '/incoming', '/messenger', '/outgoing', '/auto-reply', '/broadcast', '/campaign'],
    protectedUrl: ["/dashboard/:path*", "/subscription", '/dashboard'],
    subscriptionUrl: ['/subscription', '/dashboard'],
    paidUrl: ['/dashboard/api-reference']
}
const csPath = {
    requiredDevice: ['/messenger', '/auto-reply'],
    protectedUrl: ['/customer-service/dashboard', '/customer-service/dashboard/:path*'],
}
export default withAuth(
    async function middleware(req) {
        const token = req.nextauth.token
        const pathName = req.nextUrl.pathname
        console.log('run middleware ' + pathName)
        const isAuthenticated = !!token;
        console.log('isAuthenticated')
        console.log(isAuthenticated)
        if (isAuthenticated) {
            const user = token.user
            // const customerService = token.customerService 
            // if (adminPath.protectedUrl.some(path => pathName.startsWith(path)) && !user) {
            //     if (customerService)
            //         return NextResponse.redirect(new URL('/customer-service/dashboard', req.url))
            //     return NextResponse.redirect(new URL('/', req.url))
            // }
            // if (csPath.protectedUrl.some(path => pathName.startsWith(path)) && !customerService) {
            //     if (user)
            //         return NextResponse.redirect(new URL('/dashboard', req.url))
            //     return NextResponse.redirect(new URL('/', req.url))
            // }
            // if (user) {
            //     if (signUrl.some(path => pathName.startsWith(path))) {
            //         return NextResponse.redirect(new URL("/dashboard", req.url))
            //     }
            //     if (adminPath.paidUrl.some(path => pathName.startsWith(path)) && user.subscription.name === 'starter') {
            //         return NextResponse.redirect(new URL('/dashboard', req.url))
            //     }
            //     if (!adminPath.subscriptionUrl.some(path => pathName.startsWith(path)) && user.subscription.status === 0) return NextResponse.redirect(new URL('/dashboard', req.url))
            //     if (adminPath.requireDevice.some(path => pathName.startsWith('/dashboard' + path))
            //         && user.device.length === 0)
            //         return NextResponse.redirect(new URL('/customer-service/dashboard', req.url))
            //     return NextResponse.next()
            // }
            // if (customerService) {
            //     if (csPath.requiredDevice.some(path => pathName.startsWith('/customer-service/dashboard' + path))
            //         && !customerService.sessionId)
            //         return NextResponse.redirect(new URL('/dashboard/device', req.url))
            //     return NextResponse.next()
            // }
        } else {
            if (adminPath.protectedUrl.some(path => pathName.startsWith(path)))
                return NextResponse.redirect(new URL('/signin?callbackUrl=' + encodeURIComponent(req.url), req.url))
            if (csPath.protectedUrl.some(path => pathName.startsWith(path)))
                return NextResponse.redirect(new URL('/customer-service/signin?callbackUrl=' + encodeURIComponent(req.url), req.url))
            return NextResponse.next()
        }
    },
    {
        callbacks: {
            authorized: () => true,

        },
    }
)
export const config = { matcher: ['/signin', '/signup', '/dashboard/:path*', '/subscription', '/dashboard', '/customer-service/:path*'] }


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