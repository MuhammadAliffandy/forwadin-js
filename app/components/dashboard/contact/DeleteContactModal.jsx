import YesNoButton from "@/app/components/YesNoButton"
import ModalTemplate from "@/app/components/template/ModalTemplate"
import { Dispatch, SetStateAction, useState } from "react"

const DeleteContactModal = ({ openModal, setopenModal, deleteContact, count }) => {
    const [isLoading, setisLoading] = useState(false)
    const handleYesClick = async () => {
        setisLoading(true)
        await deleteContact()
        setopenModal(false)
        setisLoading(false)
    }
    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={true}>
            <p className="font-lexend text-xl font-bold text-center mb-8 mt-4">Hapus {count} kontak yang terpilih?</p>
            <YesNoButton isLoading={isLoading} yesClick={handleYesClick} noClick={() => setopenModal(false)} />
        </ModalTemplate>
    )
}

export default DeleteContactModal