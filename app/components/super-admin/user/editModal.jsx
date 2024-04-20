import { useState } from "react";
import AppModal from "../modal";
import DropDown from '../dropdown'
import { deleteUserAsSuperAdmin, editUserAsSuperAdmin } from "../../../api/repository/superadminRepository";
import { toast } from "react-toastify"

const EditModalUser = (props) => {

    const [ firstName , setFirstName ] = useState('')
    const [ lastName , setLastName ] = useState('')
    const [ username , setUsername ] = useState('')
    const [ phone , setPhone ] = useState('')
    const [ email , setEmail ] = useState('')
    const sessionSuperAdmin = props.token

    const onDelete = async () => {
        props.onload(true)

        try {
            const result = await deleteUserAsSuperAdmin(sessionSuperAdmin,props.user.id,'')
            if(result.status === 200){
                toast.success('Hapus User Berhasil')
                props.onload(false)
            }else{
                toast.error('Hapus User Gagal')
                props.onload(true)
                
            }
        } catch (error) {
            toast.error('Server Error')
            
        }
    }


    const onSubmit = async () => {
        props.onload(true)

        const data = {
            firstName : firstName,
            lastName : lastName,
            username : username,
            phone : phone , 
            email : email ,
        }

        try {
            const result = await editUserAsSuperAdmin(sessionSuperAdmin, props.user.id ,data )
            if(result.status == 200){
                toast.success('Edit User Berhasil')
                props.onload(false)
            }else{
                toast.error('Edit User Gagal')
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
                    <p className='font-bold text-[24px]'>Edit User</p>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            First Name
                        </label>
                        <input onChange={(event)=>{setFirstName(event.target.value)}} value={firstName} placeholder={`${props.user.firstName}`} className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Last Name
                        </label>
                        <input onChange={(event)=>{setLastName(event.target.value)}} value={lastName} placeholder={`${props.user.lastName}`} className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Username
                        </label>
                        <input onChange={(event)=>{setUsername(event.target.value)}} value={username} placeholder={`${props.user.username}`} className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Phone
                        </label>
                        <input onChange={(event)=>{setPhone(event.target.value)}} value={phone} placeholder={`${props.user.phone}`}className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-black font-bold">
                            Email
                        </label>
                        <input onChange={(event)=>{setEmail(event.target.value)}} value={email} placeholder={`${props.user.email}`} className='px-[20px] rounded-[6px] py-[12px] border-[1px] border-customNeutral' />
                    </div>
                    <button onClick={onSubmit} className='w-[100%] text-[14px] bg-primary text-white rounded-[6px] px-[20px] py-[16px]'>Simpan</button>
                    <button onClick={onDelete} className='w-[100%] text-[14px] bg-danger text-white rounded-[6px] px-[20px] py-[16px]'>Hapus</button>
                    {/* <button onClick={()=>{props.onDisableButton}} className='w-[100%] text-[14px] border-customGray border-[1px] text-black rounded-[6px] px-[20px] py-[16px]'>Disable User</button> */}
                </div>
        </AppModal>
    )
}

export default EditModalUser