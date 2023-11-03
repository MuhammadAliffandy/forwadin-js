'use client'
import MultipleInputContact from "@/components/dashboard/MultipleInputContact"
import MultipleInputLabel from "@/components/dashboard/MultipleInputLabel"
import InputForm from "@/components/form/InputForm"
import { ContactData, DeviceData, DeviceSession, Label } from "@/utils/types"
import { Select, SelectItem } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
interface AutoReplyForm {
    name: string,
    deviceId: string,
    receivers: string[],
    request: string[],
    response: string
}
const CreateAutoReply = () => {
    const { data: session } = useSession()
    const [listDevice, setlistDevice] = useState<DeviceSession[]>([])
    const { handleSubmit, register, reset, formState: { errors } } = useForm<AutoReplyForm>()
    const [receiverList, setreceiverList] = useState<Label[]>([])
    const [requestList, setrequestList] = useState<Label[]>([])
    const listVariables = [
        'firstName',
        'lastName',
        'gender',
        'country',
        'dob'
    ]
    useEffect(() => {
        if (session?.user?.device) {
            setlistDevice(session.user.device)
        }
        console.log(session?.user?.device)
    }, [session?.user?.device])

    return (
        <div className='flex justify-center items-center lg:items-start lg:flex-row flex-col gap-4 mt-4'>
            <div className='max-w-sm w-full items-center flex flex-col gap-4'>
                <div className='w-full bg-white rounded-md p-4 flex flex-col gap-4'>
                    <p className="font-lexend font-bold text-2xl">Buat Auto Reply</p>
                    <div>
                        <p>Nama Broadcast</p>
                        <InputForm register={register} config={{
                            name: 'name',
                            placeholder: 'Nama Auto Reply',
                            type: 'text',
                            error: errors.name,
                            registerConfig: {
                                required: 'required'
                            }
                        }} />
                    </div>
                    <div>
                        <p>Device</p>

                        <Select
                            items={listDevice}
                            label="Pilih Device"
                            fullWidth
                            className="rounded-md mt-4 border-[#B0B4C5]"
                            variant="bordered"
                            size="sm"
                            color="primary">
                            {(action: DeviceSession) => <SelectItem key={action.id}>{action.name}</SelectItem>}
                        </Select>

                    </div>
                    <div>
                        <p className="mb-1">Penerima</p>
                        <MultipleInputLabel labelList={receiverList} setlabelList={setreceiverList} placeholder="cari / tambah penerima" />
                    </div>
                </div>
                <div className='w-full bg-white rounded-md p-4'>
                    <p className="font-bold text-xl font-lexend">Request</p>
                    <div className="mt-4">
                        <p className="mb-1">Kata</p>
                        <MultipleInputLabel setlabelList={setrequestList} labelList={requestList} placeholder="tambah kata" />
                    </div>
                </div>
            </div>
            <div className='w-full max-w-sm lg:max-w-full'>
                <div className='bg-white w-full p-4'>
                    <p>Aksi</p>
                </div>
            </div>
        </div>
    )
}

export default CreateAutoReply