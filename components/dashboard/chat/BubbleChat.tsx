import { formatDate } from "@/utils/helper"
import { useEffect, useState } from "react"

interface BubbleChatProps {
    text: string,
    received: string,
    status?: string,
    isOutgoing?: boolean,
    currentDate: Date
}
const BubbleChat = ({ text, received, status, isOutgoing = false, currentDate }: BubbleChatProps) => {
    const messageDate = new Date(Date.parse(received))
    const [receivedMessage, setreceivedMessage] = useState(received)
    useEffect(() => {
        console.log(received)
        if (Math.abs(currentDate.getTime() - messageDate.getTime()) <= 300000)
            setreceivedMessage('now')
        else
            setreceivedMessage(formatDate(received) as string)
    }, [])
    if (isOutgoing)
        return (
            <div className="flex justify-end">
                <div className="border-primary  border pt-4 px-4 pb-2 text-sm mt-2 rounded-l-2xl rounded-br-2xl bg-primary text-white">
                    <p>{text}</p>
                    <div className="flex justify-end items-center gap-2 mt-2">
                        <p className="text-customGray">{receivedMessage}</p>
                        {status === 'read' && (
                            <img src="/assets/icons/dashboard/message_send.svg" alt="" />
                        )}
                        {status === 'delivery_ack' && (
                            <img src="/assets/icons/dashboard/message_send.svg" alt="" />
                        )}
                    </div>
                </div>
            </div>
        )
    return (
        <div className="flex justify-start">
            <div className="border-customGray border pt-4 px-4 pb-2 text-sm mt-2 rounded-r-2xl rounded-bl-2xl bg-white">
                <p>{text}</p>
                <div className="flex items-center gap-2 mt-2">
                    <p className="text-customGray">{receivedMessage}</p>
                    {/* <p>{status}</p> */}
                </div>
            </div>
        </div>
    )
}

export default BubbleChat