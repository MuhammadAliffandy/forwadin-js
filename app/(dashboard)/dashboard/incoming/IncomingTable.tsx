'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GetIncomingMessage, IncomingMessage, MultipleCheckboxRef } from '@/utils/types';
import IncomingList from './IncomingList';
import { Pagination, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import { fetchClient } from '@/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { formatDate, getNumberFromString } from '@/utils/helper';
import ContactIcon from '@/components/dashboard/ContactIcon';

interface IncomingMessageProps {
    settotalMessage: Dispatch<SetStateAction<number>>,
    sessionId: string,
    user: User | undefined,
    totalMessage: number
}
const IncomingTable = ({ settotalMessage, totalMessage, sessionId, user }: IncomingMessageProps) => {
    const { push } = useRouter()
    const [isLoaded, setisLoaded] = useState(false)
    const paginationBatch = 10

    const mainCheckboxRef = useRef<HTMLInputElement>(null)
    const messageCheckboxRef = useRef<MultipleCheckboxRef>({})
    const [isChecked, setisChecked] = useState(false)
    const [messageData, setmessageData] = useState<IncomingMessage[]>([])
    const [searchText, setsearchText] = useState('')
    const [searchedMessage, setsearchedMessage] = useState<IncomingMessage[]>([])
    const [currentPage, setcurrentPage] = useState(1)
    const [totalPage, settotalPage] = useState(1)
    const [hasMore, sethasMore] = useState(false)
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
    const fetchIncomingMessage = async () => {
        setisLoaded(false)
        const result = await fetchClient({
            url: `/messages/${sessionId}/incoming?page=${currentPage}&pageSize=${paginationBatch}`,
            method: 'GET',
            user: user
        })
        if (result) {
            const resultData: GetIncomingMessage = await result.json()
            if (result.ok) {
                setmessageData(resultData.data)
                settotalMessage(resultData.metadata.totalMessages)
                settotalPage(resultData.metadata.totalPages)
                setcurrentPage(resultData.metadata.currentPage)
                sethasMore(resultData.metadata.hasMore)
            } else {
                toast.error('error')
                console.log(resultData)
            }
        }
        setisLoaded(true)
    }
    useEffect(() => {
        if (user?.token && sessionId)
            fetchIncomingMessage()
    }, [user?.token, sessionId])
    useEffect(() => {
        fetchIncomingMessage()
    }, [currentPage])
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
                    // removeWrapper
                    >
                        <TableHeader>
                            <TableColumn
                            >Nomor HP</TableColumn>
                            <TableColumn
                            >Nama</TableColumn>
                            <TableColumn
                            >Diterima Pada</TableColumn>
                            <TableColumn
                            >Lihat Chat</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={<div className='w-full bg-white p-12'>
                            <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                                <p className='text-[16px] font-bold'>Pesan masuk masih kosong</p>
                                <p className='text-xs text-[#777C88]'>Pesan yang dikirimkan kepada anda akan masuk di sini</p>
                            </div>
                        </div>} items={messageData}>
                            {(item: IncomingMessage) => (
                                <TableRow key={item.id}>
                                    <TableCell >+{getNumberFromString(item.from)}</TableCell>
                                    <TableCell> <div className="flex items-center gap-2">
                                        <ContactIcon phone={item.from} contact={item.contact} />
                                    </div></TableCell>
                                    <TableCell>
                                        {formatDate(item.receivedAt)}
                                    </TableCell>
                                    <TableCell>
                                        {item.message}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {/* <table className="w-full text-center font-nunito text-[11px] font-bold ">
                        <thead className='bg-neutral-75 sticky'>
                            <tr className=''>
                                <th className='py-4 checkbox'>
                                    <input ref={mainCheckboxRef} type="checkbox" name="main_checkbox" id="main_checkbox" className='rounded-sm focus:ring-transparent' onClick={handleIndexCheckbox} />
                                </th>
                                <th className='p-4 whitespace-pre'>Nomor HP</th>
                                <th className='p-4'>Nama</th>
                                <th className='p-4 whitespace-pre'>Diterima Pada</th>
                                <th className='p-4'>Lihat Chat</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white '>
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
                    </table> */}

                    {/* {messageData.length === 0 && (
                        <div className='w-full bg-white p-12'>
                            <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                                <p className='text-[16px] font-bold'>Pesan masuk masih kosong</p>
                                <p className='text-xs text-[#777C88]'>Pesan yang dikirimkan kepada anda akan masuk di sini</p>
                            </div>
                        </div>
                    )} */}
                    <div className="flex w-full justify-center mt-2">
                        <Pagination
                            isCompact

                            showControls
                            showShadow
                            color="primary"
                            page={currentPage}
                            total={totalPage}
                            onChange={setcurrentPage}
                            variant="light"
                            size='sm'
                        />
                    </div>
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

export default IncomingTable