import YesNoButton from "@/components/YesNoButton"
import ModalTemplate from "@/components/template/ModalTemplate"
import { Dispatch, SetStateAction, useState } from "react"

interface ConfirmDeleteAccountModalProps {
    openModal: boolean,
    setopenModal: Dispatch<SetStateAction<boolean>>,
    deleteFunction: () => void
}
const ConfirmDeleteAccountModal = ({ deleteFunction, openModal, setopenModal }: ConfirmDeleteAccountModalProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const handleYesClick = async () => {
        setIsLoading(true)
        await deleteFunction()
        setIsLoading(false)
        setopenModal(false)
    }
    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={true}>
            <p className="font-lexend text-xl font-bold text-center mb-8 mt-4">Anda yakin ingin menghapus akun?</p>
            <YesNoButton isLoading={isLoading} yesClick={handleYesClick} noClick={() => setopenModal(false)} />
        </ModalTemplate>
    )
}

export default ConfirmDeleteAccountModal