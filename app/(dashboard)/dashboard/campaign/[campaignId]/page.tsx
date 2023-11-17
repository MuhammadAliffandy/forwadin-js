import { Metadata } from "next"
import Link from "next/link"
import DetailCampaign from "./DetailCampaign"

type Params = {
    params: { campaignId: string }
}
export const metadata: Metadata = {
    title: 'Detail Campaign'
}
const page = ({ params }: Params) => {

    return (
        <>
            <div className='flex'>
                <Link href={'/dashboard/campaign'} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</Link>
            </div>
            <DetailCampaign campaignId={params.campaignId} />
        </>
    )
}

export default page