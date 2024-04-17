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
import { getUserProfile } from "@/app/api/repository/userRepository";
import 'chart.js/auto';
import UserTable from '@/app/components/super-admin/user/table'
import AddModalUser from '@/app/components/super-admin/user/addModal'
import EditModalUser from '@/app/components/super-admin/user/editModal'

function createData(id, firstName, lastName, phone,  email , googleId, subscription , createdAt) {
    return { id, firstName, lastName, phone,  email , googleId, subscription , createdAt };
}

const rows = [
    createData('1', 'Alif', 'Rizki', '+6283845678765', 'alifrizky@gmail.com','-', 'Unlimited', '11.9.23, 2:43 PM'),
    createData('2', 'Alif', 'Rizki', '+6283845678765', 'alifrizky@gmail.com','-', 'Starter', '11.9.23, 2:43 PM'),
    createData('3', 'Alif', 'Rizki', '+6283845678765', 'alifrizky@gmail.com','-',  'Pro', '11.9.23, 2:43 PM'),
    createData('4', 'Alif', 'Rizki', '+6283845678765', 'alifrizky@gmail.com','-',  'Unlimited', '11.9.23, 2:43 PM'),
    createData('5', 'Alif', 'Rizki', '+6283845678765', 'alifrizky@gmail.com','-', 'Pro', '11.9.23, 2:43 PM'),
];


const DashboardSuperAdminUser = () => {
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
        
        const result = await getUserProfile(session.superAdmin.token,session.superAdmin.id)

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
    
        const result = await getUserSubscriptionById(session.superAdmin.token,session.superAdmin.id)

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

        const result = await getIncomeMessagesByQuery(session.superAdmin.token,currentDevice.sessionId,`?pageSize=3`)

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
             <div className='flex gap-4 mt-8 flex-col xl:flex-row '>
                <div className='bg-white rounded-md px-4 lg:px-8 pt-8 pb-12 grow flex flex-col justify-between gap-[20px] relative'>
                    <div className='flex justify-between'>
                        <input placeholder='Cari User' className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                        <button onClick={()=>{setAddModal(!addModal)}} className='text-[16px] bg-primary text-white rounded-[6px] px-[20px] py-[12px]'>Tambah User</button>
                    </div>
                    <UserTable
                        data={rows}
                        onEditButton = {(value)=>{
                            setEditModal(!editModal)
                        }}
                    />
                </div>  
            </div>
            <AddModalUser
                open = {addModal}
                onCloseButton = {()=>{setAddModal(false)}}
            />
            <EditModalUser
                open = {editModal}
                onCloseButton = {()=>{setEditModal(false)}}
            />
        </>
    )
}

export default DashboardSuperAdminUser