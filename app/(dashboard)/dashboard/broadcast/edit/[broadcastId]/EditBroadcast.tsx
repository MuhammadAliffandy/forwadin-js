'use client'
import InputContactAndLabel from "@/components/dashboard/InputContactAndLabel"
import UploadFile from "@/components/dashboard/UploadFile"
import DisplayImage from "@/components/dashboard/auto-reply/DisplayImage"
import TextAreaInput from "@/components/dashboard/chat/TextAreaInput"
import InputForm from "@/components/form/InputForm"
import { formatDatetoISO8601 } from "@/utils/helper"
import { fetchClient } from "@/utils/helper/fetchClient"
import { getMessageVariables, parseTextInput } from "@/utils/helper/messageUtils"
import { BroadcastData, BroadcastForm, ContactData, DeviceSession, Label } from "@/utils/types"
import { Button } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"


const EditBroadcast = ({ broadcastData }: {
    broadcastData: BroadcastData
}) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [isLoading, setisLoading] = useState(false)
    const [listDevice, setlistDevice] = useState<DeviceSession[]>([])
    const [isDisabled, setisDisabled] = useState(true)
    const { handleSubmit, register, setValue, formState: { errors } } = useForm<BroadcastForm>()
    const [receiverList, setreceiverList] = useState<string[]>([])
    const [files, setfiles] = useState<File[]>([])
    const [broadcastImage, setbroadcastImage] = useState<string | null>(null)
    const [textInput, settextInput] = useState<string>('')
    const [isLabelLoaded, setisLabelLoaded] = useState(false)

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

    const handleTemplateClick = (id: string) => {
        const findContent = listTemplate.find(item => item.id === id)?.content
        if (findContent)
            settextInput(findContent)

    }
    const handleInsertVariable = (text: string) => {
        settextInput(prev => prev + '{{$' + text + '}}')

    }
    const onSubmit = async (broadcastFormData: any) => {
        setisLoading(true)
        let mark = true
        if (receiverList.length === 0) {
            toast.error('Penerima masih kosong!')
            mark = false
        }
        if (textInput.length === 0) {
            toast.error('Response masih kosong!')
            mark = false
        }
        if (!broadcastFormData.deviceId) {
            toast.error('Device masih kosong!')
            mark = false
        }
        if (mark) {
            const formData = new FormData()
            const delay = 4000
            if (files.length > 0) {
                // @ts-ignore
                formData.set('media', files[0].file, files[0].name)
            }
            formData.append('name', broadcastFormData.name)
            formData.append('deviceId', broadcastFormData.deviceId)

            receiverList.forEach((element, idx) => {
                formData.append(`recipients[${idx}]`, element)
            })
            formData.append('message', textInput)
            formData.append('delay', delay.toString())
            formData.append('schedule', formatDatetoISO8601(broadcastFormData.schedule))


            const result = await fetchClient({
                url: '/broadcasts/' + broadcastData.id,
                method: 'PUT',
                body: formData,
                isFormData: true,
                user: session?.user
            })
            if (result?.ok) {
                toast.success('Berhasil update broadcast')
                router.push('/dashboard/broadcast/' + broadcastData.id)
            } else {
                toast.error('Gagal buat broadcast')
            }
        }
        setisLoading(false)
    }

    useEffect(() => {
        if (session?.user?.device && listDevice.length === 0) {
            setlistDevice(session.user.device)
            // fetchContactData()
        }
    }, [session?.user?.device])
    useEffect(() => {
        if (textInput.length > 0 && receiverList.length >= 0) {
            setisDisabled(false)
        } else {
            setisDisabled(true)
        }
    }, [textInput, receiverList])
    useEffect(() => {
        if (listDevice.length > 0) {
            setValue('name', broadcastData.name)
            const findDevice = listDevice.find(item => item.name === broadcastData.device.name)
            if (findDevice)
                setValue('deviceId', findDevice?.id)
            setreceiverList(broadcastData.recipients)
            setValue('schedule', (new Date(broadcastData.schedule).toISOString().slice(0, 16)))
            console.log(broadcastData)
            if (broadcastData.mediaPath)
                setbroadcastImage(broadcastData.mediaPath)
            settextInput(broadcastData.message)
        }
    }, [listDevice])
    useEffect(() => {
        if (receiverList.length > 0 && !isLabelLoaded) setisLabelLoaded(true)
    }, [receiverList])
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center lg:items-start lg:flex-row flex-col gap-4 mt-4'>
            <div className='max-w-sm w-full items-center flex flex-col gap-4'>
                <div className='w-full bg-white rounded-md p-4 flex flex-col gap-4'>
                    <p className="font-lexend font-bold text-2xl">Buat Broadcast</p>
                    <div>
                        <p className="mb-2">Nama Broadcast</p>
                        <InputForm register={register} config={{
                            name: 'name',
                            placeholder: 'Nama broadcast',
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
                        {/* <MultipleInputContact contactList={receiverList} setcontactList={setreceiverList} /> */}
                    </div>
                    <div>
                        <p className="mb-2">Jadwal Broadcast</p>
                        <InputForm register={register} config={{
                            name: 'schedule',
                            placeholder: 'Nama broadcast',
                            type: 'datetime-local',

                            error: errors.schedule,
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
                    <p className="font-bold text-xl font-lexend">Pesan Broadcast</p>
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
                        <TextAreaInput text={textInput} settext={settextInput} limit={255} />
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
                            <p>Hasil Pesan Broadcast</p>
                            <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-3 mt-2'>
                                {parseTextInput(textInput)}
                            </div>
                        </div>
                    )}
                    <div className="mt-4">
                        {broadcastImage && (
                            <>
                                <p className="my-2">Media</p>
                                <DisplayImage imageUrl={broadcastImage} />
                            </>
                        )}
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
            </div>
        </form>
    )
}

export default EditBroadcast