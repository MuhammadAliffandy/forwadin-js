import { Metadata } from "next"
import Link from "next/link"
import CreateCampaign from "./CreateCampaign"

export const metadata: Metadata = {
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