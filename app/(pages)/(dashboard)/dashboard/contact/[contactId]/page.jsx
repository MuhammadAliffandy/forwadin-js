import Link from 'next/link'
import DetailContact from './DetailContact'

export async function generateMetadata({ params }) {
    // const contact = params.contactId
    return {
        title: "Detail Kontak"
    }
}
const page = ({ params }) => {

    return (
        <>
            <div className='flex'>
                <Link href={'/dashboard/contact'} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</Link>
            </div>
            <DetailContact contactId={params.contactId} />
        </>
    )
}

export default page