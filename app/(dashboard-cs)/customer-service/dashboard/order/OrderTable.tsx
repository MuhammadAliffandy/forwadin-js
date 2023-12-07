'use client';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { OrderData } from '@/utils/types'
import { useSession } from 'next-auth/react';
import { fetchClient } from '@/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { Button, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { formatDate } from '@/utils/helper';
import OrderModal from './OrderModal';

const OrderTable = ({ setcountOrder }: { setcountOrder: Dispatch<SetStateAction<number>> }) => {
    const { data: session } = useSession()
    const [isLoaded, setisLoaded] = useState(false)
    const [settingOrderModal, setSettingOrderModal] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [orderData, setorderData] = useState<OrderData[]>([])
    const [searchedOrder, setsearchedOrder] = useState<OrderData[]>([])
    const [isChecked, setisChecked] = useState(false)
    const fetchData = async () => {
        const fetchOrder = await fetchClient({
            method: 'GET',
            url: '/orders',
            user: session?.customerService
        })
        if (fetchOrder) {
            const data: OrderData[] = await fetchOrder.json()
            if (fetchOrder.status === 200) {
                setcountOrder(data.length)
                setorderData(data)
            } else {
                console.log(data)
                toast.error('gagal mendapatkan data')
            }
            setisLoaded(true)
        }
    }
    const filterOrder = (text: string) => {
        const regex = new RegExp(text, 'i')
        return orderData.filter(item => {
            if (regex.test(item.name) || regex.test(item.status))
                return item
        })
    }
    useEffect(() => {
        if (session?.customerService?.token)
            fetchData()
    }, [session?.customerService?.token])
    useEffect(() => {
        const searchResult = filterOrder(searchText)
        setsearchedOrder(searchResult)
    }, [searchText])
    return (
        <>
            <OrderModal data={undefined} openModal={settingOrderModal} session={session} setopenModal={setSettingOrderModal} />
            <div className="mt-8 p-4 bg-white rounded-md">
                <div className="flex sm:flex-row flex-col gap-2 justify-between">
                    <div className="basis-1/2">
                        <input type="text" className="text-xs rounded-md w-full max-w-md border border-customGray" placeholder="Cari order"
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                        />
                    </div>
                    {isChecked ? (
                        <Button color='danger' className='rounded-md' onClick={() => { }}>
                            Hapus
                        </Button>
                    ) : (
                        <Button color='primary' onClick={() => setSettingOrderModal(true)} className="rounded-md">
                            Setting Pesan Order
                        </Button>
                    )}
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
                    // selectedKeys={selectedKeys as any}
                    // onSelectionChange={setSelectedKeys as any}
                    >
                        <TableHeader>
                            <TableColumn>Nama</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Data</TableColumn>
                            <TableColumn>Tanggal Dibuat</TableColumn>
                            <TableColumn>Aksi</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={
                            <div className='w-full bg-white p-12'>
                                <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                                    <p className='text-[16px] font-bold'>Order kosong</p>
                                    <p className='text-xs text-[#777C88]'>Lorem</p>

                                </div>

                            </div>} items={searchText ? searchedOrder : orderData}>
                            {(item: OrderData) => (
                                <TableRow key={item.id}>
                                    <TableCell >{item.name}</TableCell>
                                    <TableCell >{item.status}</TableCell>
                                    <TableCell >{item.orderData}</TableCell>
                                    <TableCell >{formatDate(item.createdAt)}</TableCell>
                                    <TableCell >
                                        <div className="flex items-center">
                                            <div className='text-primary py-1 px-4  border border-black/20 rounded-md hover:cursor-pointer whitespace-nowrap  flex items-center' onClick={() => { }}>lorem</div>
                                            <div className='text-primary py-1 px-4  border border-black/20 rounded-md hover:cursor-pointer whitespace-nowrap  flex items-center' onClick={() => { }}>lorem</div>
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

export default OrderTable