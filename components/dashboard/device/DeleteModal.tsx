import ModalTemplate from "@/components/template/ModalTemplate"
import { fetchClient } from "@/utils/helper/fetchClient"
import { DeviceData } from "@/utils/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { toast } from "react-toastify"
interface DeleteModalProps {
    openModal: boolean,
    setopenModal: Dispatch<SetStateAction<boolean>>,
    device: DeviceData[],
    refresh: () => void
}
const DeleteModal = ({ openModal, setopenModal, device, refresh }: DeleteModalProps) => {
    const handleClick = async () => {
        const result = await fetchClient({
            method: 'DELETE',
            body: JSON.stringify({
                deviceIds: device.filter(obj => obj.checked === true).map(obj => obj.id)
            }),
            url: '/devices'
        })
        if (result.status === 200) {
            toast.success('Berhasil menghapus device')
        } else {
            const error = await result.json()
            console.log(error)
            toast.error('Gagal menghapus device')
            refresh()
            setopenModal(false)
        }
    }
    const [totalDevice, settotalDevice] = useState(0)
    useEffect(() => {
        settotalDevice(device.filter(obj => obj.checked === true).length)
    }, [])
    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={false}>
            <p className="font-lexend font-bold text-xl text-center mt-4">Hapus {totalDevice} device yang terpilih?</p>
            <div className="flex gap-2 mt-8">
                <div className="w-full rounded-md py-3 text-center border border-customGray hover:cursor-pointer" onClick={() => setopenModal(false)}>
                    Tidak
                </div>
                <div className="w-full rounded-md py-3 text-center bg-danger text-white hover:cursor-pointer" onClick={handleClick}>
                    Ya
                </div>
            </div>
        </ModalTemplate>
    )
}

export default DeleteModal