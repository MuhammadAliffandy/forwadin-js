import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ModalTemplate from "../template/ModalTemplate"
import { User } from "next-auth"
import { useForm } from "react-hook-form"
import InputForm from "../form/InputForm"
import { Button } from "@nextui-org/react"
import { DeviceData } from "@/utils/types"
import { fetchClient } from "@/utils/helper/fetchClient"
import { toast } from "react-toastify"
import ButtonSubmit from "../form/ButtonSubmit"
interface CreateCSModalProps {
    openModal: boolean,
    setopenModal: Dispatch<SetStateAction<boolean>>,
    user: User | undefined,
    refresh: () => void
}
interface CSForm {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    deviceId: string
}
const CreateCSModal = ({ openModal, refresh, setopenModal, user }: CreateCSModalProps) => {
    const [isLoading, setisLoading] = useState(false)
    const { handleSubmit, register, reset, watch, formState: { errors } } = useForm<CSForm>()
    const [deviceList, setdeviceList] = useState<DeviceData[]>([])
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
    const fetchDevice = async () => {
        const result = await fetchClient({
            method: 'GET',
            url: '/devices',
            user: user
        })
        if (result && result.ok) {
            const body = await result.json()
            setdeviceList(body)
        } else {
            toast.error('Tidak dapat fetching data device')
        }
    }
    const onSubmit = async (CSData: CSForm) => {
        setisLoading(true)
        if (!user) return
        const body = {
            username: CSData.username,
            email: CSData.email,
            password: CSData.password,
            confirmPassword: CSData.confirmPassword,
            userId: user?.id,
            deviceId: CSData.deviceId
        }
        const result = await fetchClient({
            url: '/customer-services/register',
            method: 'POST',
            body: JSON.stringify(body),
            user: user
        })
        if (result?.ok) {
            toast.success('Berhasil tambah CS')
            refresh()
            setopenModal(false)
        } else {
            toast.error('Gagal tambah CS')
        }
        setisLoading(false)
    }
    useEffect(() => {
        if (user?.token)
            fetchDevice()
    }, [user?.token])
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
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={false}>
            <>
                <p className="text-2xl font-lexend font-bold">Tambah Customer Service</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-sm w-full mt-8 max-h-[80vh] overflow-y-auto">
                    <div>
                        <p className="mb-2">Username</p>
                        <InputForm
                            register={register}
                            config={{
                                name: 'username',
                                placeholder: 'Username',
                                error: errors.username,
                                type: 'text',
                                registerConfig: {
                                    required: 'tidak boleh kosong'
                                }
                            }}
                        />
                    </div>
                    <div>
                        <p className="mb-2">Email</p>
                        <InputForm
                            register={register}
                            config={{
                                name: 'email',
                                placeholder: 'Email',
                                error: errors.email,
                                type: 'text',
                                registerConfig: {
                                    required: 'tidak boleh kosong',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className="relative">
                        <p className="mb-2">Password</p>
                        {errors.password && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errors.password.message}`}</p>)}
                        <input type="password" placeholder='Password' className={'text-sm px-4 py-3 focus:outline-none  rounded-md focus:ring-0 w-full ' + (errors.password ? 'border-danger/50 hover:border-danger focus:border-danger' : 'border-[#B0B4C5]/50 hover:border-[#B0B4C5] focus:border-primary ')} {...register('password', {
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
                    <div>
                        <p className="mb-2">Confirm Password</p>

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
                    </div>
                    <div>
                        <p className="mb-2">Device</p>
                        <select {...register('deviceId')} name="device" id="device" className="px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border-[#B0B4C5] focus:border-primary" defaultValue={deviceList[0]?.id}>
                            {deviceList.map(device => (
                                <option value={device.id}>
                                    <p className="px-4 py-3">
                                        {device.name}
                                    </p>
                                </option>
                            ))}

                        </select>
                    </div>
                    <div className="mt-2">

                        <ButtonSubmit text="Tambah" isLoading={isLoading} />
                    </div>
                </form>
            </>
        </ModalTemplate>
    )
}

export default CreateCSModal