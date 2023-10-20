import YesNoButton from "@/components/YesNoButton"
import ModalTemplate from "@/components/template/ModalTemplate"
import { Dispatch, SetStateAction } from "react"

interface DeleteContactModalProps {
    openModal: boolean,
    setopenModal: Dispatch<SetStateAction<boolean>>,
    deleteContact: () => void,
    count: number
}
const DeleteContactModal = ({ openModal, setopenModal, deleteContact, count }: DeleteContactModalProps) => {
    const handleYesClick = () => {
        deleteContact()
        setopenModal(false)
    }
    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={true}>
            <p className="font-lexend text-xl font-bold text-center mb-8 mt-4">Hapus {count} kontak yang terpilih?</p>
            <YesNoButton yesClick={handleYesClick} noClick={() => setopenModal(false)} />
        </ModalTemplate>
    )
}

export default DeleteContactModal