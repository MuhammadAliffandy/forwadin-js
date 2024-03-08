import { DeviceData, DeviceSession } from '@/app/utils/types'
import React from 'react'

const SelectDevice = ({ listDevice, register, name }) => {
    return (
        <select {...register(name)} className="px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border-customGray/50 hover:border-customGray focus:border-primary">
            {listDevice.map(item => (
                <option key={item.id} value={item.id} className="">{item.name}</option>
            ))}
        </select>
    )
}

export default SelectDevice