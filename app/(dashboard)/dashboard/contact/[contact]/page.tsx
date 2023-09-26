import Link from 'next/link'
import DetailContact from './DetailContact'
type Params = {
    params: { contact: string }
}
export async function generateMetadata({ params }: Params) {
    const contact = params.contact
    return {
        title: contact + " Details"
    }
}
const page = ({ params }: Params) => {

    return (
        <>
            <div className='flex'>
                <Link href={'/dashboard/contact'} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</Link>
            </div>
            <DetailContact contact={params.contact} />
        </>
    )
}

export default page