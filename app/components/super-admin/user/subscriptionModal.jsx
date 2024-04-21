import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import AppModal from "../modal";
import DropDown from '../dropdown'
import { getAllSubscriptionPlans } from "@/app/api/repository/subscriptionRepository";
import { updateUserSubscription } from "@/app/api/repository/superadminRepository";
import { toast } from "react-toastify"

const SubscriptionModalUser = (props) => {

    const { data: session  } = useSession()
    const [subscription , setSubscription ] = useState([])
    const [subscriptionPlanId , setSubscriptionPlanId ] = useState('')
    const [subscriptionType , setSubscriptionType ] = useState('')
    const sessionSuperAdmin = props.token

    const fetchSubscriptionPlan = async () => {

        if(props.user != null ){

            let userSubscription ;

            if(props.user.transactions.length > 0){
                userSubscription = props.user.transactions.map((data)=>{
                    return data.subscriptionPlan.name
                })
            }else{
                userSubscription = []
            }
    
            const result = await getAllSubscriptionPlans(sessionSuperAdmin)
            const resultData = result.data
            if(result.status == 200){
                const data = resultData.map((data)=>{
                    return { value : data.id , text : data.name }
                })
    
                const filterData = data.filter((item)=>{
                    if(userSubscription != []){
                        if( userSubscription.indexOf(item.text) > -1 ){
                            return item;
                        }
                    }else{
                        return item 
                    }
                })
    
                setSubscription(filterData)
            }  
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
            subscriptionPlanId : subscriptionPlanId,
            subscriptionPlanType : subscriptionType
        }

        try {
            const result = await updateUserSubscription(sessionSuperAdmin, props.user.id ,data)
            if(result.status == 200){
                toast.success('Update Subscription Berhasil')
                props.onload(false)
            }else{
                toast.error('Update Subscription Gagal')
                props.onload(true)
                
            }
        } catch (error) {
            toast.error('Server Error')
            
        }
    }

    useEffect(()=>{
        if(props.open){
            fetchSubscriptionPlan()
        }
    },[props.open])

    return (
        <AppModal
                withClose = {true}
                open = {props.open}
                onCloseButton = {props.onCloseButton}
                width={'w-[30%]'}
                height={'h-auto'}
            >
                <div className="w-[100%] flex flex-col gap-[20px]">
                    <p className='font-bold text-[24px]'></p>
            
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            {`${props.user.username} Subscription`}   
                        </label>
                        <DropDown
                            value={subscriptionPlanId}
                            placeholder={'Pilih Subcription'}
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
                            placeholder={'Pilih Tipe Subcription '}
                            listItem = {[
                                {value : 'monthly' , text : 'monthly'},
                                {value : 'yearly' , text : 'yearly'},
                            ]}
                            onChange={handleChangeSubscriptionType}
                        />
                    </div>
                    <button onClick={onSubmit} className='w-[100%] text-[14px] bg-primary text-white rounded-[6px] px-[20px] py-[16px]'>Edit</button>
                </div>
        </AppModal>
    )
}

export default SubscriptionModalUser