import type { Metadata } from 'next'
import Messenger from './Messenger'

export const metadata: Metadata = {
    title: 'Messenger',
}

export default function Home() {
    return (
        <>
            <Messenger />
        </>
    )
}
