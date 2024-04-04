import { Metadata } from "next"
import Link from "next/link"
import DetailCampaignMessage from "./DetailCampaignMessage"

export const metadata = {
    title: 'Detail Campaign Message'
}
const page = ({ params }) => {

    return (
        <>
            <DetailCampaignMessage campaignId={params.campaignId} messageId={params.messageId} />
        </>
    )
}

export default page