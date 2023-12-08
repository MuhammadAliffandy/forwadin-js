'use client'
import dynamic from 'next/dynamic'
const EditContactModal = dynamic(() => import('@/components/dashboard/contact/detail/EditContactModal'), { ssr: false })
import { formatBirthDate, formatDate, getInitials } from '@/utils/helper'
import { fetchClient } from '@/utils/helper/fetchClient'
import { ContactData, DeviceSession, GetMessage, IncomingMessage, MediaMessageData, MessageData, MultipleCheckboxRef } from '@/utils/types'
import Link from 'next/link'
import { Button, ButtonGroup, Popover, PopoverContent, PopoverTrigger, Skeleton } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import BubbleChat from '@/components/dashboard/chat/BubbleChat'
import TextAreaInput from '@/components/dashboard/chat/TextAreaInput'
import UploadFile from '@/components/dashboard/UploadFile'
import { useRouter } from 'next/navigation'

const DetailContact = ({ contactId }: { contactId: string }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const currentDate = new Date()
    const [openModal, setopenModal] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [contactData, setcontactData] = useState<ContactData>()
    const [messageCount, setmessageCount] = useState(0)
    const [message, setmessage] = useState<IncomingMessage[]>([
    ])
    const [textInput, settextInput] = useState('')
    const [inputFile, setinputFile] = useState<File[]>([]);
    const [showfile, setshowfile] = useState(false)
    const [sendMessageLoading, setsendMessageLoading] = useState(false)
    const [isChecked, setisChecked] = useState(false)
    const [currentDevice, setcurrentDevice] = useState<DeviceSession>()
    const [mobileDropdown, setmobileDropdown] = useState(false)

    const fetchDetailContact = async () => {
        const result = await fetchClient({
            method: 'GET',
            url: '/contacts/' + contactId,
            user: session?.user
        })
        if (result) {
            const data: ContactData = await result.json()
            if (result.status === 200) {
                data.dob = formatBirthDate(data.dob!)
                setcontactData(data)
                if (session?.user?.device && session?.user?.device.length > 0) {
                    const findDevice = session.user.device.find(item => item.id === data.contactDevices[0].device.id)
                    if (findDevice)
                        setcurrentDevice(findDevice)
                    else setcurrentDevice(undefined)
                }
                setisLoaded(true)
            } else {
                console.log(data)
                toast.error('Gagal mendapatkan kontak')
            }
        }

    }
    const fetchContactMessage = async () => {
        const contactSession = session?.user?.device.find(item => item.id === contactData?.contactDevices[0].device.id)
        if (contactSession?.sessionId) {
            const result = await fetchClient({
                url: `/messages/${contactSession?.sessionId}/incoming?phoneNumber=${contactData?.phone}`,
                method: 'GET',
                user: session?.user
            })
            if (result && result.ok) {
                const resultData: GetMessage<IncomingMessage> = await result.json()
                setmessage(resultData.data)
                setmessageCount(resultData.data.length)
                console.log(resultData)
            } else {
                toast.error('gagal fetch message')
            }
        }
    }
    const sendMessage = async () => {
        setsendMessageLoading(true)
        if (!contactData) return
        if (inputFile.length > 0) {
            if (currentDevice && inputFile) {
                const formdata = new FormData()
                formdata.append("caption", textInput)
                // @ts-ignore
                formdata.set('image', inputFile[0].file, inputFile[0].name)
                formdata.append("recipients[0]", contactData.phone)
                formdata.append("sessionId", currentDevice.sessionId)
                try {
                    const result = await fetch('/api/message/media', {
                        method: 'POST',
                        body: formdata
                    })
                    if (result?.ok) {
                        const resultData = await result.json()
                        console.log(resultData)
                        setinputFile([])
                        settextInput('')
                        toast.success('Berhasil kirim image')
                        router.push('/dashboard/messenger?phone=' + contactData.phone)
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
            if (currentDevice && textInput.length > 0) {
                const result = await fetchClient({
                    url: '/messages/' + currentDevice.sessionId + '/send',
                    method: 'POST',
                    body: JSON.stringify([
                        {
                            recipient: contactData.phone,
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
                    router.push('/dashboard/messenger?phone=' + contactData.phone)
                }
            }
        }
        setsendMessageLoading(false)
    }
    useEffect(() => {
        if (session?.user?.token)
            fetchDetailContact()
    }, [session?.user?.token])
    useEffect(() => {
        if (contactData)
            fetchContactMessage()
    }, [contactData])
    return (
        <>
            {contactData && (
                <EditContactModal setopenModal={setopenModal} openModal={openModal} contactData={contactData} fetchData={fetchDetailContact} />
            )}
            <div className='flex justify-center items-center lg:items-start lg:flex-row flex-col gap-4 mt-8'>
                <div className='max-w-sm w-full items-center flex flex-col gap-4'>
                    <div className='w-full max bg-white rounded-md p-4 relative'>
                        {isLoaded ? (
                            <>
                                <div className='absolute block lg:hidden right-8 top-8' onClick={() => setmobileDropdown(!mobileDropdown)}>
                                    <img src="/assets/icons/angle-down.svg" alt="" />
                                </div>
                                <div className='flex lg:flex-row flex-col justify-between gap-4'>
                                    <div>
                                        <div style={{
                                            backgroundColor: '#' + '4FBEAB'
                                        }} className={`flex-none rounded-full text-white w-20 h-20 text-[32px] flex items-center justify-center`}>{getInitials(contactData?.firstName + ' ' + contactData?.lastName!)}</div>

                                        <p className='font-lexend text-2xl font-bold mt-8'>{contactData?.firstName} {contactData?.lastName}</p>
                                        <p className='mt-4'>+{contactData?.phone}</p>
                                    </div>
                                    <div className=''>
                                        <div className='border border-customGray rounded-md w-full lg:w-auto px-8 py-2 hover:cursor-pointer text-center hidden lg:block' onClick={() => setopenModal(true)} >Edit</div>
                                    </div>
                                    {mobileDropdown && (
                                        <div className='lg:hidden block'>
                                            <div className='border border-customGray rounded-md w-full lg:w-auto px-8 py-2 hover:cursor-pointer text-center ' onClick={() => setopenModal(true)}>Edit</div>
                                        </div>
                                    )}
                                </div>
                                <table className='w-full border-spacing-y-2 border-spacing-x-2 -mx-2 border-separate mt-4 hidden lg:block'>
                                    <tbody >
                                        <tr>
                                            <th className='font-medium'>First Name</th>
                                            <td>{contactData?.firstName}</td>
                                        </tr>
                                        <tr>
                                            <th className='font-medium'>Last Name</th>
                                            <td>{contactData?.lastName}</td>
                                        </tr>
                                        <tr>
                                            <th className='font-medium'>Email</th>
                                            <td>{contactData?.email}</td>
                                        </tr>
                                        <tr>
                                            <th className='font-medium'>Phone Number</th>
                                            <td>+{contactData?.phone}</td>
                                        </tr>
                                        <tr>
                                            <th className='font-medium'>Gender</th>
                                            <td>{contactData?.gender ? contactData?.gender : '-'}</td>
                                        </tr>
                                        <tr>
                                            <th className='font-medium'>Honorific</th>
                                            <td>{contactData?.honorific ? contactData?.honorific : '-'}</td>
                                        </tr>
                                        {/* <tr>
                                        <th className='font-medium'>Country</th>
                                        <td>{contactData?.country ? contactData?.country : '-'}</td>
                                    </tr> */}
                                        <tr>
                                            <th className='font-medium'>Birthdate</th>
                                            <td>{contactData?.dob ? contactData?.dob : '-'}</td>
                                        </tr>
                                        <tr>
                                            <th className='font-medium'>Labels</th>
                                            <td className='flex flex-wrap justify-center lg:justify-start items-center gap-2'>
                                                {contactData?.ContactLabel?.map((item, idx) => (
                                                    <div key={idx} className='text-white bg-primary px-4 py-1 rounded-full'>
                                                        {item.label.name}
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {mobileDropdown && (
                                    <table className='w-full border-spacing-y-2 border-separate mt-4 lg:hidden block'>
                                        <tbody >
                                            <tr>
                                                <th className='font-medium'>First Name</th>
                                                <td>{contactData?.firstName}</td>
                                            </tr>
                                            <tr>
                                                <th className='font-medium'>Last Name</th>
                                                <td>{contactData?.lastName}</td>
                                            </tr>
                                            <tr>
                                                <th className='font-medium'>Email</th>
                                                <td>{contactData?.email}</td>
                                            </tr>
                                            <tr>
                                                <th className='font-medium'>Phone Number</th>
                                                <td>+{contactData?.phone}</td>
                                            </tr>
                                            <tr>
                                                <th className='font-medium'>Gender</th>
                                                <td>{contactData?.gender ? contactData?.gender : '-'}</td>
                                            </tr>
                                            <tr>
                                                <th className='font-medium'>Honorific</th>
                                                <td>{contactData?.honorific ? contactData?.honorific : '-'}</td>
                                            </tr>
                                            {/* <tr>
                                            <th className='font-medium'>Country</th>
                                            <td>{contactData?.country ? contactData?.country : '-'}</td>
                                        </tr> */}
                                            <tr>
                                                <th className='font-medium'>Birthdate</th>
                                                <td>{contactData?.dob ? contactData?.dob : '-'}</td>
                                            </tr>
                                            <tr>
                                                <th className='font-medium'>Labels</th>
                                                <td className='flex flex-wrap justify-center lg:justify-start items-center gap-2'>
                                                    {contactData?.ContactLabel?.map((item, idx) => (
                                                        <div key={idx} className='text-white bg-primary px-4 py-1 rounded-full'>
                                                            {item.label.name}
                                                        </div>
                                                    ))}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )}
                                <Popover
                                    placement="top"
                                    showArrow={true}
                                    className='font-inter'
                                    radius='sm'>
                                    <PopoverTrigger>
                                        <Button className='rounded-md mt-4'
                                            fullWidth
                                            color='primary'>
                                            Chat
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className='' >
                                        <div className="py-2 flex-none w-[20rem]">
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
                                    </PopoverContent>
                                </Popover>

                            </>
                        ) : (
                            <div className='mt-4 flex flex-col gap-2'>
                                <Skeleton className={'w-full h-3 rounded-full'} />
                                <Skeleton className={'w-full h-3 rounded-full'} />
                                <Skeleton className={'w-full h-3 rounded-full'} />
                            </div>
                        )}
                    </div>
                    <div className='w-full bg-white rounded-md p-4'>
                        <div className='flex gap-2 items-center hover:cursor-pointer' onClick={() => { }}>
                            <div className='font-lexend font-normal text-xl text-primary'>
                                Groups
                            </div>
                            <div>
                                <img src="/assets/icons/dashboard/bubble.svg" alt="" />
                            </div>
                        </div>
                        {isLoaded ? (
                            <div className='flex gap-2 mt-6'>
                                {contactData?.contactGroups?.map((item, idx) => (
                                    <div className='px-3 py-1 text-xs text-white bg-black rounded-md' key={idx}>
                                        {item.group.name}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='mt-4 flex flex-col gap-2'>
                                <Skeleton className={'w-full h-3 rounded-full'} />
                            </div>
                        )}
                    </div>
                </div>
                <div className='max-w-sm lg:max-w-none w-full'>
                    <div className='bg-white w-full p-4'>
                        {isLoaded ? (
                            <>
                                <div className='flex justify-between'>
                                    <div className='flex gap-2'>
                                        <div className={'flex gap-2 px-4 py-2 items-center rounded-md group hover:bg-primary hover:cursor-pointer bg-primary'}>
                                            <div className={'text-white'}>History</div>
                                            <div className={'rounded-md group-hover:text-black group-hover:bg-white flex items-center justify-center h-5 w-5 text-xs bg-white text-black'} >{messageCount}</div>
                                        </div>
                                    </div>
                                    {isChecked && (
                                        <div className="bg-danger rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                            Hapus
                                        </div>
                                    )}

                                </div>
                                <div className='mt-4 max-h-[550px] overflow-y-auto flex flex-col gap-8 allowed-scroll pr-4'>

                                    {message.length > 0 ? (
                                        <>
                                            {message.map(msg => (
                                                <div className="w-full">
                                                    <div className="flex gap-2 items-center w-full">
                                                        <div style={{
                                                            backgroundColor: '#' + msg.contact?.colorCode
                                                        }} className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center`}>{getInitials(msg.contact?.firstName + ' ' + msg.contact?.lastName)}</div>
                                                        <div className="">
                                                            <p>{msg.contact?.firstName} {msg.contact?.lastName}</p>
                                                        </div>
                                                    </div>
                                                    <BubbleChat text={msg.message} received={msg.receivedAt} currentDate={currentDate} />
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            <p className='text-customGray text-xs text-center'>Belum ada pesan dari {contactData?.firstName}</p>
                                        </>
                                    )}

                                </div>
                            </>
                        ) : (
                            <div className='mt-4 flex flex-col gap-2'>
                                <Skeleton className={'w-full h-3 rounded-full'} />
                                <Skeleton className={'w-full h-3 rounded-full'} />
                                <Skeleton className={'w-full h-3 rounded-full'} />
                                <Skeleton className={'w-full h-3 rounded-full'} />
                                <Skeleton className={'w-full h-3 rounded-full'} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailContact