import type { Metadata } from 'next'
import Dashboard from './Dashboard'
export const metadata: Metadata = {
    title: 'Dashboard',
}

export default function Home() {
    return (
        <>
            <Dashboard />
        </>
    )
}
