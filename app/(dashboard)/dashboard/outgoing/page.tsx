import type { Metadata } from 'next'
import Outgoing from './Outgoing'

export const metadata: Metadata = {
    title: 'Outgoing Message',
}

export default function Home() {
    return (
        <>
            <Outgoing />
        </>
    )
}
