import BubbleChat from "@/components/dashboard/chat/BubbleChat"
import MediaChat from "@/components/dashboard/chat/MediaChat"
import { ContactData, IncomingMessage, MediaMessageData, MessageData } from "@/utils/types"
import { useState } from "react"

interface ChatProps {
    // messageList: MessageData
    currentUser: ContactData,
    currentDate: Date
}
const Chat = ({ currentUser, currentDate }: ChatProps) => {
    const iterate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const incomingMessage: IncomingMessage[] = [
        {
            id: '1',
            from: '6281234567',
            contact: {
                id: '1',
                phone: "6281357995175",
                firstName: 'Ihsanul',
                lastName: 'Afkar',
                initial: 'IA',
                colorCode: '4FBEAB',
                gender: "Laki-laki",
                email: 'ihsanulafkar@gmail.com',
                honorific: 'Mr',
                country: 'Indonesia',
                dob: '10/10/2010',
                ContactLabel: [],
                createdAt: '11.9.2023, 2:43 PM',
                updatedAt: '11.9.2023, 2:43 PM'
            },
            message: "Join us this month for a celebration",
            received_at: '10/09/2023 13:35:00',
            type: 'direct',
            created_at: '11/9/2023, 2:43 PM',
            updated_at: '11/9/2023, 2:43 PM',
        }
    ]
    const mediaMessage: MediaMessageData = {
        id: '1',
        fileTitle: 'dummy.png',
        path: '/uploads/dummy.png',
        from: 'Ihsanul Afkar',
        size: '10 MB',
        created_at: '11.9.2023, 2:43 PM',
        type: 'image',
    }

    return (
        <>
            <div className="w-full">
                <div className="flex gap-2 items-center w-full">
                    <div style={{
                        backgroundColor: '#' + '3366FF'
                    }} className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center`}>IA</div>
                    <div className="">
                        <p>Ihsanul Afkar</p>
                        <p className="text-[#777C88]">Pesan terakhir 10 jam yang lalu</p>
                    </div>
                </div>
                <BubbleChat text={incomingMessage[0].message} received={incomingMessage[0].received_at} status={true} currentDate={currentDate} />
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
                <BubbleChat text={incomingMessage[0].message} received={incomingMessage[0].received_at} status={true} isOutgoing={true} currentDate={currentDate} />
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
                <BubbleChat text={incomingMessage[0].message} received={incomingMessage[0].received_at} status={true} isOutgoing={true} currentDate={currentDate} />
            </div>
        </>
    )
}

export default Chat