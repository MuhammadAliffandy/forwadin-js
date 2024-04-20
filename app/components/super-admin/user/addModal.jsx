import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import AppModal from "../modal";
import DropDown from '../dropdown'
import { getAllSubscriptionPlans } from "@/app/api/repository/subscriptionRepository";
import { createUserAsSuperAdmin } from "@/app/api/repository/superadminRepository";
import { toast } from "react-toastify"

const AddModalUser = (props) => {

    const { data: session  } = useSession()
    const [subscription , setSubscription ] = useState('')
    const [subscriptionPlanId , setSubscriptionPlanId ] = useState('')
    const [subscriptionType , setSubscriptionType ] = useState('')
    const [ firstName , setFirstName ] = useState('')
    const [ lastName , setLastName ] = useState('')
    const [ username , setUsername ] = useState('')
    const [ phone , setPhone ] = useState('')
    const [ email , setEmail ] = useState('')
    const sessionSuperAdmin = sessionStorage.getItem('tokenSuperAdmin')

    const fetchSubscriptionPlan = async () => {
        const result = await getAllSubscriptionPlans(sessionSuperAdmin)
        const resultData = result.data
        if(result.status == 200){
            const data = resultData.map((data)=>{
                return { value : data.id , text : data.name }
            })
            setSubscription(data)
        }   
    }

    const handleChangeSubscription = (event) => {
        setSubscriptionPlanId(event.target.value)
    }

    const handleChangeSubscriptionType = (event) => {
        setSubscriptionType(event.target.value)
    }

    const onSubmit = async () => {
        props.onload(true)

        const data = {
            firstName : firstName,
            lastName : lastName,
            username : username,
            phone : phone , 
            email : email ,
            subscriptionPlanId : subscriptionPlanId,
            subscriptionPlanType : subscriptionType
        }

        try {
            const result = await createUserAsSuperAdmin(sessionSuperAdmin,data )
            if(result.status == 201){
                toast.success('Buat User Berhasil')
                props.onload(false)
            }else{
                toast.error('Buat User Gagal')
                props.onload(true)
                
            }
        } catch (error) {
            toast.error('Server Error')
            
        }
    }

    useEffect(()=>{
        fetchSubscriptionPlan()
    },[])

    return (
        <AppModal
                withClose = {true}
                open = {props.open}
                onCloseButton = {props.onCloseButton}
                width={'w-[30%]'}
            >
                <div className="w-[100%] flex flex-col gap-[20px]">
                    <p className='font-bold text-[24px]'>Add User</p>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            First Name
                        </label>
                        <input onChange={(event)=>{setFirstName(event.target.value)}} value={firstName} placeholder="First Name" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Last Name
                        </label>
                        <input onChange={(event)=>{setLastName(event.target.value)}} value={lastName} placeholder="Last Name" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Username
                        </label>
                        <input onChange={(event)=>{setUsername(event.target.value)}} value={username} placeholder="Username" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Phone
                        </label>
                        <input onChange={(event)=>{setPhone(event.target.value)}} value={phone} placeholder="Phone" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Email
                        </label>
                        <input onChange={(event)=>{setEmail(event.target.value)}} value={email} placeholder="Email" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Subscription
                        </label>
                        <DropDown
                            value={subscriptionPlanId}
                            placeholder={'Pilih Subcription '}
                            listItem = {subscription}
                            onChange={handleChangeSubscription}
                        />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Subscription
                        </label>
                        <DropDown
                            value={subscriptionType}
                            placeholder={'Pilih Subcription '}
                            listItem = {[
                                {value : 'monthly' , text : 'monthly'},
                                {value : 'yearly' , text : 'yearly'},
                            ]}
                            onChange={handleChangeSubscriptionType}
                        />
                    </div>
                    <button onClick={onSubmit} className='w-[100%] text-[14px] bg-primary text-white rounded-[6px] px-[20px] py-[16px]'>Tambah</button>
                </div>
        </AppModal>
    )
}

export default AddModalUser