import Group from "./Group"

export async function generateMetadata({ params }) {
    return {
        title: "Detail Group"
    }
}
const page = ({ params }) => {
    return <Group groupId={params.group} />
}

export default page