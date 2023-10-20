import type { Metadata } from 'next'
import Payment from './Payment'

export const metadata: Metadata = {
    title: 'Subscription',
}

export default function Home() {
    return (
        <>
            <Payment />
        </>
    )
}
