import { useState } from "react";
import AppModal from "../modal";
import {  Switch,} from '@nextui-org/react';
import DropDown from '../dropdown'
import { toast } from "react-toastify"
import { deleteSubscriptionPlans, editSubscriptionPlans } from "@/app/api/repository/subscriptionRepository";
const EditModalSubscription = (props) => {

    const [name, setName] = useState("");
    const [monthlyPrice, setMonthlyPrice] = useState("");
    const [yearlyPrice, setYearlyPrice] = useState("");
    const [autoReplyQuota, setAutoReplyQuota] = useState("");
    const [broadcastQuota, setBroadcastQuota] = useState("");
    const [contactQuota, setContactQuota] = useState("");
    const [deviceQuota, setDeviceQuota] = useState("");
    const [integration , setIntegration ] = useState(false)
    const [available , setAvailable] = useState(false)
    const [contactSync , setContactSync ] = useState(false)
    const [whatsappSync , setWhatsappSync ] = useState(false)
    const sessionSuperAdmin = props.token

    const onDelete = async () => {
        props.onload(true)

        try {
            const result = await deleteSubscriptionPlans(sessionSuperAdmin,props.subscription.id,'')
            if(result.status === 200){
                toast.success('Hapus Subscription Berhasil')
                props.onload(false)
            }else{
                toast.error('Hapus Subscription Gagal')
                props.onload(true)
                
            }
        } catch (error) {
            toast.error('Server Error')
            
        }
    }
    

    const onSubmit = async () => {
        props.onload(true)

        const data = {
            name: name,
            monthlyPrice: parseInt(monthlyPrice),
            yearlyPrice: parseInt(yearlyPrice),
            autoReplyQuota:parseInt(autoReplyQuota),
            broadcastQuota: parseInt(broadcastQuota),
            contactQuota: parseInt(contactQuota),
            deviceQuota: parseInt(deviceQuota),
            isIntegration: integration,
            isGoogleContactSync: contactSync,
            isWhatsappContactSync:whatsappSync,
            isAvailable: available
        }

        try {
            const result = await editSubscriptionPlans(sessionSuperAdmin, props.subscription.id ,data)
            if(result.status === 201){
                toast.success('Edit Subscription Berhasil')
                props.onload(false)
            }else{
                toast.error('Edit Subscription Gagal')
                props.onload(true)
                
            }
        } catch (error) {
            toast.error('Server Error')
            
        }

    }



    return (
        <AppModal
                withClose = {true}
                open = {props.open}
                onCloseButton = {props.onCloseButton}
                width={'w-[30%]'}
            >
                <div className="w-[100%] h-[80vh] flex flex-col gap-[20px] overflow-y-scroll pb-[10px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full">
                <p className='font-bold text-[24px]'>Edit Subscription</p>
                <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Name
                        </label>
                        <input value = {name} onChange={(event)=>{setName(event.target.value)}}  placeholder="Name" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Monthly Price
                        </label>
                        <input value = {monthlyPrice} onChange={(event)=>{setMonthlyPrice(event.target.value)}} placeholder="Monthly Price" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Yearly Price
                        </label>
                        <input value = {yearlyPrice} onChange={(event)=>{setYearlyPrice(event.target.value)}} placeholder="Yearly Price" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            AutoReply Quota
                        </label>
                        <input value = {autoReplyQuota} onChange={(event)=>{setAutoReplyQuota(event.target.value)}} placeholder="AutoReply Quota"  className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Broadcast Quota
                        </label>
                        <input value = {broadcastQuota} onChange={(event)=>{setBroadcastQuota(event.target.value)}} placeholder="Broadcast Quota" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Contact Quota
                        </label>
                        <input value = {contactQuota} onChange={(event)=>{setContactQuota(event.target.value)}} placeholder="Contact Quota" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Device Quota
                        </label>
                        <input value = {deviceQuota} onChange={(event)=>{setDeviceQuota(event.target.value)}} placeholder="Device Quota" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex  gap-[10px]">
                        <label className="text-black font-bold">
                            Integration
                        </label>
                        <Switch size='sm' isSelected={integration} onClick={() => {setIntegration(!integration)}} />
                    </div>
                    <div className="flex  gap-[10px]">
                        <label className="text-black font-bold">
                            GoogleContanctSync
                        </label>
                        <Switch size='sm' isSelected={contactSync} onClick={() => {setContactSync(!contactSync)}} />
                    </div>
                    <div className="flex  gap-[10px]">
                        <label className="text-black font-bold">
                            WhatsappContactSync
                        </label>
                        <Switch size='sm' isSelected={whatsappSync} onClick={() => {setWhatsappSync(!contactSync)}} />
                    </div>
                    <div className="flex  gap-[10px]">
                        <label className="text-black font-bold">
                            Available
                        </label>
                        <Switch size='sm' isSelected={available} onClick={() => {setAvailable(!available)}} />
                    </div>
                    <button onClick={onSubmit} className='w-[100%] text-[14px] bg-primary text-white rounded-[6px] px-[20px] py-[16px]'>Simpan</button>
                    <button onClick={onDelete} className='w-[100%] text-[14px] bg-danger text-white rounded-[6px] px-[20px] py-[16px]'>Hapus</button>
                </div>
        </AppModal>
    )
}

export default EditModalSubscription