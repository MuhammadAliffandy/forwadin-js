'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { CSProfile, ConversationMessage, DeviceSession, GetMessage, IncomingMessage, OrderData, SubscriptionTypes, UserProfile } from '@/app/utils/types';
import { fetchClient } from '@/app/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { formatDate, formatDateBahasa, getInitials, getNumberFromString, getTodayDateBahasa } from '@/app/utils/helper';
import { Button, Progress, Link as UILink } from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';
import ActivatePlanModal from '@/app/components/dashboard/ActivatePlanModal';
import QRModal from './QRModal';
import { useSocket } from '@/app/SocketProvider';
import { useRouter } from 'next/navigation';
// const DynamicAnalytic = dynamic(() => import('./Analytic'), { ssr: false })
const Dashboard = () => {
    const router = useRouter()

    const { data: session } = useSession()
    const { isConnected, socket } = useSocket()
    const [openQrModal, setopenQrModal] = useState(false)
    const [latestMessage, setlatestMessage] = useState([])
    const [progressData, setprogressData] = useState({
        totalMessage: 0,
        totalOrder: 0,
        receivedOrder: 0,
        completedOrder: 0
    })
    const [progressOrder, setprogressOrder] = useState({
        value: 0,
        color: 'primary'
    })
    const [receivedOrder, setreceivedOrder] = useState({
        value: 0,
        color: 'primary'
    })
    const fetchLatestMessage = async () => {
        const result = await fetchClient({
            url: '/messages/' + session?.customerService?.sessionId + '/incoming?pageSize=3',
            method: 'GET',
            user: session?.customerService
        })
        if (result?.ok) {
            const resultData = await result.json()
            setlatestMessage(resultData.data)
        }
    }
    const fetchOrderData = async () => {
        const result = await fetchClient({
            url: '/orders',
            method: 'GET',
            user: session?.customerService
        })
        const incoming = await fetchClient({
            url: `/messages/${session?.customerService?.sessionId}/incoming`,
            method: 'GET',
            user: session?.customerService
        })
        if (result?.ok && incoming?.ok) {
            const incomingMessage = await incoming.json()
            const orderData = await result.json()
            console.log(orderData)
            const completedOrder = orderData.filter(order => order.status === 'completed')
            const pendingOrder = orderData.filter(order => order.status === 'pending')
            setprogressData({
                completedOrder: completedOrder.length,
                receivedOrder: pendingOrder.length,
                totalOrder: orderData.length,
                totalMessage: incomingMessage.metadata.totalMessages
            })
        }
    }
    useEffect(() => {
        if (session?.customerService?.token && session.customerService.sessionId) {
            fetchLatestMessage()
            fetchOrderData()
        }
        console.log(session?.customerService)
        // if (!session?.customerService?.sessionId) {
        //     console.log('setopenQR')
        //     setopenQrModal(true)
        // }
    }, [session?.customerService?.token])
    useEffect(() => {
        let orderPercent = 0
        let messagePercent = 0
        if (progressData.totalOrder !== 0) {
            orderPercent = (progressData.completedOrder / progressData.totalOrder) * 100
        }
        if (progressData.totalMessage !== 0) {
            messagePercent = (progressData.receivedOrder / progressData.totalMessage) * 100
        }
        if (progressData.totalMessage === 0 && progressData.receivedOrder !== 0)
            messagePercent = 100
        setprogressOrder({
            value: orderPercent,
            color: 'primary'
        })
        setreceivedOrder({
            value: messagePercent,
            color: 'primary'
        })

    }, [progressData])
    return (
        <>
            {openQrModal && (
                <QRModal session={session} openModal={openQrModal} setopenModal={setopenQrModal} socket={socket} refresh={() => router.refresh()} />
            )}

            <div className='flex flex-col-reverse lg:flex-row lg:justify-between items-center '>
                <div>
                    <p className='font-lexend text-2xl font-bold'>Selamat Siang, {session?.customerService?.username}</p>
                </div>
                <div>
                    <div className='flex items-center gap-2'>
                        <div className='text-xs text-right flex flex-row lg:flex-col gap-2 lg:gap-0'>
                            <p className='text-[#B0B4C5]'>Tanggal hari ini</p>
                            <p className='text-[#777C88]'>{getTodayDateBahasa()}</p>
                        </div>
                        <div className='flex-none hidden lg:block'>
                            <img src="/assets/icons/dashboard/calendar.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {!session?.customerService?.deviceId ? (
                <>
                    <div className='border-2 border-danger rounded-md px-4 py-3 mt-4'>
                        <div className='flex gap-4 items-center'>
                            <div className='flex-none'>
                                <img src="/assets/icons/dashboard/assignment_late.svg" alt="" />
                            </div>
                            <p className='font-bold text-md'>Saat ini CS tidak terhubung dengan device, minta Admin untuk menghubungkan agar fitur CS dapat digunakan</p>
                        </div>
                    </div>
                </>
            ) : (<>
                {!session?.customerService?.sessionId && (
                    <div className='border-2 border-danger rounded-md px-4 py-3 flex justify-between mt-4'>
                        <div className='flex gap-4 items-center'>
                            <div className='flex-none'>
                                <img src="/assets/icons/dashboard/assignment_late.svg" alt="" />
                            </div>
                            <p className='font-bold text-md'>Hubungkan device Anda terlebih dahulu dan mulai jelajahi fitur-fitur unggulan Forwardin</p>
                        </div>
                        <div className='flex-none'>
                            <Button onClick={() => setopenQrModal(true)} color='primary' className='rounded-md'>
                                Hubungkan Device
                            </Button>
                        </div>
                    </div>
                )}
            </>)}

            <div className='flex gap-4 mt-8 flex-col xl:flex-row '>
                <div className='bg-white rounded-md px-4 lg:px-8 py-8 grow flex flex-col justify-between gap-4'>
                    <div className='flex lg:flex-row flex-col justify-between w-full basis-1/3 items-end lg:items-center'>
                        <div className='flex items-center w-full gap-12'>
                            <div className=''>
                                <p>Admin <br /> Utama</p>
                            </div>
                            <div >
                                <p className='font-bold font-lexend text-2xl'>{session?.customerService?.user.firstName} {session?.customerService?.user.lastName || ''}</p>
                            </div>
                        </div>
                        <div className='text-right whitespace-nowrap'>
                            <p className='font-normal text-[10px] text-[#777C88]'>CS Dibuat Pada</p>
                            <p className='font-nunito font-bold text-[12px]'>{formatDateBahasa(session?.customerService?.createdAt)}</p>
                        </div>
                    </div>

                    <div className='flex lg:flex-row flex-col gap-8 items-end '>
                        <div className='max-w-[60px] w-full'>Order Diterima</div>
                        <div className='flex flex-col w-full'>
                            <Progress
                                aria-label="device"
                                value={receivedOrder.value}
                                className="w-full"
                                color={receivedOrder.color }
                            />

                            <p className='text-[#777C88] text-[10px]'>{progressData.receivedOrder} order diterima dari {progressData.totalMessage} pesan masuk</p>
                        </div>
                    </div>
                    <div className='flex lg:flex-row flex-col gap-8 items-end '>
                        <div className='max-w-[60px] w-full'>Order Selesai</div>
                        <div className='flex flex-col w-full'>
                            <Progress
                                aria-label="device"
                                value={progressOrder.value}
                                className="w-full"
                                color={progressOrder.color}
                            />
                            <p className='text-[#777C88] text-[10px]'>{progressData.completedOrder} dari {progressData.totalOrder} order yang selesai</p>
                        </div>
                    </div>
                </div>
                <div className={'bg-white rounded-md px-4 pt-4 pb-2 grow-0 w-full xl:max-w-sm flex flex-col justify-between ' + (!session?.customerService?.sessionId && "opacity-50 pointer-events-none")}>
                    <p className='font-nunito font-bold text-[16px]'>Pesan terakhir</p>
                    <div className='flex flex-col gap-2 mt-2 h-full'>
                        {latestMessage.map(message => (
                            <Message message={message} />
                        ))}
                    </div>
                    <div className=' flex items-end justify-center mt-2'>
                        <Link href={'/customer-service/dashboard/messenger'} className=" text-primary">Ke Messenger</Link>
                    </div>
                </div>
            </div>
            {/* <DynamicAnalytic user={session?.customerService} /> */}
        </>
    )
}

