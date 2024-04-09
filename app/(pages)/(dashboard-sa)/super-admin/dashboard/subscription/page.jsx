'use client';
import Link from 'next/link'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import ActivatePlanModal from '@/app/components/dashboard/ActivatePlanModal';
import { getUserSubscriptionById } from '@/app/api/repository/userRepository';
import { getIncomeMessagesByQuery } from '@/app/api/repository/messageRepository';
import 'chart.js/auto';
import SubscriptionTable from '@/app/components/super-admin/subscription/table'
import AddModalSubscription from '../../../../../components/super-admin/subscription/addModal';
import EditModalSubscription from '../../../../../components/super-admin/subscription/editModal';

const DynamicAnalytic = dynamic(() => import('@/app/components/dashboard/Analytic'), { ssr: false })

function createData(id, name , monthlyPrice , yearlyDiscount ,yearlyPrice, available , createdAt ) {
    return { id , name , monthlyPrice , yearlyDiscount ,yearlyPrice, available , createdAt };
}

const rows = [
    createData('1', 'Starter', '0', '0%','0',true, '11.9.23, 2:43 PM'),
    createData('2', 'Starter', '0', '0%','0',true, '11.9.23, 2:43 PM'),
    createData('3', 'Starter', '0', '0%','0',true, '11.9.23, 2:43 PM'),
    createData('4', 'Starter', '0', '0%','0',true, '11.9.23, 2:43 PM'),
    createData('5', 'Starter', '0', '0%','0',true, '11.9.23, 2:43 PM'),
];


const DashboardSuperAdminSubscription = () => {
    const { data: session } = useSession()
    const [isLoaded, setisLoaded] = useState(false)
    const [currentDevice, setcurrentDevice] = useState()
    const [latestMessage, setlatestMessage] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)


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
        
        const result = await userProfile(session.user.token,session.user.id)

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
    
        const result = await getUserSubscriptionById(session.user.token,session.user.id)

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

        const result = await getIncomeMessagesByQuery(session.user.token,currentDevice.sessionId,`?pageSize=3`)

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
                    <p className='font-lexend text-2xl font-bold'>Subscription</p>
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
                <div className='bg-white rounded-md px-4 lg:px-8 pt-8 pb-12 grow flex flex-col justify-between gap-[20px] relative'>
                    <div className='flex justify-between'>
                        <input placeholder='Cari User' className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                        <button onClick={()=>{setAddModal(!addModal)}} className='text-[16px] bg-primary text-white rounded-[6px] px-[20px] py-[12px]'>Tambah Subscription</button>
                    </div>
                    <SubscriptionTable
                        data={rows}
                        onEditButton = {(value)=>{
                            setEditModal(!editModal)
                        }}
                    />
                </div>  
            </div>
            <AddModalSubscription
                open = {addModal}
                onCloseButton = {()=>{setAddModal(false)}}
            />
            <EditModalSubscription
                open = {editModal}
                onCloseButton = {()=>{setEditModal(false)}}
            />
        </>
    )
}

export default DashboardSuperAdminSubscription