import type { Metadata } from 'next'
import EditBroadcastPage from './EditBroadcastPage'


export const metadata: Metadata = {
    title: 'Buat Broadcast',
}
interface ParamsProps {
    params: {
        broadcastId: string
    }
}

export default function Page({ params }: ParamsProps) {
    return (
        <>
            <EditBroadcastPage broadcastId={params.broadcastId} />
        </>
    )
}
