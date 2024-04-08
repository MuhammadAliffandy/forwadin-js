import { useState } from "react";
import AppModal from "./modal";
import DropDown from './dropdown'

const EditModalUser = (props) => {

    const [subscription , setSubscription ] = useState([])

    const handleChangeSubscription = (event) => {
        setSubscription(event.target.value)
    }

    return (
        <AppModal
                withClose = {true}
                open = {props.open}
                onCloseButton = {props.onCloseButton}
                width={'w-[25%]'}
            >
                <div className="w-[100%] h-[80vh] flex flex-col gap-[20px] overflow-y-scroll pb-[10px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-track-transparent scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full">
                    <p className='font-bold text-[24px]'>Edit User</p>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            First Name
                        </label>
                        <input placeholder="First Name" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Last Name
                        </label>
                        <input placeholder="Last Name" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Phone
                        </label>
                        <input placeholder="Phone" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Email
                        </label>
                        <input placeholder="Email" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Google ID
                        </label>
                        <input placeholder="-" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Subscription
                        </label>
                        <DropDown
                            value={subscription}
                            placeholder={'Pilih Subcription '}
                            listItem = {[
                                {
                                    value : 'pro' , text : 'Pro', 
                                },
                                {
                                    value : 'unlimited' , text : 'Unlimited', 
                                },
                                {
                                    value : 'star' , text : 'Star', 
                                }
                            ]}
                            onChange={handleChangeSubscription}
                        />
                    </div>
                    <button onClick={()=>{props.onSaveButton}} className='w-[100%] text-[14px] bg-primary text-white rounded-[6px] px-[20px] py-[16px]'>Simpan</button>
                    <button onClick={()=>{props.onDeleteButton}} className='w-[100%] text-[14px] bg-danger text-white rounded-[6px] px-[20px] py-[16px]'>Hapus</button>
                    <button onClick={()=>{props.onDisableButton}} className='w-[100%] text-[14px] border-customGray border-[1px] text-black rounded-[6px] px-[20px] py-[16px]'>Disable User</button>
                </div>
        </AppModal>
    )
}

export default EditModalUser