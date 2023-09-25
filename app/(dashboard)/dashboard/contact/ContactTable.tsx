'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContactData } from '@/utils/types';

const ContactTable = () => {
    const { push } = useRouter()
    const mainCheckboxRef = useRef<HTMLInputElement>(null)
    const contactRef = useRef<MultipleCheckboxRef>({})
    const [isChecked, setisChecked] = useState(false)
    const [contactData, setcontactData] = useState<ContactData[]>([
        {
            id: 1,
            phone: "6281357995175",
            firstName: 'Ihsanul',
            lastName: 'Afkar',
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
            id: 2,
            phone: "6281357995175",
            firstName: 'Ihsanul',
            lastName: 'Afkar',
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
            id: 3,
            phone: "6281357995175",
            firstName: 'Ihsanul',
            lastName: 'Afkar',
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
    const [deviceModal, setdeviceModal] = useState(false)
    const handleCheckBoxClick = (e: React.FormEvent<HTMLInputElement>, id: number) => {
        const newcontactData = contactData.map(obj => {
            return (obj.id === id ? { ...obj, checked: e.currentTarget.checked } : obj)
        })
        setcontactData(() => newcontactData)
    }

    const handleIndexCheckbox = (e: React.MouseEvent) => {
        const currentcontactData = (searchText ? searchedContact : contactData)
        if (mainCheckboxRef.current && !mainCheckboxRef.current.checked) {
            const newArray = currentcontactData.map((obj, idx) => {
                contactRef.current[`checkbox_${obj.id}`].checked = false
                return { ...obj, checked: false }
            })
            if (searchText)
                setsearchedContact(newArray)
            else
                setcontactData(() => newArray)
        } else {
            const newArray = currentcontactData.map((obj, idx) => {
                contactRef.current[`checkbox_${obj.id}`].checked = true
                return { ...obj, checked: true }
            })
            if (searchText)
                setsearchedContact(() => newArray)
            else
                setcontactData(() => newArray)
        }
    }
    const handleOpenDetailModal = (params: string) => {
        push('/dashboard/device/' + params)
    }
    const filterDevice = (text: string) => {
        const regex = new RegExp(text, 'i')
        return contactData.filter(item => {
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
                            <></>
                        ) : (<></>
                        )}
                    </tbody>
                </table>
            </div >
        </>
    )
}

export default ContactTable