'use client'

import { useEffect, useState } from "react"
import IncomingTable from "./IncomingTable"
import { DeviceSession } from "@/app/utils/types"
import { useSession } from "next-auth/react"
import DropdownDevice from "@/app/components/dashboard/DropdownDevice"
import { useSearchParams } from "next/navigation"

const Incoming = () => {
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const [totalMessage, settotalMessage] = useState(0)
    const [listDevice, setlistDevice] = useState([])
    const [currentDevice, setcurrentDevice] = useState()
    useEffect(() => {
        if (session?.user?.device)
            setlistDevice(session.user.device)
    }, [session?.user?.device])
    useEffect(() => {
        if (searchParams?.has('sessionId')) {
            const sessionId = searchParams.get('sessionId')
            const findDevice = listDevice.find(item => item.sessionId === sessionId)
            setcurrentDevice(findDevice ? findDevice : listDevice[0])
        }
        setcurrentDevice(listDevice[0])
    }, [listDevice])

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 lg:justify-start justify-center items-center mt-2 lg:mt-0 w-full">
                    <p className='font-lexend text-2xl font-bold'>Incoming Chats</p>
                    <div>
                        <div className="flex-none bg-black rounded-full text-white text-[10px] font-regular px-1 flex items-center justify-center">
                            <p>{totalMessage}</p>
                        </div>
                    </div>
                </div>
                <DropdownDevice currentDevice={currentDevice} setcurrentDevice={setcurrentDevice} listDevice={session?.user?.device} />

            </div>
            <IncomingTable settotalMessage={settotalMessage} totalMessage={totalMessage} sessionId={currentDevice?.sessionId} user={session?.user} />
        </>
    )
}

export default Incoming