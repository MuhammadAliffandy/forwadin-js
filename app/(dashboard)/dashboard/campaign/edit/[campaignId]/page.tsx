import { Metadata } from "next"
import Link from "next/link"
import EditCampaignPage from "./EditCampaignPage"

type Params = {
    params: { campaignId: string }
}
export const metadata: Metadata = {
    title: 'Detail Campaign'
}
const page = ({ params }: Params) => {

    return (
        <>
            <EditCampaignPage campaignId={params.campaignId} />
        </>
    )
}

export default page