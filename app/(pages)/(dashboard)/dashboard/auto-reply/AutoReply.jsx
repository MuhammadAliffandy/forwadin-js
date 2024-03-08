'use client'

import DropdownDevice from "@/app/components/dashboard/DropdownDevice"
import { DeviceSession } from "@/app/utils/types"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import AutoReplyTable from "./AutoReplyTable"
import TagsInput from "@/app/components/dashboard/TagsInput"

const AutoReply = () => {
    const { data: session } = useSession()
    const [totalAutoReply, settotalAutoReply] = useState(0)
    const [listDevice, setlistDevice] = useState([])
    const [currentDevice, setcurrentDevice] = useState()


    useEffect(() => {
        console.log('session user device')
        if (session?.user?.device && listDevice.length === 0)
            setlistDevice(session.user.device)
    }, [session?.user?.device])
    useEffect(() => {

        console.log('list device')
        if (listDevice)
            setcurrentDevice(listDevice[0])
    }, [listDevice])
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 lg:justify-start justify-center items-center mt-2 lg:mt-0 w-full">
                    <p className='font-lexend text-2xl font-bold'>Auto Reply</p>
                    <div>
                        <div className="flex-none bg-black rounded-full text-white text-[10px] font-regular px-1 flex items-center justify-center">
                            <p>{totalAutoReply}</p>
                        </div>
                    </div>
                </div>
                <DropdownDevice currentDevice={currentDevice} setcurrentDevice={setcurrentDevice} listDevice={session?.user?.device} />

            </div>
            <AutoReplyTable settotalAutoReply={settotalAutoReply} user={session?.user} />
        </>
    )
}

export default AutoReply