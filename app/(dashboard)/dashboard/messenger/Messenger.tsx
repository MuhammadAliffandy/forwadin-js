'use client'
import { useEffect, useState } from "react"
import ProfileDetail from "./ProfileDetail"
import Chat from "./Chat"
import ListChats from "./ListChats"
import { ContactData, DeviceData, ConversationMessage } from "@/utils/types"
import TextAreaInput from "@/components/dashboard/chat/TextAreaInput"
import { useSession } from "next-auth/react"
import { fetchClient } from "@/utils/helper/fetchClient"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { formatBirthDate, getInitials } from "@/utils/helper"
import { toast } from "react-toastify"

const Messenger = () => {
    const { data: session } = useSession()

    const currentDate = new Date()
    const [textInput, settextInput] = useState('')
    const [sendMessageLoading, setsendMessageLoading] = useState(false)
    const [mobileDropdown, setmobileDropdown] = useState(false)
    const [listDevice, setlistDevice] = useState<DeviceData[]>([])
    const [currentDevice, setcurrentDevice] = useState<DeviceData>()
    const [currentSession, setcurrentSession] = useState<string | undefined>()
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
            console.log(resultData)

        }
    }
    const fetchListDevice = async () => {
        const result = await fetchClient({
            url: '/devices',
            method: 'GET',
            user: session?.user
        })
        if (result && result.ok) {
            const resultData: DeviceData[] = await result.json()
            setlistDevice(resultData.filter(device => device.status === "open"))

        }
    }
    const fetchChatMessage = async () => {
        // {{BASE_URL}}/messages/:sessionId/incoming?phoneNumber=628885955383
        // {{BASE_URL}}/messages/:sessionId/?phoneNumber=628885955383
        const result = await fetchClient({
            url: '/messages/' + currentSession + '/?phoneNumber=' + currentContact?.phone,
            method: 'GET',
            user: session?.user
        })
        if (result && result.ok) {
            const resultData = await result.json()
            setcursor(resultData.cursor)
            setlistMessage(resultData.data)
            console.log(resultData)
        }
    }
    const fetchAll = async () => {
        fetchListDevice()
        fetchListContact()
    }
    const sendMessage = async () => {
        setsendMessageLoading(true)
        if (currentSession && currentDevice && currentContact) {
            const result = await fetchClient({
                url: '/messages/' + currentSession + '/send',
                method: 'POST',
                body: JSON.stringify([
                    {
                        recipient: currentContact.phone,
                        message: {
                            text: textInput
                        }
                    }
                ])
            })
            if (result && result.ok) {
                toast.success('Berhasil kirim pesan')
                settextInput('')
            }
        }
        setsendMessageLoading(false)
    }
    useEffect(() => {
        fetchAll()
    }, [session?.user?.token])
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
    const fetchDeviceSession = async () => {
        const result = await fetchClient({
            url: '/sessions/' + currentDevice?.apiKey,
            method: 'GET',
            user: session?.user
        })
        if (result && result.ok) {
            const resultData = await result.json()
            setcurrentSession(resultData[0].sessionId)
        }
    }
    useEffect(() => {
        fetchDeviceSession()
    }, [currentDevice])
    useEffect(() => {
        setcurrentDevice(listDevice[0])
    }, [listDevice])
    return (
        <div className=" overflow-y-auto lg:overflow-y-hidden">
            <div className='flex lg:flex-row flex-col items-center justify-between gap-4 mb-12 lg:mb-0 lg:h-[82vh]'>
                <div className='max-w-md lg:max-w-[250px] w-full lg:h-[78vh] bg-white lg:bg-neutral-75 p-4 lg:p-0 text-xs'>
                    <Dropdown>
                        <DropdownTrigger>
                            <div className="bg-white border border-customGray p-3 flex justify-between gap-2 hover:cursor-pointer rounded-md w-full items-center">
                                <div className="flex-none">
                                    <img src="/assets/icons/dashboard/Devices.svg" alt="" className="invert-[1] grayscale-0" />
                                </div>
                                <p className="font-bold">{currentDevice?.name}</p>
                                <p className="text-customGray">{currentDevice?.phone}</p>
                                <div className="flex-none px-2">
                                    <img src="/assets/icons/chevron-down.svg" alt="" width={12} />
                                </div>
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu items={listDevice} aria-label="device list">
                            {(item: any) => (
                                <DropdownItem
                                    key={item.id}
                                    onClick={() => {
                                        setcurrentDevice(item)
                                    }}
                                >
                                    <div className="flex gap-2">
                                        <p className="font-bold">{item.name}</p>
                                        <p>{item.phone}</p>
                                    </div>
                                </DropdownItem>
                            )}
                        </DropdownMenu>

                    </Dropdown>

                    <ListChats listContact={listContact} currentContact={currentContact} setcurrentContact={setcurrentContact} />
                </div>
                <div className={"bg-white p-4 rounded-md w-full max-w-md lg:max-w-full h-full " + (chatDisabled && "opacity-50 pointer-events-none")}>
                    <div className='text-xs w-full flex flex-col h-full'>
                        <div className="flex flex-col overflow-y-auto allowed-scroll pr-2 h-full gap-6">
                            <Chat
                                currentContact={currentContact}
                                currentDate={currentDate}
                                listMessage={listMessage}
                                sessionId={currentSession}
                                setlistMessage={setlistMessage}
                            />
                        </div>
                        <div className="py-2 flex-none">
                            <TextAreaInput text={textInput} settext={settextInput} />
                            <div className="flex justify-end mt-2">
                                <Button className="rounded-md" color="primary" onClick={sendMessage} isLoading={sendMessageLoading}>
                                    Kirim
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md max-w-md lg:max-w-xs w-full h-full">
                    <div className='w-full lg:max-h-[78vh] overflow-y-scroll h-full'>
                        <ProfileDetail currentContact={currentContact} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messenger