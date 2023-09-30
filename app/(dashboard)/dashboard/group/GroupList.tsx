import { GroupData, MultipleCheckboxRef } from "@/utils/types"

interface GroupListProps {
    groupData: GroupData[],
    handleCheckBoxClick: (event: React.FormEvent<HTMLInputElement>, id: string) => void,
    multipleCheckboxRef: React.MutableRefObject<MultipleCheckboxRef>,
    handleOpenDetailModal: (params: string) => void
}
const GroupList = ({ groupData, handleCheckBoxClick, multipleCheckboxRef, handleOpenDetailModal }: GroupListProps) => {
    const handleRefChange = (element: HTMLInputElement | null, item: GroupData) => {
        if (multipleCheckboxRef.current && element)
            multipleCheckboxRef.current[`checkbox_${item.id}`] = element
    }

    return (
        <>
            {groupData.map((item, index) => (
                <tr key={index}>
                    <td className="p-4 checkbox">
                        <input type="checkbox" name={'checkbox_' + item.id} id={'checkbox_' + item.id} className='rounded-sm focus:ring-transparent' onClick={(e) => handleCheckBoxClick(e, item.id)} ref={element => handleRefChange(element, item)} />
                    </td>
                    <td className='p-4'>
                        {item.name}
                    </td>
                    <td className='p-4'>{item.type}</td>
                    <td className='p-4'>{item.totalUser}</td>
                    <td className="p-4">{item.created_at}</td>
                    <td className="p-4">{item.updated_at}</td>
                    <td className='p-4'>
                        <div className='py-1 text-center px-2 border border-black/20 rounded-sm hover:cursor-pointer' onClick={() => handleOpenDetailModal(item.id.toString())}>Detail</div>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default GroupList