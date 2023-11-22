import { Metadata } from "next"
import Link from "next/link"
import DetailCampaignMessage from "./DetailCampaignMessage"
type Params = {
    params: { campaignId: string, messageId: string }
}
export const metadata: Metadata = {
    title: 'Detail Campaign'
}
const page = ({ params }: Params) => {

    return (
        <>
            <div className='flex'>
                <Link href={'/dashboard/campaign/' + params.campaignId + '/message'} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</Link>
            </div>
            <DetailCampaignMessage campaignId={params.campaignId} messageId={params.messageId} />
        </>
    )
}

export default page