import type { Metadata } from 'next'

import SignUp from './SignUp'
// import { useState } from 'react'
export const metadata: Metadata = {
    title: 'Sign Up',
}

export default function Home() {
    return (
        <>
            <SignUp />
        </>
    )
}
