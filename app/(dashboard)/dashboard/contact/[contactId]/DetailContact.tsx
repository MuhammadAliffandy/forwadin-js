'use client'
import dynamic from 'next/dynamic'
const EditContactModal = dynamic(() => import('@/components/dashboard/contact/detail/EditContactModal'), { ssr: false })
import { formatBirthDate, formatDate, getInitials } from '@/utils/helper'
import { fetchClient } from '@/utils/helper/fetchClient'
import { ContactData, GetMessage, IncomingMessage, MediaMessageData, MessageData, MultipleCheckboxRef } from '@/utils/types'
import Link from 'next/link'
import { Skeleton } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import BubbleChat from '@/components/dashboard/chat/BubbleChat'

const DetailContact = ({ contactId }: { contactId: string }) => {
    const { data: session } = useSession()
    const currentDate = new Date()
    const [openModal, setopenModal] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [contactData, setcontactData] = useState<ContactData>()
    const [switchButton, setswitchButton] = useState('history')
    const [messageCount, setmessageCount] = useState(0)
    const [message, setmessage] = useState<IncomingMessage[]>([
    ])
    const mainCheckboxRef = useRef<HTMLInputElement>(null)
    const mediaMessageCheckboxRef = useRef<MultipleCheckboxRef>({})
    const [isChecked, setisChecked] = useState(false)
    const [mediaMessage, setmediaMessage] = useState<MediaMessageData[]>([
        {
            id: '1',
            fileTitle: 'forwardin_deafult_logo_banner.jpeg',
            path: '',
            from: 'Ihsanul Afkar',
            size: '10 MB',
            created_at: '11.9.2023, 2:43 PM',
            type: 'image',
            checked: false
        },
        {
            id: '2',
            fileTitle: 'forwardin_deafult_logo_banner.jpeg',
            from: 'Ihsanul Afkar',
            size: '10 MB',
            path: '',
            created_at: '11.9.2023, 2:43 PM',
            type: 'image',
            checked: false
        },
        {
            id: '3',
            fileTitle: 'forwardin_deafult_logo_banner.jpeg',
            from: 'Ihsanul Afkar',
            path: '',
            size: '10 MB',
            created_at: '11.9.2023, 2:43 PM',
            type: 'image',
            checked: false
        }
    ])
    const [mobileDropdown, setmobileDropdown] = useState(false)
    const handleIndexCheckbox = (e: React.MouseEvent) => {
        if (mainCheckboxRef.current && !mainCheckboxRef.current.checked) {
            const newArray = mediaMessage.map(obj => {
                mediaMessageCheckboxRef.current[`checkbox_${obj.id}`].checked = false
                return { ...obj, checked: false }
            })
            setmediaMessage(() => newArray)
        } else {
            const newArray = mediaMessage.map(obj => {
                mediaMessageCheckboxRef.current[`checkbox_${obj.id}`].checked = true
                return { ...obj, checked: true }
            })
            setmediaMessage(() => newArray)
        }
    }
    const handleCheckBoxClick = (e: React.FormEvent<HTMLInputElement>, id: string) => {
        const newMediaMessage = mediaMessage.map(obj => {
            return (obj.id === id ? { ...obj, checked: e.currentTarget.checked } : obj)
        })
        setmediaMessage(() => newMediaMessage)
    }
    const handleRefChange = (element: HTMLInputElement | null, item: MediaMessageData) => {
        if (mediaMessageCheckboxRef.current && element)
            mediaMessageCheckboxRef.current[`checkbox_${item.id}`] = element
    }
    useEffect(() => {
        if (mainCheckboxRef.current) {
            const checkObject = mediaMessage.find(obj => obj.checked === true)
            if (checkObject) {
                mainCheckboxRef.current.checked = true
                setisChecked(true)
            }
            else {
                mainCheckboxRef.current.checked = false
                setisChecked(false)
            }
        }
    }, [mediaMessage])
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
    useEffect(() => {
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
                                        }} className={`flex-none rounded-full text-white w-20 h-20 text-[32px] flex items-center justify-center`}>IA</div>

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
                                <div className='border border-customGray rounded-md text-primary text-center mt-4 py-2 hover:bg-primary hover:text-white hover:cursor-pointer'>
                                    Chat
                                </div>
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
                                        <div className={'flex gap-2 px-4 py-2 items-center rounded-md group hover:bg-primary hover:cursor-pointer ' + (switchButton === 'history' ? 'bg-primary' : 'bg-white')} onClick={() => setswitchButton('history')}>
                                            <div className={'group-hover:text-white ' + (switchButton === 'history' ? 'text-white' : 'text-black')}>History</div>
                                            <div className={'rounded-md group-hover:text-black group-hover:bg-white flex items-center justify-center h-5 w-5 text-xs ' + (switchButton === 'history' ? 'bg-white text-black' : 'bg-black text-white')} >{messageCount}</div>
                                        </div>
                                        <div className={'flex gap-2 px-4 py-2 items-center rounded-md group hover:bg-primary hover:cursor-pointer ' + (switchButton === 'media' ? 'bg-primary' : 'bg-white')} onClick={() => setswitchButton('media')}>
                                            <div className={'group-hover:text-white ' + (switchButton === 'media' ? 'text-white' : 'text-black')}>Media</div>
                                            <div className={'rounded-md group-hover:text-black group-hover:bg-white flex items-center justify-center h-5 w-5 text-xs ' + (switchButton === 'media' ? 'bg-white text-black' : 'bg-black text-white')}>3</div>
                                        </div>
                                    </div>
                                    {isChecked && (
                                        <div className="bg-danger rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                            Hapus
                                        </div>
                                    )}

                                </div>
                                <div className='mt-4 max-h-[550px] overflow-y-auto flex flex-col gap-8 allowed-scroll pr-4'>
                                    {switchButton === 'history' ? (
                                        <>
                                            {message ? (
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
                                                    <p>Belum ada pesan dari {contactData?.firstName}</p>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <table className="w-full text-center font-nunito text-xs font-bold">
                                                <thead className='bg-neutral-75'>
                                                    <tr className=''>
                                                        <th className='py-4 checkbox'>
                                                            <input ref={mainCheckboxRef} type="checkbox" name="main_checkbox" id="main_checkbox" className='rounded-sm focus:ring-transparent' onClick={handleIndexCheckbox} />
                                                        </th>
                                                        <th className='p-4'>Nama</th>
                                                        <th className='p-4'>Pengirim</th>
                                                        <th className='p-4'>Ukuran</th>
                                                        <th className='p-4 whitespace-pre'>Tanggal Dikirimkan</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='bg-white'>
                                                    {mediaMessage.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className='p-4 checkbox'>
                                                                <input type="checkbox" name={'checkbox_' + item.id} id={'checkbox_' + item.id} className='rounded-sm focus:ring-transparent' onClick={(e) => handleCheckBoxClick(e, item.id)} ref={element => handleRefChange(element, item)} />
                                                            </td >
                                                            <td className='p-4 '>
                                                                <Link href={item.path} target={'_blank'}>
                                                                    {item.fileTitle}
                                                                </Link>
                                                            </td>
                                                            <td className='p-4'>{item.from}</td>
                                                            <td className='p-4'>{item.size}</td>
                                                            <td className='p-4'>{item.created_at}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>)}
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