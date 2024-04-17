import { formatDate } from '@/app/utils/helper'
import { fetchClient } from '@/app/utils/helper/fetchClient'
import { Table, Button, TableHeader, TableColumn, TableBody, TableRow, TableCell, Switch, Skeleton } from '@nextui-org/react'
import Link from 'next/link'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { updateCampaignStatus } from '../../../../api/repository/campaignRepository'

const CampaignTable = ({ settotalCampaign, totalCampaign, user }) => {
    // const { data: session } = useSession()
    const [isChecked, setisChecked] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [campaignData, setcampaignData] = useState([])
    const [searchText, setsearchText] = useState('')
    const [searchedCampaignData, setsearchedcampaignData] = useState([])
    const [selectedCampaign, setselectedCampaign] = useState(new Set([]))
    const fetchCampaign = async () => {
        const result = await fetchClient({
            url: '/campaigns',
            method: 'GET',
            user: user
        })
        if (result.ok) {
            const resultData = await result.json()
            console.log(resultData)
            setcampaignData(resultData)
            settotalCampaign(resultData.length)
        }
        setisLoaded(true)
    }
    const handleToggleCampaign = async (id, status) => {

        const result = await updateCampaignStatus(user.token , id , { status: status }  )

        if (result.status === 200) {
            // toast.success('Ber')
            fetchCampaign()
        }
    }
    const handleDeleteCampaign = async () => {
        // tambah konfirmasi delete
        let deletedCampaign = null
        if (selectedCampaign === 'all') {
            deletedCampaign = campaignData.map(item => item.id)
        }
        else if ((selectedCampaign).size > 0) {
            deletedCampaign = Array.from(selectedCampaign)
        }
        const isConfirm = window.confirm('Anda yakin ingin menghapus ' + deletedCampaign?.length + ' campaign?')
        if (deletedCampaign && isConfirm) {
            const result = await fetchClient({
                url: '/campaigns/',
                body: JSON.stringify({ campaignIds: deletedCampaign }),
                method: 'DELETE',
                user: user
            })
            if (result.status === 200) {
                toast.success('Berhasil hapus campaign')
                fetchCampaign()
                setselectedCampaign(new Set([]))
            } else {
                toast.error('Gagal hapus campaign')
            }
            deletedCampaign = null
        }
    }
    useEffect(() => {
        // console.log('masuk')
        if (user?.token && campaignData.length === 0) {
            // console.log('masuk2')
            fetchCampaign()
        }
    }, [user?.token])
    useEffect(() => {
        if ((selectedCampaign ).size > 0 || selectedCampaign === 'all')
            setisChecked(true)
        else
            setisChecked(false)

    }, [selectedCampaign])

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
                            <Button onClick={handleDeleteCampaign} className='rounded-md' color='danger'>
                                Hapus
                            </Button>
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
                        selectedKeys={selectedCampaign }
                        onSelectionChange={setselectedCampaign}
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
                            {(item) => (
                                <TableRow key={item.id}>
                                    <TableCell >{item.name}</TableCell>
                                    <TableCell>
                                        <div className='flex gap-1 items-center'>
                                            <Switch size='sm' isSelected={item.status}
                                                onClick={() => handleToggleCampaign(item.id, !item.status)}
                                            />
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