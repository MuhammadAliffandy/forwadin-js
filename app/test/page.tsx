import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ForwardIn | Test',
}

export default function Home() {
    return (
        <div className='text-primary text-5xl'>Ini Test</div>
    )
}
