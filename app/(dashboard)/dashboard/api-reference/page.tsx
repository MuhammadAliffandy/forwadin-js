import type { Metadata } from 'next'
import ApiRef from './ApiRef'

export const metadata: Metadata = {
    title: 'API Reference',
}

export default function Page() {
    return (
        <>
            <ApiRef />
        </>
    )
}
