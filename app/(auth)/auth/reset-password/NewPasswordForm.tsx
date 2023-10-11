import ButtonSubmit from "@/components/form/ButtonSubmit"
import InputForm from "@/components/form/InputForm"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
interface PasswordReset {
    password: string,
    confirmPassword: string
}
const NewPasswordForm = ({ setCurrentStep, token }: { setCurrentStep: Dispatch<SetStateAction<string>>, token: string }) => {
    const { handleSubmit, register, setValue, watch, setError, formState: { errors } } = useForm<PasswordReset>()
    const [isLoading, setisLoading] = useState(false)
    const [showPasswordCriteria, setshowPasswordCriteria] = useState(false)
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
    const onSubmit = async (formData: PasswordReset) => {
        setisLoading(true)
        console.log(token)
        try {
            const result = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    resetToken: token,
                    password: formData.password
                })
            })
            if (result.status === 200) {
                setisLoading(false)
                setCurrentStep('success')
            } else {
                const body = await result.json()
                toast.error(body.message)
                console.log(body)
                setisLoading(false)
            }
        } catch (error) {
            setisLoading(false)
            console.log(error)
            toast.error('Gagal update password')
        }
    }
    useEffect(() => {
        const watchPassword = watch(value => {
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
        return () => watchPassword.unsubscribe()
    }, [watch, passwordValidator])
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className='text-center'>
                <p className='font-lexend font-bold text-2xl'>New Password</p>
                <p className='text-sm'>Masukkan Password Baru</p>
            </div>
            <div className="relative text-sm">
                {errors.password && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errors.password.message}`}</p>)}
                <input type="password" placeholder='Password' className={'text-sm px-4 py-3 focus:outline-none  rounded-md focus:ring-0 w-full ' + (errors.password ? 'border-danger focus:border-danger' : 'border-[#B0B4C5] focus:border-primary ')} {...register('password', {
                    required: true,
                })} onFocus={() => setshowPasswordCriteria(true)} />
                {showPasswordCriteria && (
                    <div className="bg-neutral-75 rounded-md py-2 px-4 mt-2 text-[#777C88]">
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
            </div>
            <InputForm register={register} config={{
                name: 'confirmPassword',
                type: 'password',
                placeholder: 'Confirm Password',
                error: errors.confirmPassword,
                registerConfig: {
                    required: true,
                    validate: (value: String) => {
                        if (value != watch('password'))
                            return 'Password do not match'
                    }
                }
            }} />
            <ButtonSubmit isLoading={isLoading} text="Simpan" />
        </form>
    )
}

export default NewPasswordForm