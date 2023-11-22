import YesNoButton from "@/components/YesNoButton"
import ModalTemplate from "@/components/template/ModalTemplate"
import { fetchClient } from "@/utils/helper/fetchClient"
import { DeviceData } from "@/utils/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { toast } from "react-toastify"
interface DeleteModalProps {
    openModal: boolean,
    setopenModal: Dispatch<SetStateAction<boolean>>,
    text: string,
    deleteFunction: () => void
}
const DeleteModal = ({ openModal, setopenModal, text, deleteFunction }: DeleteModalProps) => {
    const [isLoading, setisLoading] = useState(false)
    const handleYesClick = async () => {
        setisLoading(true)
        await deleteFunction()
        setopenModal(false)
        setisLoading(false)
    }
    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={true}>
            <p className="font-lexend font-bold text-xl text-center mt-4 mb-8">{text}</p>
            <YesNoButton isLoading={isLoading} yesClick={handleYesClick} noClick={() => setopenModal(false)} />
        </ModalTemplate>
    )
}

export default DeleteModal