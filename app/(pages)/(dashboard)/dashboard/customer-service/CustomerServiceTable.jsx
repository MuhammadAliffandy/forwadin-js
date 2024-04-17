'use client';
import CreateCSModal from "@/app/components/customer-service/CreateCSModal"
import UpdateCSModal from "@/app/components/customer-service/UpdateCSModal"
import DeleteModal from "@/app/components/dashboard/device/DeleteModal"
import { formatDate, getArrayFromSet } from "@/app/utils/helper"
import { fetchClient } from "@/app/utils/helper/fetchClient"
import { Button, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { customerServicesUser } from "../../../../api/repository/userRepository"

const CustomerServiceTable = () => {

    const { data: session } = useSession()
    const [isLoaded, setisLoaded] = useState(false)
    const [isChecked, setisChecked] = useState(false)
    const [CSData, setCSData] = useState([])
    const [searchedCSData, setsearchedCSData] = useState([])
    const [searchText, setsearchText] = useState('')
    const [createCSModal, setcreateCSModal] = useState(false)
    const [deleteCSModal, setdeleteCSModal] = useState(false)
    const [updateCSModal, setupdateCSModal] = useState(false)
    const [updateCSData, setupdateCSData] = useState()
    const [selectedCS, setselectedCS] = useState(new Set([]))
    const filterCS = (text) => {
        const regex = new RegExp(text, 'i')
        return CSData.filter(item => {
            if (regex.test(item.username))
                return item
        })
    }
    const handleSearch = (e) => {
        setsearchText(e.target.value)
    }
    const deleteCS = async () => {
        const deletedCS = getArrayFromSet(selectedCS, CSData)
        if (deletedCS) {
            console.log(deletedCS)
            const result = await fetchClient({
                url: '/customer-services',
                method: 'DELETE',
                body: JSON.stringify({ csIds: deletedCS }),
                user: session?.user
            })
            if (result.status === 200) {
                toast.success('Berhasil hapus Customer Service')
                fetchCSData()
                setselectedCS(new Set([]))
            } else {
                toast.error('Gagal hapus Customer Service')
            }
        }
    }
    const fetchCSData = async () => {
   
        const result = await customerServicesUser(session.user.token,session.user.id)

        if (result.status === 200) {
            const resultData = result.data
            setCSData(resultData)
            console.log(resultData)
        }
        setisLoaded(true)
    }
    const handleUpdateCS = (data) => {
        setupdateCSData(data)
        setupdateCSModal(true)
    }
    useEffect(() => {
        if ((selectedCS).size > 0 || selectedCS === 'all')
            setisChecked(true)
        else
            setisChecked(false)
    }, [selectedCS])
    useEffect(() => {
        const searchResult = filterCS(searchText)
        setsearchedCSData(searchResult)
    }, [searchText])
    useEffect(() => {
        if (session?.user?.token)
            fetchCSData()

    }, [session?.user?.token])
    return (
        <>
            <CreateCSModal openModal={createCSModal} setopenModal={setcreateCSModal} refresh={fetchCSData} user={session?.user} />
            <UpdateCSModal openModal={updateCSModal} setopenModal={setupdateCSModal} refresh={fetchCSData} user={session?.user} csData={updateCSData} />
            <DeleteModal count={(selectedCS === 'all' ? 'semua' : (selectedCS).size)} deleteFunction={deleteCS} openModal={deleteCSModal} setopenModal={setdeleteCSModal} type="Customer Service" />
            <div className="flex gap-2 lg:justify-start justify-center items-center mt-2 lg:mt-0 w-full">
                <p className='font-lexend text-2xl font-bold'>Customer Service</p>
                <div>
                    <div className="flex-none bg-black rounded-full text-white text-[10px] font-regular h-4 w-4 flex items-center justify-center">
                        <p>{CSData.length}</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 p-4 bg-white rounded-md">
                <div className="flex sm:flex-row flex-col gap-2 justify-between">
                    <div className="basis-1/2">
                        <input type="text" className="text-xs rounded-md w-full max-w-md border border-customGray" placeholder="Cari nama / nomor"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                    {isChecked ? (
                        <Button color='danger' className='rounded-md' onClick={() => setdeleteCSModal(true)}>
                            Hapus Customer Service
                        </Button>
                    ) : (
                        <Button color='primary' onClick={() => setcreateCSModal(true)} className="rounded-md">
                            Tambah Customer Service
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
                        selectedKeys={selectedCS}
                        onSelectionChange={setselectedCS}
                    >
                        <TableHeader>
                            <TableColumn>Username</TableColumn>
                            <TableColumn>Email</TableColumn>
                            <TableColumn>Dibuat Pada</TableColumn>
                            <TableColumn>Terakhir Diupdate</TableColumn>
                            <TableColumn>Edit</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={
                            <div className='w-full bg-white p-12'>
                                <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                                    <p className='text-[16px] font-bold'>CS Masih Kosong</p>
                                    <p className='text-xs text-[#777C88]'>Lorem</p>
                                    <div className='flex'>
                                        <div onClick={() => setcreateCSModal(true)} className="bg-primary rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                            Tambah Customer Service
                                        </div>
                                    </div>
                                </div>

                            </div>} items={searchText ? searchedCSData : CSData}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    <TableCell >{item.username}</TableCell>
                                    <TableCell >{item.email}</TableCell>
                                    <TableCell >{formatDate(item.createdAt)}</TableCell>
                                    <TableCell >{formatDate(item.updatedAt)}</TableCell>
                                    <TableCell>
                                        <Button size="sm" variant="bordered" className="rounded-md" onClick={() => handleUpdateCS(item)}>
                                            Edit
                                        </Button>
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

export default CustomerServiceTable