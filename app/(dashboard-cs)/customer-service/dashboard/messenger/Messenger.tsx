'use client'
import { ChangeEvent, useEffect, useState } from "react"

import { ContactData, DeviceData, ConversationMessage, DeviceSession, MessageMetadata, OutgoingMessage } from "@/utils/types"
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
    const [listContact, setlistContact] = useState<ContactData[]>([])
    const [currentContact, setcurrentContact] = useState<ContactData>()
    const [chatDisabled, setchatDisabled] = useState(true)
    const [messageMetadata, setmessageMetadata] = useState<MessageMetadata>()
    const [listMessage, setlistMessage] = useState<ConversationMessage[]>([])
    const fetchListContact = async () => {
        const result = await fetchClient({
            url: '/contacts?deviceId=' + session?.customerService?.deviceId,
            method: 'GET',
            user: session?.customerService
        })
        console.log('ini fetch contact')
        if (result && result.ok) {
            const resultData: ContactData[] = await result.json()
            console.log(resultData)
            setlistContact(resultData.map(contact => {
                return {
                    ...contact,
                    initial: getInitials(contact.firstName + " " + contact.lastName),
                    dob: formatBirthDate(contact.dob!)
                }
            }))
        }
    }
    const fetchChatMessage = async (page: number) => {
        if (!session?.customerService?.sessionId && !currentContact) return
        console.log(`/messages/${session?.customerService?.sessionId}/?phoneNumber=${currentContact?.phone}&page=${messageMetadata?.currentPage}&pageSize=${PAGINATION_BATCH}&sort=asc`)
        console.log('ini fetch chat')
        const result = await fetchClient({
            url: `/messages/${session?.customerService?.sessionId}/?phoneNumber=${currentContact?.phone}&page=${page}&pageSize=${PAGINATION_BATCH}&sort=asc`,
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
            if (session?.customerService?.sessionId && currentContact && inputFile) {
                const formdata = new FormData()
                formdata.append("caption", textInput)
                // @ts-ignore
                formdata.set('image', inputFile[0].file, inputFile[0].name)
                formdata.append("recipients[0]", currentContact.phone)
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
            if (session?.customerService?.sessionId && currentContact && textInput.length > 0) {
                const result = await fetchClient({
                    url: '/messages/' + session?.customerService?.sessionId + '/send',
                    method: 'POST',
                    body: JSON.stringify([
                        {
                            recipient: currentContact.phone,
                            message: {
                                text: textInput
                            }
                        }
                    ]),
                    user: session?.customerService
                })
                if (result && result.ok) {
                    toast.success('Berhasil kirim pesan')
                    const currDate = new Date()
                    const newMessage: ConversationMessage = {
                        id: 'lorem',
                        sessionId: session?.customerService?.sessionId,
                        message: textInput,
                        createdAt: currDate.toISOString(),
                        updatedAt: currDate.toISOString(),
                        to: currentContact.phone,
                        contact: {
                            firstName: currentContact.firstName,
                            lastName: currentContact.lastName,
                            colorCode: currentContact.colorCode,
                        },
                        pkId: 99,
                        status: 'delivery_ack',
                    }
                    const resultData = await result.json()
                    setlistMessage(prev => [...prev, newMessage])
                    settextInput('')
                }
            }
        }
        setsendMessageLoading(false)
    }

    useEffect(() => {
        if (currentContact && session?.customerService?.sessionId) {
            setchatDisabled(false)
        }
        else {
            setchatDisabled(true)
        }

    }, [currentContact, session?.customerService?.sessionId])
    useEffect(() => {
        if (session?.customerService?.sessionId && listMessage.length === 0)
            fetchChatMessage(1)
    }, [currentContact])
    useEffect(() => {
        const paramsContact = searchParams?.get('contact')
        if (paramsContact) {
            const findContact = listContact.find(item => item.id === paramsContact)
            if (findContact) {
                setcurrentContact(findContact)
            }
        }
    }, [listContact])
    useEffect(() => {
        if (session?.customerService?.sessionId)
            fetchListContact()
    }, [session?.customerService?.sessionId])
    return (
        <div className=" overflow-y-auto lg:overflow-y-hidden">
            <div className='flex lg:flex-row flex-col items-center justify-between gap-4 mb-12 lg:mb-0 lg:h-[82vh]'>
                <div className='max-w-md lg:max-w-[250px] w-full lg:h-[78vh] bg-white lg:bg-neutral-75 p-4 lg:p-0 text-xs'>
                    <ListChats setlistMessage={setlistMessage} listContact={listContact} currentContact={currentContact} setcurrentContact={setcurrentContact} />
                </div>
                <div className={"bg-white p-4 rounded-md w-full max-w-md lg:max-w-full h-full " + (chatDisabled && "opacity-50 pointer-events-none")}>
                    <div className='text-xs w-full flex flex-col h-full'>
                        <Chat
                            currentContact={currentContact}
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
                        <ProfileDetail currentContact={currentContact} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messenger