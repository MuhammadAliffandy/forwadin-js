'use client'
import { ChangeEvent, useEffect, useState } from "react"
import ProfileDetail from "./ProfileDetail"
import Chat from "./Chat"
import ListChats from "./ListChats"
import { ContactData, DeviceData, ConversationMessage, DeviceSession } from "@/utils/types"
import TextAreaInput from "@/components/dashboard/chat/TextAreaInput"
import { useSession } from "next-auth/react"
import { fetchClient } from "@/utils/helper/fetchClient"
import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { formatBirthDate, getInitials } from "@/utils/helper"
import { toast } from "react-toastify"
import DropdownDevice from "@/components/dashboard/DropdownDevice"
import UploadFile from "@/components/dashboard/UploadFile"
import { useSearchParams } from 'next/navigation'
const Messenger = () => {
    const searchParams = useSearchParams()
    const { data: session } = useSession()

    const currentDate = new Date()
    const [textInput, settextInput] = useState('')
    const [inputFile, setinputFile] = useState<File[]>([]);
    const [showfile, setshowfile] = useState(false)
    const [sendMessageLoading, setsendMessageLoading] = useState(false)
    const [mobileDropdown, setmobileDropdown] = useState(false)
    const [listDevice, setlistDevice] = useState<DeviceSession[]>([])
    const [currentDevice, setcurrentDevice] = useState<DeviceSession>()
    const [listContact, setlistContact] = useState<ContactData[]>([])
    const [currentContact, setcurrentContact] = useState<ContactData>()
    const [chatDisabled, setchatDisabled] = useState(true)
    const [cursor, setcursor] = useState(0)

    const [listMessage, setlistMessage] = useState<ConversationMessage[]>([])

    const fetchListContact = async () => {
        const result = await fetchClient({
            url: '/contacts',
            method: 'GET',
            user: session?.user
        })
        if (result && result.ok) {
            const resultData: ContactData[] = await result.json()
            setlistContact(resultData.map(contact => {
                return {
                    ...contact,
                    initial: getInitials(contact.firstName + " " + contact.lastName),
                    dob: formatBirthDate(contact.dob!)
                }
            }))
        }
    }
    const fetchChatMessage = async () => {
        const result = await fetchClient({
            url: '/messages/' + currentDevice?.sessionId + '/?phoneNumber=' + currentContact?.phone,
            method: 'GET',
            user: session?.user
        })
        if (result && result.ok) {
            const resultData = await result.json()
            setcursor(resultData.cursor)
            setlistMessage(resultData.data)
        }
    }

    const sendMessage = async () => {
        setsendMessageLoading(true)
        if (inputFile.length > 0) {
            if (currentDevice && currentContact && inputFile) {
                const formdata = new FormData()
                formdata.append("caption", textInput)
                // @ts-ignore
                formdata.set('image', inputFile[0].file, inputFile[0].name)
                formdata.append("recipients[0]", currentContact.phone)
                formdata.append("sessionId", currentDevice.sessionId)
                try {
                    // const result = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/messages/' + currentDevice.sessionId + '/send/image', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'multipart/form-data',
                    //         'Authorization': 'Bearer ' + session?.user?.token,
                    //         'Access-Control-Allow-Origin': '*'
                    //     },
                    //     body: formdata
                    // })
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
            if (currentDevice && currentContact && textInput.length > 0) {
                const result = await fetchClient({
                    url: '/messages/' + currentDevice.sessionId + '/send',
                    method: 'POST',
                    body: JSON.stringify([
                        {
                            recipient: currentContact.phone,
                            message: {
                                text: textInput
                            }
                        }
                    ]),
                    user: session?.user
                })
                if (result && result.ok) {
                    toast.success('Berhasil kirim pesan')
                    settextInput('')
                }
            }
        }
        setsendMessageLoading(false)
    }
    // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files?.[0]) {
    //         const file = event.target.files?.[0];
    //         setinputFile(file);
    //     }
    // }
    useEffect(() => {
        if (currentContact && currentDevice) {
            setchatDisabled(false)
        }
        else {
            setchatDisabled(true)
        }

    }, [currentContact, currentDevice])
    useEffect(() => {
        fetchChatMessage()
    }, [currentContact])
    useEffect(() => {
        if (session?.user?.device && listDevice.length === 0)
            setlistDevice(session.user.device)
    }, [session?.user?.device])
    useEffect(() => {
        const paramsContact = searchParams?.get('contact')
        console.log(paramsContact)
        if (paramsContact) {
            const findContact = listContact.find(item => item.id === paramsContact)
            console.log(findContact)
            if (findContact) {
                setcurrentContact(findContact)
            }
        }
    }, [listContact])
    useEffect(() => {
        console.log('masuk device')
        if (currentDevice)
            fetchListContact()
    }, [currentDevice])
    return (
        <div className=" overflow-y-auto lg:overflow-y-hidden">
            <div className='flex lg:flex-row flex-col items-center justify-between gap-4 mb-12 lg:mb-0 lg:h-[82vh]'>
                <div className='max-w-md lg:max-w-[250px] w-full lg:h-[78vh] bg-white lg:bg-neutral-75 p-4 lg:p-0 text-xs'>
                    <DropdownDevice
                        currentDevice={currentDevice}
                        listDevice={listDevice}
                        setcurrentDevice={setcurrentDevice}
                    />
                    <ListChats listContact={listContact} currentContact={currentContact} setcurrentContact={setcurrentContact} />
                </div>
                <div className={"bg-white p-4 rounded-md w-full max-w-md lg:max-w-full h-full " + (chatDisabled && "opacity-50 pointer-events-none")}>
                    <div className='text-xs w-full flex flex-col h-full'>
                        <div className="flex flex-col overflow-y-auto allowed-scroll pr-2 h-full gap-6">
                            <Chat
                                currentContact={currentContact}
                                currentDate={currentDate}
                                listMessage={listMessage}
                                sessionId={currentDevice?.sessionId}
                                setlistMessage={setlistMessage}
                            />
                        </div>
                        <div className="py-2 flex-none">
                            {/* {showfile && (
                                <input type="file" onChange={handleFileChange} />
                            )} */}
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