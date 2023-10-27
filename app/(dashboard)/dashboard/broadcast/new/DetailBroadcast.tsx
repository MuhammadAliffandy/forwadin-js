'use client'
import { useState } from "react"
import { Select, SelectItem, Skeleton } from "@nextui-org/react"
import InputForm from "@/components/form/InputForm"
import { useForm } from "react-hook-form"

const DetailBroadcast = () => {
    const [isLoaded, setisLoaded] = useState(true)
    const [broadcastData, setbroadcastData] = useState({

    })
    const { register } = useForm()
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
    return (
        <div className='flex justify-center items-center lg:items-start lg:flex-row flex-col gap-4 mt-4'>
            <div className='max-w-sm w-full items-center flex flex-col gap-4'>
                <div className='w-full bg-white rounded-md p-4 flex flex-col gap-4'>
                    <p className="font-lexend font-bold text-2xl">Broadcast Detail</p>
                    <div>
                        <p>Nama Broadcast</p>
                        <div>Input</div>
                    </div>
                </div>
                <div className='w-full bg-white rounded-md p-4'>
                    <p className="font-bold text-xl font-lexend">Aksi</p>
                    <Select
                        items={actionType}
                        label="Pilih aksi"
                        fullWidth
                        className="rounded-md mt-4"
                        variant="bordered"
                        size="sm"
                        color="primary"
                        defaultSelectedKeys={['0']}
                        classNames={{
                            base: 'border-customGray'
                        }}

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