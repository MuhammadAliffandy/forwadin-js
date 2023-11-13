import ContactIcon from '@/components/dashboard/ContactIcon'
import { getNumberFromString, formatDate } from '@/utils/helper'
import { fetchClient } from '@/utils/helper/fetchClient'
import { AutoReply } from '@/utils/types'
import { Button, Link, Pagination, Skeleton, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { IncomingMessage } from 'http'
import { User } from 'next-auth'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
interface AutoReplyTableProps {
    settotalAutoReply: Dispatch<SetStateAction<number>>,
    sessionId: string,
    user: User | undefined,
    totalAutoReply: number
}
const AutoReplyTable = ({ sessionId, settotalAutoReply, totalAutoReply, user }: AutoReplyTableProps) => {
    // const { data: session } = useSession()
    const [isChecked, setisChecked] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [autoReplyData, setautoReplyData] = useState<AutoReply[]>([])
    const [searchText, setsearchText] = useState('')
    const [searchedAutoReplyData, setsearchedAutoReplyData] = useState<AutoReply[]>([])
    const fetchAutoReply = async () => {
        const result = await fetchClient({
            url: '/auto-replies',
            method: 'GET',
            user: user
        })
        if (result?.ok) {
            const resultData: AutoReply[] = await result.json()
            setautoReplyData(resultData)
            console.log(resultData)
        }
        setisLoaded(true)
    }
    useEffect(() => {
        if (user?.token) {
            fetchAutoReply()
        }
    }, [user?.token])
    return (
        <>
            <div className="mt-8 p-4 bg-white rounded-md">
                <div className="flex sm:flex-row flex-col gap-2 justify-between">
                    <div className="basis-1/2">
                        <input type="text" className="text-xs rounded-md w-full max-w-md border border-customGray" placeholder="Cari nama / nomor / label"
                            value={searchText}
                            onChange={(e) => setsearchText(e.target.value)}
                        />
                    </div>
                    <div className='flex lg:justify-end justify-between gap-2 w-full max-w-xs'>
                        {isChecked ? (
                            <div onClick={() => { }} className="bg-danger rounded-md w-full lg:w-auto px-8 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                Hapus
                            </div>
                        ) : (
                            <Button className='rounded-md text-sm' color='primary' as={Link} href='/dashboard/auto-reply/new'>
                                Buat Auto Reply Baru
                            </Button>
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
                    // selectedKeys={selectedMessage as any}
                    // onSelectionChange={setselectedMessage as any}
                    >
                        <TableHeader>
                            <TableColumn
                            >Nama</TableColumn>
                            <TableColumn
                            >Status</TableColumn>
                            <TableColumn
                            >Penerima</TableColumn>
                            <TableColumn
                            >Detail</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={<div className='w-full bg-white p-12'>
                            <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                                <p className='text-[16px] font-bold'>Auto Reply masih kosong</p>
                                <p className='text-xs text-[#777C88]'>Lorem Ipsum</p>
                            </div>
                        </div>}
                            items={autoReplyData}
                        >
                            {(item: AutoReply) => (
                                <TableRow key={item.id}>
                                    <TableCell >{item.name}</TableCell>
                                    <TableCell>
                                        <Switch size='sm' isSelected={item.status} />
                                    </TableCell>
                                    <TableCell>
                                        {item.recipients.length}
                                    </TableCell>
                                    <TableCell>
                                        <Button as={Link} href={'/dashboard/auto-reply/' + item.id} variant='bordered'>
                                            Detail
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

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

export default AutoReplyTable