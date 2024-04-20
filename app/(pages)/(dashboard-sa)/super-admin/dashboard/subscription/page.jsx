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
import SubscriptionTable from './subsctriptionTable'
import AddModalSubscription from '../../../../../components/super-admin/subscription/addModal';
import EditModalSubscription from '../../../../../components/super-admin/subscription/editModal';
import Pricing from '@/app/components/dashboard/Pricing';
import {getUserProfile} from '@/app/api/repository/userRepository'

const DynamicAnalytic = dynamic(() => import('@/app/components/dashboard/Analytic'), { ssr: false })


const DashboardSuperAdminSubscription = () => {
    const { data: session } = useSession()
    const [isLoaded, setisLoaded] = useState(false)
    const [currentDevice, setcurrentDevice] = useState()
    const [subscription, setSubscription] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [subscriptionCount, setSubscriptionCount] = useState(0)
    const [statusAction, setStatusAction] = useState([])


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
        
        const result = await getUserProfile(session?.superAdmin?.token,session.superAdmin.id)

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
    
        const result = await getUserSubscriptionById(session?.superAdmin?.token,session.superAdmin.id)

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

        const result = await getIncomeMessagesByQuery(session?.superAdmin?.token,currentDevice.sessionId,`?pageSize=3`)

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
            <div className='flex flex-col-reverse lg:flex-row lg:justify-between items-center '>
                <div>
                    <p className='font-lexend text-2xl font-bold'>Subscription</p>
                </div>
            </div>
            <SubscriptionTable
                statusAction = {statusAction}
                setTotalSubscription={setSubscriptionCount}
                totalSubscription={subscriptionCount}
                user={session?.superAdmin}
                onEdit = {(value)=>{
                    setSubscription(value)
                    setEditModal(!editModal)
                }}
                onAdd = {()=>{
                    setAddModal(!addModal)
                }}
            />
            <div>
                <p className='font-lexend mt-8   text-2xl font-bold'>Preview</p>
            </div>
            <div className='flex gap-4 mt-8 flex-col xl:flex-row '>
                <div className='bg-white rounded-md px-4 lg:px-8 pt-8 pb-12 grow flex flex-col justify-between gap-[20px] relative'>
                    <Pricing
                        isSuperAdmin = {true}
                    />
                </div>
            </div>
            <AddModalSubscription
                token={session?.superAdmin?.token}
                open = {addModal}
                onload = {(value)=>{
                    setAddModal(value)
                    setStatusAction(value)
                }}
                onCloseButton = {()=>{setAddModal(false)}}
            />
            <EditModalSubscription
                token={session?.superAdmin?.token}
                open = {editModal}
                subscription = {subscription}
                onload = {(value)=>{
                    setEditModal(value)
                    setStatusAction(value)
                }}
                onCloseButton = {()=>{setEditModal(false)}}
            />
        </>
    )
}

export default DashboardSuperAdminSubscription