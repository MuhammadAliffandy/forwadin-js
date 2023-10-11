'use client';
import DeviceList from '@/components/dashboard/device/DeviceList';
import QRModal from '@/components/dashboard/device/QRModal';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddDeviceModal from '@/components/dashboard/device/AddDeviceModal';
import { MultipleCheckboxRef, DeviceData } from '@/utils/types'
import { getSession, useSession } from 'next-auth/react';
import { fetchClient } from '@/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import DeleteModal from '@/components/dashboard/device/DeleteModal';

const DeviceTable = () => {
    const { data: session, update } = useSession()
    const [isLoaded, setisLoaded] = useState(false)
    const { push } = useRouter()
    const mainCheckboxRef = useRef<HTMLInputElement>(null)
    const deviceCheckboxRef = useRef<MultipleCheckboxRef>({})
    const [isChecked, setisChecked] = useState(false)
    const [deviceData, setdeviceData] = useState<DeviceData[]>([
    ])

    const [searchText, setsearchText] = useState('')
    const [searchedDevice, setsearchedDevice] = useState<DeviceData[]>([])
    const [openQrModal, setopenQrModal] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const [qrModalData, setqrModalData] = useState<DeviceData>()
    const [deviceModal, setdeviceModal] = useState(false)
    const handleCheckBoxClick = (e: React.FormEvent<HTMLInputElement>, pkId: number) => {
        const newDeviceData = deviceData.map(obj => {
            return (obj.pkId === pkId ? { ...obj, checked: e.currentTarget.checked } : obj)
        })
        setdeviceData(() => newDeviceData)
    }

    const handleIndexCheckbox = (e: React.MouseEvent) => {
        const currentDeviceData = (searchText ? searchedDevice : deviceData)
        if (mainCheckboxRef.current && !mainCheckboxRef.current.checked) {
            const newArray = currentDeviceData.map((obj, idx) => {
                deviceCheckboxRef.current[`checkbox_${obj.pkId}`].checked = false
                return { ...obj, checked: false }
            })
            if (searchText)
                setsearchedDevice(newArray)
            else
                setdeviceData(() => newArray)
        } else {
            const newArray = currentDeviceData.map((obj, idx) => {
                deviceCheckboxRef.current[`checkbox_${obj.pkId}`].checked = true
                return { ...obj, checked: true }
            })
            if (searchText)
                setsearchedDevice(() => newArray)
            else
                setdeviceData(() => newArray)
        }
    }
    const handleOpenQRModal = (params: DeviceData) => {
        const device = deviceData.find(obj => obj.pkId === params.pkId)
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
            const findLabel = item.DeviceLabel.find(item => regex.test(item.label.name))
            if (findLabel)
                return item
        })
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsearchText(e.target.value)
    }
    const handleAddDevice = () => {

    }
    const fetchData = async () => {
        try {
            const fetchDeviceData = await fetchClient({
                method: 'GET',
                url: '/devices',
            })
            const data: DeviceData[] = await fetchDeviceData.json()
            if (fetchDeviceData.status === 200) {
                setdeviceData(data)
                setisLoaded(true)
            } else {
                console.log(data)
                toast.error('gagal mendapatkan data')
            }
        } catch (error) {
            toast.error('gagal mendapatkan data, cek koneksi internet')
            console.log(error)
        }
    }
    const refreshData = () => {
        fetchData()
    }
    useEffect(() => {
        fetchData()
    }, [])
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
    const tesSession = () => {
        console.log(session)
    }
    return (
        <>
            {openQrModal && (
                <QRModal openModal={openQrModal} setopenModal={setopenQrModal} data={qrModalData} session={session} update={update} refresh={refreshData} />
            )}
            {deleteModal && (
                <DeleteModal setopenModal={setdeleteModal} openModal={deleteModal} device={deviceData} refresh={refreshData} />
            )}
            <AddDeviceModal openModal={deviceModal} setopenModal={setdeviceModal} fetchData={fetchData} />
            <div className="mt-8 p-4 bg-white rounded-md">
                <div className="flex sm:flex-row flex-col gap-2 justify-between">
                    <div className="basis-1/2">
                        <input type="text" className="text-xs rounded-md w-full max-w-md border border-customGray" placeholder="Cari nama / nomor / label"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                    {isChecked ? (
                        <div className="bg-danger rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2" onClick={() => setdeleteModal(true)}>
                            Hapus
                        </div>
                    ) : (
                        <div onClick={() => setdeviceModal(true)} className="bg-primary rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                            Tambah Device
                        </div>
                    )}
                </div>
            </div>
            {isLoaded ? (
                <div className='overflow-x-scroll allowed-scroll'>
                    <table className="w-full text-center font-nunito text-xs font-bold">
                        <thead className='bg-neutral-75'>
                            <tr className=''>
                                <th className='py-4 checkbox'>
                                    <input ref={mainCheckboxRef} type="checkbox" name="main_checkbox" id="main_checkbox" className='rounded-sm focus:ring-transparent' onClick={handleIndexCheckbox} />
                                </th>
                                <th className='p-4'>Nama</th>
                                <th className='p-4 whitespace-pre'>API Key</th>
                                <th className='p-4'>Label Kategori</th>
                                <th className='p-4'>Status</th>
                                <th className='p-4'>Scan QR</th>
                                <th className='p-4'>Detail</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white '>
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
                    {deviceData.length === 0 && (
                        <div className='w-full bg-white p-12'>
                            <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                                <p className='text-[16px] font-bold'>Hubungkan device anda</p>
                                <p className='text-xs text-[#777C88]'>Tambahkan perangkat Anda untuk mengirim pesan broadcast, kampanye, dan autoreply yang canggih melalui WhatsApp. Dengan ini, Anda bisa:</p>
                                <ul className='text-xs list-disc list-outside pl-4'>
                                    <li>Kirim pesan personal kepada penerima di saluran percakapan terakhir mereka.</li>
                                    <li>Gunakan variabel personalisasi untuk berinteraksi langsung tanpa perlu membuat grup.</li>
                                    <li>Buat daftar kontak secara manual, otomatis, atau dengan mengimpor untuk mengelompokkan kontak Anda.</li>
                                    <li>Kirim gambar atau berkas media lainnya.</li>
                                    <li>Pantau metrik untuk mengukur efektivitas pemasaran pesan Anda.</li>
                                </ul>
                                <div className='flex'>
                                    <div onClick={() => setdeviceModal(true)} className="bg-primary rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                        Tambah Device
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div >
            ) : (
                <div className='bg-white w-full p-4'>

                    <Skeleton count={3} className='' />
                </div>
            )}
        </>
    )
}

export default DeviceTable