'use client'
import MultipleInputLabel from "@/components/dashboard/MultipleInputLabel"
import { fetchClient } from "@/utils/helper/fetchClient"
import { DeviceData, Label } from "@/utils/types"
import { useRouter } from "next/navigation"

import React, { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { PulseLoader } from "react-spinners"
import { toast } from "react-toastify"
const DetailDevice = ({ device }: { device: string }) => {
    const [isLoading, setisLoading] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [deviceName, setdeviceName] = useState('')
    const [deviceData, setdeviceData] = useState<DeviceData>()
    const [labelList, setlabelList] = useState<Label[]>([])
    const fetchDetailDevice = async () => {

        const result = await fetchClient({ method: 'GET', url: '/devices/' + device })
        const data: DeviceData = await result.json()
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
            toast.error('failed to fetch data')
        }

    }
    const handleUpdateDevice = async () => {
        setisLoading(true)
        const newLabel = labelList.filter(obj => obj.label.active).map(obj => obj.label.name)
        const updateDevice = await fetchClient({
            method: 'PUT', body: JSON.stringify({
                name: deviceName,
                label: newLabel
            }), url: '/devices/' + deviceData?.id
        })
        if (updateDevice.status === 200) {
            toast.success('Device berhasil diubah!')
            fetchDetailDevice()
        } else {
            toast.error('Device gagal diubah!')
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
                            <div className='px-4 py-3 text-center border border-black/50 rounded-md mt-4'>Generate API key baru</div>
                            <div className='mt-8 bg-primary rounded-md text-white border border-primary px-4 py-3 text-center hover:cursor-pointer' onClick={handleUpdateDevice}>
                                {isLoading ? (<PulseLoader size={10} color="#F3F5F8" />)
                                    : (<p>
                                        Simpan Perubahan
                                    </p>)}
                            </div>
                            <div className='mt-4 bg-white rounded-md text-danger border border-black/50 px-4 py-3 text-center'>Hapus</div>
                        </>
                    ) : (
                        <Skeleton count={3} />
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
                            <Skeleton count={3} />
                        )}
                </div>
            </div>
        </>
    )
}

export default DetailDevice