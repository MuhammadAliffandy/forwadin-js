import { fetchClient } from '@/app/utils/helper/fetchClient'
import {
    Button,
    Skeleton,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { getAutoReplies } from '../../../../api/repository/autoRepliesRepository'

const AutoReplyTable = ({ settotalAutoReply, user }) => {
    const [isChecked, setisChecked] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [autoReplyData, setautoReplyData] = useState([])
    const [searchText, setsearchText] = useState('')
    const [searchedAutoReplyData, setsearchedAutoReplyData] = useState([])
    const [selectedAutoReply, setselectedAutoReply] = useState(new Set([]))

    const fetchAutoReply = async () => {

        const result = await getAutoReplies(user.token)

        if (result.status === 200) {
            const resultData = result.data
            setautoReplyData(resultData)
            settotalAutoReply(resultData.length)
        }
        setisLoaded(true)
    }
    const handleToggleAutoReply = async (id, status) => {
        console.log('Toggle')
        console.log(id, status)
        const result = await fetchClient({
            url: `/auto-replies/${id}/status`,
            method: 'PATCH',
            body: JSON.stringify({ status: status }),
            user: user
        })

        
        if (result.status === 200) {
            console.log('sukses')
            const newArr = autoReplyData.map(item => {
                if (item.id === id)
                    return {
                        ...item,
                        status: status
                    }
                return item
            })
            setautoReplyData(newArr)
        }
    }
    const handleDeleteAutoReply = async () => {
        // tambah konfirmasi delete
        let deletedAR = null
        if (selectedAutoReply === 'all') {
            deletedAR = autoReplyData.map(item => item.id)
        }
        else if ((selectedAutoReply).size > 0) {
            deletedAR = Array.from(selectedAutoReply)
        }
        const isConfirm = window !== undefined ? window.confirm('Anda yakin ingin menghapus ' + deletedAR.length + ' auto reply?') : null
        if (deletedAR && isConfirm) {
            const result = await fetchClient({
                url: '/auto-replies',
                body: JSON.stringify({ autoReplyIds: deletedAR }),
                method: 'DELETE',
                user: user
            })
            if (result.status === 200) {
                toast.success('Berhasil hapus auto reply')
                fetchAutoReply()
                setselectedAutoReply(new Set())
            } else {
                toast.error('Gagal hapus auto reply')
            }
            deletedAR = null
        }
    }
    useEffect(() => {
        if (user?.token) {
            fetchAutoReply()
        }
    }, [user?.token])
    useEffect(() => {
        if ((selectedAutoReply).size > 0 || selectedAutoReply === 'all')
            setisChecked(true)
        else
            setisChecked(false)

    }, [selectedAutoReply])
    return (
        <>
            <div className="mt-8 p-4 bg-white rounded-md">
                <div className="flex sm:flex-row flex-col gap-2 justify-between">
                    <div className="basis-1/2">
                        <input type="text" className="text-xs rounded-md w-full max-w-md border border-customGray" placeholder="Cari nama auto reply"
                            value={searchText}
                            onChange={(e) => setsearchText(e.target.value)}
                        />
                    </div>
                    <div className='flex lg:justify-end justify-between gap-2 w-full max-w-xs'>
                        {isChecked ? (
                            <Button onClick={handleDeleteAutoReply} className='rounded-md text-sm' color='danger' >Hapus</Button>
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
                        selectedKeys={selectedAutoReply}
                        onSelectionChange={setselectedAutoReply}
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
                            {(item) => (
                                <TableRow key={item.id}>
                                    <TableCell key={'name_' + item.id}>{item.name}</TableCell>
                                    <TableCell key={'switch_' + item.id}>
                                        <div className='hover:cursor-pointer'>
                                            <Switch size='sm'
                                                isSelected={item.status} onClick={() => handleToggleAutoReply(item.id, !item.status)} onValueChange={() => { }} />
                                        </div>
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