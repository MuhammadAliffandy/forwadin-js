import { formatDate } from "@/app/utils/helper"
import { isFileImage } from "@/app/utils/helper/fileHelper"
import React, { useEffect, useState } from "react"
import DisplayFile from "../DisplayFile"

const BubbleChat = ({ text, received, status, isOutgoing = false, currentDate, mediaPath }) => {
    const [isCopied, setIsCopied] = useState(false)
    const messageDate = new Date(Date.parse(received))
    const [receivedMessage, setreceivedMessage] = useState('')
    useEffect(() => {
        if (Math.abs(currentDate.getTime() - messageDate.getTime()) <= 300000)
            setreceivedMessage('now')
        // else
        //     setreceivedMessage(formatDate(received) as string)

    }, [])
    const handleCopy = () => {
        setIsCopied(true)
        navigator.clipboard.writeText(text)
        setTimeout(() => setIsCopied(false), 3000)
    }

    if (isOutgoing)
        return (
            <div className="flex justify-end">
                <div className="border-primary  border pt-4 pl-6 pr-4 pb-2 text-sm mt-2 rounded-l-2xl rounded-br-2xl bg-primary text-white relative group">
                    <div className="opacity-0 invisible group-hover:visible transition-opacity group-hover:opacity-100 absolute left-2 bottom-2 w-4">
                        <img src={(isCopied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg")} alt="" className="invert-[1] grayscale-0 transition-transform transform-gpu scale-100 hover:scale-125 duration-300 hover:cursor-pointer" onClick={handleCopy} />
                    </div>
                    {mediaPath && (
                        <>
                            <div className="max-w-xs max-h-[250px] overflow-scroll">
                                {isFileImage(mediaPath) ? (
                                    <img src={process.env.BASE_URL_DEV + '/' + mediaPath} alt="photos" className="object-cover w-full h-full hover:bg-neutral-75" onClick={() => { }} />
                                ) : (
                                    <DisplayFile fileUrl={mediaPath} />
                                )}
                            </div>
                        </>
                    )}
                    {text.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            {index < text.length - 1 && <br />}
                        </React.Fragment>
                    ))}
                    <div className="flex justify-end items-center gap-2 mt-2">
                        <p className="text-customGray">{receivedMessage}</p>
                        {status === 'read' && (
                            <img src="/assets/icons/chat/read.svg" alt="" />
                        )}
                        {status === 'delivery_ack' && (
                            <img src="/assets/icons/dashboard/message_send.svg" alt="" />
                        )}
                        {status === "server_ack" && (
                            <img src="/assets/icons/dashboard/message_send.svg" alt="" />
                        )}
                    </div>
                </div>
            </div>
        )
    return (
        <div className="flex justify-start">
            <div className="border-customGray border pt-4 px-4 pb-2 text-sm mt-2 rounded-r-2xl rounded-bl-2xl bg-white group relative">
                <div className="opacity-0 invisible group-hover:visible transition-opacity group-hover:opacity-100 absolute right-2 bottom-2 w-4">
                    <img src={(isCopied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg")} alt="" className=" transition-transform transform-gpu scale-100 hover:scale-125 duration-300 hover:cursor-pointer" onClick={handleCopy} />
                </div>
                {mediaPath && (
                    <div className="max-w-xs max-h-[250px] overflow-scroll">
                        {isFileImage(mediaPath) ? (
                            <img src={process.env.BASE_URL_DEV + '/' + mediaPath} alt="photos" className="object-cover w-full h-full hover:bg-neutral-75" onClick={() => { }} />
                        ) : (
                            <DisplayFile fileUrl={mediaPath} />
                        )}
                    </div>
                )}
                {text.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        {index < text.length - 1 && <br />}
                    </React.Fragment>
                ))}
                <div className="flex items-center justify-end gap-2 mt-2">
                    <p className="text-customGray text-right">{receivedMessage}</p>
                </div>
            </div>
        </div>
    )
}

export default BubbleChat