export default Dashboard


const Message = ({ message }) => {

    if (message.to)
        return (
            <Button as={Link} href={"/customer-service/dashboard/messenger?phone=" + getNumberFromString(message.to)} variant="light" fullWidth className="rounded-md flex justify-between gap-4 text-[10px]">
                <div className={`flex-none rounded-full text-white w-7 h-7 flex items-center justify-center bg-primary`}>
                    <img src="/assets/icons/user.svg" alt="" />
                </div>
                <div className="w-full">
                    <p className="font-bold">{message.contact ? message.contact.firstName + ' ' + (message.contact.lastName || '') : getNumberFromString(message.to)}</p>
                    <div className="flex items-center gap-1 -mt-1">
                        {message.mediaPath && (
                            <div>
                                <img src="/assets/icons/chat/image_media.svg" alt="" />
                            </div>
                        )}
                        <p className="w-full" style={{ WebkitLineClamp: 2, overflow: 'hidden', WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>{message.message}</p>
                    </div>
                </div>
            </Button>
        )
    return (
        <Button as={Link} href={"/customer-service/dashboard/messenger?phone=" + getNumberFromString(message.from)} variant="light" fullWidth className="rounded-md flex justify-between gap-4 text-[10px]">
            <PrintIcon contact={message.contact} phone={message.from} />
            <div className="w-full">
                <p className="font-bold">{message.contact ? message.contact.firstName + ' ' + (message.contact.lastName || '') : getNumberFromString(message.from)}</p>
                <div className="flex items-center gap-1 -mt-1">
                    {message.mediaPath && (
                        <div>
                            <img src="/assets/icons/chat/image_media.svg" alt="" />
                        </div>
                    )}
                    <p className="w-full" style={{ WebkitLineClamp: 2, overflow: 'hidden', WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>{message.message}</p>
                </div>
            </div>
        </Button>
    )
}

const PrintIcon = ({ contact, phone }) => {
    if (contact) {
        return (
            <>
                <div className="text-sm">
                    <div style={{
                        backgroundColor: '#' + contact.colorCode
                    }} className={`flex-none rounded-full text-white w-7 h-7 flex items-center justify-center`}>{getInitials(contact.firstName + ' ' + contact.lastName)}</div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="text-sm">
                <div className={`flex-none rounded-full text-white w-7 h-7 bg-primary flex items-center justify-center`}>{phone.slice(0, 2)}</div>
            </div>
        </>
    )
}