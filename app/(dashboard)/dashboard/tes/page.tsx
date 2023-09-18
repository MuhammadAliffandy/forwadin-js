
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Test',
}

export default function Home() {
    return (
        <>
            <div className='bg-neutral-75'>
                <p>Ini test</p>
            </div>
        </>
    )
}
