'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IncomingMessage, MultipleCheckboxRef } from '@/utils/types';
import IncomingList from './IncomingList';
import AddContactModal from '@/components/dashboard/contact/AddContactModal';

const IncomingTable = () => {
    const { push } = useRouter()
    const mainCheckboxRef = useRef<HTMLInputElement>(null)
    const messageCheckboxRef = useRef<MultipleCheckboxRef>({})
    const [isChecked, setisChecked] = useState(false)
    const [messageData, setmessageData] = useState<IncomingMessage[]>([
        {
            id: '1',
            from: '6281678923',
            message: "Join us this month for a celebration of",
            contact: {
                id: '1',
                phone: "6281357995175",
                firstName: 'Ihsanul',
                lastName: 'Afkar',
                initial: 'IA',
                colorCode: '4FBEAB',
                gender: "Laki-laki",
                email: 'ihsanulafkar@gmail.com',
                honorific: 'Mr',
                country: 'Indonesia',
                dob: '10/10/2010',
                ContactLabel: [],
                createdAt: '11.9.2023, 2:43 PM',
                updatedAt: '11.9.2023, 2:43 PM'
            },
            received_at: "10/09/2023 13:35:00",
            type: 'broadcast',
            created_at: "10/09/2023 13:35:00",
            updated_at: "10/09/2023 13:35:00",
            checked: false
        },
    ])
    const [searchText, setsearchText] = useState('')
    const [searchedMessage, setsearchedMessage] = useState<IncomingMessage[]>([])
    const handleCheckBoxClick = (e: React.FormEvent<HTMLInputElement>, id: string) => {
        const newmessageData = messageData.map(obj => {
            return (obj.id === id ? { ...obj, checked: e.currentTarget.checked } : obj)
        })
        setmessageData(() => newmessageData)
    }

    const handleIndexCheckbox = (e: React.MouseEvent) => {
        const currentmessageData = (searchText ? searchedMessage : messageData)
        if (mainCheckboxRef.current && !mainCheckboxRef.current.checked) {
            const newArray = currentmessageData.map((obj, idx) => {
                messageCheckboxRef.current[`checkbox_${obj.id}`].checked = false
                return { ...obj, checked: false }
            })
            if (searchText)
                setsearchedMessage(newArray)
            else
                setmessageData(() => newArray)
        } else {
            const newArray = currentmessageData.map((obj, idx) => {
                messageCheckboxRef.current[`checkbox_${obj.id}`].checked = true
                return { ...obj, checked: true }
            })
            if (searchText)
                setsearchedMessage(() => newArray)
            else
                setmessageData(() => newArray)
        }
    }
    const handleOpenDetailModal = (params: string) => {
        push('/dashboard/contact/' + params)
    }
    const filterMessage = (text: string) => {
        const regex = new RegExp(text, 'i')
        return messageData.filter(item => {
            if (regex.test(item.from))
                return item
        })
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsearchText(e.target.value)
    }
    const handleDeleteMessage = () => {
        // TODO
        const checkedContacts = messageData.filter(item => item.checked === false).map(item => item)
        setmessageData(checkedContacts)
    }
    useEffect(() => {
        if (mainCheckboxRef.current) {
            const checkObject = messageData.find(obj => obj.checked === true)
            if (checkObject) {
                mainCheckboxRef.current.checked = true
                setisChecked(true)
            }
            else {
                mainCheckboxRef.current.checked = false
                setisChecked(false)
            }
        }
    }, [messageData])
    useEffect(() => {
        if (mainCheckboxRef.current) {
            const checkObject = searchedMessage.find(obj => obj.checked === true)
            if (checkObject) {
                mainCheckboxRef.current.checked = true
                setisChecked(true)
            }
            else {
                mainCheckboxRef.current.checked = false
                setisChecked(false)
            }
        }
    }, [searchedMessage])

    useEffect(() => {
        const searchResult = filterMessage(searchText)
        setsearchedMessage(searchResult)
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
                    <div className='flex lg:justify-end justify-between gap-2 w-full max-w-xs'>
                        {isChecked && (
                            <div onClick={handleDeleteMessage} className="bg-danger rounded-md w-full lg:w-auto px-8 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                Hapus
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
                            <th className='p-4 whitespace-pre'>Nomor HP</th>
                            <th className='p-4'>Nama</th>
                            <th className='p-4'>Tipe</th>
                            <th className='p-4 whitespace-pre'>Diterima Pada</th>
                            <th className='p-4'>Detail</    th>
                        </tr>
                    </thead>
                    <tbody className='bg-white'>
                        {searchText ? (
                            <IncomingList
                                incomingData={searchedMessage}
                                multipleCheckboxRef={messageCheckboxRef}
                                handleCheckBoxClick={handleCheckBoxClick}
                                handleOpenDetailModal={handleOpenDetailModal}
                            />
                        ) : (
                            <IncomingList
                                incomingData={messageData}
                                multipleCheckboxRef={messageCheckboxRef}
                                handleCheckBoxClick={handleCheckBoxClick}
                                handleOpenDetailModal={handleOpenDetailModal}
                            />

                        )}
                    </tbody>
                </table>
                {messageData.length === 0 && (
                    <div className='w-full bg-white p-12'>
                        <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                            <p className='text-[16px] font-bold'>Kontak masih kosong</p>
                            <p className='text-xs text-[#777C88]'>Tambahkan nomor ke dalam kontak anda.</p>
                            <p className='text-xs'>Dengan kontak ini, Anda dapat dengan mudah berkomunikasi dengan kontak yang anda simpan</p>
                            <div className='flex'>
                                <div onClick={() => { }} className="bg-primary rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                    Tambah Chat
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </>
    )
}

export default IncomingTable