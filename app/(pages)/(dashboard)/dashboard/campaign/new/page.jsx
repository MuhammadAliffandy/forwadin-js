import Link from "next/link"
import CreateCampaign from "./CreateCampaign"

export const metadata = {
    title: 'Buat Campaign'
}
const page = () => {

    return (
        <>
            <CreateCampaign />
        </>
    )
}

export default page