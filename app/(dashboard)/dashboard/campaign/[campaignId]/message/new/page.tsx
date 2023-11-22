import { Metadata } from "next"
import Link from "next/link"
import CreateCampaignMessage from "./CreateCampaignMessage"
type Params = {
    params: { campaignId: string }
}
export const metadata: Metadata = {
    title: 'Detail Campaign'
}
const page = ({ params }: Params) => {

    return (
        <>
            <CreateCampaignMessage campaignId={params.campaignId} />
        </>
    )
}

export default page