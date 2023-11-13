'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContactData, MultipleCheckboxRef } from '@/utils/types';
import ContactList from './ContactList';
import dynamic from 'next/dynamic';
const AddContactModal = dynamic(() => import('@/components/dashboard/contact/AddContactModal'), { ssr: false, })
import { fetchClient } from '@/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { formatDate, getInitials } from '@/utils/helper';
import DeleteContactModal from '@/components/dashboard/contact/DeleteContactModal';
import { useSession } from 'next-auth/react';
import { Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import ContactIcon from '@/components/dashboard/ContactIcon';
const ContactTable = ({ setcontactCount }: { setcontactCount: Dispatch<SetStateAction<number>> }) => {
    const { push } = useRouter()
    const { data: session } = useSession()
    const [isLoaded, setisLoaded] = useState(false)
    const [isChecked, setisChecked] = useState(false)
    const [contactData, setcontactData] = useState<ContactData[]>([
    ])
    const [selectedKeys, setSelectedKeys] = useState(new Set())
    const [searchText, setsearchText] = useState('')
    const [searchedContact, setsearchedContact] = useState<ContactData[]>([])
    const [addContactModal, setaddContactModal] = useState(false)
    const [deleteContactModal, setdeleteContactModal] = useState(false)

    const handleOpenDetailModal = (params: string) => {
        push('/dashboard/contact/' + params)
    }
    const filterDevice = (text: string) => {
        const regex = new RegExp(text, 'i')
        return contactData.filter(item => {
            if (regex.test(item.firstName) || regex.test(item.lastName) || regex.test(item.phone) || regex.test(item.email))
                return item
            const findLabel = item.ContactLabel?.find(item => regex.test(item.label.name))
            if (findLabel)
                return item
        })
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsearchText(e.target.value)
    }
    const handleDeleteContact = async () => {
        const checkedContacts = contactData.filter(item => item.checked === true).map(item => item.id)
        const result = await fetchClient({
            method: 'DELETE',
            url: '/contacts',
            body: JSON.stringify({ contactIds: checkedContacts }),
            user: session?.user
        })
        if (result) {
            if (result.status === 200) {
                toast.success('Berhasil menghapus kontak')
                setisLoaded(false)
                fetchData()
            }
            else {
                const body = await result.json()
                toast.error('Gagal menghapus kontak')
                console.log(body)
            }
        }
    }
    const fetchData = async () => {
        const fetchContactData = await fetchClient({
            method: 'GET',
            url: '/contacts',
            user: session?.user
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
    useEffect(() => {
        if (session?.user?.token)
            fetchData()
    }, [session?.user?.token])

    useEffect(() => {
        const searchResult = filterDevice(searchText)
        setsearchedContact(searchResult)
    }, [searchText])

    return (
        <>
            <DeleteContactModal openModal={deleteContactModal} setopenModal={setdeleteContactModal} count={contactData.filter(item => item.checked === true).length} deleteContact={handleDeleteContact} />
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
                        <div className='bg-white rounded-md px-6 text-center items-center border border-[#B0B4C5] flex hover:cursor-pointer w-full justify-center p-2'>
                            Import Kontak
                        </div>
                        {isChecked ? (
                            <div onClick={() => setdeleteContactModal(true)} className="bg-danger rounded-md px-6 text-white text-center w-full items-center flex hover:cursor-pointer justify-center p-2">
                                Hapus
                            </div>
                        ) : (
                            <div onClick={() => setaddContactModal(true)} className="bg-primary rounded-md px-6 text-white text-center items-center w-full flex hover:cursor-pointer justify-center p-2">
                                Tambah Kontak
                            </div>
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
                // <div className='overflow-x-scroll allowed-scroll'>
                //     <table className="w-full text-center font-nunito text-xs font-bold ">
                //         <thead className='bg-neutral-75'>
                //             <tr className=''>
                //                 <th className='py-4 checkbox'>
                //                     <input ref={mainCheckboxRef} type="checkbox" name="main_checkbox" id="main_checkbox" className='rounded-sm focus:ring-transparent' onClick={handleIndexCheckbox} />
                //                 </th>
                //                 <th className='p-4'>Nama</th>
                //                 <th className='p-4 whitespace-pre'>Nomor HP</th>
                //                 <th className='p-4'>Label Kategori</th>
                //                 <th className='p-4'>Email</th>
                //                 <th className='p-4'>Dibuat pada</th>
                //                 <th className='p-4'>Detail</    th>
                //             </tr>
                //         </thead>

                //         <tbody className='bg-white'>
                //             {searchText ? (
                //                 <ContactList
                //                     contactData={searchedContact}
                //                     multipleCheckboxRef={contactCheckboxRef}
                //                     handleCheckBoxClick={handleCheckBoxClick}
                //                     handleOpenDetailModal={handleOpenDetailModal}
                //                 />
                //             ) : (
                //                 <ContactList
                //                     contactData={contactData}
                //                     multipleCheckboxRef={contactCheckboxRef}
                //                     handleCheckBoxClick={handleCheckBoxClick}
                //                     handleOpenDetailModal={handleOpenDetailModal}
                //                 />

                //             )}
                //         </tbody>
                //     </table>
                //     {contactData.length === 0 && (
                //         <div className='w-full bg-white p-12'>
                //             <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                //                 <p className='text-[16px] font-bold'>Kontak masih kosong</p>
                //                 <p className='text-xs text-[#777C88]'>Tambahkan nomor ke dalam kontak anda.</p>
                //                 <p className='text-xs'>Dengan kontak ini, Anda dapat dengan mudah berkomunikasi dengan kontak yang anda simpan</p>
                //                 <div className='flex'>
                //                     <div onClick={() => setaddContactModal(true)} className="bg-primary rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                //                         Tambah Kontak
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //     )}
                // </div >
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