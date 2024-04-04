
import EditCampaignMessagePage from "./EditCampaignMessagePage"

export const metadata = {
    title: 'Edit Campaign Message'
}
const page = ({ params }) => {

    return (
        <>
            <EditCampaignMessagePage campaignId={params.campaignId} messageId={params.messageId} />

        </>
    )
}

export default page