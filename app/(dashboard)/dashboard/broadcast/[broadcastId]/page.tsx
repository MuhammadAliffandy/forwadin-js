import Link from 'next/link'
import { Metadata } from 'next'
import DetailBroadcast from './DetailBroadcast'
type Params = {
    params: { broadcastId: string }
}

export const metadata: Metadata = {
    title: 'Detail Broadcast',
}
const page = ({ params }: Params) => {

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