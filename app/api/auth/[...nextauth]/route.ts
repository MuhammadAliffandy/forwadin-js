import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                // console.log(credentials)
                // TODO: Perform API call to backend

                const user = null
                if (user) {
                    return user
                } else {
                    throw new Error('Error Message')
                }
            }
        })
    ],
    pages: {
        signIn: '/signin',
    },
    secret: process.env.NEXTAUTH_SECRET
})
export { handler as GET, handler as POST }