'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BroadcastData, MultipleCheckboxRef } from '@/utils/types';
import BroadcastList from './BroadcastList';
const BroadcastTable = () => {
    const { push } = useRouter()
    const mainCheckboxRef = useRef<HTMLInputElement>(null)
    const messageCheckboxRef = useRef<MultipleCheckboxRef>({})
    const [isChecked, setisChecked] = useState(false)
    const [messageData, setmessageData] = useState<BroadcastData[]>([
        {
            id: '1',
            name: 'broadcast-1',
            status: 'Ongoing',
            sent: 12,
            received: 12,
            read: 12,
            reply: 12,
            device: {
                pkId: 1,
                id: 'ftuygibnilkm;123',
                name: 'DXB12',
                phone: '0845678902',
                apiKey: 'bad-0u210n13',
                serverId: 1,
                status: 'CONNECTED',
                created_at: '11.9.2023, 2:43 PM',
                updated_at: '11.9.2023, 2:43 PM',
                userId: 23,
                DeviceLabel: [],
            },
            created_at: '11.9.2023, 2:43 PM',
            updated_at: '11.9.2023, 2:43 PM',
            checked: false
        },
    ])
    const [searchText, setsearchText] = useState('')
    const [searchedData, setsearchedData] = useState<BroadcastData[]>([])
    const handleCheckBoxClick = (e: React.FormEvent<HTMLInputElement>, id: string) => {
        const newmessageData = messageData.map(obj => {
            return (obj.id === id ? { ...obj, checked: e.currentTarget.checked } : obj)
        })
        setmessageData(() => newmessageData)
    }

    const handleIndexCheckbox = (e: React.MouseEvent) => {
        const currentmessageData = (searchText ? searchedData : messageData)
        if (mainCheckboxRef.current && !mainCheckboxRef.current.checked) {
            const newArray = currentmessageData.map((obj, idx) => {
                messageCheckboxRef.current[`checkbox_${obj.id}`].checked = false
                return { ...obj, checked: false }
            })
            if (searchText)
                setsearchedData(newArray)
            else
                setmessageData(() => newArray)
        } else {
            const newArray = currentmessageData.map((obj, idx) => {
                messageCheckboxRef.current[`checkbox_${obj.id}`].checked = true
                return { ...obj, checked: true }
            })
            if (searchText)
                setsearchedData(() => newArray)
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
            if (regex.test(item.name))
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
            const checkObject = searchedData.find(obj => obj.checked === true)
            if (checkObject) {
                mainCheckboxRef.current.checked = true
                setisChecked(true)
            }
            else {
                mainCheckboxRef.current.checked = false
                setisChecked(false)
            }
        }
    }, [searchedData])

    useEffect(() => {
        const searchResult = filterMessage(searchText)
        setsearchedData(searchResult)
    }, [searchText])

    return (
        <>
            {/* <AddContactModal openModal={addContactModal} setopenModal={setaddContactModal} /> */}
            <div className="mt-8 p-4 bg-white rounded-md">
                <div className="flex sm:flex-row flex-col gap-2 justify-between">
                    <div className="basis-1/2">
                        <input type="text" className="text-xs rounded-md w-full max-w-md border border-customGray" placeholder="Cari nama / nomor / label"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className='flex lg:justify-end justify-between gap-2 w-full max-w-xs'>
                        {isChecked ? (
                            <div onClick={handleDeleteMessage} className="bg-danger rounded-md w-full lg:w-auto px-8 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                Hapus
                            </div>
                        ) : (
                            <div onClick={() => push('/dashboard/broadcast/new')} className="bg-primary rounded-md w-full lg:w-auto px-8 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                Buat Broadcast Baru
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
                            <th className='p-4'>Status</th>
                            <th className='p-4'>Terkirim</th>
                            <th className='p-4'>Diterima</th>
                            <th className='p-4'>Terbaca</th>
                            <th className='p-4'>Balasan</th>
                            <th className='p-4 '>Device</th>
                            <th className='p-4 '>Tanggal Kirim</th>
                            <th className='p-4 whitespace-pre'>Terakhir diupdate</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white'>
                        {searchText ? (
                            <BroadcastList
                                broadcastData={searchedData}
                                multipleCheckboxRef={messageCheckboxRef}
                                handleCheckBoxClick={handleCheckBoxClick}
                                handleOpenDetailModal={handleOpenDetailModal}
                            />
                        ) : (
                            <BroadcastList
                                broadcastData={messageData}
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

export default BroadcastTable