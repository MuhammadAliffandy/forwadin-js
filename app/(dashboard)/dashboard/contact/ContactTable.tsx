'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContactData } from '@/utils/types'
import dynamic from 'next/dynamic';
const AddContactModal = dynamic(() => import('@/components/dashboard/contact/AddContactModal'), { ssr: false, })
import { fetchClient } from '@/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { formatDate, getInitials } from '@/utils/helper';
import DeleteContactModal from '@/components/dashboard/contact/DeleteContactModal';
import { useSession } from 'next-auth/react';
import { Button, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import ContactIcon from '@/components/dashboard/ContactIcon';
import ImportContactModal from '@/components/dashboard/contact/ImportContactModal';
import SyncModal from '@/components/dashboard/contact/SyncModal';
import { User } from 'next-auth';
import DeleteModal from '@/components/dashboard/device/DeleteModal';
const ContactTable = ({ setcontactCount, currentDevice, user }: {
    setcontactCount: Dispatch<SetStateAction<number>>,
    currentDevice: {
        name: string,
        phone?: string,
        id: string,
    },
    user: User | undefined
}) => {
    const { push } = useRouter()
    const [isLoaded, setisLoaded] = useState(false)
    const [isChecked, setisChecked] = useState(false)
    const [contactData, setcontactData] = useState<ContactData[]>([
    ])
    const [selectedKeys, setSelectedKeys] = useState<Set<string> | 'all'>(new Set())
    const [searchText, setsearchText] = useState('')
    const [searchedContact, setsearchedContact] = useState<ContactData[]>([])
    const [addContactModal, setaddContactModal] = useState(false)
    const [deleteContactModal, setdeleteContactModal] = useState(false)
    const [importContactModal, setimportContactModal] = useState(false)
    const [syncModal, setsyncModal] = useState(false)
    const handleOpenDetailModal = (params: string) => {
        push('/dashboard/contact/' + params)
    }
    const filterContact = (text: string) => {
        const regex = new RegExp(text, 'i')
        return contactData.filter(item => {
            if (regex.test(item.firstName + ' ' + (item.lastName || '')) || regex.test(item.lastName) || regex.test(item.phone) || regex.test(item.email))
                return item
            const findLabel = item.ContactLabel?.find(item => regex.test(item.label.name))
            if (findLabel)
                return item
        })
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsearchText(e.target.value)
    }

    const fetchData = async () => {
        setisLoaded(false)
        let url
        if (currentDevice.id === '*')
            url = '/contacts'
        else
            url = '/contacts?deviceId=' + currentDevice.id
        console.log(url)
        const fetchContactData = await fetchClient({
            method: 'GET',
            url: url,
            user: user
        })
        if (fetchContactData) {
            const data: ContactData[] = await fetchContactData.json()
            if (fetchContactData.status === 200) {
                // console.log(data)
                const newContactData = data.map(obj => {
                    obj.createdAt = formatDate(obj.createdAt)
                    obj.updatedAt = formatDate(obj.updatedAt)
                    obj.initial = getInitials(obj.firstName + ' ' + obj.lastName)
                    return obj
                })
                console.log(data)
                setcontactCount(newContactData.length)
                setcontactData(data)
                setisLoaded(true)
            } else {
                console.log(data)
                toast.error('gagal mendapatkan data')
            }
        }
    }
    const handleDeleteContact = async () => {
        // tambah konfirmasi delete
        let deletedContact = null
        if (selectedKeys === 'all') {
            deletedContact = contactData.map(item => item.id)
        }
        else if ((selectedKeys as Set<string>).size > 0) {
            deletedContact = Array.from(selectedKeys)
        }
        if (deletedContact) {
            const result = await fetchClient({
                url: '/contacts/',
                body: JSON.stringify({ contactIds: deletedContact }),
                method: 'DELETE',
                user: user
            })
            if (result?.ok) {
                toast.success('Berhasil hapus contact')
                fetchData()
                setSelectedKeys(new Set([]))
            } else {
                toast.error('Gagal hapus contact')
            }
            deletedContact = null
        }
    }
    useEffect(() => {
        if (user?.token)
            fetchData()
    }, [user?.token, currentDevice])

    useEffect(() => {
        const searchResult = filterContact(searchText)
        setsearchedContact(searchResult)
    }, [searchText])
    useEffect(() => {
        if ((selectedKeys as Set<string>).size > 0 || selectedKeys === 'all') {
            setisChecked(true)
        } else {
            setisChecked(false)
        }
    }, [selectedKeys])
    return (
        <>
            {user?.googleToken && (
                <SyncModal setopenModal={setsyncModal} openModal={syncModal} user={user} refresh={fetchData} />
            )}
            <ImportContactModal openModal={importContactModal} setopenModal={setimportContactModal} user={user} refresh={fetchData} />
            <DeleteModal openModal={deleteContactModal} setopenModal={setdeleteContactModal} count={(selectedKeys === 'all' ? 'semua' : (selectedKeys as Set<string>).size) as string} deleteFunction={handleDeleteContact} type='Kontak' />
            <AddContactModal openModal={addContactModal} setopenModal={setaddContactModal} fetchData={fetchData} />
            <div className="mt-8 p-4 bg-white rounded-md">
                <div className="flex sm:flex-row flex-col gap-2 justify-between">
                    <div className="basis-1/2">
                        <input type="text" className="text-xs rounded-md w-full max-w-md border border-customGray" placeholder="Cari nama / nomor / label / email"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className='flex lg:flex-row flex-col lg:justify-end justify-between gap-2 w-full max-w-sm'>
                        <Button variant='bordered' onClick={() => setsyncModal(true)} className='rounded-md' fullWidth isDisabled={user?.googleToken ? false : true}>
                            Sync
                        </Button>
                        <Button variant='bordered' onClick={() => setimportContactModal(true)} className='rounded-md' fullWidth>
                            Import Kontak
                        </Button>
                        {isChecked ? (
                            <div onClick={() => setdeleteContactModal(true)} className="bg-danger rounded-md px-6 text-white text-center w-full items-center flex hover:cursor-pointer justify-center p-2">
                                Hapus
                            </div>
                        ) : (
                            <Button color='primary' fullWidth onClick={() => setaddContactModal(true)} className="rounded-md">
                                Tambah Kontak
                            </Button>
                        )}
                    </div>
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
                        selectedKeys={selectedKeys as any}
                        onSelectionChange={setSelectedKeys as any}
                    >
                        <TableHeader>
                            <TableColumn>Nama</TableColumn>
                            <TableColumn>Nomor HP</TableColumn>
                            <TableColumn>Label Kategori</TableColumn>
                            <TableColumn>Email</TableColumn>
                            <TableColumn>Dibuat pada</TableColumn>
                            <TableColumn>Detail</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={
                            <div className='w-full bg-white p-12'>
                                <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                                    <p className='text-[16px] font-bold'>Kontak masih kosong</p>
                                    <p className='text-xs text-[#777C88]'>Tambahkan nomor ke dalam kontak anda.</p>
                                    <p className='text-xs'>Dengan kontak ini, Anda dapat dengan mudah berkomunikasi dengan kontak yang anda simpan</p>
                                    <div className='flex'>
                                        <div onClick={() => setaddContactModal(true)} className="bg-primary rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                            Tambah Kontak
                                        </div>
                                    </div>
                                </div>
                            </div>

                        } items={searchText ? searchedContact : contactData}>
                            {(item: ContactData) => (
                                <TableRow key={item.id}>
                                    <TableCell className='flex gap-2 items-center'>
                                        <ContactIcon phone={item.phone} contact={item} />
                                    </TableCell>
                                    <TableCell >{item.phone}</TableCell>
                                    <TableCell className='flex flex-wrap justify-center lg:justify-start items-center gap-2'>  {item.ContactLabel?.map((item, idx) => (
                                        <div key={idx} className='border-2 border-primary px-2 py-1 rounded-full'>
                                            {item.label.name}
                                        </div>
                                    ))}</TableCell>
                                    <TableCell >{item.email}</TableCell>
                                    <TableCell >
                                        {item.createdAt}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <div className='py-1 px-4 text-center border border-black/20 rounded-md hover:cursor-pointer' onClick={() => handleOpenDetailModal(item.id)}>Detail</div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div >

            ) : (
                <>
                    <div className='mt-4 flex flex-col gap-2 p-4 bg-white'>

                        <Skeleton className={'w-full h-3 rounded-full'} />
                        <Skeleton className={'w-full h-3 rounded-full'} />
                        <Skeleton className={'w-full h-3 rounded-full'} />
                    </div>
                </>
            )}
        </>
    )
}

export default ContactTable