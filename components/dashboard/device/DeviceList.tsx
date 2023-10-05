import { MultipleCheckboxRef, DeviceData } from "@/utils/types"
interface DeviceListProps {
    deviceData: DeviceData[],
    handleCheckBoxClick: (event: React.FormEvent<HTMLInputElement>, id: number) => void,
    deviceCheckboxRef: React.MutableRefObject<MultipleCheckboxRef>,
    handleOpenQRModal: (item: DeviceData) => void,
    handleOpenDetailModal: (params: string) => void
}
const DeviceList = ({ deviceData, handleCheckBoxClick, deviceCheckboxRef, handleOpenQRModal, handleOpenDetailModal }: DeviceListProps) => {
    const handleRefChange = (element: HTMLInputElement | null, item: DeviceData) => {
        if (deviceCheckboxRef.current && element)
            deviceCheckboxRef.current[`checkbox_${item.pkId}`] = element
    }
    return (
        <>
            {deviceData.map((item, index) => (
                <tr key={index}>
                    <td className='p-4 checkbox'>
                        <input type="checkbox" name={'checkbox_' + item.pkId} id={'checkbox_' + item.pkId} className='rounded-sm focus:ring-transparent' onClick={(e) => handleCheckBoxClick(e, item.pkId)} ref={element => handleRefChange(element, item)} />
                    </td >
                    <td className='p-4 '>{item.name}</td>
                    <td className='p-4 break-words'>{item.apiKey}</td>
                    <td className='p-4 flex flex-wrap justify-center lg:justify-start items-center  gap-2'>
                        {item.DeviceLabel.map((item, idx) => (
                            <div key={idx} className='border-2 border-primary px-2 py-1 rounded-full'>
                                {item.label.name}
                            </div>
                        ))}
                    </td>
                    <td className="p-4">{item.status === 'CONNECTED' ? 'Terkoneksi' : 'Tidak Terkoneksi'}</td>
                    <td className=' px-4'>
                        <div className="flex items-center">

                            <div className='text-primary py-1 px-4 border border-black/20 rounded-md hover:cursor-pointer whitespace-nowrap  flex items-center' onClick={() => handleOpenQRModal(item)}>Scan QR</div>
                        </div>
                    </td>
                    <td className=' px-4'>
                        <div className="flex items-center">
                            <div className='py-1 px-4 text-center border border-black/20 rounded-md hover:cursor-pointer' onClick={() => handleOpenDetailModal(item.id)}>Detail</div>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default DeviceList