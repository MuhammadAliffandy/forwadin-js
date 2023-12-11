'use client'
import DisabledForm from "@/components/DisabledForm"
import InputContactAndLabel from "@/components/dashboard/InputContactAndLabel"
import UploadFile from "@/components/dashboard/UploadFile"
import DisplayImage from "@/components/dashboard/auto-reply/DisplayImage"
import TextAreaInput from "@/components/dashboard/chat/TextAreaInput"
import InputForm from "@/components/form/InputForm"
import useTemplate from "@/components/hooks/useTemplate"
import { formatDatetoISO8601 } from "@/utils/helper"
import { fetchClient } from "@/utils/helper/fetchClient"
import { getFileFromUrl } from "@/utils/helper/fileHelper"
import { getMessageVariables, parseTextInput } from "@/utils/helper/messageUtils"
import { CampaignData, CampaignMessage, CampaignMessageForm } from "@/utils/types"
import { Button } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const EditCampaignMessage = ({ campaignData, messageData }: {
    campaignData: CampaignData,
    messageData: CampaignMessage
}) => {
    const { push } = useRouter()
    const { data: session } = useSession()
    const { loading, templateList } = useTemplate(session?.user)
    const [isLoading, setisLoading] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [isDisabled, setisDisabled] = useState(true)
    const { handleSubmit, register, setValue, formState: { errors } } = useForm<CampaignMessageForm>()
    const [files, setfiles] = useState<File[]>([])
    const [inputText, setinputText] = useState('')
    const [receiverList, setreceiverList] = useState<string[]>([])
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
            formData.append('campaignId', campaignData.id)
            formData.append('schedule', formatDatetoISO8601(CampaignMessageFormData.schedule))
            formData.append('delay', delay.toString())
            const result = await fetchClient({
                url: '/campaigns/messages/' + messageData.id,
                method: 'PUT',
                body: formData,
                isFormData: true,
                user: session?.user
            })
            if (result?.ok) {
                toast.success('Berhasil ubah campaign message!')
                push('/dashboard/campaign/' + campaignData.id + '/message')
            } else {
                toast.error('Gagal ubah campaign message')
            }

        }
        setisLoading(false)
    }
    useEffect(() => {
        if (inputText) {
            setisDisabled(false)
        } else {
            setisDisabled(true)
        }
    }, [inputText])
    useEffect(() => {
        setValue('name', messageData.name)
        setValue('schedule', (new Date(messageData.schedule).toISOString().slice(0, 16)))
        setinputText(messageData.message)
        if (campaignData.mediaPath) {
            getFileFromUrl(campaignData.mediaPath, setfiles)
        }
    }, [])
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center lg:items-start lg:flex-row flex-col gap-4 mt-4'>
                <div className='max-w-sm w-full items-center flex flex-col gap-4'>
                    <div className='w-full bg-white rounded-md p-4 flex flex-col gap-4'>
                        <p className="font-lexend font-bold text-2xl">Edit Campaign Message</p>
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
                    </div>
                </div>
                <div className='w-full max-w-sm lg:max-w-full'>
                    <div className='bg-white w-full p-4'>
                        <p className="font-bold text-xl font-lexend">Pesan</p>
                        {templateList.length > 0 && (
                            <div className="mt-4">
                                <p>Template</p>
                                <div className="flex gap-2 flex-wrap w-full mt-2">
                                    {templateList.map(list => (
                                        <div key={list.id} className='rounded-full px-2 py-[2px] border border-customGray hover:cursor-pointer' onClick={() => handleTemplateClick(list.id)}>
                                            {list.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="mt-4">
                            <p className="mb-2">Response</p>

                            <TextAreaInput text={inputText} settext={setinputText} limit={255} />
                            {messageData.mediaPath && (
                                <>
                                    <p className="my-2">Media</p>
                                    <DisplayImage imageUrl={messageData.mediaPath} />
                                </>
                            )}
                            <div className="mt-2" />
                            <UploadFile
                                files={files}
                                setfiles={setfiles}
                            />

                        </div>
                        <div className="flex gap-2 flex-wrap mt-2">
                            {getMessageVariables().map(list => (
                                <div key={list} className='rounded-full px-2 py-[2px] border border-customGray hover:cursor-pointer' onClick={() => handleInsertVariable(list)}>
                                    {list}
                                </div>
                            ))}
                        </div>
                        {inputText && (
                            <div className="mt-4">
                                <p>Hasil Pesan</p>
                                <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-3 mt-2'>
                                    {parseTextInput(inputText)}
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

export default EditCampaignMessage