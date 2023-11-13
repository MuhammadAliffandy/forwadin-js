'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GetMessage, IncomingMessage } from '@/utils/types';
import { Button, Pagination, Popover, PopoverContent, PopoverTrigger, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { User } from 'next-auth';
import { fetchClient } from '@/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { formatDate, getNumberFromString } from '@/utils/helper';
import ContactIcon from '@/components/dashboard/ContactIcon';
import { PAGINATION_BATCH } from '@/utils/constant';
import ProfileAvatar from '@/components/dashboard/ProfileAvatar';
import BubbleChat from '@/components/dashboard/chat/BubbleChat';
import MessageAddContact from '@/components/dashboard/contact/MessageAddContact';

interface IncomingMessageProps {
    settotalMessage: Dispatch<SetStateAction<number>>,
    sessionId: string,
    user: User | undefined,
    totalMessage: number
}
const IncomingTable = ({ settotalMessage, totalMessage, sessionId, user }: IncomingMessageProps) => {
    const { push } = useRouter()
    const [isLoaded, setisLoaded] = useState(false)
    const [isChecked, setisChecked] = useState(false)
    const [messageData, setmessageData] = useState<IncomingMessage[]>([])
    const [searchText, setsearchText] = useState('')
    const [searchedMessage, setsearchedMessage] = useState<IncomingMessage[]>([])
    const [currentPage, setcurrentPage] = useState(1)
    const [totalPage, settotalPage] = useState(1)
    const [hasMore, sethasMore] = useState(false)
    const [selectedMessage, setselectedMessage] = useState(new Set())

    const [messagePhone, setmessagePhone] = useState<string>('')
    const [addContactModal, setaddContactModal] = useState(false)
    const currentDate = new Date()
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
        const searchResult = filterMessage(searchText)
        setsearchedMessage(searchResult)
    }, [searchText])
    const fetchIncomingMessage = async () => {
        setisLoaded(false)
        const result = await fetchClient({
            url: `/messages/${sessionId}/incoming?page=${currentPage}&pageSize=${PAGINATION_BATCH}`,
            method: 'GET',
            user: user
        })
        if (result) {
            const resultData: GetMessage<IncomingMessage> = await result.json()
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
    const handleAddContactClick = (item: IncomingMessage) => {
        setmessagePhone(getNumberFromString(item.from))
        setaddContactModal(true)
    }
    useEffect(() => {
        if (user?.token && sessionId)
            fetchIncomingMessage()
    }, [user?.token, sessionId])
    useEffect(() => {
        if (currentPage === 1 && messageData.length === 0)
            return
        else {
            fetchIncomingMessage()
        }
    }, [currentPage])
    useEffect(() => {
        console.log(selectedMessage)
        // @ts-ignore
        if (selectedMessage.size > 0 || selectedMessage === 'all') {
            setisChecked(true)
        } else {
            setisChecked(false)
        }
    }, [selectedMessage])
    useEffect(() => {

    }, [messageData])
    return (
        <>
            {addContactModal &&
                <MessageAddContact
                    fetchData={fetchIncomingMessage}
                    openModal={addContactModal}
                    setopenModal={setaddContactModal}
                    addContactData={{ phone: messagePhone }}
                />
            }
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
                        selectedKeys={selectedMessage as any}
                        onSelectionChange={setselectedMessage as any}
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
                                                            {item.contact ? item.contact.firstName + ' ' + item.contact.lastName : getNumberFromString(item.from)}
                                                        </div>
                                                    </div>
                                                    <BubbleChat
                                                        text={item.message}
                                                        received={item.updatedAt}
                                                        status={'delivery_ack'}
                                                        mediaPath={item.mediaPath}
                                                        isOutgoing={false}
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