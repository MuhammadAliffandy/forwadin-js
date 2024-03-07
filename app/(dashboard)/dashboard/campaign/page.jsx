import { Metadata } from "next"
import Campaign from "./Campaign"

type Params = {
    params: { contactId: string }
}
export const metadata: Metadata = {
    title: 'Campaign'
}
const page = () => {

    return (
        <>
            <Campaign />
        </>
    )
}

export default page