import { Metadata } from "next"
import Link from "next/link"
import CreateCampaignMessage from "./CreateCampaignMessage"

export const metadata = {
    title: 'Create Campaign Message'
}
const page = ({ params }) => {

    return (
        <>
            <CreateCampaignMessage campaignId={params.campaignId} />
        </>
    )
}

export default page