'use client'
import { ChangeEvent, useEffect, useState } from "react"

import { ContactData, DeviceData, ConversationMessage, DeviceSession, MessageMetadata, OutgoingMessage, ContactLatestMessage, GetMessage, MessengerList } from "@/utils/types"
import TextAreaInput from "@/components/dashboard/chat/TextAreaInput"
import { useSession } from "next-auth/react"
import { fetchClient } from "@/utils/helper/fetchClient"
import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { formatBirthDate, getInitials } from "@/utils/helper"
import { toast } from "react-toastify"
import DropdownDevice from "@/components/dashboard/DropdownDevice"
import UploadFile from "@/components/dashboard/UploadFile"
import { useSearchParams } from 'next/navigation'
import { PAGINATION_BATCH } from "@/utils/constant"
import { randomInt } from "crypto"
import ListChats from "@/app/(dashboard)/dashboard/messenger/ListChats"
import Chat from "@/app/(dashboard)/dashboard/messenger/Chat"
import ProfileDetail from "@/app/(dashboard)/dashboard/messenger/ProfileDetail"
const Messenger = () => {
    const searchParams = useSearchParams()
    const { data: session } = useSession()

    const currentDate = new Date()
    const [textInput, settextInput] = useState('')
    const [inputFile, setinputFile] = useState<File[]>([]);
    const [showfile, setshowfile] = useState(false)
    const [sendMessageLoading, setsendMessageLoading] = useState(false)
    const [mobileDropdown, setmobileDropdown] = useState(false)
    const [listMessenger, setlistMessenger] = useState<ContactLatestMessage[]>([])
    const [currentMessenger, setcurrentMessenger] = useState<MessengerList>()
    const [chatDisabled, setchatDisabled] = useState(true)
    const [messageMetadata, setmessageMetadata] = useState<MessageMetadata>()
    const [listMessage, setlistMessage] = useState<ConversationMessage[]>([])
    const fetchlistMessenger = async () => {
        const result = await fetchClient({
            url: `/messages/${session?.customerService?.sessionId}/messenger-list`,
            method: 'GET',
            user: session?.user
        })
        const result2 = await fetchClient({
            url: '/contacts?deviceId=' + session?.customerService?.deviceId,
            method: 'GET',
            user: session?.user
        })
        if (result?.ok && result2?.ok) {
            const resultData: GetMessage<MessengerList> = await result.json()
            const result2Data: ContactData[] = await result2.json()
            const newArray: ContactLatestMessage[] = []
            const fetchPromises: (() => Promise<void>)[] = [];
            const fetchMessage = async (element: string) => {
                const response = await fetchClient({
                    url: `/messages/${session?.customerService?.sessionId}/?phoneNumber=${element}&pageSize=1&sort=asc`,
                    method: 'GET',
                    user: session?.user
                })
                if (response?.ok) {
                    const data = await response.json();
                    return data;
                }
                throw new Error(`Failed to fetch data for element ${element}`);
            }
            resultData.data.forEach(async (element) => {
                if (element.phone)
                    fetchPromises.push(async () => {
                        try {
                            const message: GetMessage<ConversationMessage> = await fetchMessage(element.phone);
                            console.log(`Fetched message for phone ${element.phone}`, message);
                            if (message.data.length > 0) {
                                const withMessage: ContactLatestMessage = {
                                    messenger: element,
                                    latestMessage: message.data[0]
                                }
                                newArray.push(withMessage)
                                return
                            }
                            const withoutMessage: ContactLatestMessage = {
                                messenger: element,
                                latestMessage: null
                            }
                            newArray.push(withoutMessage)
                            return
                        } catch (error: any) {
                            console.error(error);
                        }
                    })
            })
            await Promise.all(fetchPromises.map(callback => callback()))
            console.log('ini new array')
            console.log(newArray)
            newArray.sort((a, b) => {
                const timestampA = a.latestMessage ? new Date(a.latestMessage.createdAt).getTime() : 0;
                const timestampB = b.latestMessage ? new Date(b.latestMessage.createdAt).getTime() : 0;

                return timestampB - timestampA;
            });
            const newContactArray: ContactLatestMessage[] = result2Data.filter(contact => !newArray.some(element => element.messenger.phone === contact.phone)).map(contact => {
                return {
                    latestMessage: null,
                    messenger: {
                        contact: contact,
                        phone: contact.phone,
                        createdAt: contact.createdAt
                    }
                }
            })
            setlistMessenger([...newArray, ...newContactArray])
        }
    }
    const fetchChatMessage = async (page: number) => {
        if (!session?.customerService?.sessionId && !currentMessenger) return
        console.log(`/messages/${session?.customerService?.sessionId}/?phoneNumber=${currentMessenger?.phone}&page=${messageMetadata?.currentPage}&pageSize=${PAGINATION_BATCH}&sort=asc`)
        console.log('ini fetch chat')
        const result = await fetchClient({
            url: `/messages/${session?.customerService?.sessionId}/?phoneNumber=${currentMessenger?.phone}&page=${page}&pageSize=${PAGINATION_BATCH}&sort=asc`,
            method: 'GET',
            user: session?.customerService
        })
        if (result && result.ok) {
            const resultData = await result.json()
            console.log(resultData)
            setlistMessage(prev => [...prev, ...resultData.data])
            setmessageMetadata(resultData.metadata)
        }
    }

    const sendMessage = async () => {
        setsendMessageLoading(true)
        if (inputFile.length > 0) {
            if (session?.customerService?.sessionId && currentMessenger && inputFile) {
                const formdata = new FormData()
                formdata.append("caption", textInput)
                // @ts-ignore
                formdata.set('image', inputFile[0].file, inputFile[0].name)
                formdata.append("recipients[0]", currentMessenger.phone)
                formdata.append("sessionId", session?.customerService?.sessionId)
                try {
                    const result = await fetch('/api/message/media', {
                        method: 'POST',
                        body: formdata
                    })
                    // console.log(result.body)
                    if (result?.ok) {
                        const resultData = await result.json()
                        console.log(resultData)
                        setinputFile([])
                        settextInput('')
                        fetchChatMessage(1)
                        toast.success('Berhasil kirim image')

                    } else {
                        const resultData = await result.text()
                        console.log(resultData)
                        toast.error('gagal kirim media')
                    }
                } catch (error) {
                    console.log(error)
                }

            }

        }

        else {
            if (session?.customerService?.sessionId && currentMessenger && textInput.length > 0) {
                const result = await fetchClient({
                    url: '/messages/' + session?.customerService?.sessionId + '/send',
                    method: 'POST',
                    body: JSON.stringify([
                        {
                            recipient: currentMessenger.phone,
                            message: {
                                text: textInput
                            }
                        }
                    ]),
                    user: session?.customerService
                })
                if (result && result.ok) {
                    toast.success('Berhasil kirim pesan')
                    fetchChatMessage(1)
                    settextInput('')
                }
            }
        }
        setsendMessageLoading(false)
    }

    useEffect(() => {
        if (currentMessenger && session?.customerService?.sessionId) {
            setchatDisabled(false)
        }
        else {
            setchatDisabled(true)
        }

    }, [currentMessenger, session?.customerService?.sessionId])
    useEffect(() => {
        if (session?.customerService?.sessionId && listMessage.length === 0)
            fetchChatMessage(1)
    }, [currentMessenger])
    useEffect(() => {
        const paramsPhone = searchParams?.get('phone')
        if (paramsPhone) {
            const findMessenger = listMessenger.find(item => item.messenger.phone === paramsPhone)
            if (findMessenger) {
                setcurrentMessenger(findMessenger.messenger)
            }
        }
    }, [listMessenger])
    useEffect(() => {
        if (session?.customerService?.sessionId)
            fetchlistMessenger()
    }, [session?.customerService?.sessionId])
    return (
        <div className=" overflow-y-auto lg:overflow-y-hidden">
            <div className='flex lg:flex-row flex-col items-center justify-between gap-4 mb-12 lg:mb-0 lg:h-[82vh]'>
                <div className='max-w-md lg:max-w-[250px] w-full lg:h-[78vh] bg-white lg:bg-neutral-75 p-4 lg:p-0 text-xs'>
                    <ListChats setlistMessage={setlistMessage} listMessenger={listMessenger} currentMessenger={currentMessenger} setcurrentMessenger={setcurrentMessenger} />
                </div>
                <div className={"bg-white p-4 rounded-md w-full max-w-md lg:max-w-full h-full " + (chatDisabled && "opacity-50 pointer-events-none")}>
                    <div className='text-xs w-full flex flex-col h-full'>
                        <Chat
                            currentMessenger={currentMessenger}
                            currentDate={currentDate}
                            listMessage={listMessage}
                            sessionId={session?.customerService?.sessionId}
                            setlistMessage={setlistMessage}
                            fetchChatMessage={fetchChatMessage}
                            metadata={messageMetadata!}
                        />

                        <div className="py-2 flex-none">
                            {showfile && (
                                <UploadFile files={inputFile} setfiles={setinputFile} />
                            )}
                            <TextAreaInput text={textInput} settext={settextInput} />

                            <div className="flex justify-end mt-2">
                                <ButtonGroup color="primary" className="rounded-md">
                                    <Button isIconOnly onClick={() => setshowfile(!showfile)}>
                                        <img src="/assets/icons/attach_file.svg" alt="" />
                                    </Button>
                                    <Button onClick={sendMessage} isLoading={sendMessageLoading} >
                                        Kirim
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md max-w-md lg:max-w-[250px] w-full h-full">
                    <div className='w-full lg:max-h-[78vh] overflow-y-scroll h-full '>
                        <ProfileDetail currentMessenger={currentMessenger} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messenger