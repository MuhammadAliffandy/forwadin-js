import ProfileAvatar from "@/components/dashboard/ProfileAvatar"
import BubbleChat from "@/components/dashboard/chat/BubbleChat"
import MediaChat from "@/components/dashboard/chat/MediaChat"
import { formatDate, getInitials } from "@/utils/helper"
import { fetchClient } from "@/utils/helper/fetchClient"
import { MessengerList, ConversationMessage, MessageMetadata } from "@/utils/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"


const Chat = ({ currentMessenger, currentDate, sessionId, listMessage, setlistMessage, metadata, fetchChatMessage }) => {
    useEffect(() => {
        console.log(listMessage)
    }, [listMessage])
    useEffect(() => {

    }, [metadata])
    useEffect(() => {
        console.log('rerender')
    }, [])
    return (
        <>
            <div id="scrollableChat" className="flex flex-col-reverse overflow-y-auto allowed-scroll pr-2 h-full gap-6">
                {metadata && (
                    <InfiniteScroll
                        dataLength={listMessage.length}
                        next={() => fetchChatMessage(metadata.currentPage + 1)}
                        hasMore={metadata.hasMore}
                        loader={<p className="text-center">Loading...</p>}
                        endMessage={<p className="text-center text-customNeutral">End of conversation</p>}
                        inverse
                        scrollThreshold={1}
                        style={{ display: 'flex', flexDirection: 'column-reverse' }}
                        scrollableTarget="scrollableChat"
                    >
                        {listMessage.map(message => (
                            <div className="w-full mt-4">
                                <ChatDetails message={message} />
                                <BubbleChat text={message.message} received={message.createdAt} status={message.status} currentDate={currentDate} isOutgoing={(message.to ? true : false)} mediaPath={message.mediaPath} />
                            </div>
                        ))}
                    </InfiniteScroll>
                )}
            </div>
        </>
    )
}

const ChatDetails = ({ message }) => {
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
                    <p className="text-[#777C88]">{formatDate(message.createdAt)}</p>
                </div>
            </div>
        </>
    )
}


export default Chat