'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GetBroadcast, DeviceSession } from '@/utils/types';
import { Button, Link, Skeleton, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { fetchClient } from '@/utils/helper/fetchClient';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/helper';
interface BroadcastTableProps {
    settotalBroadcast: Dispatch<SetStateAction<number>>,
    user: User | undefined,
    totalBroadcast: number,
    // currentDevice: DeviceSession
}
const BroadcastTable = ({ settotalBroadcast, totalBroadcast, user }: BroadcastTableProps) => {
    const { push } = useRouter()
    const [isChecked, setisChecked] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [broadcastData, setbroadcastData] = useState<GetBroadcast[]>([])
    const [searchText, setsearchText] = useState('')
    const [searchedGetBroadcast, setsearchedGetBroadcast] = useState<GetBroadcast[]>([])
    const [selectedBroadcast, setselectedBroadcast] = useState<Set<string> | 'all'>(new Set([]))
    const handleOpenDetailModal = (params: string) => {
        push('/dashboard/contact/' + params)
    }
    const filterMessage = (text: string) => {
        const regex = new RegExp(text, 'i')
        return broadcastData.filter(item => {
            if (regex.test(item.name))
                return item
        })
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsearchText(e.target.value)
    }
    const handleDeleteBroadcast = async () => {
        // tambah konfirmasi delete
        let deletedBroadcast = null
        if (selectedBroadcast === 'all') {
            deletedBroadcast = broadcastData.map(item => item.id)
        }
        else if ((selectedBroadcast as Set<string>).size > 0) {
            deletedBroadcast = Array.from(selectedBroadcast)
        }
        const isConfirm = window.confirm('Anda yakin ingin menghapus ' + deletedBroadcast?.length + ' broadcast?')
        if (deletedBroadcast && isConfirm) {
            const result = await fetchClient({
                url: '/broadcasts/',
                body: JSON.stringify({ broadcastIds: deletedBroadcast }),
                method: 'DELETE',
                user: user
            })
            if (result?.ok) {
                toast.success('Berhasil hapus broadcast')
                fetchBroadcast()
                setselectedBroadcast(new Set([]))
            } else {
                toast.error('Gagal hapus broadcast')
            }
            deletedBroadcast = null
        }
    }
    const handleToggleBroadcast = async (id: string, status: boolean) => {
        const result = await fetchClient({
            url: '/broadcasts/' + id + '/status',
            method: 'PATCH',
            body: JSON.stringify({ status: status }),
            user: user,
        })
        if (result?.ok) {
            // toast.success('Ber')
            fetchBroadcast()
        }
    }
    const fetchBroadcast = async () => {
        const result = await fetchClient({
            url: '/broadcasts/',
            method: 'GET',
            user: user
        })
        if (result?.ok) {
            const resultData = await result.json()
            console.log(resultData)
            setbroadcastData(resultData)
            settotalBroadcast(resultData.length)
            setisLoaded(true)
        } else {
            toast.error(await result?.text())
        }
    }

    useEffect(() => {
        const searchResult = filterMessage(searchText)
        setsearchedGetBroadcast(searchResult)
    }, [searchText])
    useEffect(() => {
        if (user?.token) {
            fetchBroadcast()
        }
    }, [user?.token])
    useEffect(() => {
        if ((selectedBroadcast as Set<string>).size > 0 || selectedBroadcast === 'all')
            setisChecked(true)
        else
            setisChecked(false)

    }, [selectedBroadcast])
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
                        {isChecked ? (
                            <Button color='danger' onClick={handleDeleteBroadcast} className="bg-danger rounded-md w-full lg:w-auto px-8 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                Hapus
                            </Button>
                        ) : (
                            <Button className='rounded-md text-sm' color='primary' as={Link} href='/dashboard/broadcast/new'>
                                Buat Broadcast Baru
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
                        selectedKeys={selectedBroadcast as any}
                        onSelectionChange={setselectedBroadcast as any}
                    >
                        <TableHeader>
                            <TableColumn>Nama</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Device</TableColumn>
                            <TableColumn>Dibuat Pada</TableColumn>
                            <TableColumn>Terakhir Update</TableColumn>
                            <TableColumn>Detail</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={<div className='w-full bg-white p-12'>
                            <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                                <p className='text-[16px] font-bold'>Broadcast masih kosong</p>
                                <p className='text-xs text-[#777C88]'>Lorem Ipsum</p>
                            </div>
                        </div>}
                            items={broadcastData}
                        >
                            {(item: GetBroadcast) => (
                                <TableRow key={item.id}>
                                    <TableCell >{item.name}</TableCell>
                                    <TableCell>
                                        <Switch size='sm' isSelected={item.status} onClick={() => handleToggleBroadcast(item.id, !item.status)} />
                                    </TableCell>
                                    <TableCell>
                                        {item.device.name}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(item.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(item.updatedAt)}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant='bordered' onClick={() => push('/dashboard/broadcast/' + item.id)}>
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

export default BroadcastTable