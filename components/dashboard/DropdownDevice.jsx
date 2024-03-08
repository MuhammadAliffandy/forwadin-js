import { DeviceSession } from "@/utils/types"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

const DropdownDevice = ({ listDevice, currentDevice, setcurrentDevice }) => {
    const [isLoaded, setisLoaded] = useState(false)
    useEffect(() => {
        if (listDevice && !currentDevice) {
            console.log('list device dropdown device')
            setcurrentDevice(listDevice[0])
            setisLoaded(true)
        }
    }, [listDevice])

    return (
        <div className="max-w-[250px] w-full">
            <Dropdown isDisabled={!isLoaded}>
                <DropdownTrigger className="p-3">
                    <div className="bg-white border border-customGray px-4 py-3 flex justify-between gap-2 hover:cursor-pointer rounded-md w-full items-center">
                        <div className="flex-none">
                            <img src="/assets/icons/dashboard/Devices.svg" alt="" className="invert-[1] grayscale-0" />
                        </div>
                        <p className="font-bold min-w-0 whitespace-nowrap overflow-hidden overflow-ellipsis w-max">{currentDevice?.name}</p>
                        <p className="text-customGray min-w-0 whitespace-nowrap overflow-hidden overflow-ellipsis w-max">{currentDevice?.phone}</p>
                    </div>
                </DropdownTrigger>
                <DropdownMenu items={listDevice} aria-label="device list">
                    {(item) => (
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
    )
}

export default DropdownDevice