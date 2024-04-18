import { useState } from "react";
import AppModal from "../modal";
import DropDown from '../dropdown'

const AddModalSubscription = (props) => {

    const [available , setAvailable ] = useState([])

    const handleChangeAvailable = (event) => {
        setAvailable(event.target.value)
    }

    return (
        <AppModal
                withClose = {true}
                open = {props.open}
                onCloseButton = {props.onCloseButton}
                width={'w-[30%]'}
            >
                <div className="w-[100%] flex flex-col gap-[20px]">
                    <p className='font-bold text-[24px]'>Add Subscription</p>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Name
                        </label>
                        <input placeholder="Name" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Monthly Price
                        </label>
                        <input placeholder="Monthly Price" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Yearly Discount
                        </label>
                        <input placeholder="Yearly Discount" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Yearly Price
                        </label>
                        <input placeholder="Yearly Price" className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Available
                        </label>
                        <DropDown
                            value={available}
                            placeholder={'available'}
                            listItem = {[
                                {
                                    value : 'available' , text : 'Available', 
                                },
                                {
                                    value : 'non-available' , text : 'Non Available', 
                                },
                            ]}
                            onChange={handleChangeAvailable}
                        />
                    </div>
                    <button onClick={()=>{props.onAddButton}} className='w-[100%] text-[14px] bg-primary text-white rounded-[6px] px-[20px] py-[16px]'>Tambah</button>
                </div>
        </AppModal>
    )
}

export default AddModalSubscription