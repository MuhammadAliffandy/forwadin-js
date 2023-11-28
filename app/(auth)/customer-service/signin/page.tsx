import type { Metadata } from 'next'
import SignIn from './Signin'

export const metadata: Metadata = {
    title: 'Sign In',
}

export default function Home() {
    return (
        <>
            <SignIn />
        </>
    )
}
