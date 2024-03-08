'use client'
import DisabledForm from "@/app/components/DisabledForm"
import InputContactAndLabel from "@/app/components/dashboard/InputContactAndLabel"
import TemplateContainer from "@/app/components/dashboard/TemplateContainer"
import UploadFile from "@/app/components/dashboard/UploadFile"
import TextAreaInput from "@/app/components/dashboard/chat/TextAreaInput"
import InputForm from "@/app/components/form/InputForm"
import useTemplate from "@/app/components/hooks/useTemplate"
import { formatDatetoISO8601 } from "@/app/utils/helper"
import { fetchClient } from "@/app/utils/helper/fetchClient"
import { getMessageVariables, parseTextInput } from "@/app/utils/helper/messageUtils"
import { CampaignData, CampaignMessageForm } from "@/app/utils/types"
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs"
import { Button } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const CreateCampaignMessage = ({ campaignId }: {
    campaignId: string
}) => {
    const { push } = useRouter()
    const { data: session } = useSession()
    const { loading, templateList } = useTemplate(session?.user)
    const [isLoading, setisLoading] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [isDisabled, setisDisabled] = useState(true)
    const { handleSubmit, register, formState: { errors } } = useForm<CampaignMessageForm>()
    const [files, setfiles] = useState<File[]>([])
    const [inputText, setinputText] = useState('')
    const [receiverList, setreceiverList] = useState<string[]>([])
    const [campaignData, setcampaignData] = useState<CampaignData>()

    const handleTemplateClick = (id: string) => {
        const findContent = templateList.find(item => item.id === id)?.message
        if (findContent) {
            setinputText(findContent)
        }
    }
    const handleInsertVariable = (text: string) => {
        setinputText(prev => prev + '{{$' + text + '}}')
    }
    const onSubmit = async (CampaignMessageFormData: CampaignMessageForm) => {
        setisLoading(true)
        let mark = true
        if (inputText.length === 0) {
            toast.error('Message masih kosong!')
            mark = false
        }
        if (mark) {
            const formData = new FormData()
            const delay = 4000

            if (files.length > 0) {
                // @ts-ignore
                formData.set('media', files[0].file, files[0].name)
            }
            formData.append('name', CampaignMessageFormData.name)
            formData.append('message', inputText)
            formData.append('campaignId', campaignId)
            formData.append('schedule', formatDatetoISO8601(CampaignMessageFormData.schedule))
            formData.append('delay', delay.toString())
            const result = await fetchClient({
                url: '/campaigns/messages',
                method: 'POST',
                body: formData,
                isFormData: true,
                user: session?.user
            })
            if (result?.ok) {
                toast.success('Berhasil buat campaign message!')
                push('/dashboard/campaign/' + campaignId + '/message')
            } else {
                toast.error('Gagal buat campaign message')
            }

        }
        setisLoading(false)
    }
    const fetchCampaignData = async () => {
        const result = await fetchClient({
            url: "/campaigns/" + campaignId,
            method: 'GET',
            user: session?.user
        })
        if (result?.ok) {
            const resultData: CampaignData = await result.json()
            setcampaignData(resultData)
            console.log(resultData)
        }
        setisLoaded(true)
    }
    useEffect(() => {
        if (inputText) {
            setisDisabled(false)
        } else {
            setisDisabled(true)
        }
    }, [inputText])
    useEffect(() => {
        if (session?.user?.token && !campaignData)
            fetchCampaignData()

    }, [session?.user?.token])
    return (
        <>
            <Breadcrumbs size="sm">
                <BreadcrumbItem href="/dashboard/campaign">campaign</BreadcrumbItem>
                <BreadcrumbItem href={"/dashboard/campaign/" + campaignId}>detail campaign</BreadcrumbItem>
                <BreadcrumbItem href={"/dashboard/campaign/" + campaignId + '/message'}>campaign message</BreadcrumbItem>
                <BreadcrumbItem href={"/dashboard/campaign/" + campaignId + '/message/new'}>create campaign message</BreadcrumbItem>
            </Breadcrumbs>
            <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center lg:items-start lg:flex-row flex-col gap-4 mt-4'>
                <div className='max-w-sm w-full items-center flex flex-col gap-4'>
                    <div className='w-full bg-white rounded-md p-4 flex flex-col gap-4'>
                        <p className="font-lexend font-bold text-2xl">Buat Campaign Message</p>
                        <div>
                            <p className="mb-2">Nama Campaign</p>
                            <InputForm register={register} config={{
                                name: 'name',
                                placeholder: 'Nama message',
                                type: 'text',
                                error: errors.name,
                                registerConfig: {
                                    required: 'required'
                                }
                            }} />
                        </div>

                        <div>
                            <p className="mb-2">Device</p>
                            <DisabledForm text={(campaignData?.device.name ? campaignData.device.name : '')} type="text" />
                        </div>
                        <div>
                            <p className="mb-2">Penerima</p>
                            {/* <TagsInput /> */}
                            {campaignData?.recipients && (
                                <InputContactAndLabel
                                    selectedKeys={campaignData?.recipients}
                                    setselectedKeys={setreceiverList}
                                    isDisabled={true}
                                    showDescription={false}
                                    user={session?.user}
                                />
                            )}
                        </div>
                        <div>
                            <p className="mb-2">Jadwal Campaign Message</p>
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
                    </div>
                </div>
                <div className='w-full max-w-sm lg:max-w-full'>
                    <div className='bg-white w-full p-4'>
                        <p className="font-bold text-xl font-lexend">Pesan</p>
                        <TemplateContainer handleClick={handleTemplateClick} templateList={templateList} />
                        <div className="mt-4">
                            <p className="mb-2">Response</p>

                            <TextAreaInput text={inputText} settext={setinputText} limit={255} />
                            <UploadFile
                                files={files}
                                setfiles={setfiles}
                            />

                        </div>
                        <div className="flex gap-2 flex-wrap mt-2">
                            {getMessageVariables(true).map(list => (
                                <div key={list} className='rounded-full px-2 py-[2px] border border-customGray hover:cursor-pointer' onClick={() => handleInsertVariable(list)}>
                                    {list}
                                </div>
                            ))}
                        </div>
                        {inputText && (
                            <div className="mt-4">
                                <p>Hasil Pesan</p>
                                <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-3 mt-2'>
                                    {parseTextInput(inputText, true)}
                                </div>
                            </div>
                        )}

                        <Button color="primary" className="rounded-md mt-8" fullWidth type="submit" isLoading={isLoading} isDisabled={isDisabled}>
                            Simpan
                        </Button>
                    </div>

                </div>
            </form>
        </>
    )
}

export default CreateCampaignMessage