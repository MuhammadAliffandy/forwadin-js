import { ConversationMessage, IncomingMessage, OutgoingMessage } from "@/app/utils/types"
import { Button, Link } from "@nextui-org/react"
import { useRouter } from "next/navigation"

import { getInitials, getNumberFromString } from "@/app/utils/helper"

const Message = ({ message }) => {

    // if (message.to)
    //     return (
    //         <Button as={Link} href={"/dashboard/outgoing?sessionId" + message.sessionId} variant="light" fullWidth className="rounded-md flex justify-between gap-4 text-[10px]">
    //             <div className={`flex-none rounded-full text-white w-7 h-7 flex items-center justify-center bg-primary`}>
    //                 <img src="/assets/icons/user.svg" alt="" />
    //             </div>
    //             <div className="w-full">
    //                 <p className="font-bold">{message.contact ? message.contact.firstName + ' ' + (message.contact.lastName || '') : getNumberFromString(message.to)}</p>
    //                 <div className="flex items-center gap-1 -mt-1">
    //                     {message.mediaPath && (
    //                         <div>
    //                             <img src="/assets/icons/chat/image_media.svg" alt="" />
    //                         </div>
    //                     )}
    //                     <p className="w-full" style={{ WebkitLineClamp: 2, overflow: 'hidden', WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>{message.message}</p>
    //                 </div>
    //             </div>
    //         </Button>
    //     )
    return (
        <Button variant="light" fullWidth className="rounded-md flex justify-between gap-4 text-[10px]">
            {/* <PrintIcon contact={message.contact} phone={message.from} /> */}
            <div className="w-full">
                <p className="font-bold">{message.title}</p>
                <div className="flex items-center gap-1 -mt-1">
                    <p className="w-full" style={{ WebkitLineClamp: 2, overflow: 'hidden', WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>{message.body}</p>
                </div>
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

const PrintIcon = ({ contact, phone }) => {
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
                <div className={`flex-none rounded-full text-white w-7 h-7 bg-primary flex items-center justify-center`}>{phone.slice(0, 2)}</div>
            </div>
        </>
    )
}