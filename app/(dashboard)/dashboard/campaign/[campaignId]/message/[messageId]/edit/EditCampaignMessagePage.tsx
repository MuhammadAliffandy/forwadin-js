'use client'
import { fetchClient } from '@/utils/helper/fetchClient'
import { CampaignData, CampaignMessage } from '@/utils/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import EditCampaignMessage from './EditCampaignMessage'
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs"

const EditCampaignMessagePage = ({ campaignId, messageId }: { campaignId: string, messageId: string }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [campaignData, setcampaignData] = useState<CampaignData>()
    const [messageData, setmessageData] = useState<CampaignMessage>()
    const fetchCampaignData = async () => {
        const campaignResult = await fetchClient({
            url: '/campaigns/' + campaignId,
            method: 'GET',
            user: session?.user
        })
        const messageResult = await fetchClient({
            url: '/campaigns/messages/' + messageId,
            method: 'GET',
            user: session?.user
        })
        if (campaignResult?.ok && messageResult?.ok) {
            const campaignResultData = await campaignResult.json()
            const messageResultData = await messageResult.json()
            setcampaignData(campaignResultData)
            setmessageData(messageResultData)
            console.log(campaignResultData)
            console.log(messageResultData)
        } else if (campaignResult?.status === 404) {
            toast.error('Campaign Tidak ditemukan')
            router.push('/dashboard/campaign')
        } else if (messageResult?.status === 404) {
            toast.error('Campaign Message Tidak ditemukan')
            router.push('/dashboard/campaign/' + campaignId + '/message')
        }
    }
    useEffect(() => {
        if (session?.user?.token && !campaignData && !messageData) {
            fetchCampaignData()
        }
    }, [session?.user?.token])
    return (
        <>
            <Breadcrumbs size='sm'>
                <BreadcrumbItem href="/dashboard/campaign">campaign</BreadcrumbItem>
                <BreadcrumbItem href={"/dashboard/campaign/" + campaignId}>detail campaign</BreadcrumbItem>
                <BreadcrumbItem href={"/dashboard/campaign/" + campaignId + '/message'}>campaign message</BreadcrumbItem>
                <BreadcrumbItem href={`/dashboard/campaign/${campaignId}/message/${messageId}`}>detail campaign message</BreadcrumbItem>
                <BreadcrumbItem href={`/dashboard/campaign/${campaignId}/message/${messageId}/edit`}>edit campaign message</BreadcrumbItem>
            </Breadcrumbs>
            <p className='text-lexend font-bold text-2xl mt-4'>Campaign: {campaignData?.name}</p>
            {(campaignData && messageData) &&
                <EditCampaignMessage campaignData={campaignData} messageData={messageData} />
            }
        </>
    )
}

export default EditCampaignMessagePage