'use client';

import { Dispatch, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Link, Skeleton, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { fetchClient } from '@/app/utils/helper/fetchClient';
import { toast } from 'react-toastify';
import { formatDate } from '@/app/utils/helper';
import { getAllUser, updateStatusTransaction } from '@/app/api/repository/superadminRepository'


const UserTable = ({ statusAction ,setTotalUser, totalUser, user , onEdit , onAdd , onSubscription}) => {
    const { push } = useRouter()
    const [isChecked, setisChecked] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [broadcastData, setbroadcastData] = useState([])
    const [userData, setUserData] = useState([])
    const [searchText, setsearchText] = useState('')
    const [ listTransaction , setListTransaction ] = useState()
    const [searchedGetBroadcast, setsearchedGetBroadcast] = useState([])
    const [selectedBroadcast, setselectedBroadcast] = useState(new Set([]))
    const handleOpenDetailModal = (params) => {
        push('/dashboard/contact/' + params)
    }
    const filterMessage = (text) => {
        const regex = new RegExp(text, 'i')
        return broadcastData.filter(item => {
            if (regex.test(item.name))
                return item
        })
    }
    const handleSearch = (e) => {
        setsearchText(e.target.value)
    }

    const handleTransactionPay = async (transactionId , status ) => {
        const result = await updateStatusTransaction(user?.token , transactionId , {status : status ? 'paid' : 'unpaid'})

        if (result.status === 200) {
            toast.success('Update Payment Berhasil')
            fetchAllUser()
        } else {
            toast.error(result?.statusText)
        }
    }

    const fetchAllUser = async () => {
        const result = await getAllUser(user?.token)

        if (result.status === 200) {
            const resultData = result.data

            const dataTransaction = resultData.map((data)=>{
                return {status : data.transactions.length == 0 ? false : data.transactions[0].status == 'paid' ?true : false}
            })

            setListTransaction(dataTransaction)

            setUserData(resultData)
            setTotalUser(resultData.length)
            setisLoaded(true)
        } else {
            toast.error(result?.statusText)
        }
    }

    useEffect(() => {
        const searchResult = filterMessage(searchText)
        setsearchedGetBroadcast(searchResult)
    }, [searchText])
    useEffect(() => {
        if (user?.token) {
            fetchAllUser()
        }
    }, [user?.token])
    useEffect(() => {
        if ((selectedBroadcast ).size > 0 || selectedBroadcast === 'all')
            setisChecked(true)
        else
            setisChecked(false)

    }, [selectedBroadcast])

    useEffect(()=>{
        if(statusAction){
            fetchAllUser()
        }
    },[statusAction])
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
                            <Button color='danger' onClick={()=>{}} className="bg-danger rounded-md w-full lg:w-auto px-8 text-white text-center items-center flex hover:cursor-pointer justify-center p-2">
                                Hapus
                            </Button>
                        ) : (
                            <Button onClick={onAdd} className='rounded-md text-sm' color='primary' >
                                Tambah User
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
                        selectedKeys={selectedBroadcast}
                        onSelectionChange={setselectedBroadcast}
                    >
                        <TableHeader>
                            <TableColumn>FirstName</TableColumn>
                            <TableColumn>LastName</TableColumn>
                            <TableColumn>Phone</TableColumn>
                            <TableColumn>Email</TableColumn>
                            <TableColumn>Paid</TableColumn>
                            <TableColumn>Subscription</TableColumn>
                            <TableColumn>Dibuat Pada</TableColumn>
                            <TableColumn>Edit</TableColumn>
                            <TableColumn>Edit Subscription</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={<div className='w-full bg-white p-12'>
                            <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                                <p className='text-[16px] font-bold'>User Data masih kosong</p>
                                <p className='text-xs text-[#777C88]'>Lorem Ipsum</p>
                            </div>
                        </div>}

                        items={userData}
                        >
                            {
                            userData.map((item , index) => {
                                return (
                                    <TableRow key={item.id}>
                                    <TableCell >{item.firstName}</TableCell>
                                    <TableCell >{item.lastName}</TableCell>
                                    <TableCell >{ item.phone == null ? '-' :  `+${item.phone}`}</TableCell>
                                    <TableCell >{item.email}</TableCell>
                                    <TableCell>
                                        <Switch size='sm' isSelected={ item.transactions[index]?.status} onClick={() => {
                
                                            item.transactions.length == 0 ? toast.error('User belum melakukan transaksi') :

                                            handleTransactionPay( item.transactions[0].id, item.transactions[index]?.status)
                                        }} />
                                    </TableCell>
                                    <TableCell>
                                        <p className={`text-[10px] text-center text-white w-auto px-[12px] py-[4px] ${ item.transactions.length == 0 ? 'bg-primary' :  item.Subscription[0].subscriptionPlan.name == 'pro' ? 'bg-black ' : 'bg-primary'} rounded-[30px]`} >
                                            {item.transactions.length == 0 ?  '-' : item.Subscription[0].subscriptionPlan.name}
                                        </p> 
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(item.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant='bordered' onClick={() => {
                                            onEdit(item)
                                        }}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant='bordered' onClick={() => {
                                            onSubscription(item)
                                        }}>
                                            Edit Subscription
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                )
                        })
                        }
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

export default UserTable