import Link from 'next/link'
import CreateAutoReply from './CreateAutoReply'

export const metadata = {
    title: 'Buat Auto Reply',
}

export default function Home() {
    return (
        <>
            <div className='flex'>
                <Link href={'/dashboard/auto-reply'} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</Link>
            </div>
            <p className='text-lexend font-bold text-2xl mt-4'>Buat Auto Reply Baru</p>
            <CreateAutoReply />
        </>
    )
}
