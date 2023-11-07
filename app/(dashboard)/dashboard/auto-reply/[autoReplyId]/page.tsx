import Link from 'next/link'

type Params = {
    params: { autoReplyId: string }
}
export async function generateMetadata({ params }: Params) {
    // const contact = params.contactId
    return {
        title: "Detail Auto Reply"
    }
}
const page = ({ params }: Params) => {

    return (
        <>
            <div className='flex'>
                <Link href={'/dashboard/auto-reply'} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</Link>
            </div>
        </>
    )
}

export default page