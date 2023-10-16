'use client'
import { useState } from "react"
import Skeleton from "react-loading-skeleton"

const DetailBroadcast = () => {
    const [isLoaded, setisLoaded] = useState(true)
    const [broadcastData, setbroadcastData] = useState({

    })
    return (
        <div className='flex justify-center items-center lg:items-start lg:flex-row flex-col gap-4 mt-4'>
            <div className='max-w-sm w-full items-center flex flex-col gap-4'>
                <div className='w-full bg-white rounded-md p-4 relative'>
                    <p>Broadcast Detail</p>
                    <div className='border border-customGray rounded-md text-primary text-center mt-4 py-2 hover:bg-primary hover:text-white hover:cursor-pointer'>
                        Chat
                    </div>
                </div>
                <div className='w-full bg-white rounded-md p-4'>
                    <div className='flex gap-2 items-center hover:cursor-pointer' onClick={() => { }}>
                        <div className='font-lexend font-normal text-xl text-primary'>
                            Groups
                        </div>
                        <div>
                            <img src="/assets/icons/dashboard/bubble.svg" alt="" />
                        </div>
                    </div>
                    <div className='flex gap-2 mt-6'>
                        asd
                    </div>
                </div>
            </div>
            <div className='w-full max-w-sm lg:max-w-full'>
                <div className='bg-white w-full p-4'>
                    <p>asd</p>
                </div>
            </div>
        </div>
    )
}

export default DetailBroadcast