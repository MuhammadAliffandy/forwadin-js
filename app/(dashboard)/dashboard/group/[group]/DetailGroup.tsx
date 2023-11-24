'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContactData, GroupData, MultipleCheckboxRef } from '@/utils/types';
import AddContactModal from '@/components/dashboard/group/AddContactModal';
import DeleteGroupModal from '@/components/dashboard/group/DeleteGroupModal';
import DeleteContactModal from '@/components/dashboard/group/DeleteContactModal';
import { useSession } from 'next-auth/react';
import { fetchClient } from '@/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { Button, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import ContactIcon from '@/components/dashboard/ContactIcon';
import { formatDate } from '@/utils/helper';
interface DetailGroupProps {
    groupId: string,
    groupName: string,
    setcountContact: Dispatch<SetStateAction<number>>,
    setgroupName: Dispatch<SetStateAction<string>>
}
const DetailGroup = ({ groupId, groupName, setcountContact, setgroupName }: DetailGroupProps) => {
    const { data: session } = useSession()
    const { push } = useRouter()
    const [isLoaded, setisLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const mainCheckboxRef = useRef<HTMLInputElement>(null)
    const [currentGroupName, setcurrentGroupName] = useState(groupName)
    const groupCheckboxRef = useRef<MultipleCheckboxRef>({})
    const [isChecked, setisChecked] = useState(false)
    const [groupData, setgroupData] = useState<GroupData>()
    const [contactData, setcontactData] = useState<ContactData[]>([])
    const [searchText, setsearchText] = useState('')
    const [searchedContact, setsearchedContact] = useState<ContactData[]>([])
    const [addContactModal, setaddContactModal] = useState(false)
    const [deleteGroupModal, setDeleteGroupModal] = useState(false)
    const [deleteContactModal, setdeleteContactModal] = useState(false)
    const [selectedMember, setselectedMember] = useState<Set<string> | 'all'>(new Set())
    const handleCheckBoxClick = (e: React.FormEvent<HTMLInputElement>, id: string) => {
        const newcontactData = contactData.map(obj => {
            return (obj.id === id ? { ...obj, checked: e.currentTarget.checked } : obj)
        })
        setcontactData(() => newcontactData)
    }

    const handleOpenDetailModal = (params: string) => {
        push('/dashboard/contact/' + params)
    }
    const filterContact = (text: string) => {
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
    const handleDeleteMember = async () => {
        // tambah konfirmasi delete
        let deletedContact = null
        if (selectedMember === 'all') {
            deletedContact = contactData.map(item => item.id)
        }
        else if ((selectedMember as Set<string>).size > 0) {
            deletedContact = Array.from(selectedMember)
        }
        if (deletedContact) {
            const result = await fetchClient({
                url: '/groups/remove',
                body: JSON.stringify({
                    groupId: groupId,
                    contactIds: deletedContact
                }),
                method: 'DELETE',
                user: session?.user
            })
            if (result?.ok) {
                toast.success('Berhasil hapus member')
                fetchGroupData()
                setselectedMember(new Set([]))
            } else {
                toast.error('Gagal hapus member')
            }
            deletedContact = null
        }
    }
    const handleUpdateGroup = async () => {
        setIsLoading(true)
        const result = await fetchClient({
            url: '/groups/' + groupId + '/update',
            method: 'PUT',
            body: JSON.stringify({
                name: currentGroupName,
                isCampaign: false
            }),
            user: session?.user
        })
        if (result) {
            if (result.ok) {
                toast.success('Berhasil update group')
                fetchGroupData()
            } else {
                toast.error('Gagal update group')
            }
        }
        setIsLoading(false)
    }
    const fetchGroupData = async () => {
        const result = await fetchClient({
            url: '/groups/' + groupId,
            method: 'GET',
            user: session?.user
        })
        if (result) {
            const resultData: GroupData = await result.json()
            if (result.ok) {
                setgroupData(resultData)
                setcontactData(resultData.contactGroups!.map(item => item.contact))
                console.log(resultData.contactGroups)
                setgroupName(resultData.name)
                setcurrentGroupName(resultData.name)
                setcountContact(resultData.contactGroups?.length!)
                setisLoaded(true)
            } else {
                toast.error('Gagal fetch data')
            }
        }
    }


    useEffect(() => {
        const searchResult = filterContact(searchText)
        setsearchedContact(searchResult)
    }, [searchText])
    useEffect(() => {
        if (session?.user?.token)
            fetchGroupData()
    }, [session?.user?.token])
    useEffect(() => {
        if ((selectedMember as Set<string>).size > 0 || selectedMember === 'all') {
            setisChecked(true)
        } else {
            setisChecked(false)
        }
    }, [selectedMember])
    return (
        <>
            {isLoaded &&
                <AddContactModal openModal={addContactModal} setopenModal={setaddContactModal} fetchGroupData={fetchGroupData} groupId={groupId} activeContactData={contactData} />
            }
            <DeleteGroupModal openModal={deleteGroupModal} setopenModal={setDeleteGroupModal} group={groupId} />
            {selectedMember && (
                <DeleteContactModal
                    openModal={deleteContactModal}
                    setopenModal={setdeleteContactModal}
                    deleteFunction={handleDeleteMember}
                    selectedKeys={selectedMember}

                />
            )}
            <div className="mt-4 p-4 bg-white rounded-md">
                <div className='flex sm:flex-row flex-col gap-2 items-center justify-between'>
                    <div className="w-full max-w-sm">
                        <input type="text" className="text-xs rounded-md w-full border border-customGray" placeholder="Nama Group"
                            value={currentGroupName}
                            onChange={e => setcurrentGroupName(e.currentTarget.value)}
                        />
                    </div>
                    <div className='flex lg:flex-row flex-col lg:justify-end justify-between gap-2 w-full max-w-sm'>
                        <Button variant='bordered' onClick={() => setDeleteGroupModal(true)} className="rounded-md px-4">
                            Hapus Group
                        </Button>
                        <Button color='primary' onClick={handleUpdateGroup} isLoading={isLoading} className='rounded-md px-6 disabled:opacity-50' disabled={(groupData?.name === currentGroupName)}>
                            Simpan
                        </Button>


                    </div>
                </div>
                <div className="flex sm:flex-row flex-col gap-2 items-center justify-between mt-2">
                    <div className="w-full max-w-sm">
                        <input type="text" className="text-xs rounded-md w-full border border-customGray" placeholder="Cari nama / nomor / label / email"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className='flex lg:flex-row flex-col lg:justify-end justify-between gap-2 w-full max-w-sm'>
                        {isChecked ? (
                            <Button color='danger' onClick={() => setdeleteContactModal(true)} className="rounded-md px-4">
                                Hapus Kontak
                            </Button>) : (
                            <Button color='primary' onClick={() => setaddContactModal(true)} className="rounded-md">
                                Tambah Anggota
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
                        selectedKeys={selectedMember as any}
                        onSelectionChange={setselectedMember as any}
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
                                    <p className='text-[16px] font-bold'>Member grup masih kosong</p>
                                    <p className='text-xs text-[#777C88]'>Tambahkan kontak ke dalam grup anda.</p>
                                    <div className='flex'>
                                        <div onClick={() => setaddContactModal(true)} className="bg-primary rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                            Tambah Member
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
                                        {formatDate(item.createdAt)}
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

export default DetailGroup