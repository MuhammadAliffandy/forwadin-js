import ButtonSubmit from "@/components/form/ButtonSubmit"
import InputForm from "@/components/form/InputForm"
import { fetchClient } from "@/utils/helper/fetchClient"
import { UserProfile } from "@/utils/types"
import errors from "formidable/FormidableError"
import { User } from "next-auth"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface AccountPageProps {
    user: User | undefined,
    userProfile: UserProfile
}
interface ChangePasswordType {
    currentPassword: string,
    password: string,
    confirmPassword: string
}
const Account = ({ user, userProfile }: AccountPageProps) => {
    const [showPasswordCriteria, setshowPasswordCriteria] = useState(false)
    const {
        handleSubmit: handleSubmitEmail,
        register: registerEmail,
        setValue: setValueEmail,
        formState: { errors: errorsEmail } } = useForm<{ email: string }>()
    const {
        handleSubmit: handleSubmitPassword,
        register: registerPassword,
        setValue: setValuePassword,
        watch: watchPassword,
        setError: setErrorPassword,
        formState: { errors: errorsPassword } } = useForm<ChangePasswordType>()

    const [passwordValidator, setPasswordValidator] = useState({
        eightLength: false,
        lowerCase: false,
        upperCase: false,
        numeric: false,
        // specialChar: false
    })

    const strongRegex = {
        eightLength: new RegExp("^(?=.{8,})"),
        lowerCase: new RegExp("^(?=.*[a-z])"),
        upperCase: new RegExp("^(?=.*[A-Z])"),
        numeric: new RegExp("^(?=.*[0-9])"),
        // specialChar: new RegExp("^(?=.*[!@#$%^&*])")
    }

    const onSubmitEmail = async (data: { email: string }) => {

    }
    const onSubmitPassword = async (data: ChangePasswordType) => {

    }
    useEffect(() => {
        const watch = watchPassword(value => {
            const password: string = value.password!
            if (strongRegex.eightLength.test(password))
                setPasswordValidator(prev => ({ ...prev, eightLength: true }))
            else
                setPasswordValidator(prev => ({ ...prev, eightLength: false }))
            if (strongRegex.lowerCase.test(password))
                setPasswordValidator(prev => ({ ...prev, lowerCase: true }))
            else
                setPasswordValidator(prev => ({ ...prev, lowerCase: false }))
            if (strongRegex.upperCase.test(password))
                setPasswordValidator(prev => ({ ...prev, upperCase: true }))
            else
                setPasswordValidator(prev => ({ ...prev, upperCase: false }))
            if (strongRegex.numeric.test(password))
                setPasswordValidator(prev => ({ ...prev, numeric: true }))
            else
                setPasswordValidator(prev => ({ ...prev, numeric: false }))
        })
        return () => watch.unsubscribe()
    }, [watchPassword, passwordValidator])
    useEffect(() => {
        if (user?.token) {

        }
    }, [user?.token])
    useEffect(() => {
        if (userProfile) {
            setValueEmail('email', userProfile.email)
        }
    }, [userProfile])

    return (
        <div className="flex flex-col gap-4 mt-8">
            <p className="font-lexend font-bold text-2xl">Email</p>
            <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
                <p className="mb-2">Email Address</p>
                <div className="flex items-center gap-4 mt-4">
                    <div className="relative w-full">
                        <input type='text' className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full ' + (errorsEmail.email ? 'border-danger/50 hover:border-danger focus:border-danger' : 'border-[#B0B4C5]/50 hover:border-[#B0B4C5] focus:border-primary ')} {...registerEmail('email', {
                            required: 'email required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }

                        })} />
                        <div className="px-1 absolute right-4 top-1/2 -translate-y-1/2">
                            {userProfile && (
                                <>
                                    {userProfile.emailVerifiedAt ? (
                                        <p className="text-green-40">verified</p>
                                    ) : (
                                        <p className="text-danger">not verified</p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="basis-1/5">
                        <ButtonSubmit isLoading={false} text="Change" />
                    </div>
                </div>
            </form>
            <p className="font-lexend font-bold text-2xl">Email</p>
            <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
                <p className="mb-2">Password</p>
                <InputForm register={registerPassword} config={{
                    type: 'password',
                    name: 'currentPassword',
                    placeholder: 'Current Password',
                    error: errorsPassword.currentPassword,
                    registerConfig: {
                        required: 'Tidak boleh kosong',
                    }
                }} />
                <div className="flex items-center gap-4 mt-4">
                    <div className="w-full">
                        <p className="mb-2">New Password</p>
                        <div className="relative">
                            {errorsPassword.password && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errorsPassword.password.message}`}</p>)}
                            <input type="password" placeholder='Password' className={'text-sm px-4 py-3 focus:outline-none  rounded-md focus:ring-0 w-full ' + (errorsPassword.password ? 'border-danger/50 hover:border-danger focus:border-danger' : 'border-[#B0B4C5]/50 hover:border-[#B0B4C5] focus:border-primary ')} {...registerPassword('password', {
                                required: true,
                            })} onFocus={() => setshowPasswordCriteria(true)} />
                        </div>
                    </div>
                    <div className="w-full">
                        <p className="mb-2">Confirm Password</p>
                        <InputForm register={registerPassword} config={{
                            type: 'password',
                            name: 'confirmPassword',
                            placeholder: 'Confirm Password',
                            error: errorsPassword.confirmPassword,
                            registerConfig: {
                                required: "Tidak boleh kosong"
                            }
                        }} />
                    </div>
                </div>
                {showPasswordCriteria && (
                    <div className="bg-neutral-75 rounded-md py-2 px-4 mt-4 text-[#777C88]">
                        <p>Password harus mengandung :</p>
                        <div className="ml-2">
                            <div className="">
                                {passwordValidator.eightLength ? (<p className='text-green-40'>&#10003; Paling tidak 8 karakter </p>
                                ) : (<p className='text-danger'>Paling tidak 8 karakter </p>)}
                                {passwordValidator.lowerCase ? (<p className='text-green-40'>&#10003; Huruf kecil (a-z) </p>
                                ) : (<p className='text-danger'>Huruf kecil (a-z) </p>)}
                                {passwordValidator.upperCase ? (<p className='text-green-40'>&#10003; Huruf besar (A-Z)</p>
                                ) : (<p className='text-danger'>Huruf besar (A-Z)</p>)}
                                {passwordValidator.numeric ? (<p className='text-green-40'>&#10003; Angka</p>
                                ) : (<p className='text-danger'>Angka</p>)}

                            </div>
                        </div>
                    </div>
                )}
                <div className="mt-4 flex gap-4 justify-start items-center">
                    <div className="">
                        <ButtonSubmit isLoading={false} text="Update Password" />
                    </div>
                    <Link href={'/dashboard/settings'} className="text-primary">I forgot my password</Link>
                </div>
            </form>
        </div>
    )
}

export default Account