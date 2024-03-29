'use client'
import DisabledForm from "@/components/DisabledForm"
import DropdownDevice from "@/components/dashboard/DropdownDevice"
import InputContactAndLabel from "@/components/dashboard/InputContactAndLabel"
import MultipleInputLabel from "@/components/dashboard/MultipleInputLabel"
import TagsInput from "@/components/dashboard/TagsInput"
import UploadFile from "@/components/dashboard/UploadFile"
import DisplayImage from "@/components/dashboard/auto-reply/DisplayImage"
import TextAreaInput from "@/components/dashboard/chat/TextAreaInput"
import InputForm from "@/components/form/InputForm"
import useTemplate from "@/components/hooks/useTemplate"
import { fetchClient } from "@/utils/helper/fetchClient"
import { getFileFromUrl } from "@/utils/helper/fileHelper"
import { getMessageVariables, parseTextInput } from "@/utils/helper/messageUtils"
import { AutoReply, ContactData, DeviceData, DeviceSession, Label } from "@/utils/types"
import { Button, Select, SelectItem, Skeleton } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const DetailAutoReply = ({ autoReplyId }) => {
    const { push } = useRouter()
    const { data: session } = useSession()
    const { loading, templateList } = useTemplate(session?.customerService)
    const [isLoaded, setisLoaded] = useState(false)
    const [isLabelLoaded, setisLabelLoaded] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [autoReplyName, setautoReplyName] = useState('')
    const [files, setfiles] = useState([])
    const [isDisabled, setisDisabled] = useState(true)
    const { handleSubmit, register, reset, formState: { errors }, setValue } = useForm()
    // change
    const [receiverList, setreceiverList] = useState([])
    const [requestList, setrequestList] = useState([])
    const [textInput, settextInput] = useState<string>('')
    const handleTemplateClick = (id) => {
        const findContent = templateList.find(item => item.id === id)?.message
        if (findContent)
            settextInput(findContent)

    }
    const handleInsertVariable = (text) => {
        settextInput(prev => prev + '{{$' + text + '}}')

    }
    const onSubmit = async (ARData) => {
        setisLoading(true)
        let mark = true
        if (receiverList?.length === 0) {
            toast.error('Penerima masih kosong!')
            mark = false
        }
        if (!requestList.some(item => item.label.active === true)) {
            toast.error('Request Kata masih kosong!')
            mark = false
        }
        if (textInput.length === 0) {
            toast.error('Response masih kosong!')
            mark = false
        }
        if (!session?.customerService?.deviceId) {
            toast.error('Device masih kosong!')
            mark = false
        }
        if (mark) {
            const formData = new FormData()
            if (files.length > 0) {
                // @ts-ignore
                formData.set('media', files[0].file, files[0].name)
            }
            formData.append('name', ARData.name)
            formData.append('deviceId', session?.customerService?.deviceId)
            requestList.forEach((element, idx) => {
                formData.append(`requests[${idx}]`, element.label.name)
            })
            receiverList.forEach((element, idx) => {
                formData.append(`recipients[${idx}]`, element)
            })
            formData.append('response', textInput)
            const result = await fetchClient({
                url: '/auto-replies/' + autoReplyId,
                method: 'PUT',
                isFormData: true,
                body: formData,
                user: session?.customerService
            })
            if (result?.ok) {
                toast.success('Berhasil ubah auto reply')
                push('/customer-service/dashboard/auto-reply')
            } else {
                toast.error('Gagal ubah auto reply')

            }
        }
        setisLoading(false)
    }

    const fetchAutoReplyData = async () => {
        console.log('autoReplyId')
        console.log(autoReplyId)
        const result = await fetchClient({
            url: '/auto-replies/' + autoReplyId,
            method: 'GET',
            user: session?.customerService
        })
        if (result?.ok) {
            const resultData = await result.json()
            if (resultData.mediaPath) {
                getFileFromUrl(resultData.mediaPath, setfiles)
            }
            setautoReplyName(resultData.name)
            setValue('name', resultData.name)
            setrequestList(resultData.requests.map(item => {
                return {
                    label: {
                        name: item,
                        active: true
                    }
                }
            }))
            settextInput(resultData.response)
            setreceiverList(resultData.recipients)
            setisLoaded(true)
        }
    }
    // const fetchDevice = async () => {
    //     if (!session?.customerService?.deviceId) return
    //     const result = await fetchClient({
    //         url: '/devices/' + session?.customerService?.deviceId,
    //         method: 'GET',
    //         user: session.customerService
    //     })
    //     if (result?.ok) {
    //         setdeviceData(await result.json())
    //     } else {
    //         if (result) {
    //             const body = await result.json()
    //             toast.error(body.message)
    //         }
    //     }
    // }
    const fetchAll = async () => {
        fetchAutoReplyData()
    }
    useEffect(() => {
        if (session?.customerService?.token) {
            fetchAll()
        }
    }, [session?.customerService?.token])
    useEffect(() => {
        if (textInput.length > 0 && receiverList?.length > 0 && requestList.some(item => item.label.active === true)) {
            setisDisabled(false)
        } else {
            setisDisabled(true)

        }
        if (receiverList.length > 0 && !isLabelLoaded) setisLabelLoaded(true)
    }, [textInput, receiverList, requestList])
    return (
        <>
            <p className="font-bold text-2xl font-lexend mt-4">Auto Reply: {autoReplyName}</p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center lg:items-start lg:flex-row flex-col gap-4 mt-4'>
                <div className='max-w-sm w-full items-center flex flex-col gap-4'>
                    {isLoaded ? (<>
                        <div className='w-full bg-white rounded-md p-4 flex flex-col gap-4'>
                            <p className="font-lexend font-bold text-2xl">Detail Auto Reply</p>
                            <div>
                                <p className="mb-2">Nama Broadcast</p>
                                <InputForm register={register} config={{
                                    name: 'name',
                                    placeholder: 'Nama Auto Reply',
                                    type: 'text',
                                    error: errors.name,
                                    registerConfig: {
                                        required: 'required'
                                    }
                                }} />
                            </div>
                            <div>
                                <p className="mb-2">Device</p>
                                <DisabledForm text={session?.customerService?.deviceId} type="text" />
                            </div>
                            <div>
                                <p className="mb-2">Penerima</p>
                                {isLabelLoaded && (<InputContactAndLabel
                                    selectedKeys={receiverList}
                                    setselectedKeys={setreceiverList}
                                    isAutoReply={true}
                                    user={session?.customerService}
                                />)}
                            </div>
                        </div>

                        <div className='w-full bg-white rounded-md p-4'>
                            <p className="font-bold text-xl font-lexend">Request</p>
                            <div className="mt-4">
                                <p className="mb-2">Kata</p>
                                <MultipleInputLabel setlabelList={setrequestList} labelList={requestList} placeholder="tambah kata" maxChar={20} />
                            </div>
                        </div>
                    </>) : (<>

                        <div className='mt-4 flex flex-col gap-2 p-4 bg-white w-full'>

                            <Skeleton className={'w-full h-3 rounded-full'} />
                            <Skeleton className={'w-full h-3 rounded-full'} />
                            <Skeleton className={'w-full h-3 rounded-full'} />
                        </div>
                    </>)}
                </div>
                <div className='w-full max-w-sm lg:max-w-full'>
                    {isLoaded ? (<>
                        <div className='bg-white w-full p-4'>
                            <p className="font-bold text-xl font-lexend">Pesan Auto Reply</p>
                            {templateList.length > 0 && (
                                <div className="mt-4">
                                    <p>Template</p>
                                    <div className="flex gap-2 flex-wrap w-full mt-2">
                                        {templateList.map(item => (
                                            <div key={item.id} className='rounded-full px-2 py-[2px] border border-customGray hover:cursor-pointer' onClick={() => handleTemplateClick(item.id)}>
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="mt-4">
                                <p className="mb-2">Response</p>
                                <TextAreaInput text={textInput} settext={settextInput} />

                            </div>
                            <div className="flex gap-2 flex-wrap mt-2">
                                {getMessageVariables().map(item => (
                                    <div key={item} className='rounded-full px-2 py-[2px] border border-customGray hover:cursor-pointer' onClick={() => handleInsertVariable(item)}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                            {textInput && (
                                <div className="mt-4">
                                    <p>Hasil Pesan Auto Reply</p>
                                    <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-3 mt-2'>
                                        {parseTextInput(textInput)}
                                    </div>
                                </div>
                            )}
                            <div className="mt-4">
                                {/* {autoReplyImage && (
                                    <>
                                        <p className="my-2">Media</p>
                                        <DisplayImage imageUrl={autoReplyImage} />
                                    </>
                                )} */}
                                <div className="mt-2" />
                                <UploadFile
                                    files={files}
                                    setfiles={setfiles}
                                />
                            </div>
                            <Button color="primary" className="rounded-md mt-4" fullWidth type="submit" isLoading={isLoading} isDisabled={isDisabled}>
                                Simpan
                            </Button>
                        </div>
                    </>) : (<>

                        <div className='mt-4 flex flex-col gap-2 p-4 bg-white'>

                            <Skeleton className={'w-full h-3 rounded-full'} />
                            <Skeleton className={'w-full h-3 rounded-full'} />
                            <Skeleton className={'w-full h-3 rounded-full'} />
                        </div>
                    </>)}
                </div>
            </form>
        </>
    )
}

export default DetailAutoReply