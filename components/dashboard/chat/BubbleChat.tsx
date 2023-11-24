import { formatDate } from "@/utils/helper"
import { useEffect, useState } from "react"

interface BubbleChatProps {
    text: string,
    received: string,
    status?: string,
    isOutgoing?: boolean,
    mediaPath?: string,
    currentDate: Date
}
const BubbleChat = ({ text, received, status, isOutgoing = false, currentDate, mediaPath }: BubbleChatProps) => {
    const messageDate = new Date(Date.parse(received))
    const [receivedMessage, setreceivedMessage] = useState(received)
    useEffect(() => {
        if (Math.abs(currentDate.getTime() - messageDate.getTime()) <= 300000)
            setreceivedMessage('now')
        else
            setreceivedMessage(formatDate(received) as string)
    }, [])

    if (isOutgoing)
        return (
            <div className="flex justify-end">
                <div className="border-primary  border pt-4 px-4 pb-2 text-sm mt-2 rounded-l-2xl rounded-br-2xl bg-primary text-white">
                    {mediaPath && (
                        <div className="max-w-xs max-h-[250px] overflow-scroll">
                            <img src={process.env.NEXT_PUBLIC_BACKEND_URL + '/' + mediaPath} alt="photos" className="object-cover w-full h-full hover:bg-neutral-75" onClick={() => { }} />
                        </div>
                    )}
                    <p className="mt-2">{text}</p>
                    <div className="flex justify-end items-center gap-2 mt-2">
                        <p className="text-customGray">{receivedMessage}</p>
                        {status === 'read' && (
                            <img src="/assets/icons/chat/read.svg" alt="" />
                        )}
                        {status === 'delivery_ack' && (
                            <img src="/assets/icons/dashboard/message_send.svg" alt="" />
                        )}
                        {status === "server_ack" && (
                            <p className="text-white"> check</p>
                        )}
                    </div>
                </div>
            </div>
        )
    return (
        <div className="flex justify-start">
            <div className="border-customGray border pt-4 px-4 pb-2 text-sm mt-2 rounded-r-2xl rounded-bl-2xl bg-white">
                {mediaPath && (
                    <div className="max-w-xs max-h-[250px] overflow-scroll">
                        <img src={process.env.NEXT_PUBLIC_BACKEND_URL + '/' + mediaPath} alt="photos" className="object-cover w-full h-full hover:bg-neutral-75" onClick={() => { }} />
                    </div>
                )}
                <p className="mt-2">{text}</p>
                <div className="flex items-center justify-end gap-2 mt-2">
                    <p className="text-customGray text-right">{receivedMessage}</p>
                </div>
            </div>
        </div>
    )
}

export default BubbleChat