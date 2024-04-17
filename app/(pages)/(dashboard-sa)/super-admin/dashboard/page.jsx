'use client'
import Message from '@/app/components/dashboard/Message'
import Link from 'next/link'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { DeviceSession, IncomingMessage, SubscriptionTypes, UserProfile } from '@/app/utils/types';
import { fetchClient } from '@/app/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { formatDateBahasa, getTodayDateBahasa } from '@/app/utils/helper';
import { Button, Progress, Link as UILink } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import ActivatePlanModal from '@/app/components/dashboard/ActivatePlanModal';
import { getUserSubscriptionById, userProfile } from '@/app/api/repository/userRepository';
import { getIncomeMessagesByQuery } from '@/app/api/repository/messageRepository';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const DynamicAnalytic = dynamic(() => import('@/app/components/dashboard/Analytic'), { ssr: false })
const DashboardSuperAdmin = () => {
    const { data: session } = useSession()
    const [isLoaded, setisLoaded] = useState(false)
    const [currentDevice, setcurrentDevice] = useState()
    const [latestMessage, setlatestMessage] = useState([])

    const dataChart = {
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19],
            backgroundColor: [
                '#E6E8F0',
                '#3366FF',
            ],
            borderColor: [
                '#E6E8F0',
                '#3366FF',
            ],
            borderWidth: 1,
          },
        ],
      };


    
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
        
        const result = await getUserProfile(session.user.token,session.user.id)

        if (result) {
            const data = result.data
            if (result.status === 200) {
                setuserProfile(data)
                setisLoaded(true)
            } else {
                toast.error('Failed to fetch')
            }
        }
    }
    const fetchSubscription = async () => {
    
        const result = await getUserSubscriptionById(session.user.token,session.user.id)

        if (result && result.status === 200) {
            const resultData = result.data
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

        const result = await getIncomeMessagesByQuery(session.user.token,currentDevice.sessionId,`?pageSize=3`)

        if (result.status === 200) {
            const resultData = result.data
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
                    <p className='font-lexend text-2xl font-bold'>Selamat Siang Superadmin</p>
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
                    <div className='flex lg:flex-row flex-col justify-between w-full basis-1/3 items-end lg:items-center'>
                        <div className='flex justify-between w-full gap-10'>
                            <div>
                                <p>Host <br /> Server</p>
                            </div>
                            <div className='flex gap-2 items-center flex-1 justify-end lg:justify-start'>
                               <p className='font-bold text-[24px]'>mainserver</p>
                            </div>
                        </div>
                        <div className='text-right whitespace-nowrap'>
                            <p className='font-normal text-[10px] text-[#777C88]'>Server Dibuat pada</p>
                            <p className='font-nunito font-bold text-[12px]'>{userSubscription?.endDate && formatDateBahasa(userSubscription?.endDate) || 'Selasa, 29 Agutus 2023'}</p>
                        </div>
                    </div>
                    <div className='flex lg:flex-row flex-col basis-2/3 gap-8'>
                        <div className='flex gap-8 flex-1'>
                            <div className='flex flex-col flex-none justify-around w-[60px]'>
                                <div>
                                    Users
                                </div>
                                <div>Devices</div>
                            </div>
                            <div className='flex flex-col justify-between flex-1 mt-4'>
                                <div className='max-w-full gap-2 w-full'>
                                    {/* <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                                    </div> */}

                                    <Progress
                                        aria-label="device"
                                        value={progressDevice.value}
                                        className="w-full"
                                        color={progressDevice.color}
                                    />

                                    <p className='text-[#777C88] text-[10px]'>{userSubscription?.deviceUsed} dari {userSubscription?.deviceMax}</p>
                                </div>
                                <div className='max-w-full gap-2 w-full'>
                                    <Progress
                                        aria-label="device"
                                        value={progressContact.value}
                                        className="w-full"
                                        color={progressContact.color}
                                    />
                                    <p className='text-[#777C88] text-[10px]'>{userSubscription?.contactUsed} dari {userSubscription?.contactMax}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'bg-white rounded-md px-4 pt-4 pb-2 grow-0 w-full xl:max-w-sm flex flex-col justify-between ' + (session?.user?.device?.length === 0 && "opacity-50 pointer-events-none")}>
                    <div className='flex justify-between w-[100%] items-center'>
                        <p className='font-nunito font-bold text-[16px]'>Storage</p>
                        <p className='font-nunito font-bold text-[18px]'>8278MB</p>
                    </div>

                    <div className='flex items-center gap-2 mt-2 h-full'>
                        <div className='w-[120px] h-[120px]'>
                            <Doughnut data={dataChart} />
                        </div>
                        <div className='flex flex-col items-center gap-[10px] w-[100%]'>
                            <div className='flex justify-between items-center w-[100%]'>
                                <div className='flex gap-[10px] items-center'>
                                    <div className='w-[15px] h-[15px] rounded-[4px] bg-primary text-transparent'>.
                                    </div>
                                    <p>Usage</p>
                                </div>
                                <p>27%</p>
                                <p>24848MB</p>
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <div className='flex gap-[10px] items-center'>
                                    <div className='w-[15px] h-[15px] rounded-[4px] bg-[#E6E8F0] text-transparent'>.
                                    </div>
                                    <p>Unused</p>
                                </div>
                                <p>73%</p>
                                <p>64848MB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardSuperAdmin