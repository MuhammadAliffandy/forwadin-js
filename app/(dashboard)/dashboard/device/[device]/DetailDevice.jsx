'use client'
import MultipleInputLabel from "@/components/dashboard/MultipleInputLabel"
import { fetchClient } from "@/utils/helper/fetchClient"
import { DeviceData, Label } from "@/utils/types"
import { useRouter } from "next/navigation"

import React, { useEffect, useState } from "react"
import { Button, Skeleton } from "@nextui-org/react"
import { PulseLoader } from "react-spinners"
import { toast } from "react-toastify"
import { signIn, useSession } from "next-auth/react"
const DetailDevice = ({ device }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [isLoading, setisLoading] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [deviceName, setdeviceName] = useState('')
    const [deviceData, setdeviceData] = useState()
    const [labelList, setlabelList] = useState([])
    const fetchDetailDevice = async () => {
        const result = await fetchClient({
            method: 'GET',
            url: '/devices/' + device,
            user: session?.user
        })
        if (result) {
            const data = await result.json()
            if (result.status === 200) {
                document.title = data.name + "'s Detail"
                setdeviceData(data)
                const newLabelList = data.DeviceLabel.map(obj => {
                    return {
                        label: {
                            name: obj.label.name,
                            active: true
                        }
                    }
                })
                setlabelList(newLabelList)
                setdeviceName(data.name)
                setisLoaded(true)
            } else {
                toast.error('device not found')
                console.log(data)
            }
        }
    }
    const generateAPIKey = async () => {
        if (!deviceData) return
        const result = await fetchClient({
            url: '/devices/api-key/' + deviceData?.id,
            method: 'GET',
            user: session?.user
        })
        if (result?.ok) {
            toast.success('Berhasil generate API Key baru')
            fetchDetailDevice()
        } else {
            toast.error('Gagal generate API Key baru')
        }
    }
    const handleDeleteDevice = async () => {
        const result = await fetchClient({
            url: '/devices/',
            body: JSON.stringify({ deviceIds: [deviceData?.id] }),
            method: 'DELETE',
            user: session?.user
        })
        if (result?.ok) {
            toast.success('Berhasil hapus device')
            const refresh = await signIn('refresh', {
                redirect: false,
                user: JSON.stringify(session?.user)
            })
            if (refresh?.error) {
                toast.error('Gagal update session')
            }
            router.push('/dashboard/device')
        } else {
            toast.error('Gagal hapus device')
        }
    }
    const handleUpdateDevice = async () => {
        setisLoading(true)
        const newLabel = labelList.filter(obj => obj.label.active).map(obj => obj.label.name)
        const updateDevice = await fetchClient({
            method: 'PUT',
            body: JSON.stringify({
                name: deviceName,
                label: newLabel
            }),
            url: '/devices/' + deviceData?.id,
            user: session?.user
        })
        if (updateDevice) {
            if (updateDevice.status === 200) {
                toast.success('Device berhasil diubah!')
                fetchDetailDevice()
            } else {
                toast.error('Device gagal diubah!')
            }
        }
        setisLoading(false)
    }
    useEffect(() => {
        fetchDetailDevice()
    }, [])
    return (
        <>
            <div className='mt-8 flex flex-col lg:flex-row justify-center lg:justify-between gap-4'>
                <div className='bg-white rounded-md w-full max-w-md p-4 mx-auto'>
                    {isLoaded ? (
                        <>
                            <p className='font-lexend text-2xl font-bold '>Device Detail</p>

                            <p className='mt-8'>Nama Device</p>

                            <input type="text" name='inputText' className='rounded-md border border-customGray text-sm w-full py-3 px-4 mt-4' value={deviceName} onChange={e => setdeviceName(e.currentTarget.value)} />

                            <p className='mt-8'>Labels</p>
                            <MultipleInputLabel labelList={labelList} setlabelList={setlabelList} />

                            <p className='mt-8'>API Key</p>

                            <div className='w-full px-4 py-3 bg-neutral-75 rounded-md break-words mt-4 text-[#777C88]'>
                                {deviceData?.apiKey}
                            </div>
                            <Button
                                fullWidth
                                variant="faded"
                                className="rounded-md mt-2"
                                onClick={generateAPIKey}
                            >
                                Generate API key baru
                            </Button>

                            <Button fullWidth={true} type='button' color="primary" isLoading={isLoading} className='rounded-md mt-8' size='lg' onClick={handleUpdateDevice}>
                                Simpan Perubahan
                            </Button>
                            <Button fullWidth={true} variant="bordered" type='button' color="danger" isLoading={isLoading} className='rounded-md mt-4' size='lg' onClick={handleDeleteDevice}>
                                Hapus
                            </Button>
                        </>) : (
                        <div className='mt-4 flex flex-col gap-2'>
                            <Skeleton className={'w-full h-3 rounded-full'} />
                            <Skeleton className={'w-full h-3 rounded-full'} />
                            <Skeleton className={'w-full h-3 rounded-full'} />
                        </div>
                    )}


                </div>
                <div className='bg-white rounded-md w-full max-w-md lg:max-w-none mx-auto p-4 flex flex-col gap-4'>
                    {isLoaded ? (
                        <>
                            <p className='font-lexend text-2xl font-bold '>Logging</p>
                            <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-4'>
                                <ul className='list-inside list-disc'>
                                    <li >Device berhasil terkoneksi [15 Jun 2023 22:36:29]</li>
                                    <li className='mt-2'>Device berhasil terkoneksi [15 Jun 2023 22:36:29]</li>
                                    <li className='mt-2'>Device berhasil terkoneksi [15 Jun 2023 22:36:29]</li>
                                    <li className='mt-2'>Device berhasil terkoneksi [15 Jun 2023 22:36:29]</li>
                                </ul>
                            </div>
                        </>)
                        : (
                            // <Skeleton count={3} />
                            <>
                                <div className='mt-4 flex flex-col gap-2'>
                                    <Skeleton className={'w-full h-3 rounded-full'} />
                                    <Skeleton className={'w-full h-3 rounded-full'} />
                                    <Skeleton className={'w-full h-3 rounded-full'} />
                                </div>
                            </>
                        )}
                </div>
            </div>
        </>
    )
}

export default DetailDevice