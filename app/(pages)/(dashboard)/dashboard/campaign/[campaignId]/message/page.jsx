import CampaignMessages from "./CampaignMessages"

export const metadata = {
    title: 'Detail Campaign Message'
}
const page = ({ params }) => {

    return (
        <>

            <CampaignMessages campaignId={params.campaignId} />
        </>
    )
}

export default page