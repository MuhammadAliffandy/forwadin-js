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
    const [campaignMessages, setcampaignMessages] = useState<CampaignMessage[]>([])
    const [campaignData, setcampaignData] = useState<CampaignData>()
    const [isLoaded, setisLoaded] = useState(false)
    const [isChecked, setisChecked] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const [selectedMessage, setselectedMessage] = useState<Set<string> | 'all'>(new Set([]))
    const [searchText, setsearchText] = useState('')
    const fetchCampaignMessages = async () => {
        const result = await fetchClient({
            url: '/campaigns/' + campaignId + '/messages',
            method: 'GET',
            user: session?.user,
        })
        if (result?.ok) {
            const resultData = await result.json()
            console.log(resultData)
            setcampaignMessages(resultData)
        } else if (result?.status === 404) {
            toast.error('Campaign Message tidak ditemukan')
            router.push('/dashboard/campaign')
        } else {
            toast.error('server error')
        }
        setisLoaded(true)
    }
    const fetchcampaignMessages = async () => {
        const result = await fetchClient({
            url: '/campaigns/' + campaignId,
            method: 'GET',
            user: session?.user
        })
        if (result?.ok) {
            const resultData = await result.json()
            setcampaignData(resultData)
        } else if (result?.status === 404) {
            toast.error('Campaign tidak ditemukan')
            router.push('/dashboard/campaign')
        }
    }
    const handleDeleteMessage = async () => {

    }
    useEffect(() => {
        if (session?.user?.token) {
            fetchcampaignMessages()
            fetchCampaignMessages()
        }
    }, [session?.user?.token])
    useEffect(() => {
        if ((selectedMessage as Set<string>).size > 0 || selectedMessage === 'all')
            setisChecked(true)
        else
            setisChecked(false)

    }, [selectedMessage])
    return (
        <>
            <div className='flex'>
                <Link href={'/dashboard/campaign/'} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</Link>
            </div>
            <p className="font-lexend font-bold text-2xl mt-2">Campaign: {campaignData?.name}</p>
            <div className="mt-8 p-4 bg-white rounded-md">
                <div className="flex sm:flex-row flex-col gap-2 justify-between">
                    <div className="basis-1/2">
                        <input type="text" className="text-xs rounded-md w-full max-w-md border border-customGray" placeholder="Cari nama / nomor / label"
                            value={searchText}
                            onChange={e => setsearchText(e.target.value)}
                        />
                    </div>
                    {isChecked ? (
                        <Button color='danger' className='rounded-md' onClick={() => setdeleteModal(true)}>
                            Hapus
                        </Button>
                    ) : (
                        <Button as={Link} href={`/dashboard/campaign/${campaignId}/messages/new`} color='primary' className="rounded-md">
                            Buat Pesan Baru
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
                        selectedKeys={selectedMessage as any}
                        onSelectionChange={setselectedMessage as any}
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
                            items={campaignMessages}
                        // className='font-nunito'
                        >
                            {(item: CampaignMessage) => (
                                <TableRow key={item.id}>
                                    <TableCell >{item.name}</TableCell>
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
                                        {formatDate(item.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(item.updatedAt)}
                                    </TableCell>
                                    <TableCell>
                                        <Button as={Link} href={'/dashboard/campaign/' + campaignId + '/message/' + item.id} variant='bordered' className="rounded-md">
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