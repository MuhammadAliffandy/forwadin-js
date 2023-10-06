'use client'
import { useState } from "react"
import ProfileDetail from "./ProfileDetail"
import Chat from "./Chat"
import ListChats from "./ListChats"
import { DeviceData } from "@/utils/types"

const Messenger = () => {

    const [mobileDropdown, setmobileDropdown] = useState(false)
    const [listDevice, setlistDevice] = useState<DeviceData[]>([
        {
            pkId: 1,
            id: 'asdasdadad',
            name: 'Coba coba',
            phone: '6291919191',
            apiKey: 'oaod-1091d-12en',
            serverId: 1,
            status: 'CONNECTED',
            created_at: '11.9.2023, 2:43 PM',
            updated_at: '11.9.2023, 2:43 PM',
            userId: 1,
            DeviceLabel: [],
        }
    ])
    return (
        <div className="lg:-mt-4 overflow-y-hidden">
            <div className='flex justify-between gap-4'>
                <div className='max-w-[250px] w-full max-h-[82vh]  overflow-y-scroll text-xs'>
                    <div className="bg-white border border-customGray p-3 flex justify-between gap-2 hover:cursor-pointer rounded-md w-full items-center">
                        <div className="flex-none">
                            <img src="/assets/icons/dashboard/Devices.svg" alt="" className="invert-[1] grayscale-0" />
                        </div>
                        <p>RMX123</p>
                        <p className="text-customGray">+6281357995175</p>
                        <div className="flex-none px-2">
                            <img src="/assets/icons/chevron-down.svg" alt="" width={12} />
                        </div>
                    </div>
                    <ListChats />
                </div>
                <div className='bg-white rounded-md w-full max-h-[82vh] p-4 overflow-y-scroll'>
                    <Chat />
                </div>
                <div className='bg-white rounded-md w-full max-w-xs max-h-[82vh] p-4 overflow-y-scroll' >
                    <ProfileDetail />
                </div>
            </div>
        </div>
    )
}

export default Messenger