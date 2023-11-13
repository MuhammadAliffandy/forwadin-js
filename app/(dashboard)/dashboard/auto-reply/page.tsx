import { Metadata } from "next"
import AutoReply from "./AutoReply"
export const metadata: Metadata = {
    title: 'Auto Reply'
}
const page = () => {

    return (
        <>
            <AutoReply />
        </>
    )
}

export default page