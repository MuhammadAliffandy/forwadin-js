import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
interface Credentials {
    email: String,
    password: String
}
export const authOptions: NextAuthOptions = {
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET,
        // }),
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: {
                    label: "Password",
                    type: 'password'
                },
            },
            async authorize(credentials: any) {
                console.log(credentials)
                return credentials
            }
        })
    ],
    // callbacks: {
    //     async jwt({ token }) {
    //         token.userRole = "admin"
    //         return token
    //     },
    // },
    pages: {
        // Sign In Route
        signIn: "/signin",
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)