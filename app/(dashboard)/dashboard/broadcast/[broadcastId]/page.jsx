import Link from 'next/link'
import DetailBroadcast from './DetailBroadcast'

export const metadata = {
    title: 'Detail Broadcast',
}
const page = ({ params }) => {

    return (
        <>
            <div className='flex'>
                <Link href={'/dashboard/broadcast'} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</Link>
            </div>
            <DetailBroadcast broadcastId={params.broadcastId} />
        </>
    )
}

export default page