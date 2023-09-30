'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContactData, MultipleCheckboxRef } from '@/utils/types';
import ContactList from './ContactList';
import AddContactModal from '@/components/dashboard/contact/AddContactModal';

const ContactTable = () => {
    const { push } = useRouter()
    const mainCheckboxRef = useRef<HTMLInputElement>(null)
    const contactCheckboxRef = useRef<MultipleCheckboxRef>({})
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
                contactCheckboxRef.current[`checkbox_${obj.id}`].checked = false
                return { ...obj, checked: false }
            })
            if (searchText)
                setsearchedContact(newArray)
            else
                setcontactData(() => newArray)
        } else {
            const newArray = currentcontactData.map((obj, idx) => {
                contactCheckboxRef.current[`checkbox_${obj.id}`].checked = true
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
    const handleDeleteContact = () => {
        // TODO
        const checkedContacts = contactData.filter(item => item.checked === false).map(item => item)
        setcontactData(checkedContacts)
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
            <div className="mt-8 p-4 bg-white rounded-md">
                <div className="flex sm:flex-row flex-col gap-2 justify-between">
                    <div className="basis-1/2">
                        <input type="text" className="text-xs rounded-md w-full max-w-md border border-customGray" placeholder="Cari nama / nomor / label"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className='flex lg:flex-row flex-col lg:justify-end justify-between gap-2 w-full max-w-sm'>
                        <div className='bg-white rounded-md px-6 text-center items-center border border-[#B0B4C5] flex hover:cursor-pointer w-full justify-center p-2'>
                            Import Kontak
                        </div>
                        {isChecked ? (
                            <div onClick={handleDeleteContact} className="bg-danger rounded-md px-6 text-white text-center w-full items-center flex hover:cursor-pointer justify-center p-2">
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
                                multipleCheckboxRef={contactCheckboxRef}
                                handleCheckBoxClick={handleCheckBoxClick}
                                handleOpenDetailModal={handleOpenDetailModal}
                            />
                        ) : (
                            <ContactList
                                contactData={contactData}
                                multipleCheckboxRef={contactCheckboxRef}
                                handleCheckBoxClick={handleCheckBoxClick}
                                handleOpenDetailModal={handleOpenDetailModal}
                            />

                        )}
                    </tbody>
                </table>
                {contactData.length === 0 && (
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
                )}
            </div >
        </>
    )
}

export default ContactTable