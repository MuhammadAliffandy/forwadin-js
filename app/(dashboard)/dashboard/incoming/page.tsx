import type { Metadata } from 'next'
import Incoming from './Incoming'

export const metadata: Metadata = {
    title: 'Incoming Message',
}

export default function Home() {
    return (
        <>
            <Incoming />
        </>
    )
}
