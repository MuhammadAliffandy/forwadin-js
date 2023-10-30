'use client'
import { useEffect, useState } from "react"
import { Select, SelectItem, Skeleton } from "@nextui-org/react"
import InputForm from "@/components/form/InputForm"
import { useForm } from "react-hook-form"
import { DeviceData } from "@/utils/types"
import { fetchClient } from "@/utils/helper/fetchClient"
import { useSession } from "next-auth/react"

const DetailBroadcast = () => {
    const { data: session } = useSession()
    const [isLoaded, setisLoaded] = useState(true)
    const [broadcastData, setbroadcastData] = useState({

    })
    const [listDevice, setlistDevice] = useState<DeviceData[]>([])
    const { handleSubmit, register, reset, formState: { errors } } = useForm()
    const actionType = [
        {
            key: '0',
            value: 'Tidak ada',
        },
        {
            key: '1',
            value: '1',
        },
        {
            key: '2',
            value: '2',
        },
        {
            key: '3',
            value: '3',
        },
    ]
    const fetchListDevice = async () => {
        const result = await fetchClient({
            url: '/devices',
            method: 'GET',
            user: session?.user
        })
        if (result && result.ok) {
            const resultData: DeviceData[] = await result.json()
            setlistDevice(resultData.filter(device => device.status === "open"))
        }
    }
    useEffect(() => {
        fetchListDevice()
    }, [session?.user?.token])
    return (
        <div className='flex justify-center items-center lg:items-start lg:flex-row flex-col gap-4 mt-4'>
            <div className='max-w-sm w-full items-center flex flex-col gap-4'>
                <div className='w-full bg-white rounded-md p-4 flex flex-col gap-4'>
                    <p className="font-lexend font-bold text-2xl">Broadcast Detail</p>
                    <div>
                        <p>Nama Broadcast</p>
                        <InputForm register={register} config={{
                            name: 'broadcastName',
                            placeholder: 'Nama Broadcast',
                            type: 'text',
                            error: errors.broadcastName,
                            registerConfig: {
                                required: 'required'
                            }
                        }} />
                    </div>
                    <div>
                        <Select
                            items={listDevice}
                            label="Pilih Device"
                            fullWidth
                            className="rounded-md mt-4 border-[#B0B4C5]"
                            variant="bordered"
                            size="sm"
                            color="primary">
                            {(action: DeviceData) => <SelectItem key={action.apiKey}>{action.name}</SelectItem>}
                        </Select>
                    </div>
                </div>
                <div className='w-full bg-white rounded-md p-4'>
                    <p className="font-bold text-xl font-lexend">Aksi</p>
                    <Select
                        items={actionType}
                        label="Pilih aksi"
                        fullWidth
                        className="rounded-md mt-4 border-[#B0B4C5]"
                        variant="bordered"
                        size="sm"
                        color="primary"
                        defaultSelectedKeys={['0']}
                    >
                        {(action: any) => <SelectItem key={action.key}>{action.value}</SelectItem>}
                    </Select>
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

export default DetailBroadcast