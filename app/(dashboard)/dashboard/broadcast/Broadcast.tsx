'use client'

import { useEffect, useState } from "react"
import BroadcastTable from "./BroadcastTable"
import DropdownDevice from "@/components/dashboard/DropdownDevice"
import { DeviceSession } from "@/utils/types"
import { useSession } from "next-auth/react"

const Broadcast = () => {
    const [broadcastCount, setbroadcastCount] = useState(0)
    const { data: session } = useSession()
    // const [listDevice, setlistDevice] = useState<DeviceSession[]>([])
    // const [currentDevice, setcurrentDevice] = useState<DeviceSession>()

    // useEffect(() => {
    //     console.log('session user device')
    //     if (session?.user?.device && listDevice.length === 0)
    //         setlistDevice(session.user.device)
    // }, [session?.user?.device])
    // useEffect(() => {
    //     console.log('list device')
    //     if (listDevice)
    //         setcurrentDevice(listDevice[0])
    // }, [listDevice])
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 lg:justify-start justify-center items-center mt-2 lg:mt-0 w-full">
                    <p className='font-lexend text-2xl font-bold'>Broadcast</p>
                    <div>
                        <div className="flex-none bg-black rounded-full text-white text-[10px] font-regular h-4 w-4 flex items-center justify-center">
                            <p>{broadcastCount}</p>
                        </div>
                    </div>
                </div>
                {/* <DropdownDevice currentDevice={currentDevice} setcurrentDevice={setcurrentDevice} listDevice={session?.user?.device} /> */}
            </div>
            <BroadcastTable
                settotalBroadcast={setbroadcastCount}
                totalBroadcast={broadcastCount}
                // currentDevice={currentDevice!}
                user={session?.user}
            />
        </>
    )
}

export default Broadcast