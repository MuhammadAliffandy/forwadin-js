'use client'
import DropdownDevice from '@/components/dashboard/DropdownDevice'
import { DeviceSession } from '@/utils/types'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import CampaignTable from './CampaignTable'

const Campaign = () => {
    const { data: session } = useSession()
    const [totalCampaign, settotalCampaign] = useState(0)
    const [listDevice, setlistDevice] = useState<DeviceSession[]>([])
    const [currentDevice, setcurrentDevice] = useState<DeviceSession>()


    useEffect(() => {
        if (session?.user?.device)
            setlistDevice(session.user.device)
    }, [session?.user?.device])
    useEffect(() => {
        if (!currentDevice)
            setcurrentDevice(listDevice[0])
    }, [listDevice])
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 lg:justify-start justify-center items-center mt-2 lg:mt-0 w-full">
                    <p className='font-lexend text-2xl font-bold'>Campaign</p>
                    <div>
                        <div className="flex-none bg-black rounded-full text-white text-[10px] font-regular px-1 flex items-center justify-center">
                            <p>{totalCampaign}</p>
                        </div>
                    </div>
                </div>
                <DropdownDevice currentDevice={currentDevice} setcurrentDevice={setcurrentDevice} listDevice={session?.user?.device} />

            </div>
            <CampaignTable settotalCampaign={settotalCampaign} totalCampaign={totalCampaign} user={session?.user} />
        </>
    )
}

export default Campaign