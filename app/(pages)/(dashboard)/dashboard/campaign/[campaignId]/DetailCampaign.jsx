'use client'

import { formatDate } from "@/app/utils/helper"
import { Accordion, AccordionItem, Button, Skeleton, Tab, Tabs } from "@nextui-org/react"
import { animated, useTransition } from "@react-spring/web"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import DetailCampaignTable from "./DetailCampaignTable"
import DisplayImage from "@/app/components/dashboard/auto-reply/DisplayImage"
import Link from "next/link"
import TabTitle from "@/app/components/tabs/TabTitle"
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs"
import DisplayFile from "@/app/components/dashboard/DisplayFile"
import { isFileImage } from "@/app/utils/helper/fileHelper"
import { getCampaignDetail, getCampaignReplies , getOutgoingCampaignsByQuery  } from "../../../../../api/repository/campaignRepository"

const DetailCampaign = ({ campaignId }) => {
    const { data: session } = useSession()
    const { push } = useRouter()
    const [isCampaignLoaded, setisCampaignLoaded] = useState(false)
    const [isDetailCampaignLoaded, setisDetailCampaignLoaded] = useState(false)
    const [campaignData, setcampaignData] = useState()


    const [selectedKeys, setselectedKeys] = useState(new Set())
    const [campaignDetail, setcampaignDetail] = useState({
        Terkirim: [],
        Diterima: [],
        Terbaca: [],
        Balasan: []
    })
    const [currentPage, setcurrentPage] = useState<MessageTableStatus>('Terkirim')
    const fetchCampaign = async () => {
        const result = await getCampaignDetail(session.user.token, campaignId)

        if (result.status === 200) {
            const resultData = result.data
            setcampaignData(resultData)
            setisCampaignLoaded(true)
            console.log(resultData)
        }

    }
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

    const listTemplate = [
        {
            id: '1',
            title: 'template-1',
            content: "Join us this month for a celebration of art and music! We'll be hosting the Harmony Heights Music Festival, Samantha Knight's solo art exhibition, and an album release party for River Reed's new album 'Echoes in the Wilderness'. Don't miss out on this exciting lineup of events! [website link]"
        },
        {
            id: '2',
            title: 'template-2',
            content: "Ini template 2"
        }
    ]

    const fetchDetailCampaign = async () => {

        const fetchSent = await getOutgoingCampaignsByQuery(session.user.token , campaignId , '?status=server_ack' )
        
        const fetchReceived = await getOutgoingCampaignsByQuery(session.user.token , campaignId , '?status=delivery_ack' )

        const fetchRead = await getOutgoingCampaignsByQuery(session.user.token , campaignId , '?status=read' )

        const fetchReply = await getCampaignReplies(session.user.token , campaignId , '/replies' )

        if (fetchSent?.ok && fetchRead?.ok && fetchReceived?.ok && fetchReply?.ok) {
            setcampaignDetail({
                Terkirim: (await fetchSent.json()).outgoingCampaigns,
                Terbaca: (await fetchRead.json()).outgoingCampaigns,
                Diterima: (await fetchReceived.json()).outgoingCampaigns,
                Balasan: (await fetchReply.json()).campaignReplies
            })
        }
        setisDetailCampaignLoaded(true)
    }
    useEffect(() => {
        if (session?.user?.token) {
            fetchDetailCampaign()
            fetchCampaign()
        }
    }, [session?.user?.token])
    return (
        <>
            <Breadcrumbs size="sm">
                <BreadcrumbItem href="/dashboard/campaign">campaign</BreadcrumbItem>
                <BreadcrumbItem href={"/dashboard/campaign/" + campaignId}>detail campaign</BreadcrumbItem>
            </Breadcrumbs>
            <div className="mt-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
                <p className="font-lexend font-bold text-2xl">Campaign: {campaignData?.name}</p>
                <Button as={Link} href={`/dashboard/campaign/${campaignId}/message`} color='primary' className="rounded-md w-full lg:w-auto">
                    Atur Pesan Campaign
                </Button>
            </div>
            {isCampaignLoaded ? (
                <div className="w-full bg-white rounded-md p-4 lg:p-6 mt-4 flex flex-col lg:flex-row gap-12">
                    <div className="w-full max-w-xs">
                        <p className="font-lexend text-2xl font-bold">Campaign Detail</p>
                        <table className='w-full border-separate border-spacing-y-1 mt-4'>
                            <tbody >
                                <tr>
                                    <th className='font-bold whitespace-pre '>Campaign Name</th>
                                    <td className="break-all">{campaignData?.name}</td>
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
                                    <td className="break-all">{formatDate(campaignData?.schedule)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full">
                        <Accordion variant="light"
                            isCompact={true}
                            selectionMode="multiple"
                            className="rounded-none"
                            itemClasses={{
                                base: 'py-0 w-full ',
                                title: 'font-bold text-md',
                                trigger: 'py-3 rounded-none '
                            }}>
                            <AccordionItem key="1" aria-label="Tampilan Pesan Subscribe" title="Tampilan Pesan Subscribe">
                                {campaignData?.mediaPath && (
                                    <>
                                        {isFileImage(campaignData.mediaPath) ? (
                                            <DisplayImage imageUrl={campaignData.mediaPath} />
                                        ) : (
                                            <DisplayFile fileUrl={campaignData.mediaPath} />
                                        )}
                                    </>
                                )}
                                <p className="mt-2">
                                    {campaignData?.registrationMessage}
                                </p>
                            </AccordionItem>
                            <AccordionItem key="2" aria-label="Tampilan Pesan Reply" title="Tampilan Pesan Reply">
                                {campaignData?.successMessage}
                            </AccordionItem>
                            <AccordionItem key="3" aria-label="Tampilan Pesan Expired" title="Tampilan Pesan Expired">
                                {campaignData?.failedMessage}
                            </AccordionItem>
                            <AccordionItem key="4" aria-label="Tampilan Pesan Unsubscribe" title="Tampilan Pesan Unsubscribe">
                                {campaignData?.unregisteredMessage}
                            </AccordionItem>
                        </Accordion>
                        <div className="flex justify-end">
                            <Button as={Link} href={"/dashboard/campaign/edit/" + campaignData?.id} color="primary" className="rounded-md">
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
            {isDetailCampaignLoaded ? (
                <>
                    <div className="w-full bg-white rounded-md px-3 py-3 pb-6 mt-2 mb-20">
                        <div className="flex gap-2">
                            <Tabs aria-label="Options" variant="light" color="primary" radius="md" size="lg"
                                selectedKey={currentPage}
                                onSelectionChange={setcurrentPage}>
                                <Tab key="Terkirim" title={<TabTitle text="Terkirim" count={campaignDetail.Terkirim.length} />} />
                                <Tab key="Diterima" title={<TabTitle text="Diterima" count={campaignDetail.Diterima.length} />} />
                                <Tab key="Terbaca" title={<TabTitle text="Terbaca" count={campaignDetail.Terbaca.length} />} />
                                <Tab key="Balasan" title={<TabTitle text="Balasan" count={campaignDetail.Balasan.length} />} />
                            </Tabs>
                        </div>

                        <div className="w-full ">
                            {componentTransition((style, item) => item && (
                                <animated.div style={style}>
                                    <DetailCampaignTable
                                        selectedKeys={selectedKeys}
                                        setSelectedKeys={setselectedKeys}
                                        type={item}
                                        data={campaignDetail[item]}
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

export default DetailCampaign
