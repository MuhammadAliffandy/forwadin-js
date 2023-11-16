import { formatDate } from '@/utils/helper'
import { fetchClient } from '@/utils/helper/fetchClient'
import { DeviceSession, GetCampaign } from '@/utils/types'
import { Table, Button, TableHeader, TableColumn, TableBody, TableRow, TableCell, Switch, Skeleton } from '@nextui-org/react'
import { Campaign } from '@prisma/client'
import { } from 'flowbite-react'
import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
interface CampaignTableProps {
    settotalCampaign: Dispatch<SetStateAction<number>>,
    // currentDevice: DeviceSession,
    user: User | undefined,
    totalCampaign: number
}
const CampaignTable = ({ settotalCampaign, totalCampaign, user }: CampaignTableProps) => {
    // const { data: session } = useSession()
    const [isChecked, setisChecked] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [campaignData, setcampaignData] = useState<GetCampaign[]>([])
    const [searchText, setsearchText] = useState('')
    const [searchedCampaignData, setsearchedcampaignData] = useState<GetCampaign[]>([])
    const fetchCampaign = async () => {
        const result = await fetchClient({
            url: '/campaigns',
            method: 'GET',
            user: user
        })
        if (result?.ok) {
            const resultData: GetCampaign[] = await result.json()
            console.log(resultData)
            setcampaignData(resultData)
            settotalCampaign(resultData.length)
        }
        setisLoaded(true)
    }
    useEffect(() => {
        // console.log('masuk')
        if (user?.token && campaignData.length === 0) {
            // console.log('masuk2')
            fetchCampaign()
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
                            <Button className='rounded-md text-sm' color='primary' as={Link} href='/dashboard/campaign/new'>
                                Buat Campaign Baru
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
                            >Register Syntax</TableColumn>
                            <TableColumn
                            >Subcscriber</TableColumn>
                            <TableColumn
                            >Device</TableColumn>
                            <TableColumn
                            >Tanggal Kirim</TableColumn>
                            <TableColumn
                            >Tanggal diupdate</TableColumn>
                            <TableColumn
                            >Detail</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={<div className='w-full bg-white p-12'>
                            <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
                                <p className='text-[16px] font-bold'>Campaign masih kosong</p>
                                <p className='text-xs text-[#777C88]'>Lorem Ipsum</p>
                            </div>
                        </div>}
                            items={campaignData}
                        // className='font-nunito'
                        >
                            {(item: GetCampaign) => (
                                <TableRow key={item.id}>
                                    <TableCell >{item.name}</TableCell>
                                    <TableCell>
                                        <div className='flex gap-1 items-center'>
                                            <Switch size='sm' isSelected={item.status} />
                                            {item.status ? (
                                                <p className='text-primary font-bold'>Live</p>
                                            ) : (
                                                <p className='text-customGray'>off</p>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p>{item.registrationSyntax}</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>
                                            {item.recipients[0] === 'all' ? 'Semua' : item.recipients.length}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <p>
                                            {item.device.name}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(item.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(item.updatedAt)}
                                    </TableCell>
                                    <TableCell>
                                        <Button as={Link} href={'/dashboard/campaign/' + item.id} variant='bordered' >
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

export default CampaignTable