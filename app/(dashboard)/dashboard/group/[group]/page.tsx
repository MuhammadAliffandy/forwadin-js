import Link from 'next/link'
import DetailGroup from './DetailGroup'

type Params = {
    params: { group: string }
}
export async function generateMetadata({ params }: Params) {
    // fetch group data from backend
    const group = params.group
    return {
        title: group + " Details"
    }
}
const page = ({ params }: Params) => {

    return (
        <>
            <div className='flex'>
                <Link href={'/dashboard/group'} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</Link>
            </div>
            <div className="flex gap-2 lg:justify-start justify-center items-center mt-4 w-full">
                <p className='font-lexend text-2xl font-bold'>Group: {params.group}</p>
                <div>
                    <div className="flex-none bg-black rounded-full text-white text-[10px] font-regular h-4 w-4 flex items-center justify-center">
                        <p>4</p>
                    </div>
                </div>
            </div>
            <DetailGroup params={params} />
        </>
    )
}

export default page