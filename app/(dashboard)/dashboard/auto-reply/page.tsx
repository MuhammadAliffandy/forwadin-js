import AutoReply from "./AutoReply"

type Params = {
    params: { contactId: string }
}
export async function generateMetadata({ params }: Params) {
    return {
        title: "Auto Reply"
    }
}
const page = () => {

    return (
        <>
            <AutoReply />
        </>
    )
}

export default page