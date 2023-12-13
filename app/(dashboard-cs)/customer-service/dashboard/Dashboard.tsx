'use client'
import Message from '@/components/dashboard/Message'
import CustomButton from '@/components/landing/Button'
import Link from 'next/link'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { CSProfile, DeviceSession, IncomingMessage, SubscriptionTypes, UserProfile } from '@/utils/types';
import { fetchClient } from '@/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { formatDate, formatDateBahasa, getTodayDateBahasa } from '@/utils/helper';
import { Button, Progress, Link as UILink } from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';
import ActivatePlanModal from '@/components/dashboard/ActivatePlanModal';
import QRModal from './QRModal';
import { useSocket } from '@/app/SocketProvider';
import { useRouter } from 'next/navigation';
// const DynamicAnalytic = dynamic(() => import('./Analytic'), { ssr: false })
const Dashboard = () => {
    const router = useRouter()

    const { data: session } = useSession()
    const { isConnected, socket } = useSocket()
    const [openQrModal, setopenQrModal] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [latestMessage, setlatestMessage] = useState<IncomingMessage[]>([])
    const [csProfile, setcsProfile] = useState<CSProfile>()
    const [progressOrder, setprogressOrder] = useState({
        value: 0,
        color: 'primary'
    })
    const [progressMessage, setprogressMessage] = useState({
        value: 20,
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
    useEffect(() => {
        if (session?.customerService?.token && session.customerService.sessionId) {
            fetchLatestMessage()
            console.log(session.customerService)
        }
        // if (!session?.customerService?.sessionId) {
        //     console.log('setopenQR')
        //     setopenQrModal(true)
        // }
    }, [session?.customerService?.token])
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
            <div className='flex gap-4 mt-8 flex-col xl:flex-row '>
                <div className='bg-white rounded-md px-4 lg:px-8 py-8 grow flex flex-col justify-between gap-4'>
                    <div className='flex lg:flex-row flex-col justify-between w-full basis-1/3 items-end lg:items-center'>
                        <div className='flex items-center w-full gap-12'>
                            <div>
                                <p>Admin <br /> Utama</p>
                            </div>
                            <div >
                                <p className='font-bold font-lexend text-2xl'>{session?.customerService?.user.firstName} {session?.customerService?.user.lastName || ''}</p>
                            </div>
                        </div>
                        <div className='text-right whitespace-nowrap'>
                            <p className='font-normal text-[10px] text-[#777C88]'>CS Dibuat Pada</p>
                            <p className='font-nunito font-bold text-[12px]'>{formatDateBahasa(session?.customerService?.createdAt!)}</p>
                        </div>
                    </div>

                    <div className='flex lg:flex-row flex-col gap-8 items-end '>
                        <div className='max-w-[60px] w-full'>Pesan Diterima</div>
                        <div className='flex flex-col w-full'>
                            <Progress
                                aria-label="device"
                                value={progressMessage.value}
                                className="w-full"
                                color={progressMessage.color as any}
                            />

                            <p className='text-[#777C88] text-[10px]'>{0} dari {0} device yang tersedia</p>
                        </div>
                    </div>
                    <div className='flex lg:flex-row flex-col gap-8 items-end '>
                        <div className='max-w-[60px] w-full'>Order Selesai</div>
                        <div className='flex flex-col w-full'>
                            <Progress
                                aria-label="device"
                                value={progressOrder.value}
                                className="w-full"
                                color={progressOrder.color as any}
                            />
                            <p className='text-[#777C88] text-[10px]'>{0} dari {0} device yang tersedia</p>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-md px-4 pt-4 pb-2 grow-0 w-full xl:max-w-sm flex flex-col justify-between'>
                    <p className='font-nunito font-bold text-[16px]'>Pesan terakhir</p>
                    <div className='flex flex-col gap-2 mt-2 h-full'>
                        {latestMessage.map(message => (
                            <Message message={message} />
                        ))}
                    </div>
                    <div className=' flex items-end justify-center mt-2'>
                        <Link href={'/dashboard/incoming'} className=" text-primary">Tampilkan lainnya</Link>
                    </div>
                </div>
            </div>
            {/* <DynamicAnalytic user={session?.customerService} /> */}
        </>
    )
}

export default Dashboard