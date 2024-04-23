'use client'
import InputContactAndLabel from "@/app/components/dashboard/InputContactAndLabel"
import MultipleInputContact from "@/app/components/dashboard/MultipleInputContact"
import MultipleInputLabel from "@/app/components/dashboard/MultipleInputLabel"
import UploadFile from "@/app/components/dashboard/UploadFile"
import TextAreaInput from "@/app/components/dashboard/chat/TextAreaInput"
import InputForm from "@/app/components/form/InputForm"
import { formatDatetoISO8601 } from "@/app/utils/helper"
import { fetchClient } from "@/app/utils/helper/fetchClient"
import { getMessageVariables, parseTextInput } from "@/app/utils/helper/messageUtils"
import { CampaignForm, ContactData, DeviceSession, Label, MessageTypes } from "@/app/utils/types"
import { Button, Tab, Tabs } from "@nextui-org/react"
import { animated, useTransition } from "@react-spring/web"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs"
import useTemplate from "@/app/components/hooks/useTemplate"
import SelectDevice from "@/app/components/form/SelectDevice"

const CreateCampaign = () => {
    const { push } = useRouter()
    const { data: session } = useSession()
    const { templateList, loading } = useTemplate(session?.user)
    const [isLoading, setisLoading] = useState(false)
    const [listDevice, setlistDevice] = useState([])
    const [isDisabled, setisDisabled] = useState(true)
    const { handleSubmit, register, reset, formState: { errors } } = useForm()
    const [receiverList, setreceiverList] = useState([])
    const [requestList, setrequestList] = useState([])
    const [registrationMessage, setregistrationMessage] = useState('')
    const [files, setfiles] = useState([])
    const [successMessage, setsuccessMessage] = useState('')
    const [failedMessage, setfailedMessage] = useState('')
    const [unregisteredMessage, setunregisteredMessage] = useState('')
    const [currentMessage, setcurrentMessage] = useState('registrationMessage')

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

    const handleTemplateClick = (id, text) => {
        const findContent = templateList.find(item => item.id === id)?.message
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
    const handleInsertVariable = (text, types) => {

        if (types === 'registrationMessage')
            setregistrationMessage(prev => prev + '{{$' + text + '}}')
        if (types === 'successMessage')
            setsuccessMessage(prev => prev + '{{$' + text + '}}')
        if (types === 'failedMessage')
            setfailedMessage(prev => prev + '{{$' + text + '}}')
        if (types === 'unregisteredMessage')
            setunregisteredMessage(prev => prev + '{{$' + text + '}}')

    }
    const onSubmit = async (campaignFormData) => {
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
                formData.set('media', files[0].file, files[0].file.name)
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
                url: '/campaigns',
                method: 'POST',
                body: formData,
                isFormData: true,
                user: session?.user
            })

            if (result.status === 201) {
                toast.success('Berhasil buat campaign')
                push('/dashboard/campaign')
            } else {
                toast.error('Gagal buat campaign')
                if (result) {
                    const response = result.data
                    toast.error(response.message)
                }
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
    return (
        <>
            <Breadcrumbs size="sm">
                <BreadcrumbItem href="/dashboard/campaign">campaign</BreadcrumbItem>
                <BreadcrumbItem href={"/dashboard/campaign/new"}>create campaign</BreadcrumbItem>
            </Breadcrumbs>
            <p className='text-lexend font-bold text-2xl mt-4'>Buat Campaign Baru</p>
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
                            <SelectDevice register={register} listDevice={listDevice} name="deviceId" />
                        </div>
                        <div>
                            <p className="mb-2">Penerima</p>
                            {/* <TagsInput /> */}
                            <InputContactAndLabel
                                selectedKeys={receiverList}
                                setselectedKeys={setreceiverList}
                                user={session?.user}
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
                </div>
                <div className='w-full max-w-sm lg:max-w-full'>
                    <div className='bg-white w-full p-4'>
                        <Tabs aria-label="Options" variant="light" color="primary" radius="md" size="lg"
                            selectedKey={currentMessage}
                            onSelectionChange={setcurrentMessage}>

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
                                {templateList.length > 0 && (
                                    <>
                                        <div className="mt-4">
                                            <p>Template</p>
                                            <div className="flex gap-2 flex-wrap w-full mt-2">
                                                {templateList.map(list => (
                                                    <div key={list.id} className='rounded-full px-2 py-[2px] border border-customGray/50 hover:border-customGray hover:cursor-pointer' onClick={() => handleTemplateClick(list.id, item)}>
                                                        {list.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="mt-4">
                                    <p className="mb-2">Response</p>
                                    {item === 'registrationMessage' && (
                                        <>
                                            <TextAreaInput text={registrationMessage} settext={setregistrationMessage} limit={255} />
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
                                    {getMessageVariables(true).map(list => (
                                        <div key={list} className='rounded-full px-2 py-[2px] border border-customGray hover:cursor-pointer' onClick={() => handleInsertVariable(list, item)}>
                                            {list}
                                        </div>
                                    ))}
                                </div>
                                {(item === 'registrationMessage' && registrationMessage) && (
                                    <div className="mt-4">
                                        <p>Hasil Pesan Campaign</p>
                                        <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-3 mt-2'>
                                            {parseTextInput(registrationMessage, true)}
                                        </div>
                                    </div>
                                )}
                                {(item === 'successMessage' && successMessage) && (
                                    <div className="mt-4">
                                        <p>Hasil Pesan Campaign</p>
                                        <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-3 mt-2'>
                                            {parseTextInput(successMessage, true)}
                                        </div>
                                    </div>
                                )}
                                {(item === 'failedMessage' && failedMessage) && (
                                    <div className="mt-4">
                                        <p>Hasil Pesan Campaign</p>
                                        <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-3 mt-2'>
                                            {parseTextInput(failedMessage, true)}
                                        </div>
                                    </div>
                                )}
                                {(item === 'unregisteredMessage' && unregisteredMessage) && (
                                    <div className="mt-4">
                                        <p>Hasil Pesan Campaign</p>
                                        <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-3 mt-2'>
                                            {parseTextInput(unregisteredMessage, true)}
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
        </>
    )
}

export default CreateCampaign