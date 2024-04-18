import Link from 'next/link'
import DetailAutoReply from './DetailAutoReply'

export async function generateMetadata({ params }) {
    // const contact = params.contactId
    return {
        title: "Detail Auto Reply"
    }
}

const page = async ({ params }) => {

    return (
        <>
            <div className='flex'>
                <Link href={'/customer-service/dashboard/auto-reply'} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</Link>
            </div>
            <DetailAutoReply autoReplyId={params.autoReplyId} />
        </>
    )
}

export default page