'use client';

import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { GetMessage, OutgoingMessage } from '@/utils/types';
import { Button, Link, Pagination, Popover, PopoverContent, PopoverTrigger, Skeleton, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import ContactIcon from '@/components/dashboard/ContactIcon';
import { getNumberFromString, formatDate, getInitials } from '@/utils/helper';
import { useSession } from 'next-auth/react';
import { fetchClient } from '@/utils/helper/fetchClient';
import { User } from 'next-auth';
import { PAGINATION_BATCH } from '@/utils/constant';
import ProfileAvatar from '@/components/dashboard/ProfileAvatar'
import BubbleChat from '@/components/dashboard/chat/BubbleChat'
import MessageAddContact from '@/components/dashboard/contact/MessageAddContact'

const OutgoingTable = ({ settotalMessage, totalMessage, sessionId, user }) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isLoaded, setisLoaded] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [isChecked, setisChecked] = useState(false)
    const [messageData, setmessageData] = useState([
    ])
    const [searchText, setsearchText] = useState('')
    const [searchedMessage, setsearchedMessage] = useState([])
    const [phoneSearch, setphoneSearch] = useState('')
    const [contactSearch, setcontactSearch] = useState('')
    const [currentPage, setcurrentPage] = useState(1)
    const [totalPage, settotalPage] = useState(1)
    const [hasMore, sethasMore] = useState(false)
    const [selectedMessage, setselectedMessage] = useState(new Set())
    const [messagePhone, setmessagePhone] = useState<string>('')
    const [addContactModal, setaddContactModal] = useState(false)
    const currentDate = new Date()
    const filterMessage = (text) => {
        const regex = new RegExp(text, 'i')
        return messageData.filter(item => {
            if (regex.test(item.source))
                return item
        })
    }
    const handleSearch = async () => {
        const query = `contactName=${contactSearch}&phoneNumber=${phoneSearch}`
        router.push(pathname + "?" + query)
        setcurrentPage(1)
        settotalPage(1)
        fetchOutgoingMessage(query)
    }

    const fetchOutgoingMessage = async (query = '') => {
        setisLoading(true)

        const result = await fetchClient({
            url: `/messages/${sessionId}/outgoing?page=${currentPage}&pageSize=${PAGINATION_BATCH}` + (query && '&' + query),
            method: 'GET',
            user: user
        })
        if (result && result.ok) {
            const resultData = await result.json()
            console.log(resultData)
            setmessageData(resultData.data)
            setcurrentPage(resultData.metadata.currentPage)
            sethasMore(resultData.metadata.hasMore)
            settotalPage(resultData.metadata.totalPages)
            settotalMessage(resultData.metadata.totalMessages)
        }
        setisLoaded(true)
        setisLoading(false)
    }
    const handleAddContactClick = (item) => {
        setmessagePhone(getNumberFromString(item.to))
        setaddContactModal(true)
    }
    const handlePhoneSearch = (e) => {
        if (isNaN(e)) return
        setphoneSearch(e)
    }
    const fetchInit = async () => {
        const contact = searchParams.get('contactName')
        const phone = searchParams.get('phoneNumber')
        if (contact || phone)
            fetchOutgoingMessage(`contactName=${contact}&phoneNumber=${phone}`)
        else
            fetchOutgoingMessage()
    }
    useEffect(() => {
        const searchResult = filterMessage(searchText)
        setsearchedMessage(searchResult)
    }, [searchText])
    useEffect(() => {
        if (user?.token && sessionId) {
            fetchInit()
        }

    }, [user?.token, sessionId])
    useEffect(() => {
        // if (currentPage > 1)
        if (currentPage === 1 && messageData.length === 0)
            return
        else
            fetchInit()

    }, [currentPage])

    return (
        <>
            {addContactModal &&
                <MessageAddContact
                    fetchData={fetchOutgoingMessage}
                    openModal={addContactModal}
                    setopenModal={setaddContactModal}
                    addContactData={{ phone: messagePhone }}
                />
            }
            <div className="mt-8 p-4 bg-white rounded-md">
                <div className="flex sm:flex-row flex-col gap-2 justify-between">
                    <div className="flex lg:flex-row flex-col gap-2">
                        <div className='w-full flex gap-2'>
                            <input type="text" className="text-xs rounded-md w-full max-w-md border border-customGray" placeholder="Cari nomor"
                                value={phoneSearch}
                                onChange={e => handlePhoneSearch(e.target.value)}
                            />
                            <input type="text" className="text-xs rounded-md w-full max-w-md border border-customGray" placeholder="Cari kontak"
                                value={contactSearch}
                                onChange={e => setcontactSearch(e.target.value)}
                            />
                        </div>
                        <Button
                            color='primary'
                            className='rounded-md px-8'
                            onClick={handleSearch}
                        >Cari</Button>
                    </div>

                </div>
            </div>
            {isLoaded ? (

                <div className=' mt-4'>
                    <Table
                        aria-label="Incoming Chat"
                        color='default'
                        selectionMode="none"
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
                        selectedKeys={selectedMessage }
                        onSelectionChange={setselectedMessage }
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
                        <TableBody
                            isLoading={isLoading}
                            loadingContent={<Spinner label="Loading..." />}
                            emptyContent={<div className='w-full bg-white p-12'>
                                <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                                    <p className='text-[16px] font-bold'>Pesan keluar masih kosong</p>
                                    <p className='text-xs text-[#777C88]'>Pesan yang anda kirim akan masuk di sini</p>
                                </div>
                            </div>} items={messageData}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    <TableCell >+{getNumberFromString(item.to)}</TableCell>
                                    <TableCell> <div className="flex items-center gap-2">
                                        <ContactIcon phone={item.to} contact={item.contact} />
                                    </div></TableCell>
                                    <TableCell>
                                        {formatDate(item.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        {/* <PrintMessage message={item.message} /> */}
                                        <Popover placement="left-end"
                                            className='font-inter'
                                            radius='sm'
                                            showArrow={true}
                                        >
                                            <PopoverTrigger>
                                                <Button
                                                    variant='bordered'
                                                    size='sm'
                                                >Lihat Chat</Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="px-1 py-2">
                                                    <div className='flex gap-2 items-center'>
                                                        <ProfileAvatar profile={item.contact} />
                                                        <div className='text-xs'>
                                                            {item.contact ? item.contact.firstName + ' ' + (item.contact.lastName || '') : getNumberFromString(item.to)}
                                                        </div>
                                                    </div>
                                                    <BubbleChat
                                                        text={item.message}
                                                        received={item.updatedAt}
                                                        status={item.status}
                                                        mediaPath={item.mediaPath}
                                                        isOutgoing={true}
                                                        currentDate={currentDate}
                                                    />
                                                    {!item.contact && (
                                                        <div className='mt-4 bg-neutral-75 p-3 rounded-md flex gap-4 justify-between items-center'>
                                                            <p className='text-xs text-customGray'>
                                                                Nomor ini tidak ada di kontak
                                                            </p>
                                                            <div className='flex justify-end '>

                                                                <Button onClick={() => handleAddContactClick(item)}
                                                                    color='primary'
                                                                    radius='md'
                                                                >
                                                                    Tambah ke Kontak
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

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
                            className='z-0'
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

export default OutgoingTable