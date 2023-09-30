'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContactData, MultipleCheckboxRef } from '@/utils/types';
import ContactList from '../../contact/ContactList';
import AddContactModal from '@/components/dashboard/group/AddContactModal';
import DeleteGroupModal from '@/components/dashboard/group/DeleteGroupModal';
import DeleteContactModal from '@/components/dashboard/group/DeleteContactModal';

const DetailGroup = ({ params }: { params: any }) => {
    const { push } = useRouter()
    const [groupName, setgroupName] = useState(params.group)
    const mainCheckboxRef = useRef<HTMLInputElement>(null)
    const groupCheckboxRef = useRef<MultipleCheckboxRef>({})
    const [isChecked, setisChecked] = useState(false)
    const [contactData, setcontactData] = useState<ContactData[]>([
        {
            id: '1',
            phone: "6281357995175",
            firstName: 'Ihsanul',
            lastName: 'Afkar',
            initial: 'IA',
            profileColor: '4FBEAB',
            gender: "Laki-laki",
            email: 'ihsanulafkar@gmail.com',
            honorific: 'Mr',
            country: 'Indonesia',
            birthDate: '10/10/2010',
            label: ['Personal', 'Realme', 'Aktif'],
            checked: false,
            created_at: '11.9.2023, 2:43 PM'
        },
        {
            id: '2',
            phone: "6281357995175",
            firstName: 'Ihsanul',
            lastName: 'Afkar',
            initial: 'IA',
            profileColor: '4FBEAB',
            gender: "Laki-laki",
            email: 'ihsanulafkar@gmail.com',
            honorific: 'Mr',
            country: 'Indonesia',
            birthDate: '10/10/2010',
            label: ['Personal', 'Realme', 'Aktif'],
            checked: false,
            created_at: '11.9.2023, 2:43 PM'
        },
        {
            id: '3',
            phone: "6281357995175",
            firstName: 'Ihsanul',
            lastName: 'Afkar',
            initial: 'IA',
            profileColor: '4FBEAB',
            gender: "Laki-laki",
            email: 'ihsanulafkar@gmail.com',
            honorific: 'Mr',
            country: 'Indonesia',
            birthDate: '10/10/2010',
            label: ['Personal', 'Realme', 'Aktif'],
            checked: false,
            created_at: '11.9.2023, 2:43 PM'
        },
    ])
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
            if (regex.test(item.firstName) || regex.test(item.lastName) || regex.test(item.phone))
                return item
            const findLabel = item.label.find(label => regex.test(label))
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
    const handleAddContact = () => {

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

    return (
        <>
            <AddContactModal openModal={addContactModal} setopenModal={setaddContactModal} />
            <DeleteGroupModal openModal={deleteGroupModal} setopenModal={setDeleteGroupModal} group={params.group} />
            <DeleteContactModal openModal={deleteContactModal} setopenModal={setdeleteContactModal} contacts={contactData.filter(contact => contact.checked)} />
            <div className="mt-4 p-4 bg-white rounded-md">
                <div className='flex sm:flex-row flex-col gap-2 items-center justify-between'>
                    <div className="w-full max-w-sm">
                        <input type="text" className="text-xs rounded-md w-full border border-customGray" placeholder="Nama Group"
                            value={groupName}
                            onChange={e => setgroupName(e.currentTarget.value)}
                        />
                    </div>
                    <div className='flex lg:flex-row flex-col lg:justify-end justify-between gap-2 w-full max-w-sm'>
                        <div onClick={() => setDeleteGroupModal(true)} className="bg-white rounded-md px-6 border border-customGray text-center items-center flex hover:cursor-pointer justify-center p-2">
                            Hapus Group
                        </div>
                        <button onClick={() => { }} className="bg-primary rounded-md px-6 text-white text-center items-center flex justify-center p-2 disabled:opacity-50" disabled={(params.group === groupName)}>
                            Simpan
                        </button>

                    </div>
                </div>
                <div className="flex sm:flex-row flex-col gap-2 items-center justify-between mt-2">
                    <div className="w-full max-w-sm">
                        <input type="text" className="text-xs rounded-md w-full border border-customGray" placeholder="Cari nama / nomor / label"
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
        </>
    )
}

export default DetailGroup