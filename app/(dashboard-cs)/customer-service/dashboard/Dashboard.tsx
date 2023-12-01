'use client'
import Message from '@/components/dashboard/Message'
import CustomButton from '@/components/landing/Button'
import Link from 'next/link'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { CSProfile, DeviceSession, IncomingMessage, SubscriptionTypes, UserProfile } from '@/utils/types';
import { fetchClient } from '@/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { formatDateBahasa, getTodayDateBahasa } from '@/utils/helper';
import { Button, Progress, Link as UILink } from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';
import ActivatePlanModal from '@/components/dashboard/ActivatePlanModal';
// const DynamicAnalytic = dynamic(() => import('./Analytic'), { ssr: false })
const Dashboard = () => {
    const { data: session } = useSession()
    const [isLoaded, setisLoaded] = useState(false)
    const [latestMessage, setlatestMessage] = useState<IncomingMessage[]>([])
    const [csProfile, setcsProfile] = useState<CSProfile>()
    const [progressDevice, setprogressDevice] = useState({
        value: 0,
        color: 'primary'
    })
    const [progressContact, setprogressContact] = useState({
        value: 0,
        color: 'success'
    })
    const fetchProfile = async () => {
        const result = await fetchClient({
            url: '/users/' + session?.user?.id,
            method: 'GET',
            user: session?.user
        })
        if (result) {
            const data = await result.json()
            if (result.status === 200) {
                setcsProfile(data)
                setisLoaded(true)
            } else {
                toast.error('Failed to fetch')
            }
        }
    }
    const fetchLatestMessage = async () => {
        const result = await fetchClient({
            url: '/messages/' + session?.customerService?.sessionId + '/incoming?pageSize=3',
            method: 'GET',
            user: session?.customerService
        })
        if (result?.ok) {
            const resultData = await result.json()
            setlatestMessage(resultData.data)
            console.log(resultData)
        }
    }
    useEffect(() => {
        if (session?.customerService?.token) {
            fetchProfile()
            // testRefresh()
        }
    }, [session?.user?.token])
    return (
        <>
            <div className='flex flex-col-reverse lg:flex-row lg:justify-between items-center '>
                <div>
                    <p className='font-lexend text-2xl font-bold'>Selamat Siang, {csProfile?.username}</p>
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
            <div className='flex gap-4 mt-8 flex-col xl:flex-row '>
                <div className='bg-white rounded-md px-4 lg:px-8 pt-8 pb-12 grow flex flex-col justify-between gap-2 '>
                    <div className='flex lg:flex-row flex-col justify-between w-full basis-1/3 items-end lg:items-center'>
                        <div className='flex justify-between w-full gap-10'>
                            <div>
                                <p>Admin <br /> Utama</p>
                            </div>
                            <p>Admin Name</p>
                        </div>
                        <div className='text-right whitespace-nowrap'>
                            <p className='font-normal text-[10px] text-[#777C88]'>CS Dibuat Pada</p>
                            <p className='font-nunito font-bold text-[12px]'>Tanggal cs dibuat</p>
                        </div>
                    </div>
                    <div className='flex lg:flex-row flex-col basis-2/3 gap-8'>
                        <div className='flex gap-8 flex-1'>
                            <div className='flex flex-col flex-none justify-around w-[60px]'>
                                <div>
                                    Devices
                                </div>
                                <div>Contacts</div>
                            </div>
                            <div className='flex flex-col justify-between flex-1 mt-4'>
                                <div className='max-w-[250px] gap-2 w-full'>
                                    {/* <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                                    </div> */}

                                    <Progress
                                        aria-label="device"
                                        value={progressDevice.value}
                                        className="w-full"
                                        color={progressDevice.color as any}
                                    />

                                    <p className='text-[#777C88] text-[10px]'>{0} dari {10} device yang tersedia</p>
                                </div>
                                <div className='max-w-[250px] gap-2 w-full'>
                                    <Progress
                                        aria-label="device"
                                        value={progressContact.value}
                                        className="w-full"
                                        color={progressContact.color as any}
                                    />
                                    <p className='text-[#777C88] text-[10px]'>{0} dari {10} kontak yang tersedia</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 items-center '>
                            <div className='text-right hidden lg:block'>
                                <p className='font-nunito font-bold text-[12px]'>Upgrade paket untuk meningkatkan<br /> batasan fitur yang ada</p>
                            </div>
                            <Button href='/subscription' color='primary' variant='bordered' radius='full' as={UILink} fullWidth>
                                Upgrade Paket
                            </Button>
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