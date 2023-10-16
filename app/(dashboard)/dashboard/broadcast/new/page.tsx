import type { Metadata } from 'next'
import Link from 'next/link'
import DetailBroadcast from './DetailBroadcast'

export const metadata: Metadata = {
    title: 'Buat Broadcast',
}

export default function Home() {
    return (
        <>
            <div className='flex'>
                <Link href={'/dashboard/broadcast'} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</Link>
            </div>
            <p className='text-lexend font-bold text-2xl mt-4'>Buat Broadcast Baru</p>
            <DetailBroadcast />
        </>
    )
}
