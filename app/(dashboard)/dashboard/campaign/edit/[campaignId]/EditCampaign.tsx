'use client'
import InputContactAndLabel from "@/components/dashboard/InputContactAndLabel"
import MultipleInputContact from "@/components/dashboard/MultipleInputContact"
import MultipleInputLabel from "@/components/dashboard/MultipleInputLabel"
import UploadFile from "@/components/dashboard/UploadFile"
import DisplayImage from "@/components/dashboard/auto-reply/DisplayImage"
import TextAreaInput from "@/components/dashboard/chat/TextAreaInput"
import InputForm from "@/components/form/InputForm"
import { formatDatetoISO8601 } from "@/utils/helper"
import { fetchClient } from "@/utils/helper/fetchClient"
import { getMessageVariables, parseTextInput } from "@/utils/helper/messageUtils"
import { CampaignData, CampaignForm, ContactData, DeviceSession, Label, MessageTypes } from "@/utils/types"
import { Button, Tab, Tabs } from "@nextui-org/react"
import { animated, useTransition } from "@react-spring/web"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"


const CreateCampaign = ({ campaignData }: { campaignData: CampaignData }) => {
    const { push } = useRouter()
    const { data: session } = useSession()
    const [isLoading, setisLoading] = useState(false)
    const [listDevice, setlistDevice] = useState<DeviceSession[]>([])
    const [isDisabled, setisDisabled] = useState(true)
    const { handleSubmit, register, setValue, formState: { errors } } = useForm<CampaignForm>()
    const [receiverList, setreceiverList] = useState<string[]>([])
    const [requestList, setrequestList] = useState<Label[]>([])
    const [registrationMessage, setregistrationMessage] = useState<string>('')
    const [files, setfiles] = useState<File[]>([])
    const [successMessage, setsuccessMessage] = useState('')
    const [failedMessage, setfailedMessage] = useState('')
    const [unregisteredMessage, setunregisteredMessage] = useState('')
    const [currentMessage, setcurrentMessage] = useState<MessageTypes>('registrationMessage')
    const [campaignImage, setcampaignImage] = useState<string | null>(null)
    const [isLabelLoaded, setisLabelLoaded] = useState(false)

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

    const handleTemplateClick = (id: string, text: MessageTypes) => {
        const findContent = listTemplate.find(item => item.id === id)?.content
        if (findContent) {
            if (text === 'registrationMessage')
                setregistrationMessage(findContent)
            if (text === 'successMessage')
                setsuccessMessage(findContent)
            if (text === 'failedMessage')
                setfailedMessage(findContent)
            if (text === 'unregisteredMessage')
                setunregisteredMessage(findContent)
        }
    }
    const handleInsertVariable = (text: string, types: MessageTypes) => {

        if (types === 'registrationMessage')
            setregistrationMessage(prev => prev + '{{$' + text + '}}')
        if (types === 'successMessage')
            setsuccessMessage(prev => prev + '{{$' + text + '}}')
        if (types === 'failedMessage')
            setfailedMessage(prev => prev + '{{$' + text + '}}')
        if (types === 'unregisteredMessage')
            setunregisteredMessage(prev => prev + '{{$' + text + '}}')

    }
    const onSubmit = async (campaignFormData: CampaignForm) => {
        setisLoading(true)
        let mark = true
        console.log(campaignFormData)
        if (receiverList.length === 0) {
            toast.error('Penerima masih kosong!')
            mark = false
        }
        if (registrationMessage.length === 0 || successMessage.length === 0 || failedMessage.length === 0 || unregisteredMessage.length === 0) {
            toast.error('Message masih kosong!')
            mark = false
        }
        if (!campaignFormData.deviceId) {
            toast.error('Device masih kosong!')
            mark = false
        }
        if (mark) {
            const formData = new FormData()
            const delay = 4000
            // media
            //
            if (files.length > 0)
                // @ts-ignore
                formData.set('media', files[0].file, files[0].name)
            formData.append('name', campaignFormData.name)
            formData.append('deviceId', campaignFormData.deviceId)
            receiverList.forEach((element, idx) => {
                formData.append(`recipients[${idx}]`, element)
            })
            formData.append('registrationMessage', registrationMessage)
            formData.append('successMessage', successMessage)
            formData.append('failedMessage', failedMessage)
            formData.append('unregisteredMessage', unregisteredMessage)
            formData.append('registrationSyntax', campaignFormData.registrationSyntax)
            formData.append('unregistrationSyntax', campaignFormData.unregistrationSyntax)
            formData.append('schedule', formatDatetoISO8601(campaignFormData.schedule))
            formData.append('delay', delay.toString())
            const result = await fetchClient({
                url: '/campaigns/' + campaignData.id,
                method: 'PUT',
                body: formData,
                isFormData: true,
                user: session?.user
            })
            if (result?.ok) {
                toast.success('Berhasil ubah campaign')
                push('/dashboard/campaign')
            } else {
                toast.error('Gagal ubah campaign')
            }

        }
        setisLoading(false)
    }
    useEffect(() => {
        if (session?.user?.device && listDevice.length === 0) {
            setlistDevice(session.user.device)
        }
    }, [session?.user?.device])
    useEffect(() => {
        if (registrationMessage && successMessage && failedMessage && unregisteredMessage && receiverList.length > 0) {
            setisDisabled(false)
        } else {
            setisDisabled(true)

        }
    }, [registrationMessage, receiverList, requestList, successMessage, failedMessage, unregisteredMessage])
    useEffect(() => {
        if (listDevice.length > 0) {
            setValue('name', campaignData.name)
            const findDevice = listDevice.find(item => item.name === campaignData.device.name)
            if (findDevice)
                setValue('deviceId', findDevice?.id)
            setreceiverList(campaignData.recipients)
            setValue('schedule', (new Date(campaignData.schedule).toISOString().slice(0, 16)))
            console.log(campaignData)
            if (campaignData.mediaPath)
                setcampaignImage(campaignData.mediaPath)
            setregistrationMessage(campaignData.registrationMessage)
            setsuccessMessage(campaignData.successMessage)
            setfailedMessage(campaignData.failedMessage)
            setunregisteredMessage(campaignData.unregisteredMessage)
            setValue('registrationSyntax', campaignData.registrationSyntax)
            setValue('unregistrationSyntax', campaignData.unregistrationSyntax)
            console.log(campaignData)
        }
    }, [listDevice])
    useEffect(() => {
        if (receiverList.length > 0 && !isLabelLoaded) setisLabelLoaded(true)
    }, [receiverList])
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center lg:items-start lg:flex-row flex-col gap-4 mt-4'>
            <div className='max-w-sm w-full items-center flex flex-col gap-4'>
                <div className='w-full bg-white rounded-md p-4 flex flex-col gap-4'>
                    <p className="font-lexend font-bold text-2xl">Edit Campaign</p>
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
                        {isLabelLoaded && (
                            <InputContactAndLabel
                                selectedKeys={receiverList}
                                setselectedKeys={setreceiverList}
                            />
                        )}
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

                </div>

            </div>
            <div className='w-full max-w-sm lg:max-w-full'>
                <div className='bg-white w-full p-4'>
                    <Tabs aria-label="Options" variant="light" color="primary" radius="md" size="lg"
                        selectedKey={currentMessage}
                        onSelectionChange={setcurrentMessage as any}>

                        <Tab key="registrationMessage" title="Subscribe" />
                        <Tab key="successMessage" title="Success" />
                        <Tab key="failedMessage" title="Failed" />
                        <Tab key="unregisteredMessage" title="Unsubscribe" />
                    </Tabs>
                    {componentTransition((style, item) => item && (
                        <animated.div style={style} className={'mt-4'}>
                            {item === 'registrationMessage' && (
                                <p className="font-bold text-xl font-lexend">Pesan Subscribe</p>
                            )}
                            {item === 'successMessage' && (
                                <p className="font-bold text-xl font-lexend">Reply Success</p>
                            )}
                            {item === 'failedMessage' && (
                                <p className="font-bold text-xl font-lexend">Reply Failed</p>
                            )}
                            {item === 'unregisteredMessage' && (
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
                                    <>
                                        <TextAreaInput text={registrationMessage} settext={setregistrationMessage} limit={255} />
                                        {campaignImage && (
                                            <>
                                                <p className="my-2">Media</p>
                                                <DisplayImage imageUrl={campaignImage} />
                                            </>
                                        )}
                                        <div className="mt-2" />
                                        <UploadFile
                                            files={files}
                                            setfiles={setfiles}
                                        />
                                    </>
                                )}
                                {item === 'successMessage' && (
                                    <>
                                        <TextAreaInput text={successMessage} settext={setsuccessMessage} limit={255} />
                                    </>
                                )}
                                {item === 'failedMessage' && (
                                    <>
                                        <TextAreaInput text={failedMessage} settext={setfailedMessage} limit={255} />
                                    </>
                                )}
                                {item === 'unregisteredMessage' && (
                                    <>
                                        <TextAreaInput text={unregisteredMessage} settext={setunregisteredMessage} limit={255} />

                                    </>
                                )}

                            </div>
                            <div className="flex gap-2 flex-wrap mt-2">
                                {getMessageVariables().map(list => (
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
                            {(item === 'successMessage' && successMessage) && (
                                <div className="mt-4">
                                    <p>Hasil Pesan Campaign</p>
                                    <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-3 mt-2'>
                                        {parseTextInput(successMessage)}
                                    </div>
                                </div>
                            )}
                            {(item === 'failedMessage' && failedMessage) && (
                                <div className="mt-4">
                                    <p>Hasil Pesan Campaign</p>
                                    <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-3 mt-2'>
                                        {parseTextInput(failedMessage)}
                                    </div>
                                </div>
                            )}
                            {(item === 'unregisteredMessage' && unregisteredMessage) && (
                                <div className="mt-4">
                                    <p>Hasil Pesan Campaign</p>
                                    <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-3 mt-2'>
                                        {parseTextInput(unregisteredMessage)}
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