'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DeviceData, GroupData, MultipleCheckboxRef } from '@/utils/types';
import AddGroupModal from '@/components/dashboard/group/AddGroupModal';
import { Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { fetchClient } from '@/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { formatDate } from '@/utils/helper';

const GroupTable = ({ setcountGroup }: { setcountGroup: Dispatch<SetStateAction<number>> }) => {
    const { data: session } = useSession()
    const { push } = useRouter()
    const [isLoaded, setisLoaded] = useState(false)

    const [isChecked, setisChecked] = useState(false)
    const [groupData, setgroupData] = useState<GroupData[]>([
    ])
    const [searchText, setsearchText] = useState('')
    const [searchedGroup, setsearchedGroup] = useState<GroupData[]>([])
    const [addGroupModal, setaddGroupModal] = useState(false)
    const [selectedGroup, setselectedGroup] = useState<Set<string> | 'all'>(new Set())
    const handleOpenDetailModal = (params: string) => {
        push('/dashboard/group/' + params)
    }
    const filterDevice = (text: string) => {
        const regex = new RegExp(text, 'i')
        return groupData.filter(item => regex.test(item.name))
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsearchText(e.target.value)
    }
    const handleDeleteGroup = async () => {
        // tambah konfirmasi delete
        let deletedGroup = null
        if (selectedGroup === 'all') {
            deletedGroup = groupData.map(item => item.id)
        }
        else if ((selectedGroup as Set<string>).size > 0) {
            deletedGroup = Array.from(selectedGroup)
        }
        const isConfirm = window.confirm('Anda yakin ingin menghapus ' + deletedGroup?.length + ' grup?')
        if (deletedGroup && isConfirm) {
            const result = await fetchClient({
                url: '/groups/',
                body: JSON.stringify({ groupIds: deletedGroup }),
                method: 'DELETE',
                user: session?.user
            })
            if (result?.ok) {
                toast.success('Berhasil hapus grup')
                fetchData()
                setselectedGroup(new Set([]))
            } else {
                toast.error('Gagal hapus grup')
            }
            deletedGroup = null
        }
    }
    const fetchData = async () => {
        const result = await fetchClient({
            url: '/groups',
            method: 'GET',
            user: session?.user
        })
        if (result?.ok) {
            const resultData: GroupData[] = await result.json()

            setgroupData(resultData)
            setcountGroup(resultData.length)
            setisLoaded(true)
        }
    }
    useEffect(() => {
        fetchData()
    }, [session?.user])

    useEffect(() => {
        const searchResult = filterDevice(searchText)
        setsearchedGroup(searchResult)
    }, [searchText])
    useEffect(() => {
        if ((selectedGroup as Set<string>).size > 0 || selectedGroup === 'all')
            setisChecked(true)
        else
            setisChecked(false)

    }, [selectedGroup])
    return (
        <>
            <AddGroupModal openModal={addGroupModal} setopenModal={setaddGroupModal} fetchData={fetchData} />
            <div className="mt-8 p-4 bg-white rounded-md">
                <div className="flex sm:flex-row flex-col gap-2 lg:justify-between items-center">
                    <div className="w-full">
                        <input type="text" className="text-xs rounded-md w-full max-w-md border border-customGray" placeholder="Cari nama / nomor"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className='flex lg:flex-row flex-col lg:justify-end justify-between gap-2 w-full lg:w-auto'>
                        {isChecked ? (
                            <div onClick={handleDeleteGroup} className="bg-danger rounded-md px-6 text-white text-center w-full max-w-md items-center flex hover:cursor-pointer justify-center p-2">
                                Hapus
                            </div>
                        ) : (
                            <div onClick={() => setaddGroupModal(true)} className="bg-primary rounded-md px-6 text-white text-center w-full max-w-md items-center flex hover:cursor-pointer justify-center p-2 whitespace-pre">
                                Buat Group Baru
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
                        selectedKeys={selectedGroup as any}
                        onSelectionChange={setselectedGroup as any}
                    >
                        <TableHeader>
                            <TableColumn>Nama</TableColumn>
                            <TableColumn>Tipe</TableColumn>
                            <TableColumn>Jumlah Anggota</TableColumn>
                            <TableColumn>Dibuat pada</TableColumn>
                            <TableColumn>Terakhir diupdate</TableColumn>
                            <TableColumn>Detail</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={
                            <div className='w-full bg-white p-12'>
                                <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                                    <p className='text-[16px] font-bold'>Group masih kosong</p>
                                    <p className='text-xs text-[#777C88]'>Tambahkan kontak kedalam group ini</p>
                                    <p className='text-xs'>Dengan grup ini, Anda dapat dengan mudah berkomunikasi dengan banyak kontak sekaligus.</p>
                                    <div className='flex'>
                                        <div onClick={() => setaddGroupModal(true)} className="bg-primary rounded-md px-6 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                            Buat Group Baru
                                        </div>
                                    </div>
                                </div>
                            </div>
                        } items={searchText ? searchedGroup : groupData}>
                            {(item: GroupData) => (
                                <TableRow key={item.id}>
                                    <TableCell >{item.name}</TableCell>
                                    <TableCell >{item.type}</TableCell>
                                    <TableCell >{item.membersCount}</TableCell>
                                    <TableCell >{formatDate(item.createdAt)}</TableCell>
                                    <TableCell >{formatDate(item.updatedAt)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <div className='py-1 px-4 text-center border border-black/20 rounded-md hover:cursor-pointer' onClick={() => handleOpenDetailModal(item.id)}>Detail</div>
                                        </div>
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

export default GroupTable