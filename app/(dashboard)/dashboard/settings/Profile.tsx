import InputForm from "@/components/form/InputForm"
import { UserProfile } from "@/utils/types"
import { useForm } from "react-hook-form"

const Profile = ({ profileData }: { profileData: UserProfile }) => {
    const { handleSubmit, register, setValue, watch, setError, formState: { errors } } = useForm<UserProfile>()
    return (
        <form>
            <div className="mx-auto w-[120px] h-[120px] rounded-full bg-primary flex items-center justify-center relative">
                <img src="/assets/icons/user.svg" alt="" width={54} />
                <div className="absolute rounded-md border border-customGray px-2 -bottom-2 bg-white hover:cursor-pointer">Edit</div>
            </div>
            <div className="flex flex-col mt-8 gap-4">
                <div className="flex gap-4">
                    <div className="w-full">
                        <p className="mb-2">First Name</p>
                        <input type="text" value={profileData.firstName} disabled={true} className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full bg-neutral-75 border-[#B0B4C5]'} />
                    </div>
                    <div className="w-full">
                        <p className="mb-2">Last Name</p>
                        <input type="text" value={profileData.lastName} disabled={true} className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full bg-neutral-75 border-[#B0B4C5]'} />
                    </div>
                </div>
                <div>
                    <p className="mb-2">Username</p>
                    <input type="text" value={profileData.username} disabled={true} className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full bg-neutral-75 border-[#B0B4C5]'} />
                </div>
                <div>
                    <p className="mb-2">Email</p>
                    <div className="relative">
                        <input type="text" value={profileData.email} disabled={true} className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full bg-neutral-75 border-[#B0B4C5]'} />
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 text-green-40">verified</div>
                    </div>
                </div>
                <div>
                    <p className="mb-2">Phone Number</p>
                    <input type="text" value={(profileData.phone || '-')} disabled={true} className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full bg-neutral-75 border-[#B0B4C5]'} />
                </div>
            </div>
        </form >
    )
}

export default Profile