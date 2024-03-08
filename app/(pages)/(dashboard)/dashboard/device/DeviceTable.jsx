'use client';
import DeviceList from '@/app/components/dashboard/device/DeviceList';
import QRModal from '@/app/components/dashboard/device/QRModal';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddDeviceModal from '@/app/components/dashboard/device/AddDeviceModal';
import { MultipleCheckboxRef, DeviceData } from '@/app/utils/types'
import { signIn, useSession } from 'next-auth/react';
import { fetchClient } from '@/app/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { Button, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import DeleteModal from '@/app/components/dashboard/device/DeleteModal';
import { useSocket } from '@/app/SocketProvider';
import { getArrayFromSet } from '@/app/utils/helper';

const DeviceTable = ({ setcountDevice }) => {
    const { data: session } = useSession()
    const { isConnected, socket } = useSocket()
    const [isLoaded, setisLoaded] = useState(false)
    const { push } = useRouter()
    const [isChecked, setisChecked] = useState(false)
    const [deviceData, setdeviceData] = useState([
    ])
    const [selectedKeys, setSelectedKeys] = useState(new Set([]))

    const [searchText, setsearchText] = useState('')
    const [searchedDevice, setsearchedDevice] = useState([])
    const [openQrModal, setopenQrModal] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const [qrModalData, setqrModalData] = useState()
    const [deviceModal, setdeviceModal] = useState(false)
    const handleOpenQRModal = (params) => {
        const device = deviceData.find(obj => obj.pkId === params.pkId)
        setqrModalData(device)
        setopenQrModal(true)
    }
    const handleOpenDetailModal = (params) => {
        push('/dashboard/device/' + params)
    }
    const filterDevice = (text) => {
        const regex = new RegExp(text, 'i')
        return deviceData.filter(item => {
            if (regex.test(item.name))
                return item
            const findLabel = item.DeviceLabel.find(item => regex.test(item.label.name))
            if (findLabel)
                return item
        })
    }
    const handleSearch = (e) => {
        setsearchText(e.target.value)
    }

    const fetchData = async () => {
        const fetchDeviceData = await fetchClient({
            method: 'GET',
            url: '/devices',
            user: session?.user
        })
        if (fetchDeviceData) {
            const data= await fetchDeviceData.json()
            if (fetchDeviceData.status === 200) {
                setcountDevice(data.length)
                setdeviceData(data)
                setisLoaded(true)
            } else {
                console.log(data)
                toast.error('gagal mendapatkan data')
            }
        }
    }
    const deleteDevice = async () => {
        const deletedDevice = getArrayFromSet(selectedKeys, deviceData)
        if (deletedDevice) {
            const result = await fetchClient({
                url: '/devices/',
                body: JSON.stringify({ deviceIds: deletedDevice }),
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
                fetchData()
                setSelectedKeys(new Set([]))
            } else {
                toast.error('Gagal hapus device')
            }
        }
    }
    useEffect(() => {
        console.log(session?.user)
        if (session?.user?.token)
            fetchData()
    }, [session?.user?.token])

    useEffect(() => {
        const searchResult = filterDevice(searchText)
        setsearchedDevice(searchResult)
    }, [searchText])
    useEffect(() => {
        if ((selectedKeys).size > 0 || selectedKeys === 'all')
            setisChecked(true)
        else
            setisChecked(false)
    }, [selectedKeys])
    return (
        <>
            {openQrModal && (
                <QRModal openModal={openQrModal} setopenModal={setopenQrModal} data={qrModalData} session={session} socket={socket} refresh={fetchData} />
            )}
            <DeleteModal setopenModal={setdeleteModal} openModal={deleteModal} count={(selectedKeys === 'all' ? 'semua' : (selectedKeys ).size)} type='device' deleteFunction={deleteDevice} />
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
                        <Button color='danger' className='rounded-md' onClick={() => setdeleteModal(true)}>
                            Hapus
                        </Button>
                    ) : (
                        <Button color='primary' onClick={() => setdeviceModal(true)} className="rounded-md">
                            Tambah Device
                        </Button>
                    )}
                </div>
            </div>
            {isLoaded ? (
                <div className=' mt-4'>
                    <Table
                        aria-label="Incoming Chat"
                        color='default'
                        selectionMode="multiple"
                        isHeaderSticky
                        classNames={{
                            td: 'text-[11px] font-nunito',
                            tr: 'text-[11px] font-nunito',
                            base: "max-h-[55vh] overflow-y-scroll",
                            table: "",
                            thead: 'rounded-md',
                            wrapper: 'rounded-md'
                        }}
                        radius='md'
                        selectedKeys={selectedKeys }
                        onSelectionChange={setSelectedKeys }
                    >
                        <TableHeader>
                            <TableColumn>Nama</TableColumn>
                            <TableColumn>API Key</TableColumn>
                            <TableColumn>Nomor HP</TableColumn>
                            <TableColumn>Label Kategori</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Scan QR</TableColumn>
                            <TableColumn>Detail</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={
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

                            </div>} items={searchText ? searchedDevice : deviceData}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    <TableCell >{item.name}</TableCell>
                                    <TableCell >{item.apiKey}</TableCell>
                                    <TableCell >{item.phone ? item.phone : '-'}</TableCell>
                                    <TableCell className='flex flex-wrap justify-center lg:justify-start items-center  gap-2' >  {item.DeviceLabel?.map((item, idx) => (
                                        <div key={idx} className='border-2 border-primary px-2 py-1 rounded-full'>
                                            {item.label.name}
                                        </div>
                                    ))}</TableCell>
                                    <TableCell >{item.status === 'open' ? 'Terkoneksi' : 'Tidak Terkoneksi'}</TableCell>
                                    <TableCell >
                                        <div className="flex items-center">
                                            {item.status === 'open' ? (
                                                <div>Sudah terkoneksi</div>
                                            ) : (
                                                <div className='text-primary py-1 px-4  border border-black/20 rounded-md hover:cursor-pointer whitespace-nowrap  flex items-center' onClick={() => handleOpenQRModal(item)}>Scan QR</div>
                                            )}

                                        </div>
                                    </TableCell>
                                    <TableCell>

                                        <Button
                                            variant='bordered'
                                            className='rounded-md'
                                            onClick={() => handleOpenDetailModal(item.id)}>Detail</Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div >
            ) : (
                <div className='mt-4 flex flex-col gap-2 p-4 bg-white'>
                    <Skeleton className={'w-full h-3 rounded-full'} />
                    <Skeleton className={'w-full h-3 rounded-full'} />
                    <Skeleton className={'w-full h-3 rounded-full'} />
                </div>
            )}
        </>
    )
}

export default DeviceTable