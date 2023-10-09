import { useEffect, useState } from "react"

interface BubbleChatProps {
    text: string,
    received: string,
    status: boolean,
    isOutgoing?: boolean,
    currentDate: Date
}
const BubbleChat = ({ text, received, status, isOutgoing = false, currentDate }: BubbleChatProps) => {
    const messageDate = new Date(Date.parse(received))
    const [receivedMessage, setreceivedMessage] = useState(received)
    useEffect(() => {
        console.log(messageDate)

        if (Math.abs(currentDate.getTime() - messageDate.getTime()) <= 300000)
            setreceivedMessage('now')
    }, [])
    if (isOutgoing)
        return (
            <div className="border-primary border pt-4 px-4 pb-2 text-sm mt-2 rounded-l-2xl rounded-br-2xl bg-primary text-white">
                <p>{text}</p>
                <div className="flex justify-end items-center gap-2 mt-2">
                    <p>{receivedMessage}</p>
                    <p>&#10003;</p>
                </div>
            </div>
        )
    return (
        <div className="border-customGray border pt-4 px-4 pb-2 text-sm mt-2 rounded-r-2xl rounded-bl-2xl bg-white">
            <p>{text}</p>
            <div className="flex justify-end items-center gap-2 mt-2">
                <p>{receivedMessage}</p>
                <p>&#10003;</p>
            </div>
        </div>
    )
}

export default BubbleChat