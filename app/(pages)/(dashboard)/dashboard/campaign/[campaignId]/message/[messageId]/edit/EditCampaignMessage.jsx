'use client'
import DisabledForm from "@/app/components/DisabledForm"
import InputContactAndLabel from "@/app/components/dashboard/InputContactAndLabel"
import TemplateContainer from "@/app/components/dashboard/TemplateContainer"
import UploadFile from "@/app/components/dashboard/UploadFile"
import DisplayImage from "@/app/components/dashboard/auto-reply/DisplayImage"
import TextAreaInput from "@/app/components/dashboard/chat/TextAreaInput"
import InputForm from "@/app/components/form/InputForm"
import useTemplate from "@/app/components/hooks/useTemplate"
import { formatDatetoISO8601 } from "@/app/utils/helper"
import { fetchClient } from "@/app/utils/helper/fetchClient"
import { getFileFromUrl } from "@/app/utils/helper/fileHelper"
import { getMessageVariables, parseTextInput } from "@/app/utils/helper/messageUtils"
import { CampaignData, CampaignMessage, CampaignMessageForm } from "@/app/utils/types"
import { Button } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { updateCampaignMessages } from '../../../../../../../../api/repository/campaignRepository'

const EditCampaignMessage = ({ campaignData, messageData }) => {
    const { push } = useRouter()
    const { data: session } = useSession()
    const { loading, templateList } = useTemplate(session?.user)
    const [isLoading, setisLoading] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [isDisabled, setisDisabled] = useState(true)
    const { handleSubmit, register, setValue, formState: { errors } } = useForm()
    const [files, setfiles] = useState([])
    const [inputText, setinputText] = useState('')
    const [receiverList, setreceiverList] = useState([])
    const handleTemplateClick = (id) => {
        const findContent = templateList.find(item => item.id === id).message
        if (findContent) {
            setinputText(findContent)

        }
    }
    const handleInsertVariable = (text) => {
        setinputText(prev => prev + '{{$' + text + '}}')
    }
    const onSubmit = async (CampaignMessageFormData) => {
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
    
            const result = await updateCampaignMessages(session.user.token , messageData.id , formData) 

            if (result.status === 200) {
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
        if (messageData.mediaPath) {
            getFileFromUrl(messageData.mediaPath, setfiles)
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
                            <DisabledForm text={(campaignData?.device.name || '')} type="text" />
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
                        <TemplateContainer handleClick={handleTemplateClick} templateList={templateList} />
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
                                setfiles={setfiles} customFileTypes={undefined}                            />

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