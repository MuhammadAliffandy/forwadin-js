import Link from "next/link"
import DetailCampaign from "./DetailCampaign"

export const metadata = {
    title: 'Detail Campaign'
}
const page = ({ params }) => {

    return (
        <>
            <DetailCampaign campaignId={params.campaignId} />
        </>
    )
}

export default page