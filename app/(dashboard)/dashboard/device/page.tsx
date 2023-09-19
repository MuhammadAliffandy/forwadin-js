
import type { Metadata } from 'next'
import Device from './Device'
export const metadata: Metadata = {
    title: 'Device',
}

export default function Page() {
    return (
        <>
            <Device />
        </>
    )
}
