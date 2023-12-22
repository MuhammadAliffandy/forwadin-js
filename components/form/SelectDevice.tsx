import { DeviceData, DeviceSession } from '@/utils/types'
import React from 'react'
interface SelectDeviceProps {
    register: any,
    listDevice: DeviceSession[] | DeviceData[],
    name: string
}
const SelectDevice = ({ listDevice, register, name }: SelectDeviceProps) => {
    return (
        <select {...register(name)} className="px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border-customGray/50 hover:border-customGray focus:border-primary">
            {listDevice.map(item => (
                <option key={item.id} value={item.id} className="">{item.name}</option>
            ))}
        </select>
    )
}

export default SelectDevice