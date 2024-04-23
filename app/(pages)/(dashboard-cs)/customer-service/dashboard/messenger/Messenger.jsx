'use client';
import { useEffect, useState } from "react"

import TextAreaInput from "@/app/components/dashboard/chat/TextAreaInput"
import { signIn, signOut, useSession } from "next-auth/react"
import { fetchClient } from "@/app/utils/helper/fetchClient"
import { Button, ButtonGroup } from "@nextui-org/react"
import { toast } from "react-toastify"
import UploadFile from "@/app/components/dashboard/UploadFile"
import { useSearchParams } from 'next/navigation'
import { PAGINATION_BATCH } from "@/app/utils/constant"
import ListChats from './ListChats'
import Chat from "@/app/(pages)/(dashboard)/dashboard/messenger/Chat"
import ProfileDetail from "@/app/(pages)/(dashboard)/dashboard/messenger/ProfileDetail"
import CreateOrderModal from "@/app/components/customer-service/dashboard/CreateOrderModal"
import { getConversationMessages, getListMessenger2, sendMessages , sendImageMessages , sendDocumentMessages } from '@/app/api/repository/messageRepository'
import { getContactsByDeviceId } from "@/app/api/repository/contactRepository";
import { getOrderMessages } from "@/app/api/repository/orderRepository";

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
    const [inputFile, setinputFile] = useState([]);
    const [showfile, setshowfile] = useState(false)
    const [sendMessageLoading, setsendMessageLoading] = useState(false)
    const [orderModal, setorderModal] = useState(false)
    const [listMessenger, setlistMessenger] = useState([])
    const [currentMessenger, setcurrentMessenger] = useState()
    const [chatDisabled, setchatDisabled] = useState(true)
    const [messageMetadata, setmessageMetadata] = useState()
    const [listMessage, setlistMessage] = useState([])
    const [orderMessage, setorderMessage] = useState()
    const fetchlistMessenger = async () => {

        const result = await getListMessenger2(session.customerService.token , session.customerService.sessionId)

        const result2 = await getContactsByDeviceId(session.customerService.token ,session.customerService.deviceId )
        
        if (result.status === 200 && result2.status === 200) {
            const resultData= result.data
            const result2Data= result2.data
            const newArray = []
            const fetchPromises = [];
            const fetchMessage = async (element) => {
                const response = await getConversationMessages(session.customerService.token , `${session?.customerService?.sessionId}/?phoneNumber=${element}&pageSize=1&sort=asc`)

                if (response.status === 200) {
                    const data = await response.data;
                    return data;
                }
                throw new Error(`Failed to fetch data for element ${element}`);
            }
            resultData.data.forEach(async (element) => {
                if (element.phone)
                    fetchPromises.push(async () => {
                        try {
                            const message = await fetchMessage(element.phone);
                            console.log(`Fetched message for phone ${element.phone}`, message);
                            if (message.data.length > 0) {
                                const withMessage= {
                                    messenger: element,
                                    latestMessage: message.data[0]
                                }
                                newArray.push(withMessage)
                                return
                            }
                            const withoutMessage = {
                                messenger: element,
                                latestMessage: null
                            }
                            newArray.push(withoutMessage)
                            return
                        } catch (error) {
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
            const newContactArray = result2Data.filter(contact => !newArray.some(element => element.messenger.phone === contact.phone)).map(contact => {
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
    const insertTemplate = (text) => {
        if (!orderMessage) return
        if (Object.keys(orderMessage).includes(text)) {
            // @ts-ignore
            const orderText = orderMessage[text]
            settextInput(orderText)
        }

    }
    const fetchTemplate = async () => {

        const result = await getOrderMessages(session.customerService.token)

        if (result.status === 200) {
            setorderMessage(result.data)
        }
    }
    const fetchChatMessage = async (page) => {
        if (!session?.customerService?.sessionId && !currentMessenger) return

        const result = await getConversationMessages(session.customerService.token , `${session?.customerService?.sessionId}/?phoneNumber=${currentMessenger?.phone}&page=${page}&pageSize=${PAGINATION_BATCH}&sort=asc`)

        if (result && result.status === 200) {
            const resultData = result.data
            console.log(resultData)
            setlistMessage(prev => [...prev, ...resultData.data])
            setmessageMetadata(resultData.metadata)
        }
    }

    const sendMessage = async () => {
        setsendMessageLoading(true)
        if (inputFile.length > 0) {
            if (session?.customerService?.sessionId && currentMessenger && inputFile) {

    

                try {
                    const formdata = new FormData()
                    formdata.append("caption", textInput)
                    formdata.append("recipients[0]", currentMessenger.phone)
    
    
                    if(inputFile[0].file.type.search('image') > -1){
                        formdata.set('image', inputFile[0].file, inputFile[0].file.name)
    
                        const result = await sendImageMessages(session.customerService.token , session.customerService.user.devices[0].sessions[0].sessionId, formdata )
    
                        if(result.status == 200){
                            toast.success('File Berhasil Terkirim')
                            setinputFile([])
                        }else{
                            toast.error('File Gagal Terkirim')
                            
                        }
                        
                    }else{
                        formdata.set('document', inputFile[0].file, inputFile[0].file.name)
                        
                        const result = await sendDocumentMessages(session.customerService.token , session.customerService.user.devices[0].sessions[0].sessionId , formdata )
                        
                        if(result.status == 200){
                            toast.success('File Berhasil Terkirim')
                            setinputFile([])
                        }else{
                            toast.error('File Gagal Terkirim')
                            
                        }
    
                    }

                } catch (error) {
                    console.log(error)
                }

            }

        }

        else {
            console.log('TESTT MESSAGE CUSTOMER')
            if (session?.customerService?.sessionId && currentMessenger && textInput.length > 0) {
                const result = await sendMessages(session.customerService.token ,
                    session.customerService.sessionId , 
                    [
                        {
                            recipient: currentMessenger.phone,
                            message: {
                                text: textInput
                            }
                        }
                ],)

                if (result && result.status === 200) {
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
                            metadata={messageMetadata}
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