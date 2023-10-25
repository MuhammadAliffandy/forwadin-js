import Group from "./Group"
type Params = {
    params: { group: string }
}
export async function generateMetadata({ params }: Params) {
    return {
        title: "Detail Group"
    }
}
const page = ({ params }: Params) => {
    return <Group groupId={params.group} />
}

export default page