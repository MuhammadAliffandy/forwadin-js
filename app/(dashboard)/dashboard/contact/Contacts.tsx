'use client'

import { useEffect, useState } from "react"
import ContactTable from "./ContactTable"
import DropdownDevice from "@/components/dashboard/DropdownDevice"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { fetchClient } from "@/utils/helper/fetchClient"
import { DeviceData } from "@/utils/types"
interface DropdownDeviceProps {
    name: string,
    phone?: string,
    id: string,
}
const Contacts = () => {
    const { data: session } = useSession()
    const [contactCount, setcontactCount] = useState(0)
    const [listDevice, setlistDevice] = useState<DropdownDeviceProps[]>([
        {
            name: 'all device',
            id: '*',
        }
    ])
    const [currentDevice, setcurrentDevice] = useState<DropdownDeviceProps>({
        name: 'all device',
        id: '*'
    })
    const fetchDevice = async () => {
        const result = await fetchClient({
            url: '/devices',
            method: 'GET',
            user: session?.user
        })
        if (result?.ok) {
            const resultData: DeviceData[] = await result.json()
            const newArrDevice: DropdownDeviceProps[] = resultData.map(device => {
                return {
                    id: device.id,
                    name: device.name,
                    phone: (device.phone ? device.phone : '-')
                }
            })
            setlistDevice(prev => [...prev, ...newArrDevice])
        }
    }
    useEffect(() => {
        if (session?.user?.token) fetchDevice()

    }, [session?.user?.token])

    return (
        <>
            <div className="flex gap-2 lg:justify-between justify-center items-center mt-2 lg:mt-0 w-full">
                <div className="flex gap-2 items-center">

                    <p className='font-lexend text-2xl font-bold'>Contacts</p>
                    <div>
                        <div className="flex-none bg-black rounded-full text-white text-[10px] font-regular h-4 w-4 flex items-center justify-center">
                            <p>{contactCount}</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-[250px] w-full">
                    <Dropdown>
                        <DropdownTrigger className="p-3">
                            <div className="bg-white border border-customGray px-4 py-3 flex justify-between gap-2 hover:cursor-pointer rounded-md w-full items-center">
                                <div className="flex-none">
                                    <img src="/assets/icons/dashboard/Devices.svg" alt="" className="invert-[1] grayscale-0" />
                                </div>
                                <p className="font-bold min-w-0 whitespace-nowrap overflow-hidden overflow-ellipsis w-max">{currentDevice.name}</p>
                                <p className="text-customGray min-w-0 whitespace-nowrap overflow-hidden overflow-ellipsis w-max">{currentDevice.phone}</p>
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
            <ContactTable setcontactCount={setcontactCount} currentDevice={currentDevice} user={session?.user} />
        </>
    )
}

export default Contacts