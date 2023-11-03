'use client'

import { useEffect, useState } from "react"
import OutgoingTable from "./OutgoingTable"
import DropdownDevice from "@/components/dashboard/DropdownDevice"
import { useSession } from "next-auth/react"
import { DeviceSession } from "@/utils/types"

const Outgoing = () => {
    const { data: session } = useSession()
    const [totalMessage, settotalMessage] = useState(0)
    const [listDevice, setlistDevice] = useState<DeviceSession[]>([])
    const [currentDevice, setcurrentDevice] = useState<DeviceSession>()


    useEffect(() => {
        if (session?.user?.device)
            setlistDevice(session.user.device)
    }, [session?.user?.device])
    useEffect(() => {
        setcurrentDevice(listDevice[0])
    }, [listDevice])
    return (
        <>
            <div className="flex justify-between items-center">

                <div className="flex gap-2 lg:justify-start justify-center items-center mt-2 lg:mt-0 w-full">
                    <p className='font-lexend text-2xl font-bold'>Outgoing Chats</p>
                    <div>
                        <div className="flex-none bg-black rounded-full text-white text-[10px] font-regular h-4 w-4 flex items-center justify-center">
                            <p>{totalMessage}</p>
                        </div>
                    </div>
                </div>
                <DropdownDevice currentDevice={currentDevice} setcurrentDevice={setcurrentDevice} listDevice={session?.user?.device} />
            </div>
            <OutgoingTable settotalMessage={settotalMessage} totalMessage={totalMessage} sessionId={currentDevice?.sessionId!} user={session?.user} />
        </>
    )
}

export default Outgoing