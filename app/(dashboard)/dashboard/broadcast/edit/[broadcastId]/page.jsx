
import EditBroadcastPage from './EditBroadcastPage'


export const metadata= {
    title: 'Buat Broadcast',
}


export default function Page({ params }) {
    return (
        <>
            <EditBroadcastPage broadcastId={params.broadcastId} />
        </>
    )
}
