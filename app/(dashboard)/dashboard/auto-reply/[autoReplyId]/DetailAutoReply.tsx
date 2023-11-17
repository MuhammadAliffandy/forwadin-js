'use client'
import DropdownDevice from "@/components/dashboard/DropdownDevice"
import InputContactAndLabel from "@/components/dashboard/InputContactAndLabel"
import MultipleInputContact from "@/components/dashboard/MultipleInputContact"
import MultipleInputLabel from "@/components/dashboard/MultipleInputLabel"
import MultipleInputReceiver from "@/components/dashboard/MultipleInputReceiver"
import TagsInput from "@/components/dashboard/TagsInput"
import TextAreaInput from "@/components/dashboard/chat/TextAreaInput"
import InputForm from "@/components/form/InputForm"
import { fetchClient } from "@/utils/helper/fetchClient"
import { AutoReply, ContactData, DeviceData, DeviceSession, Label } from "@/utils/types"
import { Button, Select, SelectItem, Skeleton } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
interface AutoReplyForm {
    name: string,
    deviceId: string,
    receivers: string[],
    request: string[],
    response: string
}
const DetailAutoReply = ({ autoReplyId }: { autoReplyId: string }) => {
    const { push } = useRouter()
    const { data: session } = useSession()
    const [isLoaded, setisLoaded] = useState(false)
    const [isLabelLoaded, setisLabelLoaded] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [autoReplyName, setautoReplyName] = useState('')
    const [listDevice, setlistDevice] = useState<DeviceSession[]>([])
    const [currentDevice, setcurrentDevice] = useState<DeviceSession>()
    const [isDisabled, setisDisabled] = useState(true)
    const { handleSubmit, register, reset, formState: { errors }, setValue } = useForm<AutoReplyForm>()
    // change
    const [receiverList, setreceiverList] = useState<string[]>([])
    const [requestList, setrequestList] = useState<Label[]>([])
    const [textInput, settextInput] = useState<string>('')

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
        return text.replace(/\${{(\w+)}}/g, (match, placeholder) => {
            // @ts-ignore
            return sampleContact[placeholder] || match;
        });
    }
    const handleTemplateClick = (id: string) => {
        const findContent = listTemplate.find(item => item.id === id)?.content
        if (findContent)
            settextInput(findContent)

    }
    const handleInsertVariable = (text: string) => {
        settextInput(prev => prev + '${{' + text + '}}')

    }
    const onSubmit = async (formData: any) => {
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
        if (!formData.deviceId) {
            toast.error('Device masih kosong!')
            mark = false
        }
        if (mark) {
            const autoReplyData = {
                name: formData.name,
                deviceId: formData.deviceId,
                recipients: receiverList,
                requests: requestList.map(item => item.label.name),
                response: textInput
            }
            console.log(autoReplyData)
            const result = await fetchClient({
                url: '/auto-replies/' + autoReplyId,
                method: 'PUT',
                body: JSON.stringify(autoReplyData),
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

    const fetchAutoReplyData = async () => {
        const result = await fetchClient({
            url: '/auto-replies/' + autoReplyId,
            method: 'GET',
            user: session?.user
        })
        if (result?.ok) {
            const resultData: AutoReply = await result.json()
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
    const fetchAll = async () => {
        fetchAutoReplyData()
    }
    useEffect(() => {
        if (session?.user?.device && listDevice.length === 0) {
            setlistDevice(session.user.device)
            fetchAll()
        }
    }, [session?.user?.device])
    useEffect(() => {
        if (textInput.length > 0 && receiverList?.length! > 0 && requestList.some(item => item.label.active === true)) {
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
                                <select {...register('deviceId')} className="px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border-[#B0B4C5] focus:border-primary">
                                    {listDevice.map(item => (
                                        <option key={item.id} value={item.id} className="">{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <p className="mb-2">Penerima</p>
                                {isLabelLoaded && (<InputContactAndLabel
                                    selectedKeys={receiverList}
                                    setselectedKeys={setreceiverList}
                                    isAutoReply={true}
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
                            <div className="mt-4">
                                <p>Template</p>
                                <div className="flex gap-2 flex-wrap w-full mt-2">
                                    {listTemplate.map(item => (
                                        <div key={item.id} className='rounded-full px-2 py-[2px] border border-customGray hover:cursor-pointer' onClick={() => handleTemplateClick(item.id)}>
                                            {item.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="mb-2">Response</p>
                                <TextAreaInput text={textInput} settext={settextInput} />
                            </div>
                            <div className="flex gap-2 flex-wrap mt-2">
                                {listVariables.map(item => (
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