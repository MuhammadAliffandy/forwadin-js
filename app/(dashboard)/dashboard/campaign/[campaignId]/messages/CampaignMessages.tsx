'use client'
import { formatDate } from "@/utils/helper"
import { fetchClient } from "@/utils/helper/fetchClient"
import { CampaignData, CampaignMessage, GetCampaign } from "@/utils/types"
import { TableHeader, TableColumn, TableBody, TableRow, TableCell, Switch, Skeleton, Table, Button } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const CampaignMessages = ({ campaignId }: {
    campaignId: string
}) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [campaignData, setcampaignData] = useState<CampaignMessage[]>([])
    const [isLoaded, setisLoaded] = useState(false)
    const fetchCampaignData = async () => {
        const result = await fetchClient({
            url: '/campaigns/' + campaignId + '/messages',
            method: 'GET',
            user: session?.user,
        })
        if (result?.ok) {
            const resultData = await result.json()
            console.log(resultData)
            setcampaignData(resultData)
        } else if (result?.status === 404) {
            toast.error('Campaign Message tidak ditemukan')
            router.push('/dashboard/campaign')
        } else {
            toast.error('server error')
        }
        setisLoaded(true)
    }
    useEffect(() => {
        if (session?.user?.token)
            fetchCampaignData()
    }, [session?.user?.token])
    return (
        <>
            <div className='flex'>
                <Link href={'/dashboard/campaign/'} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</Link>
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
                    // selectedKeys={selectedCampaign as any}
                    // onSelectionChange={setselectedCampaign as any}
                    >
                        <TableHeader>
                            <TableColumn
                            >Nama</TableColumn>
                            <TableColumn
                            >Status</TableColumn>
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
                            {(item: CampaignMessage) => (
                                <TableRow key={item.id}>
                                    <TableCell >{item.id}</TableCell>
                                    <TableCell>
                                        <div className='flex gap-1 items-center'>
                                            <Switch size='sm' isSelected={item.isSent} />
                                            {item.isSent ? (
                                                <p className='text-primary font-bold'>Live</p>
                                            ) : (
                                                <p className='text-customGray'>off</p>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p>{item.message}</p>
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

export default CampaignMessages