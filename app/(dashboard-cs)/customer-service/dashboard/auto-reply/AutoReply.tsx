'use client'

import DropdownDevice from "@/components/dashboard/DropdownDevice"
import { DeviceSession } from "@/utils/types"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import AutoReplyTable from "./AutoReplyTable"
import TagsInput from "@/components/dashboard/TagsInput"

const AutoReply = () => {
    const { data: session } = useSession()
    const [totalAutoReply, settotalAutoReply] = useState(0)
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
            </div>
            <AutoReplyTable settotalAutoReply={settotalAutoReply} customerService={session?.customerService} />
        </>
    )
}

export default AutoReply