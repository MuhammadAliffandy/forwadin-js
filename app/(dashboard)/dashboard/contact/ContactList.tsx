import { ContactData, MultipleCheckboxRef } from "@/utils/types"

interface ContactListProps {
    contactData: ContactData[],
    handleCheckBoxClick: (event: React.FormEvent<HTMLInputElement>, id: number) => void,
    multipleCheckboxRef: React.MutableRefObject<MultipleCheckboxRef>,
    handleOpenDetailModal: (params: string) => void
}
const ContactList = ({ contactData, handleCheckBoxClick, multipleCheckboxRef, handleOpenDetailModal }: ContactListProps) => {
    const handleRefChange = (element: HTMLInputElement | null, item: ContactData) => {
        if (multipleCheckboxRef.current && element)
            multipleCheckboxRef.current[`checkbox_${item.id}`] = element
    }
    return (
        <>
            {contactData.map((item, index) => (
                <tr key={index}>
                    <td className="p-4">
                        <input type="checkbox" name={'checkbox_' + item.id} id={'checkbox_' + item.id} className='rounded-sm focus:ring-transparent' onClick={(e) => handleCheckBoxClick(e, item.id)} ref={element => handleRefChange(element, item)} />
                    </td>
                    <td className='p-4 flex gap-2'>
                        <div>Image</div>
                        <p>{item.firstName + ' ' + item.lastName}</p>
                    </td>
                    <td className='p-4'>{item.phone}</td>
                    <td className='p-4 flex flex-wrap justify-center items-center  gap-2'>
                        {item.label.map((label, idx) => (
                            <div key={idx} className='border-2 border-primary px-2 py-1 rounded-full'>
                                {label}
                            </div>
                        ))}
                    </td>
                    <td>{item.email}</td>
                    <td>{item.created_at}</td>
                    <td className=' px-4'>
                        <div className='py-1 px-2 border border-black/20 rounded-sm hover:cursor-pointer' onClick={() => handleOpenDetailModal(item.id.toString())}>Detail</div>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default ContactList