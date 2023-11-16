'use client'
import InputContactAndLabel from "@/components/dashboard/InputContactAndLabel"
import MultipleInputContact from "@/components/dashboard/MultipleInputContact"
import MultipleInputLabel from "@/components/dashboard/MultipleInputLabel"
import TextAreaInput from "@/components/dashboard/chat/TextAreaInput"
import InputForm from "@/components/form/InputForm"
import { formatDatetoISO8601 } from "@/utils/helper"
import { fetchClient } from "@/utils/helper/fetchClient"
import { ContactData, DeviceSession, Label } from "@/utils/types"
import { Button, Tab, Tabs } from "@nextui-org/react"
import { animated, useTransition } from "@react-spring/web"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
interface CampaignForm {
    name: string,
    deviceId: string,
    recipients: string[],
    registrationSyntax: string,
    unregistrationSyntax: string,
    registrationMessage: string,
    messageRegistered: string,
    messageFailed: string,
    messageUnregistered: string,
    delay: number, // in miliseconds
    schedule: string
}
type MessageTypes = 'registrationMessage' | 'messageRegistered' | 'messageFailed' | 'messageUnregistered'
const CreateCampaign = () => {
    const { push } = useRouter()
    const { data: session } = useSession()
    const [isLoading, setisLoading] = useState(false)
    const [listDevice, setlistDevice] = useState<DeviceSession[]>([])
    const [isDisabled, setisDisabled] = useState(true)
    const { handleSubmit, register, reset, formState: { errors } } = useForm<CampaignForm>()
    const [receiverList, setreceiverList] = useState<string[]>([])
    const [requestList, setrequestList] = useState<Label[]>([])
    const [registrationMessage, setregistrationMessage] = useState<string>('')
    const [messageRegistered, setmessageRegistered] = useState('')
    const [messageFailed, setmessageFailed] = useState('')
    const [messageUnregistered, setmessageUnregistered] = useState('')
    const [currentMessage, setcurrentMessage] = useState<MessageTypes>('registrationMessage')
    const componentTransition = useTransition(currentMessage, {
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
    const onSubmit = async (formData: CampaignForm) => {
        setisLoading(true)
        let mark = true
        console.log(formData)
        if (receiverList.length === 0) {
            toast.error('Penerima masih kosong!')
            mark = false
        }
        if (registrationMessage.length === 0 || messageRegistered.length === 0 || messageFailed.length === 0 || messageUnregistered.length === 0) {
            toast.error('Message masih kosong!')
            mark = false
        }
        if (!formData.deviceId) {
            toast.error('Device masih kosong!')
            mark = false
        }
        if (mark) {
            const campaignData: CampaignForm = {
                name: formData.name,
                deviceId: formData.deviceId,
                recipients: receiverList,
                delay: 4000,
                registrationMessage: registrationMessage,
                messageRegistered: messageRegistered,
                messageFailed: messageFailed,
                messageUnregistered: messageUnregistered,
                registrationSyntax: formData.registrationSyntax,
                unregistrationSyntax: formData.unregistrationSyntax,
                schedule: formatDatetoISO8601(formData.schedule)
            }
            console.log(campaignData)
            const result = await fetchClient({
                url: '/campaigns',
                method: 'POST',
                body: JSON.stringify(campaignData),
                user: session?.user
            })
            if (result?.ok) {
                toast.success('Berhasil buat campaign')
                push('/dashboard/campaign')
            } else {
                toast.error('Gagal buat campaign')

            }
        }
        setisLoading(false)
    }
    // const fetchContactData = async () => {
    //     const result = await fetchClient({
    //         url: '/contacts',
    //         method: 'GET',
    //         user: session?.user
    //     })
    //     if (result?.ok) {
    //         const resultData = await result.json()
    //         const updatedReceiverList = [...receiverList, ...resultData]
    //         setreceiverList(updatedReceiverList)
    //     }
    // }
    useEffect(() => {
        if (session?.user?.device && listDevice.length === 0) {
            setlistDevice(session.user.device)
            // fetchContactData()
        }
    }, [session?.user?.device])
    useEffect(() => {
        if (registrationMessage && messageRegistered && messageFailed && messageUnregistered && receiverList.length > 0) {
            setisDisabled(false)
        } else {
            setisDisabled(true)

        }
    }, [registrationMessage, receiverList, requestList, messageRegistered, messageFailed, messageUnregistered])
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center lg:items-start lg:flex-row flex-col gap-4 mt-4'>
            <div className='max-w-sm w-full items-center flex flex-col gap-4'>
                <div className='w-full bg-white rounded-md p-4 flex flex-col gap-4'>
                    <p className="font-lexend font-bold text-2xl">Buat Campaign</p>
                    <div>
                        <p className="mb-2">Nama Campaign</p>
                        <InputForm register={register} config={{
                            name: 'name',
                            placeholder: 'Nama campaign',
                            type: 'text',
                            error: errors.name,
                            registerConfig: {
                                required: 'required'
                            }
                        }} />
                    </div>

                    <div>
                        <p className="mb-2">Device</p>
                        <select {...register('deviceId')} className="px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border-[#B0B4C5] focus:border-primary">
                            {listDevice.map(item => (
                                <option key={item.id} value={item.id} className="">{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p className="mb-2">Penerima</p>
                        {/* <TagsInput /> */}
                        <InputContactAndLabel
                            selectedKeys={receiverList}
                            setselectedKeys={setreceiverList}
                        />
                    </div>
                    <div>
                        <p className="mb-2">Jadwal Campaign</p>
                        <InputForm register={register} config={{
                            name: 'schedule',
                            placeholder: 'Nama campaign',
                            type: 'datetime-local',
                            error: errors.schedule,
                            registerConfig: {
                                required: 'required'
                            }
                        }} />
                    </div>
                    <div>
                        <p className="mb-2">Subscription Syntax</p>
                        <InputForm register={register} config={{
                            name: 'registrationSyntax',
                            placeholder: 'Syntax',
                            type: 'text',
                            error: errors.registrationSyntax,
                            registerConfig: {
                                required: 'required'
                            }
                        }} />
                    </div>
                    <div>
                        <p className="mb-2">UnSubscription Syntax</p>
                        <InputForm register={register} config={{
                            name: 'unregistrationSyntax',
                            placeholder: 'Syntax',
                            type: 'text',
                            error: errors.unregistrationSyntax,
                            registerConfig: {
                                required: 'required'
                            }
                        }} />
                    </div>
                </div>
                <div className='w-full bg-white rounded-md p-4'>
                    <p className="font-bold text-xl font-lexend">Trigger</p>
                    {/* <div className="mt-4">
                        <p className="mb-2">Kata</p>
                        <MultipleInputLabel setlabelList={setrequestList} labelList={requestList} placeholder="tambah kata" maxChar={20} />
                    </div> */}
                </div>

            </div>
            <div className='w-full max-w-sm lg:max-w-full'>
                <div className='bg-white w-full p-4'>
                    <Tabs aria-label="Options" variant="light" color="primary" radius="md" size="lg"
                        selectedKey={currentMessage}
                        onSelectionChange={setcurrentMessage as any}>

                        <Tab key="registrationMessage" title="Subscribe" />
                        <Tab key="messageRegistered" title="Success" />
                        <Tab key="messageFailed" title="Failed" />
                        <Tab key="messageUnregistered" title="Unsubscribe" />
                    </Tabs>
                    {componentTransition((style, item) => item && (
                        <animated.div style={style} className={'mt-4'}>
                            {item === 'registrationMessage' && (
                                <p className="font-bold text-xl font-lexend">Pesan Subscribe</p>
                            )}
                            {item === 'messageRegistered' && (
                                <p className="font-bold text-xl font-lexend">Reply Success</p>
                            )}
                            {item === 'messageFailed' && (
                                <p className="font-bold text-xl font-lexend">Reply Failed</p>
                            )}
                            {item === 'messageUnregistered' && (
                                <p className="font-bold text-xl font-lexend">Reply Unsubscribe</p>
                            )}
                            <div className="mt-4">
                                <p>Template</p>
                                <div className="flex gap-2 flex-wrap w-full mt-2">
                                    {listTemplate.map(list => (
                                        <div key={list.id} className='rounded-full px-2 py-[2px] border border-customGray hover:cursor-pointer' onClick={() => handleTemplateClick(list.id, item)}>
                                            {list.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="mb-2">Response</p>
                                {item === 'registrationMessage' && (
                                    <TextAreaInput text={registrationMessage} settext={setregistrationMessage} limit={255} />
                                )}
                                {item === 'messageRegistered' && (
                                    <TextAreaInput text={messageRegistered} settext={setmessageRegistered} limit={255} />
                                )}
                                {item === 'messageFailed' && (
                                    <TextAreaInput text={messageFailed} settext={setmessageFailed} limit={255} />
                                )}
                                {item === 'messageUnregistered' && (
                                    <TextAreaInput text={messageUnregistered} settext={setmessageUnregistered} limit={255} />
                                )}
                            </div>
                            <div className="flex gap-2 flex-wrap mt-2">
                                {listVariables.map(list => (
                                    <div key={list} className='rounded-full px-2 py-[2px] border border-customGray hover:cursor-pointer' onClick={() => handleInsertVariable(list, item)}>
                                        {list}
                                    </div>
                                ))}
                            </div>
                            {(item === 'registrationMessage' && registrationMessage) && (
                                <div className="mt-4">
                                    <p>Hasil Pesan Campaign</p>
                                    <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-3 mt-2'>
                                        {parseTextInput(registrationMessage)}
                                    </div>
                                </div>
                            )}
                            {(item === 'messageRegistered' && messageRegistered) && (
                                <div className="mt-4">
                                    <p>Hasil Pesan Campaign</p>
                                    <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-3 mt-2'>
                                        {parseTextInput(messageRegistered)}
                                    </div>
                                </div>
                            )}
                            {(item === 'messageFailed' && messageFailed) && (
                                <div className="mt-4">
                                    <p>Hasil Pesan Campaign</p>
                                    <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-3 mt-2'>
                                        {parseTextInput(messageFailed)}
                                    </div>
                                </div>
                            )}
                            {(item === 'messageUnregistered' && messageUnregistered) && (
                                <div className="mt-4">
                                    <p>Hasil Pesan Campaign</p>
                                    <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-3 mt-2'>
                                        {parseTextInput(messageUnregistered)}
                                    </div>
                                </div>
                            )}
                        </animated.div>
                    ))}
                    <Button color="primary" className="rounded-md mt-8" fullWidth type="submit" isLoading={isLoading} isDisabled={isDisabled}>
                        Simpan
                    </Button>
                </div>

            </div>
        </form>
    )
}

export default CreateCampaign