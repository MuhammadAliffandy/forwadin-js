'use client'
import Message from '@/components/dashboard/Message'
import Link from 'next/link'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { DeviceSession, IncomingMessage, SubscriptionTypes, UserProfile } from '@/utils/types';
import { fetchClient } from '@/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { formatDateBahasa, getTodayDateBahasa } from '@/utils/helper';
import { Button, Progress, Link as UILink } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import ActivatePlanModal from '@/components/dashboard/ActivatePlanModal';
const DynamicAnalytic = dynamic(() => import('@/components/dashboard/Analytic'), { ssr: false })
const Dashboard = () => {
    const { data: session } = useSession()
    const [isLoaded, setisLoaded] = useState(false)
    const [currentDevice, setcurrentDevice] = useState()
    const [latestMessage, setlatestMessage] = useState([])
    const [userProfile, setuserProfile] = useState({
        firstName: '',
        lastName: '',
        username: '',
        accountApiKey: '',
        affiliationCode: '',
        email: '',
        phone: '',
        emailVerifiedAt: ''
    })
    const [userSubscription, setuserSubscription] = useState()
    const [progressDevice, setprogressDevice] = useState({
        value: 0,
        color: 'primary'
    })
    const [progressContact, setprogressContact] = useState({
        value: 0,
        color: 'success'
    })
    const fetchProfile = async () => {
        const result = await fetchClient({ url: '/users/' + session?.user?.id, method: 'GET', user: session?.user })
        if (result) {
            const data = await result.json()
            if (result.status === 200) {
                setuserProfile(data)
                setisLoaded(true)
            } else {
                toast.error('Failed to fetch')
            }
        }
    }
    const fetchSubscription = async () => {
        const result = await fetchClient({
            url: '/users/' + session?.user?.id + '/subscription',
            method: 'GET',
            user: session?.user
        })
        if (result && result.ok) {
            const resultData = await result.json()
            setuserSubscription(resultData)
            const deviceProgress = (resultData.deviceUsed / resultData.deviceMax) * 100
            const contactProgress = (resultData.contactUsed / resultData.contactMax) * 100
            if (deviceProgress <= 33) {
                setprogressDevice({
                    value: deviceProgress,
                    color: 'primary'
                })
            } else if (deviceProgress <= 66) {
                setprogressDevice({
                    value: deviceProgress,
                    color: 'warning'
                })
            } else {
                setprogressDevice({
                    value: deviceProgress,
                    color: 'danger'
                })
            }
            if (contactProgress <= 33) {
                setprogressContact({
                    value: contactProgress,
                    color: 'success'
                })
            } else if (contactProgress <= 66) {
                setprogressContact({
                    value: contactProgress,
                    color: 'warning'
                })
            } else {
                setprogressContact({
                    value: contactProgress,
                    color: 'danger'
                })
            }
        }
    }

    const fetchLatestMessage = async () => {
        const result = await fetchClient({
            url: '/messages/' + currentDevice?.sessionId + '/incoming?pageSize=3',
            method: 'GET',
            user: session?.user
        })
        if (result?.ok) {
            const resultData = await result.json()
            setlatestMessage(resultData.data)
            console.log(resultData)
        }
    }
    useEffect(() => {
        if (session?.user?.token) {
            fetchProfile()
            fetchSubscription()
            // testRefresh()
        }
    }, [session?.user?.token])
    useEffect(() => {
        if (currentDevice)
            fetchLatestMessage()
    }, [currentDevice])
    return (
        <>
            {session?.user?.subscription.status === 0 && <ActivatePlanModal user={session.user} />}

            <div className='flex flex-col-reverse lg:flex-row lg:justify-between items-center '>
                <div>
                    <p className='font-lexend text-2xl font-bold'>Selamat Siang, {userProfile.firstName} {userProfile.lastName}</p>
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
            {session?.user?.device?.length === 0 && (
                <div className='border-2 border-danger rounded-md px-4 py-3 flex justify-between mt-4'>
                    <div className='flex gap-4 items-center'>
                        <div className='flex-none'>
                            <img src="/assets/icons/dashboard/assignment_late.svg" alt="" />
                        </div>
                        <p className='font-bold text-md'>Tambahkan device Anda terlebih dahulu dan mulai jelajahi fitur-fitur unggulan Forwardin</p>
                    </div>
                    <div className='flex-none'>
                        <Button as={Link} href='/dashboard/device' color='primary' className='rounded-md'>
                            Tambah Device
                        </Button>
                    </div>
                </div>
            )}
            <div className='flex gap-4 mt-8 flex-col xl:flex-row '>
                <div className='bg-white rounded-md px-4 lg:px-8 pt-8 pb-12 grow flex flex-col justify-between gap-2 relative'>
                    <Link href={'/dashboard'} className='whitespace-nowrap text-[#B0B4C5] text-sm absolute left-1/2 -translate-x-1/2 bottom-2'>Tampilkan kapasitas fitur lainnya</Link>
                    <div className='flex lg:flex-row flex-col justify-between w-full basis-1/3 items-end lg:items-center'>
                        <div className='flex justify-between w-full gap-10'>
                            <div>
                                <p>Paket <br /> saat ini</p>
                            </div>
                            <div className='flex gap-2 items-center flex-1 justify-end lg:justify-start'>
                                <p className='text-2xl font-bold font-lexend'>{userSubscription?.subscriptionPlan.name}</p>
                                <div className='bg-black rounded-full px-2 text-white text-[10px]'>{userSubscription?.subscriptionPlan.name === 'starter' ? 'free' : 'paid'}</div>
                            </div>
                        </div>
                        <div className='text-right whitespace-nowrap'>
                            <p className='font-normal text-[10px] text-[#777C88]'>Aktif sampai dengan</p>
                            <p className='font-nunito font-bold text-[12px]'>{userSubscription?.endDate && formatDateBahasa(userSubscription?.endDate)}</p>
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
                                        color={progressDevice.color}
                                    />

                                    <p className='text-[#777C88] text-[10px]'>{userSubscription?.deviceUsed} dari {userSubscription?.deviceMax} device yang tersedia</p>
                                </div>
                                <div className='max-w-[250px] gap-2 w-full'>
                                    <Progress
                                        aria-label="device"
                                        value={progressContact.value}
                                        className="w-full"
                                        color={progressContact.color}
                                    />
                                    <p className='text-[#777C88] text-[10px]'>{userSubscription?.contactUsed} dari {userSubscription?.contactMax} kontak yang tersedia</p>
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
                <div className={'bg-white rounded-md px-4 pt-4 pb-2 grow-0 w-full xl:max-w-sm flex flex-col justify-between ' + (session?.user?.device?.length === 0 && "opacity-50 pointer-events-none")}>
                    <p className='font-nunito font-bold text-[16px]'>Pesan terakhir</p>

                    <div className='flex flex-col gap-2 mt-2 h-full'>
                        {latestMessage.map(message => (
                            <Message message={message} />
                        ))}
                        {latestMessage.length === 0 && (
                            <p className='text-customGray text-xs text-center'> Belum ada pesan</p>
                        )}
                    </div>
                    <div className=' flex items-end justify-center mt-2'>
                        <Link href={'/dashboard/incoming'} className=" text-primary">Tampilkan lainnya</Link>
                    </div>
                </div>
            </div>
            <div className={'mt-4 bg-white w-full rounded-md p-4 lg:p-8 ' + (session?.user?.device.length === 0 && "opacity-50 pointer-events-none")}>
                <p className='font-lexend text-2xl font-bold'>Analitik</p>
                {(session?.user?.device && session?.user?.device.length > 0) && (
                    <DynamicAnalytic user={session?.user} currentDevice={currentDevice} setcurrentDevice={setcurrentDevice} />
                )}
            </div>
        </>
    )
}

export default Dashboard