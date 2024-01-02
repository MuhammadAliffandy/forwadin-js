'use client'
import { useEffect, useState } from "react"

import { ContactData, ConversationMessage, DeviceSession, MessageMetadata, ContactLatestMessage, GetMessage, MessengerList, OrderMessage } from "@/utils/types"
import TextAreaInput from "@/components/dashboard/chat/TextAreaInput"
import { signIn, signOut, useSession } from "next-auth/react"
import { fetchClient } from "@/utils/helper/fetchClient"
import { Button, ButtonGroup } from "@nextui-org/react"
import { toast } from "react-toastify"
import UploadFile from "@/components/dashboard/UploadFile"
import { useSearchParams } from 'next/navigation'
import { PAGINATION_BATCH } from "@/utils/constant"
import ListChats from './ListChats'
import Chat from "@/app/(dashboard)/dashboard/messenger/Chat"
import ProfileDetail from "@/app/(dashboard)/dashboard/messenger/ProfileDetail"
import CreateOrderModal from "@/components/customer-service/dashboard/CreateOrderModal"
const Messenger = () => {
    const searchParams = useSearchParams()
    const { data: session } = useSession()
    const orderTools = [
        {
            title: 'orderTemplate',
            content: 'orderTemplate'
        },
        {
            title: 'welcome',
            content: 'welcomeMessage'
        },
        {
            title: 'followup',
            content: 'processMessage'
        },
        {
            title: 'complete',
            content: 'completeMessage'
        }
    ]
    const currentDate = new Date()
    const [textInput, settextInput] = useState('')
    const [inputFile, setinputFile] = useState<File[]>([]);
    const [showfile, setshowfile] = useState(false)
    const [sendMessageLoading, setsendMessageLoading] = useState(false)
    const [orderModal, setorderModal] = useState(false)
    const [listMessenger, setlistMessenger] = useState<ContactLatestMessage[]>([])
    const [currentMessenger, setcurrentMessenger] = useState<MessengerList>()
    const [chatDisabled, setchatDisabled] = useState(true)
    const [messageMetadata, setmessageMetadata] = useState<MessageMetadata>()
    const [listMessage, setlistMessage] = useState<ConversationMessage[]>([])
    const [orderMessage, setorderMessage] = useState<OrderMessage>()
    const fetchlistMessenger = async () => {
        const result = await fetchClient({
            url: `/messages/${session?.customerService?.sessionId}/messenger-list`,
            method: 'GET',
            user: session?.customerService
        })
        const result2 = await fetchClient({
            url: '/contacts?deviceId=' + session?.customerService?.deviceId,
            method: 'GET',
            user: session?.customerService
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
                    user: session?.customerService
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
    const insertTemplate = (text: string) => {
        if (!orderMessage) return
        if (Object.keys(orderMessage).includes(text)) {
            // @ts-ignore
            const orderText: string = orderMessage[text]
            settextInput(orderText)
        }

    }
    const fetchTemplate = async () => {
        const result = await fetchClient({
            url: '/orders/messages',
            method: 'GET',
            user: session?.customerService
        })
        if (result?.ok) {
            setorderMessage(await result.json())
        }
    }
    const fetchChatMessage = async (page: number) => {
        if (!session?.customerService?.sessionId && !currentMessenger) return

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
                formdata.set('document', inputFile[0].file, inputFile[0].name)
                formdata.append("recipients[0]", currentMessenger.phone)
                formdata.append("sessionId", session?.customerService?.sessionId)
                try {
                    const result = await fetch('/api/message/media/customer-service', {
                        method: 'POST',
                        body: formdata
                    })
                    if (result.status === 401) {
                        const refresh = await signIn('refresh', {
                            redirect: false,
                            user: JSON.stringify(session?.customerService)
                        })
                        if (refresh?.error) {
                            signOut()
                            window.location.replace('/signin')
                        } else {
                            window.location = window.location
                        }
                    }
                    if (result?.ok) {
                        const resultData = await result.json()
                        // console.log(resultData)
                        setinputFile([])
                        settextInput('')
                        fetchChatMessage(1)
                        toast.success('Berhasil kirim document')

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
        if (session?.customerService?.sessionId) {
            fetchlistMessenger()
            fetchTemplate()
        }
    }, [session?.customerService?.sessionId])
    return (<>
        <CreateOrderModal
            customerService={session?.customerService}
            openModal={orderModal}
            setopenModal={setorderModal}
            contact={currentMessenger?.contact} />
        <div className=" overflow-y-auto lg:overflow-y-hidden">
            <div className='flex lg:flex-row flex-col items-center justify-between gap-4 mb-12 lg:mb-0 lg:h-[82vh]'>
                <div className='max-w-md lg:max-w-[250px] w-full h-[78vh] bg-white lg:bg-neutral-75 p-4 lg:p-0 text-xs'>
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
                            {orderMessage && (
                                <div className="flex gap-2 justify-start text-sm my-2 flex-wrap">
                                    {orderTools.map(tool => (
                                        <div key={tool.title} className='rounded-full px-2 py-[2px] border hover:cursor-pointer border-[#B0B4C5]/50 hover:border-neutral-75 hover:bg-neutral-75' onClick={() => insertTemplate(tool.content)}>
                                            + {tool.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <TextAreaInput text={textInput} settext={settextInput} />

                            <div className="flex justify-between mt-2">
                                <Button color="primary" className="rounded-md" onClick={() => setorderModal(true)}>
                                    Buat Order
                                </Button>
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
    </>
    )
}

export default Messenger