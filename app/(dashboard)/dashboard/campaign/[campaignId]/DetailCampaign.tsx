'use client'

import { formatDate, formatDatetoISO8601 } from "@/utils/helper"
import { fetchClient } from "@/utils/helper/fetchClient"
import { CampaignData, CampaignForm, GetCampaign, Label, MessageTableStatus, MessageTypes } from "@/utils/types"
import { Accordion, AccordionItem, Button, Skeleton, Tab, Tabs } from "@nextui-org/react"
import { animated, useTransition } from "@react-spring/web"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import DetailBroadcastTable from "../../broadcast/[broadcastId]/DetailBroadcastTable"
import DetailCampaignTable from "./DetailCampaignTable"

const DetailCampaign = ({ campaignId }: { campaignId: string }) => {
    const { data: session } = useSession()
    const { push } = useRouter()
    const [isCampaignLoaded, setisCampaignLoaded] = useState(false)
    const [isDetailCampaignLoaded, setisDetailCampaignLoaded] = useState(false)
    const [campaignData, setcampaignData] = useState<CampaignData>()
    const [receiverList, setreceiverList] = useState<string[]>([])
    const [requestList, setrequestList] = useState<Label[]>([])
    // const { handleSubmit, register, reset,setValue, formState: { errors } } = useForm<CampaignForm>()
    const [registrationMessage, setregistrationMessage] = useState<string>('')
    const [messageRegistered, setmessageRegistered] = useState('')
    const [messageFailed, setmessageFailed] = useState('')
    const [messageUnregistered, setmessageUnregistered] = useState('')

    const [selectedKeys, setselectedKeys] = useState<Set<string>>(new Set())
    const [campaignDetail, setcampaignDetail] = useState({
        Terkirim: [],
        Diterima: [],
        Terbaca: [],
        Balasan: []
    })
    const [currentPage, setcurrentPage] = useState<MessageTableStatus>('Terkirim')
    const fetchCampaign = async () => {
        const result = await fetchClient({
            url: "/campaigns/" + campaignId,
            method: 'GET',
            user: session?.user
        })
        if (result?.ok) {
            const resultData: CampaignData = await result.json()
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
    const listVariables = [
        'firstName',
        'lastName',
        'gender',
        'country',
        'dob'
    ]
    const sampleContact = {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        colorCode: 'ffff',
        email: 'johnDoe@gmail.com',
        gender: 'male',
        phone: '0123456789',
        country: 'Indonesia',
        dob: '10/10/2000',
        createdAt: '',
        updatedAt: ''
    }
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
    const parseTextInput = (text: string) => {
        return text.replace(/\{\{\$(\w+)}}/g, (match, placeholder) => {
            // @ts-ignore
            return sampleContact[placeholder] || match;
        });
    }
    const handleTemplateClick = (id: string, text: MessageTypes) => {
        const findContent = listTemplate.find(item => item.id === id)?.content
        if (findContent) {
            if (text === 'registrationMessage')
                setregistrationMessage(findContent)
            if (text === 'messageRegistered')
                setmessageRegistered(findContent)
            if (text === 'messageFailed')
                setmessageFailed(findContent)
            if (text === 'messageUnregistered')
                setmessageUnregistered(findContent)
        }
    }
    const handleInsertVariable = (text: string, types: MessageTypes) => {

        if (types === 'registrationMessage')
            setregistrationMessage(prev => prev + '{{$' + text + '}}')
        if (types === 'messageRegistered')
            setmessageRegistered(prev => prev + '{{$' + text + '}}')
        if (types === 'messageFailed')
            setmessageFailed(prev => prev + '{{$' + text + '}}')
        if (types === 'messageUnregistered')
            setmessageUnregistered(prev => prev + '{{$' + text + '}}')

    }
    const fetchDetailCampaign = async () => {
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
            <div className="mt-4 flex items-center justify-between">
                <p className="font-lexend font-bold text-2xl">Campaign: {campaignData?.name}</p>
                <Button color='primary' className="rounded-md">
                    Atur Pesan Campaign
                </Button>
            </div>
            {isCampaignLoaded ? (
                <div className="w-full bg-white rounded-md p-4 lg:p-6 mt-4 flex gap-12">
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
                                    <td className="break-all">{formatDate(campaignData?.schedule!)}</td>
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
                                {campaignData?.registrationMessage}
                            </AccordionItem>
                            <AccordionItem key="2" aria-label="Tampilan Pesan Reply" title="Tampilan Pesan Reply">
                                {campaignData?.messageRegistered}
                            </AccordionItem>
                            <AccordionItem key="3" aria-label="Tampilan Pesan Expired" title="Tampilan Pesan Expired">
                                {campaignData?.messageFailed}
                            </AccordionItem>
                            <AccordionItem key="4" aria-label="Tampilan Pesan Unsubscribe" title="Tampilan Pesan Unsubscribe">
                                {campaignData?.messageUnregistered}
                            </AccordionItem>
                        </Accordion>
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
                    <div className="w-full bg-white rounded-md px-3 py-3 pb-6 mt-2">
                        <div className="flex gap-2">
                            <Tabs aria-label="Options" variant="light" color="primary" radius="md" size="lg"
                                selectedKey={currentPage}
                                onSelectionChange={setcurrentPage as any}>
                                <Tab key="Terkirim" title="Terkirim" />
                                <Tab key="Diterima" title="Diterima" />
                                <Tab key="Terbaca" title="Terbaca" />
                                <Tab key="Balasan" title="Balasan" />
                            </Tabs>
                        </div>

                        <div className="w-full">
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