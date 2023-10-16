import Link from 'next/link'
import DetailDevice from './DetailDevice'
import { Metadata } from 'next'
import { DeviceData } from '@/utils/types'
import { fetchClient } from '@/utils/helper/fetchClient'
type Params = {
    params: { device: string }
}
// export async function generateMetadata({ params }: Params) {
//     const device = params.device
//     const result = await fetchClient({method: 'GET', url: '/devices/' + device })
//     if(result.ok)

//     return {
//         title: "detail device"
//     }
// }
export const metadata: Metadata = {
    title: 'Detail Device',
}
const page = ({ params }: Params) => {

    return (
        <>
            <div className='flex'>
                <Link href={'/dashboard/device'} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</Link>
            </div>
            <DetailDevice device={params.device} />
        </>
    )
}

export default page