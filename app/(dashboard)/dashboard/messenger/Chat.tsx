import ProfileAvatar from "@/components/dashboard/ProfileAvatar"
import BubbleChat from "@/components/dashboard/chat/BubbleChat"
import MediaChat from "@/components/dashboard/chat/MediaChat"
import { getInitials } from "@/utils/helper"
import { fetchClient } from "@/utils/helper/fetchClient"
import { ContactData, ConversationMessage, MessageMetadata } from "@/utils/types"
import { User } from "next-auth"
import { useSession } from "next-auth/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

interface ChatProps {
    currentContact: ContactData | undefined,
    currentDate: Date,
    sessionId: string | undefined,
    listMessage: ConversationMessage[],
    setlistMessage: Dispatch<SetStateAction<ConversationMessage[]>>,
    metadata: MessageMetadata,
    fetchChatMessage: () => void
}
const Chat = ({ currentContact, currentDate, sessionId, listMessage, setlistMessage, metadata, fetchChatMessage }: ChatProps) => {
    useEffect(() => {
        console.log(listMessage)
    }, [listMessage])
    return (
        <>
            {metadata && (
                <InfiniteScroll
                    dataLength={metadata.totalMessages}
                    next={fetchChatMessage}
                    hasMore={metadata.hasMore}
                    loader={<p className="text-center">Loading...</p>}
                    endMessage={<p>End of conversation</p>}
                    inverse={true}
                    height={'full'}
                >
                    {listMessage.map(message => (
                        <div className="w-full mt-2">
                            <ChatDetails message={message} />
                            <BubbleChat text={message.message} received={message.receivedAt} status={message.status} currentDate={currentDate} isOutgoing={(message.to ? true : false)} mediaPath={message.mediaPath} />
                        </div>
                    ))}
                </InfiniteScroll>
            )}
            {/* <div className="w-full mt-4">
                <div className="flex justify-end gap-2 items-center w-full">
                    <div className="text-sm">
                        <p>Anda</p>
                    </div>
                    <div className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center bg-primary`}>
                        <img src="/assets/icons/user.svg" alt="" />
                    </div>
                </div>
                <MediaChat media={mediaMessage} />
                <BubbleChat text={ConversationMessage[0].message} received={ConversationMessage[0].received_at} status={true} isOutgoing={true} currentDate={currentDate} />
            </div>
            <div className="w-full mt-4">
                <div className="flex justify-end gap-2 items-center w-full">
                    <div className="text-sm">
                        <p>Anda</p>
                    </div>
                    <div className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center bg-primary`}>
                        <img src="/assets/icons/user.svg" alt="" />
                    </div>
                </div>
                <MediaChat media={mediaMessage} />
                <BubbleChat text={ConversationMessage[0].message} received={ConversationMessage[0].received_at} status={true} isOutgoing={true} currentDate={currentDate} />
            </div> */}
        </>
    )
}

const ChatDetails = ({ message }: { message: ConversationMessage }) => {
    if (message.to)
        return (
            <>
                <div className="flex justify-end gap-2 items-center w-full">
                    <div className="text-sm">
                        <p>Anda</p>
                    </div>
                    <div className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center bg-primary`}>
                        <img src="/assets/icons/user.svg" alt="" />
                    </div>
                </div>
            </>
        )

    return (
        <>
            <div className="flex gap-2 items-center w-full">
                <ProfileAvatar profile={message.contact} />
                {/* <div style={{
                    backgroundColor: '#' + message.contact?.colorCode
                }} className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center`}>{getInitials(message.contact?.firstName + ' ' + message.contact?.lastName)}</div> */}
                <div className="">
                    <p>{message.contact?.firstName} {message.contact?.lastName}</p>
                    <p className="text-[#777C88]">{message.createdAt}</p>
                </div>
            </div>
        </>
    )
}


export default Chat