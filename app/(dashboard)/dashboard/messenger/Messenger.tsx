'use client'
import { useState } from "react"
import ProfileDetail from "./ProfileDetail"
import { Chart } from "chart.js/dist"
import Chat from "./Chat"
import ListChats from "./ListChats"

const Messenger = () => {

    const [mobileDropdown, setmobileDropdown] = useState(false)
    return (
        <div className="lg:-mt-4 overflow-y-hidden">
            <div className='flex justify-between gap-4'>
                <div className='max-w-[250px] w-full max-h-[82vh]  overflow-y-scroll text-xs'>
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