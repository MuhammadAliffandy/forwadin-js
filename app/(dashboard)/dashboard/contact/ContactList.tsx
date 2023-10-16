import { ContactData, MultipleCheckboxRef } from "@/utils/types"

interface ContactListProps {
    contactData: ContactData[],
    handleCheckBoxClick: (event: React.FormEvent<HTMLInputElement>, id: string) => void,
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
                    <td className="p-4 checkbox">
                        <input type="checkbox" name={'checkbox_' + item.id} id={'checkbox_' + item.id} className='rounded-sm focus:ring-transparent' onClick={(e) => handleCheckBoxClick(e, item.id)} ref={element => handleRefChange(element, item)} />
                    </td>
                    <td className='p-4'>
                        <div className="flex items-center gap-2">
                            <div className="">
                                <div style={{
                                    backgroundColor: '#' + item.colorCode
                                }} className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center`}>{item.initial}</div>
                            </div>
                            <p>{item.firstName + ' ' + item.lastName}</p>
                        </div>
                    </td>
                    <td className='p-4'>+{item.phone}</td>
                    <td className='p-4 flex flex-wrap justify-start lg:justify-start items-center gap-2'>
                        {item.ContactLabel?.map((item, idx) => (
                            <div key={idx} className='border-2 border-primary px-2 py-1 rounded-full'>
                                {item.label.name}
                            </div>
                        ))}
                    </td>
                    <td className="p-4">{item.email}</td>
                    <td className="p-4">{item.createdAt}</td>
                    <td className='p-4'>
                        <div className='py-1 text-center px-2 border border-black/20 rounded-sm hover:cursor-pointer' onClick={() => handleOpenDetailModal(item.id.toString())}>Detail</div>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default ContactList