import { DeviceCheckboxRef, DeviceData } from "@/utils/types"
import React from "react"
interface DeviceListProps {
    deviceData: DeviceData[],
    handleCheckBoxClick: (event: React.FormEvent<HTMLInputElement>, id: number) => void,
    deviceCheckboxRef: React.MutableRefObject<DeviceCheckboxRef>,
    handleOpenQRModal: (item: DeviceData) => void,
    handleOpenDetailModal: (params: string) => void
}
const DeviceList = ({ deviceData, handleCheckBoxClick, deviceCheckboxRef, handleOpenQRModal, handleOpenDetailModal }: DeviceListProps) => {
    const handleRefChange = (element: HTMLInputElement | null, item: DeviceData) => {
        if (deviceCheckboxRef.current && element)
            deviceCheckboxRef.current[`checkbox_${item.id}`] = element
    }
    return (
        <>
            {deviceData.map((item, index) => (
                <tr key={index}>
                    <td className='p-4'>
                        <input type="checkbox" name={'checkbox_' + item.id} id={'checkbox_' + item.id} className='rounded-sm focus:ring-transparent' onClick={(e) => handleCheckBoxClick(e, item.id)} ref={element => handleRefChange(element, item)} />
                    </td >
                    <td className='p-4'>{item.name}</td>
                    <td className='p-4 break-words'>{item.apiKey}</td>
                    <td className='p-4 flex flex-wrap justify-center lg:justify-start items-center  gap-2'>
                        {item.label.map((label, idx) => (
                            <div key={idx} className='border-2 border-primary px-2 py-1 rounded-full'>
                                {label}
                            </div>
                        ))}
                    </td>
                    <td>{item.status ? 'Terkoneksi' : 'Tidak Terkoneksi'}</td>
                    <td className=' px-4'>
                        <div className='text-primary py-1 px-2 border border-black/20 rounded-sm hover:cursor-pointer whitespace-nowrap' onClick={() => handleOpenQRModal(item)}>Scan QR</div>
                    </td>
                    <td className=' px-4'>
                        <div className='py-1 px-2 border border-black/20 rounded-sm hover:cursor-pointer' onClick={() => handleOpenDetailModal(item.name)}>Detail</div>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default DeviceList