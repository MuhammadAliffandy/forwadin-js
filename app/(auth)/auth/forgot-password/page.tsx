import type { Metadata } from 'next'
import ResetForm from './ResetForm'
import ForgotPassword from './ForgotPassword'

export const metadata: Metadata = {
    title: 'Reset Password',
}

export default function Home() {
    return (
        <>
            <ForgotPassword />
        </>
    )
}
