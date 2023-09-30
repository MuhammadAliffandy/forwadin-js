import Link from 'next/link'
import DetailDevice from './DetailDevice'
type Params = {
    params: { device: string }
}
export async function generateMetadata({ params }: Params) {
    const device = params.device
    return {
        title: device + " Details"
    }
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