import InputForm from "@/components/form/InputForm"
import ModalTemplate from "@/components/template/ModalTemplate"
import { DeviceSession } from "@/utils/types"
import { User } from "next-auth"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import UploadFile from "../UploadFile"
import ButtonSubmit from "@/components/form/ButtonSubmit"
import { Button } from "@nextui-org/react"
import { toast } from "react-toastify"
import { fetchClient } from "@/utils/helper/fetchClient"
interface ImportContactModalProps {
    openModal: boolean,
    setopenModal: Dispatch<SetStateAction<boolean>>,
    user: User | undefined,
    refresh: () => void
}
interface ImportForm {
    deviceId: string,
    groupName: string
}
const ImportContactModal = ({ openModal, setopenModal, user, refresh }: ImportContactModalProps) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<ImportForm>()
    const [listDevice, setlistDevice] = useState<DeviceSession[]>([])
    const [isLoading, setisLoading] = useState(false)
    const [isDisabled, setisDisabled] = useState(true)
    const [files, setfiles] = useState<File[]>([])
    const onSubmit = async (data: ImportForm) => {
        setisLoading(true)
        if (files.length === 0) {
            toast.error('file masih kosong')
        }
        else if (!data.deviceId) {
            console.log(listDevice)
            console.log(data)
            toast.error('Device masih kosong')

        } else {
            const formData = new FormData()
            // @ts-ignore
            formData.set('file', files[0].file, files[0].name)
            formData.append('deviceId', data.deviceId)
            formData.append('groupName', data.groupName)
            const result = await fetchClient({
                url: '/contacts/import',
                method: 'POST',
                body: formData,
                isFormData: true,
                user: user
            })
            if (result?.ok) {
                toast.success('Berhasil import kontak')
                refresh()
                setopenModal(false)
            } else {
                toast.error('Gagal import kontak')
                if (result) {
                    console.log(await result.json())
                }

            }
        }
        setisLoading(false)
    }
    useEffect(() => {
        if (user?.device && user.device.length > 0) {
            setlistDevice(user.device)
        }
    }, [user?.device])

    useEffect(() => {
        if (files.length > 0) {
            setisDisabled(false)
        } else
            setisDisabled(true)
    }, [files])
    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={false} >
            <>
                <p className="font-bold text-2xl">Import Kontak</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-sm w-full mt-8">
                    <div>
                        <p>Device</p>
                        <select {...register('deviceId')} name="deviceId" id="deviceId" className="px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border-[#B0B4C5] focus:border-primary mt-2">
                            {listDevice.map(device => (
                                <option value={device.id}>
                                    <p className="px-4 py-3">
                                        {device.name}
                                    </p>
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p className="mb-2">Nama Group</p>
                        <InputForm register={register} config={{
                            name: 'groupName',
                            placeholder: 'nama grup',
                            registerConfig: {
                                required: 'tidak boleh kosong'
                            },
                            type: 'text',
                            error: errors.groupName
                        }} />
                    </div>
                    <div>
                        <p>File import (.xlsx). <a href="https://docs.google.com/spreadsheets/d/1J21-fYmWH2Rc-fni1AmR-cXTiUjrgKIKqRb8pNKfdxE/edit?usp=sharing" target="_blank" className="text-primary">Lihat contoh format file</a></p>
                        <UploadFile files={files} setfiles={setfiles}
                            customFileTypes={["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", ".xlsx"]}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button fullWidth size="lg" variant="bordered" className="rounded-md" onClick={() => { setopenModal(false) }}>
                            Kembali
                        </Button>
                        <Button size="lg" className="rounded-md" color="primary" fullWidth isDisabled={isDisabled} isLoading={isLoading} type="submit">
                            Import
                        </Button>
                    </div>
                </form>
            </>
        </ModalTemplate>
    )
}

export default ImportContactModal