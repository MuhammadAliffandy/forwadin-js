import { Metadata } from "next"
import Link from "next/link"
import EditCampaignMessagePage from "./EditCampaignMessagePage"
type Params = {
    params: { campaignId: string, messageId: string }
}
export const metadata: Metadata = {
    title: 'Edit Campaign Message'
}
const page = ({ params }: Params) => {

    return (
        <>
            <EditCampaignMessagePage campaignId={params.campaignId} messageId={params.messageId} />

        </>
    )
}

export default page