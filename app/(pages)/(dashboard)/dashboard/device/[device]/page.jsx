import Link from 'next/link'
import DetailDevice from './DetailDevice'
import { Metadata } from 'next'

export const metadata= {
    title: 'Detail Device',
}
const page = ({ params }) => {

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