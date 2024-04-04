'use client';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import EditCampaign from './EditCampaign'
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs"
import { getCampaignDetail } from '../../../../../../api/repository/campaignRepository'

const EditCampaignPage = ({ campaignId }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [campaignData, setcampaignData] = useState()
    const fetchCampaignData = async () => {

        const result = await getCampaignDetail(session.user.token , campaignId)

        if (result?.ok) {
            const resultData = await result.json()
            setcampaignData(resultData)
            console.log(resultData)
        } else if (result?.status === 404) {
            toast.error('Campaign Tidak ditemukan')
            router.push('/dashboard/campaign')
        } else {
            toast.error('Server Error')

        }
    }
    useEffect(() => {
        if (session?.user?.token && !campaignData) {
            fetchCampaignData()
        }
    }, [session?.user?.token])
    return (
        <>
            <Breadcrumbs size="sm">
                <BreadcrumbItem href="/dashboard/campaign">campaign</BreadcrumbItem>
                <BreadcrumbItem href={"/dashboard/campaign/" + campaignId}>detail campaign</BreadcrumbItem>
                <BreadcrumbItem href={"/dashboard/campaign/" + campaignId + '/edit'}>edit campaign</BreadcrumbItem>
            </Breadcrumbs>
            <p className='text-lexend font-bold text-2xl mt-4'>Campaign: {campaignData?.name}</p>
            {campaignData &&
                <EditCampaign campaignData={campaignData} />
            }
        </>
    )
}

export default EditCampaignPage