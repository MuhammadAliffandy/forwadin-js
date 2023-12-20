import InputForm from "@/components/form/InputForm"
import { fetchClient } from "@/utils/helper/fetchClient"
import { UserProfile } from "@/utils/types"
import { Button } from "@nextui-org/react"
import { User } from "next-auth"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const Profile = ({ profileData, user }: { profileData: UserProfile, user: User | undefined }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { handleSubmit, register, setValue, watch, setError, formState: { errors } } = useForm<UserProfile>()
    useEffect(() => {
        if (profileData) {
            setValue('firstName', profileData.firstName)
            setValue('lastName', (profileData.lastName || ''))
            setValue('username', profileData.username)
        }
    }, [profileData])

    const onSubmit = async (data: UserProfile) => {
        setIsLoading(true)
        const result = await fetchClient({
            url: '/users/' + user?.id,
            method: 'PATCH',
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
            }),
            user: user
        })
        if (result?.ok) {
            toast.success('Berhasil update profile!')

        } else {
            toast.error('Gagal update profile!')

        }


        setIsLoading(false)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center">

                {user?.image ? (
                    <img src={user.image} alt="" className="rounded-full" width={120} />
                ) : (
                    <div className='flex-none bg-primary rounded-full p-6 hover:cursor-pointer flex items-center justify-center w-[120px] h-[120px]'>
                        <img src="/assets/icons/dashboard/user.svg" alt="" className="w-full" />
                    </div>
                )}
            </div>
            <div className="flex flex-col mt-8 gap-4">
                <div className="flex gap-4">
                    <div className="w-full">
                        <p className="mb-2">First Name</p>
                        <InputForm register={register} config={{
                            name: 'firstName',
                            placeholder: 'First Name',
                            type: 'text',
                            registerConfig: {
                                required: 'tidak boleh kosong'
                            },
                            error: errors.firstName
                        }} />
                    </div>
                    <div className="w-full">
                        <p className="mb-2">Last Name</p>
                        <InputForm register={register} config={{
                            name: 'lastName',
                            placeholder: 'Last Name',
                            type: 'text',
                            registerConfig: {},
                            error: errors.lastName
                        }} />
                    </div>
                </div>
                <div>
                    <p className="mb-2">Username</p>
                    <InputForm register={register} config={{
                        name: 'username',
                        placeholder: 'Username',
                        type: 'text',
                        registerConfig: {
                            required: 'tidak boleh kosong'
                        },
                        error: errors.username
                    }} />
                </div>
                <div>
                    <p className="mb-2">Email</p>
                    <div className="relative">
                        <input type="text" value={profileData.email} disabled={true} className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full bg-neutral-75 border-[#B0B4C5]/50 hover:border-[#B0B4C5]'} />
                        {profileData.emailVerifiedAt ? (
                            <div className="absolute top-1/2 -translate-y-1/2 right-4 text-green-40">verified</div>
                        ) : (
                            <div className="absolute top-1/2 -translate-y-1/2 right-4 text-danger">not verified</div>

                        )}
                    </div>
                </div>
                <div>
                    <p className="mb-2">Phone Number</p>
                    <input type="text" value={(profileData.phone || '-')} disabled={true} className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full bg-neutral-75 border-[#B0B4C5]/50 hover:border-[#B0B4C5]'} />
                </div>
                <div className="flex justify-end mt-2">
                    <Button type="submit" color='primary' size="lg" className="rounded-md px-12" isLoading={isLoading}>
                        Simpan
                    </Button>
                </div>
            </div>
        </form >
    )
}

export default Profile