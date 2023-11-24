import { Metadata } from "next"
import Link from "next/link"
import CampaignMessages from "./CampaignMessages"

type Params = {
    params: { campaignId: string }
}
export const metadata: Metadata = {
    title: 'Detail Campaign Message'
}
const page = ({ params }: Params) => {

    return (
        <>

            <CampaignMessages campaignId={params.campaignId} />
        </>
    )
}

export default page