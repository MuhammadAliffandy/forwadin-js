import ContactIcon from "@/app/components/dashboard/ContactIcon"
import { formatDate, getInitials, getNumberFromString } from "@/app/utils/helper"
import { IncomingMessage, MultipleCheckboxRef } from "@/app/utils/types"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import Link from "next/link"


const IncomingList = ({ incomingData, handleCheckBoxClick, multipleCheckboxRef, handleOpenDetailModal }) => {
    const handleRefChange = (element, item) => {
        if (multipleCheckboxRef.current && element)
            multipleCheckboxRef.current[`checkbox_${item.id}`] = element
    }
    const padding = 'p-2'
    return (
        <>
            {incomingData.map((item, index) => (
                <tr key={index}>
                    <td className="p-2 checkbox">
                        <input type="checkbox" name={'checkbox_' + item.id} id={'checkbox_' + item.id} className='rounded-sm focus:ring-transparent' onClick={(e) => handleCheckBoxClick(e, item.id)} ref={element => handleRefChange(element, item)} />
                    </td>
                    <td className='p-2'>+{getNumberFromString(item.from)}</td>
                    <td className='p-2'>
                        <div className="flex items-center gap-2">
                            <ContactIcon phone={item.from} contact={item.contact} />
                        </div>
                    </td>
                    {/* <td className="p-2">
                        <PrintType type={item.type} chatId={item.id} />
                    </td> */}

                    <td className="p-2">{formatDate(item.receivedAt)}</td>
                    <td className='p-2'>
                        <div className='py-1 text-center px-2 border border-black/20 rounded-md hover:cursor-pointer' onClick={() => { }}>{item.message}</div>
                        {/* <Popover placement="bottom" showArrow={true} color="foreground" size="sm">
                            <PopoverTrigger>
                                <Button variant="bordered" className="rounded-md mx-auto">Lihat Chat</Button>
                            </PopoverTrigger>
                            <PopoverContent >
                                <p>{item.message}</p>
                            </PopoverContent>
                        </Popover> */}
                    </td>
                </tr>
            ))}
        </>
    )
}

const PrintType = ({ type, chatId }) => {
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