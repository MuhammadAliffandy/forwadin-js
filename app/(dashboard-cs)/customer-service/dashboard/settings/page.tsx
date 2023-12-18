import type { Metadata } from 'next'
import Settings from './Settings'

export const metadata: Metadata = {
    title: 'Setting',
}

export default function Home() {
    return (
        <>
            <Settings />
        </>
    )
}
