import type { Metadata } from 'next'
import Settings from './Settings'

export const metadata: Metadata = {
    title: 'User Setting',
}

export default function Home() {
    return (
        <>
            <p className='font-lexend text-2xl font-bold'>Settings</p>
            <Settings />
        </>
    )
}
