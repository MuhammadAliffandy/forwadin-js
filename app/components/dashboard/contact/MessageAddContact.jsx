import ButtonSubmit from "@/app/components/form/ButtonSubmit"
import ModalTemplate from "@/app/components/template/ModalTemplate"
import { Skeleton } from "@nextui-org/react"
import { useEffect, useState } from "react";
import MultipleInputLabel from "../MultipleInputLabel"
import InputForm from "@/app/components/form/InputForm"
import { fetchClient } from "@/app/utils/helper/fetchClient"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"


const MessageAddContact = ({ fetchData, openModal, setopenModal, addContactData }) => {
    const { data: session } = useSession()
    const [isLoaded, setisLoaded] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm()
    const [labelList, setlabelList] = useState([
    ])
    const [deviceList, setdeviceList] = useState([])
    const onSubmit = async (formData) => {
        setisLoading(true)
        const bodyForm = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            gender: formData.gender,
            dob: formData.dob,
            deviceId: deviceList.find(device => device.id === formData.device)?.id,
            labels: (labelList ? labelList.filter(item => item.label.active).map(item => item.label.name) : null)
        }
        const result = await fetchClient({
            method: 'POST',
            body: JSON.stringify(bodyForm),
            url: '/contacts/create',
            user: session?.user
        })

        if (result.ok) {
            toast.success('Kontak berhasil ditambahkan')
            fetchData()
            setisLoading(false)
            setopenModal(false)
            reset()
            setlabelList(labelList.map(item => {
                return {
                    label: {
                        ...item.label,
                        active: false
                    }
                }
            }))
        } else {
            toast.error('Gagal menyimpan kontak')
            setisLoading(false)
        }
    }
    const fetchDevice = async () => {
        const result = await fetchClient({
            method: 'GET',
            url: '/devices',
            user: session?.user
        })
        if (result.ok) {
            const body = await result.json()
            setdeviceList(body)
            setisLoaded(true)
        } else {
            toast.error('Tidak dapat fetching data device')
        }
    }
    useEffect(() => {
        if (deviceList.length === 0)
            fetchDevice()
    }, [session?.user?.token])
    useEffect(() => {
        setValue('phone', addContactData.phone)
    }, [])
    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={false}>
            {isLoaded ? (
                <>
                    <p className="font-bold text-2xl">Tambah Kontak</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-sm w-full mt-8 max-h-[80vh] overflow-y-auto">
                        <div>
                            <p className="font-bold mb-2">First Name</p>
                            <InputForm register={register} config={{
                                name: 'firstName',
                                type: 'text',
                                placeholder: 'First Name',
                                error: errors.firstName,
                                registerConfig: {
                                    required: 'tidak boleh kosong',
                                }
                            }} />
                        </div>
                        <div>
                            <p className="font-bold mb-2">Last Name</p>
                            <InputForm register={register} config={{
                                name: 'lastName',
                                type: 'text',
                                placeholder: 'Last Name',
                                error: errors.lastName,
                                registerConfig: {
                                    required: 'tidak boleh kosong'
                                }
                            }} />
                        </div>
                        <div>
                            <p className="font-bold mb-2">Email</p>
                            <InputForm register={register} config={{
                                name: 'email',
                                type: 'text',
                                placeholder: 'Email',
                                error: errors.email,
                                registerConfig: {
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    },
                                    required: 'tidak boleh kosong'
                                }
                            }} />
                        </div>
                        <div>
                            <p className="font-bold mb-2">Phone Number</p>
                            <InputForm register={register} config={{
                                name: 'phone',
                                type: 'text',
                                placeholder: 'WhatsApp Number',
                                error: errors.phone,
                                registerConfig: {
                                    required: 'tidak boleh kosong'
                                }
                            }} />
                        </div>
                        <div>
                            <p className="font-bold mb-2">Gender</p>
                            <select {...register('gender')} className="px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border-[#B0B4C5] focus:border-primary">
                                <option value="male" className="">Laki-laki</option>
                                <option value="female">Perempuan</option>
                            </select>
                        </div>
                        <div>
                            <p className="font-bold mb-2">Birthdate</p>
                            <InputForm register={register} config={{
                                name: 'dob',
                                placeholder: 'DD/MM/YYYY',
                                type: 'date',
                                error: errors.dob,
                                registerConfig: {
                                    required: 'tidak boleh kosong'
                                }
                            }} />
                        </div>
                        <div>
                            <p className="font-bold mb-2">Label</p>
                            <MultipleInputLabel labelList={labelList} setlabelList={setlabelList} />
                        </div>
                        <div>
                            <p className="font-bold mb-2">Device</p>
                            <select {...register('device')} name="device" id="device" className="px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border-[#B0B4C5] focus:border-primary">
                                {deviceList.map(device => (
                                    <option value={device.id}>
                                        <p className="px-4 py-3">
                                            {device.name}
                                        </p>
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div className="mt-4">
                            <ButtonSubmit text="Simpan" isLoading={isLoading} />
                        </div>
                    </form>
                </>
            ) : (
                <div className=' flex flex-col gap-2'>
                    <Skeleton className={'w-full h-3 rounded-full'} />
                    <Skeleton className={'w-full h-3 rounded-full'} />
                    <Skeleton className={'w-full h-3 rounded-full'} />
                </div>
            )}
        </ModalTemplate>
    );
}

export default MessageAddContact