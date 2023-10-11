import type { Metadata } from 'next'
import Broadcast from './Broadcast'

export const metadata: Metadata = {
    title: 'Broadcast Message',
}

export default function Home() {
    return (
        <>
            <Broadcast />
        </>
    )
}
