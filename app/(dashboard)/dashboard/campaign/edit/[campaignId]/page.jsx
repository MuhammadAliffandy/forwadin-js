
import Link from "next/link"
import EditCampaignPage from "./EditCampaignPage"

export const metadata= {
    title: 'Detail Campaign'
}
const page = ({ params }) => {

    return (
        <>
            <EditCampaignPage campaignId={params.campaignId} />
        </>
    )
}

export default page