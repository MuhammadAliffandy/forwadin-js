'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GetMessage, OutgoingMessage } from '@/utils/types';
import { Pagination, Skeleton, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import ContactIcon from '@/components/dashboard/ContactIcon';
import { getNumberFromString, formatDate } from '@/utils/helper';
import { useSession } from 'next-auth/react';
import { fetchClient } from '@/utils/helper/fetchClient';
import { User } from 'next-auth';
import { PAGINATION_BATCH } from '@/utils/constant';
const OutgoingTable = ({ settotalMessage, totalMessage, sessionId, user }: {
    settotalMessage: Dispatch<SetStateAction<number>>,
    totalMessage: number,
    sessionId: string,
    user: User | undefined
}) => {
    const { push } = useRouter()
    const [isLoaded, setisLoaded] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [isChecked, setisChecked] = useState(false)
    const [messageData, setmessageData] = useState<OutgoingMessage[]>([
    ])
    const [searchText, setsearchText] = useState('')
    const [searchedMessage, setsearchedMessage] = useState<OutgoingMessage[]>([])
    const [currentPage, setcurrentPage] = useState(1)
    const [totalPage, settotalPage] = useState(1)
    const [hasMore, sethasMore] = useState(false)
    const [selectedMessage, setselectedMessage] = useState(new Set())

    const filterMessage = (text: string) => {
        const regex = new RegExp(text, 'i')
        return messageData.filter(item => {
            if (regex.test(item.source))
                return item
        })
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsearchText(e.target.value)
    }
    const handleDeleteMessage = () => {
        // TODO
    }
    const fetchOutgoingMessage = async () => {
        setisLoading(true)
        const result = await fetchClient({
            url: `/messages/${sessionId}/outgoing?page=${currentPage}&pageSize=${PAGINATION_BATCH}`,
            method: 'GET',
            user: user
        })
        if (result && result.ok) {
            const resultData: GetMessage<OutgoingMessage> = await result.json()
            setmessageData(resultData.data)
            setcurrentPage(resultData.metadata.currentPage)
            sethasMore(resultData.metadata.hasMore)
            settotalPage(resultData.metadata.totalPages)
            settotalMessage(resultData.metadata.totalMessages)
        }
        setisLoaded(true)
        setisLoading(false)
    }
    useEffect(() => {
        const searchResult = filterMessage(searchText)
        setsearchedMessage(searchResult)
    }, [searchText])
    useEffect(() => {
        if (user?.token && sessionId)
            fetchOutgoingMessage()

    }, [user?.token, sessionId])
    useEffect(() => {
        fetchOutgoingMessage()
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
                        <TableBody
                            isLoading={isLoading}
                            loadingContent={<Spinner label="Loading..." />}
                            emptyContent={<div className='w-full bg-white p-12'>
                                <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                                    <p className='text-[16px] font-bold'>Pesan masuk masih kosong</p>
                                    <p className='text-xs text-[#777C88]'>Pesan yang dikirimkan kepada anda akan masuk di sini</p>
                                </div>
                            </div>} items={messageData}>
                            {(item: OutgoingMessage) => (
                                <TableRow key={item.id}>
                                    <TableCell >+{getNumberFromString(item.to)}</TableCell>
                                    <TableCell> <div className="flex items-center gap-2">
                                        <ContactIcon phone={item.to} contact={item.contact} />
                                    </div></TableCell>
                                    <TableCell>
                                        {formatDate(item.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        {item.message}
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

export default OutgoingTable