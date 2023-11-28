import { IncomingMessage } from "@/utils/types"
import { Button, Link } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import ContactIcon from "./ContactIcon"
import { getInitials, getNumberFromString } from "@/utils/helper"

const Message = ({ message }: { message: IncomingMessage }) => {
    const { push } = useRouter()
    return (
        <Button as={Link} href="/dashboard/incoming" variant="ghost" fullWidth className="rounded-md flex justify-between gap-4 text-[10px]">
            <PrintIcon contact={message.contact} phone={message.from} />
            <div className="w-full">
                <p className="font-bold">{message.contact ? message.contact.firstName + ' ' + message.contact.lastName : getNumberFromString(message.from)}</p>
                <p className="-mt-1" style={{ WebkitLineClamp: 2, overflow: 'hidden', WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>{message.message}</p>
            </div>
        </Button>
    )
}

export default Message

// const PrintStatus = ({status}: {status:'delivery_ack'|'read'| 'server_ack'}) =>{
// if(status === 'delivery_ack')
//     return(

//         )

// }

const PrintIcon = ({ contact, phone }: {
    contact?: {
        firstName: string,
        lastName: string,
        colorCode: string
    },
    phone: string
}) => {
    if (contact) {
        return (
            <>
                <div className="text-sm">
                    <div style={{
                        backgroundColor: '#' + contact.colorCode
                    }} className={`flex-none rounded-full text-white w-7 h-7 flex items-center justify-center`}>{getInitials(contact.firstName + ' ' + contact.lastName)}</div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="text-sm">
                <div className={`flex-none rounded-full text-white w-8 h-8 bg-primary flex items-center justify-center`}>{phone.slice(0, 2)}</div>
            </div>
        </>
    )
}