'use client'

import { useState } from "react"
import IncomingTable from "./IncomingTable"

const Incoming = () => {
    const [messageCount, setmessageCount] = useState(0)
    return (
        <>
            <div className="flex gap-2 lg:justify-start justify-center items-center mt-2 lg:mt-0 w-full">
                <p className='font-lexend text-2xl font-bold'>Incoming Chats</p>
                <div>
                    <div className="flex-none bg-black rounded-full text-white text-[10px] font-regular h-4 w-4 flex items-center justify-center">
                        <p>{messageCount}</p>
                    </div>
                </div>
            </div>
            <IncomingTable setmessageCount={setmessageCount} />
        </>
    )
}

export default Incoming