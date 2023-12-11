import type { Metadata } from 'next'
import AutoReply from './AutoReply'

export const metadata: Metadata = {
    title: 'Auto Reply',
}

export default function Home() {
    return (
        <>
            <AutoReply />
        </>
    )
}
