import type { Metadata } from 'next'
import Order from './Order'

export const metadata: Metadata = {
    title: 'Order',
}

export default function Home() {
    return (
        <>
            <Order />
        </>
    )
}
