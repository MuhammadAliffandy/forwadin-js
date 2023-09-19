'use client';
import DeviceList from '@/components/dashboard/device/DeviceList';
import QRModal from '@/components/dashboard/device/QRModal';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddDeviceModal from '@/components/dashboard/device/AddDeviceModal';
import { DeviceCheckboxRef, DeviceData } from '@/utils/types'
const DeviceTable = () => {
    const { push } = useRouter()
    const mainCheckboxRef = useRef<HTMLInputElement>(null)
    const deviceCheckboxRef = useRef<DeviceCheckboxRef>({})
    const [isChecked, setisChecked] = useState(false)
    const [searchTimeout, setsearchTimeout] = useState(null)
    const [deviceData, setdeviceData] = useState<DeviceData[]>([
        {
            id: 1,
            name: 'RMX398',
            apiKey: "6ncnNW1vR7CVgypJrYPNKmrKhml79lL6nuGR5zvDEF4dWb4R54Mhu3MMLMW8hgqc",
            label: ['Personal', 'Realme', 'Aktif'],
            status: 0,
            checked: false
        },
        {
            id: 2,
            name: 'ASD123',
            apiKey: "6ncnNW1vR7CVgypJrYPNKmrKhml79lL6nuGR5zvDEF4dWb4R54Mhu3MMLMW8hgqc",
            label: ['Personal', 'Realme', 'Inaktif'],
            status: 1,
            checked: false
        },
        {
            id: 3,
            name: 'IOP098',
            apiKey: "6ncnNW1vR7CVgypJrYPNKmrKhml79lL6nuGR5zvDEF4dWb4R54Mhu3MMLMW8hgqc",
            label: ['Group', 'Xiaomi', 'Aktif'],
            status: 1,
            checked: false
        },
        {
            id: 4,
            name: 'LKJ949',
            apiKey: "6ncnNW1vR7CVgypJrYPNKmrKhml79lL6nuGR5zvDEF4dWb4R54Mhu3MMLMW8hgqc",
            label: ['Personal', 'Realme', 'Aktif'],
            status: 1,
            checked: false
        },
    ])
    const [searchText, setsearchText] = useState('')
    const [searchedDevice, setsearchedDevice] = useState<DeviceData[]>([])
    const [openQrModal, setopenQrModal] = useState(false)
    const [qrModalData, setqrModalData] = useState<DeviceData>()
    const [deviceModal, setdeviceModal] = useState(false)
    const handleCheckBoxClick = (e: React.FormEvent<HTMLInputElement>, id: number) => {
        const newDeviceData = deviceData.map(obj => {
            return (obj.id === id ? { ...obj, checked: e.currentTarget.checked } : obj)
        })
        setdeviceData(() => newDeviceData)
    }

    const handleIndexCheckbox = (e: React.MouseEvent) => {
        const currentDeviceData = (searchText ? searchedDevice : deviceData)
        if (mainCheckboxRef.current && !mainCheckboxRef.current.checked) {
            const newArray = currentDeviceData.map((obj, idx) => {
                deviceCheckboxRef.current[`checkbox_${obj.id}`].checked = false
                return { ...obj, checked: false }
            })
            if (searchText)
                setsearchedDevice(newArray)
            else
                setdeviceData(() => newArray)
        } else {
            const newArray = currentDeviceData.map((obj, idx) => {
                deviceCheckboxRef.current[`checkbox_${obj.id}`].checked = true
                return { ...obj, checked: true }
            })
            if (searchText)
                setsearchedDevice(() => newArray)
            else
                setdeviceData(() => newArray)
        }
    }
    const handleOpenQRModal = (params: DeviceData) => {
        const device = deviceData.find(obj => obj.name === params.name)
        setqrModalData(device)
        setopenQrModal(true)

    }
    const handleOpenDetailModal = (params: string) => {
        push('/dashboard/device/' + params)
    }
    const filterDevice = (text: string) => {
        const regex = new RegExp(text, 'i')
        return deviceData.filter(item => {
            if (regex.test(item.name))
                return item
            const findLabel = item.label.find(label => regex.test(label))
            if (findLabel)
                return item
        })
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsearchText(e.target.value)
    }
    const handleAddDevice = () => {

    }
    useEffect(() => {
        if (mainCheckboxRef.current) {
            const checkObject = deviceData.find(obj => obj.checked === true)
            if (checkObject) {
                mainCheckboxRef.current.checked = true
                setisChecked(true)
            }
            else {
                mainCheckboxRef.current.checked = false
                setisChecked(false)
            }
        }
    }, [deviceData])
    useEffect(() => {
        if (mainCheckboxRef.current) {
            const checkObject = searchedDevice.find(obj => obj.checked === true)
            if (checkObject) {
                mainCheckboxRef.current.checked = true
                setisChecked(true)
            }
            else {
                mainCheckboxRef.current.checked = false
                setisChecked(false)
            }
        }
    }, [searchedDevice])

    useEffect(() => {
        const searchResult = filterDevice(searchText)
        setsearchedDevice(searchResult)
    }, [searchText])

    return (
        <>
            <QRModal openModal={openQrModal} setopenModal={setopenQrModal} data={qrModalData} />
            <AddDeviceModal openModal={deviceModal} setopenModal={setdeviceModal} />
            <div className="mt-8 p-4 bg-white rounded-md">
                <div className="flex sm:flex-row flex-col gap-2 justify-between">
                    <div className="basis-1/2">
                        <input type="text" className="text-xs rounded-md w-full max-w-md border border-customGray" placeholder="Cari nama / nomor / label"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                    {isChecked ? (
                        <div className="bg-danger rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                            Hapus
                        </div>
                    ) : (
                        <div onClick={() => setdeviceModal(true)} className="bg-primary rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                            Tambah Device
                        </div>
                    )}
                </div>
            </div>
            <div className='overflow-x-scroll allowed-scroll'>
                <table className="w-full text-center font-nunito text-xs font-bold ">
                    <thead className='bg-neutral-75'>
                        <tr className=''>
                            <th className='py-4'>
                                <input ref={mainCheckboxRef} type="checkbox" name="main_checkbox" id="main_checkbox" className='rounded-sm focus:ring-transparent' onClick={handleIndexCheckbox} />
                            </th>
                            <th className='py-4'>Nama</th>
                            <th className='p-4 whitespace-pre'>API Key</th>
                            <th className='p-4'>Label Kategori</th>
                            <th className='p-4'>Status</th>
                            <th className='p-4'>Scan QR</th>
                            <th className='p-4'>Detail</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white'>
                        {searchText ? (
                            <DeviceList
                                deviceData={searchedDevice}
                                deviceCheckboxRef={deviceCheckboxRef}
                                handleCheckBoxClick={handleCheckBoxClick}
                                handleOpenQRModal={handleOpenQRModal}
                                handleOpenDetailModal={handleOpenDetailModal}
                            />
                        ) : (
                            <DeviceList
                                deviceData={deviceData}
                                deviceCheckboxRef={deviceCheckboxRef}
                                handleCheckBoxClick={handleCheckBoxClick}
                                handleOpenQRModal={handleOpenQRModal}
                                handleOpenDetailModal={handleOpenDetailModal}
                            />
                        )}
                    </tbody>
                </table>
            </div >
        </>
    )
}

export default DeviceTable