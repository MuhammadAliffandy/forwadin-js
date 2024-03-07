import Link from 'next/link'
import CreateBroadcast from './CreateBroadcast'

export const metadata = {
    title: 'Buat Broadcast',
}

export default function Home() {
    // Cek ada device apa gak
    return (
        <>
            <div className='flex'>
                <Link href={'/dashboard/broadcast'} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</Link>
            </div>
            <p className='text-lexend font-bold text-2xl mt-4'>Buat Broadcast Baru</p>
            <CreateBroadcast />
        </>
    )
}
