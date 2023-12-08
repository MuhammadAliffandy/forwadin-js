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
interface SyncModalProps {
    openModal: boolean,
    setopenModal: Dispatch<SetStateAction<boolean>>,
    user: User | undefined,
    refresh: () => void
}
interface DeviceForm {
    deviceId: string,
}
const SyncModal = ({ openModal, setopenModal, user, refresh }: SyncModalProps) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<DeviceForm>()
    const [listDevice, setlistDevice] = useState<DeviceSession[]>([])
    const [isLoading, setisLoading] = useState(false)
    const onSubmit = async (data: DeviceForm) => {
        setisLoading(true)
        if (!data.deviceId) {
            toast.error('Device masih kosong')
        } else {
            const body = { accessToken: user?.googleToken, deviceId: data.deviceId }
            console.log(JSON.stringify(body))
            console.log(user)
            const result = await fetchClient({
                url: '/contacts/sync-google',
                method: 'POST',
                body: JSON.stringify(body),
                user: user
            })
            if (result?.ok) {
                toast.success('Berhasil sync kontak')
                refresh()
                setopenModal(false)
            } else {
                toast.error('Gagal sync kontak')
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
        console.log(user)
    }, [user?.token])
    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={false}>
            <>
                <p className="font-bold text-2xl">Sync Kontak dengan Google</p>
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
                    <div className="flex gap-2">
                        <Button fullWidth size="lg" variant="bordered" className="rounded-md" onClick={() => { setopenModal(false) }}>
                            Kembali
                        </Button>
                        <Button size="lg" className="rounded-md" color="primary" fullWidth isLoading={isLoading} type="submit">
                            Sync
                        </Button>
                    </div>
                </form>
            </>
        </ModalTemplate>
    )
}

export default SyncModal