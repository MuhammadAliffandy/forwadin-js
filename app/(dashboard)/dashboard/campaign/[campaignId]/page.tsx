import { Metadata } from "next"

type Params = {
    params: { campaignId: string }
}
export const metadata: Metadata = {
    title: 'Detail Campaign'
}
const page = ({ params }: Params) => {

    return (
        <>
            {params.campaignId}
        </>
    )
}

export default page