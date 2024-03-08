import { Metadata } from "next"
import Link from "next/link"
import DetailCampaignMessage from "./DetailCampaignMessage"
type Params = {
    params: { campaignId: string, messageId: string }
}
export const metadata: Metadata = {
    title: 'Detail Campaign Message'
}
const page = ({ params }: Params) => {

    return (
        <>
            <DetailCampaignMessage campaignId={params.campaignId} messageId={params.messageId} />
        </>
    )
}

export default page