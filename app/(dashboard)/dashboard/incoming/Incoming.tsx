'use client'

import { useEffect, useState } from "react"
import IncomingTable from "./IncomingTable"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { DeviceData } from "@/utils/types"
import { fetchClient } from "@/utils/helper/fetchClient"
import { useSession } from "next-auth/react"

const Incoming = () => {
    const { data: session } = useSession()
    const [messageCount, setmessageCount] = useState(0)
    const [listDevice, setlistDevice] = useState<DeviceData[]>([])
    const [currentDevice, setcurrentDevice] = useState<DeviceData>()
    const [currentSession, setcurrentSession] = useState('')
    const fetchListDevice = async () => {
        const result = await fetchClient({
            url: '/devices',
            method: 'GET',
            user: session?.user
        })
        if (result && result.ok) {
            const resultData: DeviceData[] = await result.json()
            setlistDevice(resultData.filter(device => device.status === "open"))
        }
    }
    const fetchDeviceSession = async () => {
        const result = await fetchClient({
            url: '/sessions/' + currentDevice?.apiKey,
            method: 'GET',
            user: session?.user
        })
        if (result && result.ok) {
            const resultData = await result.json()
            setcurrentSession(resultData[0].sessionId)
        }
    }
    useEffect(() => {
        fetchListDevice()
    }, [session?.user?.token])
    useEffect(() => {
        setcurrentDevice(listDevice[0])
    }, [listDevice])
    useEffect(() => {
        if (currentDevice)
            fetchDeviceSession()
    }, [currentDevice])
    useEffect(() => {
        // console.log(currentSession)
    }, [currentSession])
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 lg:justify-start justify-center items-center mt-2 lg:mt-0 w-full">
                    <p className='font-lexend text-2xl font-bold'>Incoming Chats</p>
                    <div>
                        <div className="flex-none bg-black rounded-full text-white text-[10px] font-regular px-1 flex items-center justify-center">
                            <p>{messageCount}</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-xs w-full">

                    <Dropdown className="">
                        <DropdownTrigger>
                            <div className="bg-white border border-customGray p-3 flex justify-between gap-2 hover:cursor-pointer rounded-md w-full items-center">
                                <div className="flex-none">
                                    <img src="/assets/icons/dashboard/Devices.svg" alt="" className="invert-[1] grayscale-0" />
                                </div>
                                <p className="font-bold">{currentDevice?.name}</p>
                                <p className="text-customGray">{currentDevice?.phone}</p>
                                <div className="flex-none px-2">
                                    <img src="/assets/icons/chevron-down.svg" alt="" width={12} />
                                </div>
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu items={listDevice} aria-label="device list">
                            {(item: any) => (
                                <DropdownItem
                                    key={item.id}
                                    onClick={() => {
                                        setcurrentDevice(item)
                                    }}
                                >
                                    <div className="flex gap-2">
                                        <p className="font-bold">{item.name}</p>
                                        <p>{item.phone}</p>
                                    </div>
                                </DropdownItem>
                            )}
                        </DropdownMenu>

                    </Dropdown>
                </div>

            </div>
            <IncomingTable setmessageCount={setmessageCount} sessionId={currentSession} user={session?.user} />
        </>
    )
}

export default Incoming