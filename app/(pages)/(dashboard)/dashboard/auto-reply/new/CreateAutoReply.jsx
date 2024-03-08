'use client'
import InputContactAndLabel from "@/app/components/dashboard/InputContactAndLabel"
import MultipleInputLabel from "@/app/components/dashboard/MultipleInputLabel"
import TemplateContainer from "@/app/components/dashboard/TemplateContainer"
import UploadFile from "@/app/components/dashboard/UploadFile"
import TextAreaInput from "@/app/components/dashboard/chat/TextAreaInput"
import InputForm from "@/app/components/form/InputForm"
import SelectDevice from "@/app/components/form/SelectDevice"
import useTemplate from "@/app/components/hooks/useTemplate"
import { fetchClient } from "@/app/utils/helper/fetchClient"
import { getMessageVariables, parseTextInput } from "@/app/utils/helper/messageUtils"
import { DeviceSession, Label } from "@/app/utils/types"
import { Button } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const CreateAutoReply = () => {
    const { push } = useRouter()
    const { data: session } = useSession()
    const { loading, templateList } = useTemplate(session?.user)
    const [isLoading, setisLoading] = useState(false)
    const [listDevice, setlistDevice] = useState([])
    const [currentDevice, setcurrentDevice] = useState()
    const [isDisabled, setisDisabled] = useState(true)
    const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm()
    const [files, setfiles] = useState([])
    const [receiverList, setreceiverList] = useState([])
    const [requestList, setrequestList] = useState<([])
    const [textInput, settextInput] = useState('')
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
        if (receiverList.length === 0) {
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
        if (!ARData.deviceId) {
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
            formData.append('deviceId', ARData.deviceId)
            requestList.forEach((element, idx) => {
                formData.append(`requests[${idx}]`, element.label.name)
            })
            receiverList.forEach((element, idx) => {
                formData.append(`recipients[${idx}]`, element)
            })
            formData.append('response', textInput)
            const result = await fetchClient({
                url: '/auto-replies/',
                method: 'POST',
                isFormData: true,
                body: formData,
                user: session?.user
            })
            if (result?.ok) {
                toast.success('Berhasil buat auto reply')
                push('/dashboard/auto-reply')
            } else {
                toast.error('Gagal buat auto reply')

            }
        }
        setisLoading(false)
    }
    const fetchContactData = async () => {
        const result = await fetchClient({
            url: '/contacts',
            method: 'GET',
            user: session?.user
        })
        if (result?.ok) {
            const resultData = await result.json()
            const updatedReceiverList = [...receiverList, ...resultData]
            setreceiverList(updatedReceiverList)
        }
    }
    useEffect(() => {
        if (session?.user?.device && listDevice.length === 0) {
            setlistDevice(session.user.device)
            setValue('deviceId', session.user.device[0].id)
            fetchContactData()
        }
    }, [session?.user?.device])
    useEffect(() => {
        if (textInput.length > 0 && receiverList.length > 0 && requestList.some(item => item.label.active === true)) {
            setisDisabled(false)
        } else {
            setisDisabled(true)

        }
    }, [textInput, receiverList, requestList])
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center lg:items-start lg:flex-row flex-col gap-4 mt-4'>
            <div className='max-w-sm w-full items-center flex flex-col gap-4'>
                <div className='w-full bg-white rounded-md p-4 flex flex-col gap-4'>
                    <p className="font-lexend font-bold text-2xl">Buat Auto Reply</p>
                    <div>
                        <p className="mb-2">Nama Auto Reply</p>
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
                        <SelectDevice register={register} listDevice={listDevice} name="deviceId" />
                    </div>
                    <div>
                        <p className="mb-2">Penerima</p>
                        <InputContactAndLabel
                            selectedKeys={receiverList}
                            setselectedKeys={setreceiverList}
                            isAutoReply={true}
                            user={session?.user}
                        />

                    </div>
                </div>
                <div className='w-full bg-white rounded-md p-4'>
                    <p className="font-bold text-xl font-lexend">Request</p>
                    <div className="mt-4">
                        <p className="mb-2">Kata</p>
                        <MultipleInputLabel setlabelList={setrequestList} labelList={requestList} placeholder="tambah kata" maxChar={20} />
                    </div>
                </div>
            </div>
            <div className='w-full max-w-sm lg:max-w-full'>
                <div className='bg-white w-full p-4'>
                    <p className="font-bold text-xl font-lexend">Pesan Auto Reply</p>
                    <TemplateContainer templateList={templateList} handleClick={handleTemplateClick} />
                    <div className="mt-4">
                        <p className="mb-2">Response</p>
                        <TextAreaInput text={textInput} settext={settextInput} />
                        <UploadFile
                            files={files}
                            setfiles={setfiles}
                        />
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
                    <Button color="primary" className="rounded-md mt-4" fullWidth type="submit" isLoading={isLoading} isDisabled={isDisabled}>
                        Simpan
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default CreateAutoReply