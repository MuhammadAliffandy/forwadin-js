import { formatDate, getInitials } from "@/utils/helper"
import { IncomingMessage, MultipleCheckboxRef } from "@/utils/types"
import Link from "next/link"

interface IncomingListProps {
    incomingData: IncomingMessage[],
    handleCheckBoxClick: (event: React.FormEvent<HTMLInputElement>, id: string) => void,
    multipleCheckboxRef: React.MutableRefObject<MultipleCheckboxRef>,
    handleOpenDetailModal: (params: string) => void
}
const IncomingList = ({ incomingData, handleCheckBoxClick, multipleCheckboxRef, handleOpenDetailModal }: IncomingListProps) => {
    const handleRefChange = (element: HTMLInputElement | null, item: IncomingMessage) => {
        if (multipleCheckboxRef.current && element)
            multipleCheckboxRef.current[`checkbox_${item.id}`] = element
    }

    return (
        <>
            {incomingData.map((item, index) => (
                <tr key={index}>
                    <td className="p-4 checkbox">
                        <input type="checkbox" name={'checkbox_' + item.id} id={'checkbox_' + item.id} className='rounded-sm focus:ring-transparent' onClick={(e) => handleCheckBoxClick(e, item.id)} ref={element => handleRefChange(element, item)} />
                    </td>
                    <td className='p-4'>+{item.from}</td>
                    <td className='p-4'>
                        <div className="flex items-center gap-2">
                            <div className="">
                                <div style={{
                                    backgroundColor: '#' + item.contact.colorCode
                                }} className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center`}>{getInitials((item.contact.firstName + ' ' + item.contact.lastName))}</div>
                            </div>
                            <p>{item.contact.firstName} {item.contact.lastName}</p>
                            {/* <p>{item.contact.firstName + ' ' + item.contact.lastName}</p> */}
                        </div>
                    </td>
                    {/* <td className="p-4">
                        <PrintType type={item.type} chatId={item.id} />
                    </td> */}

                    <td className="p-4">{formatDate(item.receivedAt)}</td>
                    <td className='p-4'>
                        <div className='py-1 text-center px-2 border border-black/20 rounded-md hover:cursor-pointer' onClick={() => handleOpenDetailModal(item.id.toString())}>Lihat Chat</div>
                    </td>
                </tr>
            ))}
        </>
    )
}

const PrintType = ({ type, chatId }: { type: string, chatId: string }) => {
    if (type === 'campaign') {
        return (
            <Link href={{
                pathname: '/dashboard/campaign', query: {
                    messageId: chatId
                }
            }} className="flex items-center gap-2 text-primary">
                <p>Balasan dari Campaign</p>
                <div className="flex-none">
                    <img src="/assets/icons/dashboard/bubble.svg" alt="" />
                </div>
            </Link>
        )
    }
    if (type === 'broadcast') {
        return (
            <Link href={{
                pathname: '/dashboard/messenger', query: {
                    messageId: chatId
                }
            }} className="flex items-center gap-2 text-primary">
                <p>Balasan dari Broadcast</p>
                <div className="flex-none">
                    <img src="/assets/icons/dashboard/bubble.svg" alt="" />
                </div>
            </Link>
        )

    }
    return (
        <p>Pesan Langsung</p>
    )
}

export default IncomingList