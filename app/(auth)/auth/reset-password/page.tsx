import type { Metadata } from 'next'
import ResetPassword from './ResetPassword'

export const metadata: Metadata = {
    title: 'Reset Password',
}

export default function Home() {
    return (
        <>
            <ResetPassword />
        </>
    )
}
