import InputForm from "@/components/form/InputForm"
import { fetchClient } from "@/utils/helper/fetchClient"
import { CSProfile, UserProfile } from "@/utils/types"
import { Button } from "@nextui-org/react"
import { CustomerService, User } from "next-auth"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const Profile = ({ csProfile }: { csProfile: CSProfile | undefined }) => {
    const [isLoading, setIsLoading] = useState(false)


    return (
        <form >
            <div className="flex justify-center">
                <div className='flex-none bg-primary rounded-full p-6 hover:cursor-pointer flex items-center justify-center w-[120px] h-[120px]'>
                    <img src="/assets/icons/dashboard/user.svg" alt="" className="w-full" />
                </div>
            </div>
            <div className="flex flex-col mt-8 gap-4">
                <div>
                    <p className="mb-2">Username</p>
                    <input type="text" value={csProfile?.username} disabled={true} className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full bg-neutral-75 border-[#B0B4C5]/50 hover:border-[#B0B4C5]'} />
                </div>
                <div className="flex gap-4">
                    <div className="w-full">
                        <p className="mb-2">Admin First Name</p>
                        <input type="text" value={csProfile?.user.firstName} disabled={true} className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full bg-neutral-75 border-[#B0B4C5]/50 hover:border-[#B0B4C5]'} />
                    </div>
                    <div className="w-full">
                        <p className="mb-2">Admin Last Name</p>
                        <input type="text" value={csProfile?.user.lastName} disabled={true} className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full bg-neutral-75 border-[#B0B4C5]/50 hover:border-[#B0B4C5]'} />
                    </div>
                </div>

                <div>
                    <p className="mb-2">Email</p>
                    <div className="relative">
                        <input type="text" value={csProfile?.email} disabled={true} className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full bg-neutral-75 border-[#B0B4C5]/50 hover:border-[#B0B4C5]'} />
                    </div>
                </div>
                {/* <div>
                    <p className="mb-2">Phone Number</p>
                    <input type="text" value={(profileData.phone || '-')} disabled={true} className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full bg-neutral-75 border-[#B0B4C5]/50 hover:border-[#B0B4C5]'} />
                </div> */}
            </div>
        </form >
    )
}

export default Profile