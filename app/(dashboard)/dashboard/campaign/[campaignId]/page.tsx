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
            <DetailCampaign campaignId={params.campaignId} />
        </>
    )
}

export default page