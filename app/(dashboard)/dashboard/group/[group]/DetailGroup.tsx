'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContactData, GroupData, MultipleCheckboxRef } from '@/utils/types';
import ContactList from '../../contact/ContactList';
import AddContactModal from '@/components/dashboard/group/AddContactModal';
import DeleteGroupModal from '@/components/dashboard/group/DeleteGroupModal';
import DeleteContactModal from '@/components/dashboard/group/DeleteContactModal';
import { useSession } from 'next-auth/react';
import { fetchClient } from '@/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { Button, Skeleton } from '@nextui-org/react';
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
    const handleCheckBoxClick = (e: React.FormEvent<HTMLInputElement>, id: string) => {
        const newcontactData = contactData.map(obj => {
            return (obj.id === id ? { ...obj, checked: e.currentTarget.checked } : obj)
        })
        setcontactData(() => newcontactData)
    }

    const handleIndexCheckbox = (e: React.MouseEvent) => {
        const currentcontactData = (searchText ? searchedContact : contactData)
        if (mainCheckboxRef.current && !mainCheckboxRef.current.checked) {
            const newArray = currentcontactData.map((obj, idx) => {
                groupCheckboxRef.current[`checkbox_${obj.id}`].checked = false
                return { ...obj, checked: false }
            })
            if (searchText)
                setsearchedContact(newArray)
            else
                setcontactData(() => newArray)
        } else {
            const newArray = currentcontactData.map((obj, idx) => {
                groupCheckboxRef.current[`checkbox_${obj.id}`].checked = true
                return { ...obj, checked: true }
            })
            if (searchText)
                setsearchedContact(() => newArray)
            else
                setcontactData(() => newArray)
        }
    }
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
    const handleDeleteGroup = () => {
        // TODO
        const checkedGroups = contactData.filter(item => item.checked === false).map(item => item)
        setcontactData(checkedGroups)
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
            const resultData = await result.json()
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
                setgroupName(resultData.name)
                setcountContact(resultData.contactGroups?.length!)
                setisLoaded(true)
            } else {
                toast.error('Gagal fetch data')
            }
        }
    }

    useEffect(() => {
        if (mainCheckboxRef.current) {
            const checkObject = contactData.find(obj => obj.checked === true)
            if (checkObject) {
                mainCheckboxRef.current.checked = true
                setisChecked(true)
            }
            else {
                mainCheckboxRef.current.checked = false
                setisChecked(false)
            }
        }
    }, [contactData])
    useEffect(() => {
        if (mainCheckboxRef.current) {
            const checkObject = searchedContact.find(obj => obj.checked === true)
            if (checkObject) {
                mainCheckboxRef.current.checked = true
                setisChecked(true)
            }
            else {
                mainCheckboxRef.current.checked = false
                setisChecked(false)
            }
        }
    }, [searchedContact])

    useEffect(() => {
        const searchResult = filterDevice(searchText)
        setsearchedContact(searchResult)
    }, [searchText])
    useEffect(() => {
        fetchGroupData()
    }, [session?.user?.token])
    return (
        <>
            {isLoaded &&
                <AddContactModal openModal={addContactModal} setopenModal={setaddContactModal} fetchGroupData={fetchGroupData} groupId={groupId} activeContactData={contactData} />
            }
            <DeleteGroupModal openModal={deleteGroupModal} setopenModal={setDeleteGroupModal} group={groupId} />
            {session?.user && (
                <DeleteContactModal
                    groupId={groupId}
                    user={session.user}
                    openModal={deleteContactModal}
                    setopenModal={setdeleteContactModal}
                    contacts={contactData.filter(contact => contact.checked)}
                    refresh={fetchGroupData} />
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
                        <div onClick={() => setDeleteGroupModal(true)} className="bg-white rounded-md px-6 border border-customGray text-center items-center flex hover:cursor-pointer justify-center p-2">
                            Hapus Group
                        </div>
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
                            <div onClick={() => setdeleteContactModal(true)} className="bg-danger rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                Hapus Kontak
                            </div>) : (
                            <div onClick={() => setaddContactModal(true)} className="bg-primary rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                Tambah Anggota
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isLoaded ? (

                <div className='overflow-x-scroll allowed-scroll'>
                    <table className="w-full text-center font-nunito text-xs font-bold ">
                        <thead className='bg-neutral-75'>
                            <tr className=''>
                                <th className='py-4 checkbox'>
                                    <input ref={mainCheckboxRef} type="checkbox" name="main_checkbox" id="main_checkbox" className='rounded-sm focus:ring-transparent' onClick={handleIndexCheckbox} />
                                </th>
                                <th className='p-4'>Nama</th>
                                <th className='p-4 whitespace-pre'>Nomor HP</th>
                                <th className='p-4'>Label Kategori</th>
                                <th className='p-4'>Email</th>
                                <th className='p-4'>Dibuat pada</th>
                                <th className='p-4'>Detail</    th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {searchText ? (
                                <ContactList
                                    contactData={searchedContact}
                                    multipleCheckboxRef={groupCheckboxRef}
                                    handleCheckBoxClick={handleCheckBoxClick}
                                    handleOpenDetailModal={handleOpenDetailModal}
                                />
                            ) : (
                                <ContactList
                                    contactData={contactData}
                                    multipleCheckboxRef={groupCheckboxRef}
                                    handleCheckBoxClick={handleCheckBoxClick}
                                    handleOpenDetailModal={handleOpenDetailModal}
                                />

                            )}
                        </tbody>
                    </table>

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

export default DetailGroup