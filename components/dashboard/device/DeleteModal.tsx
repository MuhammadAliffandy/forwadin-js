import YesNoButton from "@/components/YesNoButton"
import ModalTemplate from "@/components/template/ModalTemplate"
import { fetchClient } from "@/utils/helper/fetchClient"
import { DeviceData } from "@/utils/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { toast } from "react-toastify"
interface DeleteModalProps {
    openModal: boolean,
    setopenModal: Dispatch<SetStateAction<boolean>>,
    count: number,
    deleteDevice: () => void
}
const DeleteModal = ({ openModal, setopenModal, count, deleteDevice }: DeleteModalProps) => {
    const handleYesClick = () => {
        deleteDevice()
        setopenModal(false)
    }
    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={true}>
            <p className="font-lexend font-bold text-xl text-center mt-4 mb-8">Hapus {count} device yang terpilih?</p>
            <YesNoButton yesClick={handleYesClick} noClick={() => setopenModal(false)} />
        </ModalTemplate>
    )
}

export default DeleteModal