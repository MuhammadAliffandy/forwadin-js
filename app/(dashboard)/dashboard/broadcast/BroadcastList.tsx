import { BroadcastData, MultipleCheckboxRef } from "@/utils/types"
import Link from "next/link"

interface BroadcastListProps {
    broadcastData: BroadcastData[],
    handleCheckBoxClick: (event: React.FormEvent<HTMLInputElement>, id: string) => void,
    multipleCheckboxRef: React.MutableRefObject<MultipleCheckboxRef>,
    handleOpenDetailModal: (params: string) => void
}
const BroadcastList = ({ broadcastData, handleCheckBoxClick, multipleCheckboxRef, handleOpenDetailModal }: BroadcastListProps) => {
    const handleRefChange = (element: HTMLInputElement | null, item: BroadcastData) => {
        if (multipleCheckboxRef.current && element)
            multipleCheckboxRef.current[`checkbox_${item.id}`] = element
    }

    return (
        <>
            {broadcastData.map((item, index) => (
                <tr key={index}>
                    <td className="p-4 checkbox">
                        <input type="checkbox" name={'checkbox_' + item.id} id={'checkbox_' + item.id} className='rounded-sm focus:ring-transparent' onClick={(e) => handleCheckBoxClick(e, item.id)} ref={element => handleRefChange(element, item)} />
                    </td>
                    <td className='p-4'>{item.name}</td>
                    <td className='p-4'>{item.status}</td>
                    <td className='p-4'>{item.sent}</td>
                    <td className='p-4'>{item.received}</td>
                    <td className='p-4'>{item.read}</td>
                    <td className='p-4'>{item.reply}</td>
                    <td className='p-4'>{item.device.name}</td>
                    <td className='p-4'>{item.created_at}</td>
                    <td className='p-4'>{item.updated_at}</td>

                </tr>
            ))}
        </>
    )
}

export default BroadcastList