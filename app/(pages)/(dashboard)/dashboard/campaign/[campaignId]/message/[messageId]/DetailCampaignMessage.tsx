'use client'

import { formatDate, formatDatetoISO8601 } from "@/app/utils/helper"
import { fetchClient } from "@/app/utils/helper/fetchClient"
import { CampaignData, CampaignForm, CampaignMessage, GetCampaign, Label, MessageTableStatus, MessageTypes } from "@/app/utils/types"
import { Accordion, AccordionItem, Button, Skeleton, Tab, Tabs } from "@nextui-org/react"
import { animated, useTransition } from "@react-spring/web"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import DisplayImage from "@/app/components/dashboard/auto-reply/DisplayImage"
import Link from "next/link"
import TabTitle from "@/app/components/tabs/TabTitle"
import DetailCampaignTable from "../../DetailCampaignTable"
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs"
import { isFileImage } from "@/app/utils/helper/fileHelper"
import DisplayFile from "@/app/components/dashboard/DisplayFile"

const DetailCampaignMessage = ({ campaignId, messageId }: { campaignId: string, messageId: string }) => {
    const { data: session } = useSession()
    const { push } = useRouter()
    const [isCampaignLoaded, setisCampaignLoaded] = useState(false)
    const [isDetailCampaignTableLoaded, setisDetailCampaignTableLoaded] = useState(false)
    const [campaignData, setcampaignData] = useState<CampaignData>()
    const [campaignMessage, setcampaignMessage] = useState<CampaignMessage>()
    const [selectedKeys, setselectedKeys] = useState<Set<string>>(new Set())
    const [messageDetail, setmessageDetail] = useState({
        Terkirim: [],
        Diterima: [],
        Terbaca: [],
        Balasan: []
    })
    const [currentPage, setcurrentPage] = useState<MessageTableStatus>('Terkirim')
    const componentTransition = useTransition(currentPage, {
        from: {
            transform: "translateX(100px)",
            opacity: "0",
        },
        enter: {
            transform: "translateX(0px)",
            opacity: "1",
        },
    })
    const fetchCampaignData = async () => {
        const result = await fetchClient({
            url: "/campaigns/" + campaignId,
            method: 'GET',
            user: session?.user
        })
        if (result?.ok) {
            const resultData: CampaignData = await result.json()
            setcampaignData(resultData)
        }
    }
    const fetchCampaignMessage = async () => {
        const result = await fetchClient({
            url: "/campaigns/messages/" + messageId,
            method: 'GET',
            user: session?.user
        })
        if (result?.ok) {
            const resultData = await result.json()
            setcampaignMessage(resultData)
            setisCampaignLoaded(true)
            console.log(resultData)
        } if (result?.status === 404) {
            toast.error('Campaign Message tidak ditemukan')
            push('/dashboard/campaign/' + campaignId + '/messages')
        }

    }


    const fetchDetailCampaignTable = async () => {
        const fetchSent = await fetchClient({
            url: '/campaigns/' + campaignId + '/outgoing?status=server_ack',
            method: 'GET',
            user: session?.user
        })
        const fetchReceived = await fetchClient({
            url: '/campaigns/' + campaignId + '/outgoing?status=delivery_ack',
            method: 'GET',
            user: session?.user
        })
        const fetchRead = await fetchClient({
            url: '/campaigns/' + campaignId + '/outgoing?status=read',
            method: 'GET',
            user: session?.user
        })
        const fetchReply = await fetchClient({
            url: '/campaigns/' + campaignId + '/replies',
            method: 'GET',
            user: session?.user
        })
        if (fetchSent?.ok && fetchRead?.ok && fetchReceived?.ok && fetchReply?.ok) {
            setmessageDetail({
                Terkirim: (await fetchSent.json()).outgoingCampaigns,
                Terbaca: (await fetchRead.json()).outgoingCampaigns,
                Diterima: (await fetchReceived.json()).outgoingCampaigns,
                Balasan: (await fetchReply.json()).campaignReplies
            })
        }
        setisDetailCampaignTableLoaded(true)
    }
    useEffect(() => {
        if (session?.user?.token) {
            fetchCampaignData()
            fetchDetailCampaignTable()
            fetchCampaignMessage()
        }
    }, [session?.user?.token])
    return (
        <>
            <Breadcrumbs size="sm">
                <BreadcrumbItem href="/dashboard/campaign">campaign</BreadcrumbItem>
                <BreadcrumbItem href={"/dashboard/campaign/" + campaignId}>detail campaign</BreadcrumbItem>
                <BreadcrumbItem href={"/dashboard/campaign/" + campaignId + '/message'}>campaign message</BreadcrumbItem>
                <BreadcrumbItem href={"/dashboard/campaign/" + campaignId + '/message/' + messageId}>detail campaign message</BreadcrumbItem>
            </Breadcrumbs>
            <p className="font-lexend font-bold text-2xl mt-4">Campaign Message: {campaignData?.name}/{campaignMessage?.name}</p>
            {isCampaignLoaded ? (
                <div className="w-full bg-white rounded-md p-4 lg:p-6 mt-4 flex flex-col lg:flex-row gap-12">
                    <div className="w-full max-w-xs">
                        <p className="font-lexend text-2xl font-bold">Campaign Message Detail</p>
                        <table className='w-full border-separate border-spacing-y-1 mt-4'>
                            <tbody >
                                <tr>
                                    <th className='font-bold whitespace-pre '>Message Name</th>
                                    <td className="break-all">{campaignMessage?.name}</td>
                                </tr>
                                <tr>
                                    <th className='font-bold whitespace-pre '>Device</th>
                                    <td className="break-all">{campaignData?.device.name}</td>
                                    {/* <td className="break-all">{campaignData?.device.name}</td> */}
                                </tr>
                                <tr>
                                    <th className='font-bold whitespace-pre '>Recipients</th>
                                    <td className="break-all">{campaignData?.recipients?.length}</td>
                                </tr>
                                <tr>
                                    <th className='font-bold whitespace-pre '>Schedule</th>
                                    <td className="break-all">{formatDate(campaignMessage?.schedule!)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full">
                        <p className="font-lexend text-xl font-bold">Tampilan Pesan</p>
                        <div className="relative">
                            <div className="rounded-md border border-customGray px-4 py-3 mt-8">

                                {campaignMessage?.message}
                            </div>
                            <div className="absolute bottom-1 right-2 text-customGray text-sm">
                                <p>now &#10003;</p>
                            </div>
                        </div>
                        {campaignMessage?.mediaPath && (
                            <>
                                <p className="my-2">Media</p>
                                {isFileImage(campaignMessage.mediaPath) ? (
                                    <DisplayImage imageUrl={campaignMessage.mediaPath} />
                                ) : (
                                    <DisplayFile fileUrl={campaignMessage.mediaPath} />
                                )}

                            </>
                        )}
                        <div className="flex justify-end mt-2">
                            <Button as={Link} href={"/dashboard/campaign/" + campaignId + '/message/' + messageId + '/edit'} color="primary" className="rounded-md">
                                Edit
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className='mt-4 flex flex-col gap-2 p-4 bg-white'>

                        <Skeleton className={'w-full h-3 rounded-full'} />
                        <Skeleton className={'w-full h-3 rounded-full'} />
                        <Skeleton className={'w-full h-3 rounded-full'} />
                    </div>
                </>
            )}
            {isDetailCampaignTableLoaded ? (
                <>
                    <div className="w-full bg-white rounded-md px-3 py-3 pb-6 mt-2 mb-20">
                        <div className="flex gap-2">
                            <Tabs aria-label="Options" variant="light" color="primary" radius="md" size="lg"
                                selectedKey={currentPage}
                                onSelectionChange={setcurrentPage as any}>
                                <Tab key="Terkirim" title={<TabTitle text="Terkirim" count={messageDetail.Terkirim.length} />} />
                                <Tab key="Diterima" title={<TabTitle text="Diterima" count={messageDetail.Diterima.length} />} />
                                <Tab key="Terbaca" title={<TabTitle text="Terbaca" count={messageDetail.Terbaca.length} />} />
                                <Tab key="Balasan" title={<TabTitle text="Balasan" count={messageDetail.Balasan.length} />} />
                            </Tabs>
                        </div>

                        <div className="w-full ">
                            {componentTransition((style, item) => item && (
                                <animated.div style={style}>
                                    <DetailCampaignTable
                                        selectedKeys={selectedKeys as any}
                                        setSelectedKeys={setselectedKeys as any}
                                        type={item}
                                        data={messageDetail[item]}
                                    />
                                </animated.div>
                            ))}
                        </div>

                    </div>
                </>
            ) : (
                <>
                    <div className='mt-4 flex flex-col gap-2 p-4 bg-white'>

                        <Skeleton className={'w-full h-3 rounded-full'} />
                        <Skeleton className={'w-full h-3 rounded-full'} />
                        <Skeleton className={'w-full h-3 rounded-full'} />
                    </div >
                </>
            )}
        </>
    )
}

export default DetailCampaignMessage