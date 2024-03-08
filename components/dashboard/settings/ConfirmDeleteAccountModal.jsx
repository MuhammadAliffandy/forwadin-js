import YesNoButton from "@/components/YesNoButton"
import ModalTemplate from "@/components/template/ModalTemplate"
import { Dispatch, SetStateAction, useState } from "react"

const ConfirmDeleteAccountModal = ({ deleteFunction, openModal, setopenModal }) => {
    const [isLoading, setIsLoading] = useState(false)
    const handleYesClick = async () => {
        setIsLoading(true)
        await deleteFunction()
        setIsLoading(false)
        setopenModal(false)
    }
    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={true}>
            <p className="font-lexend text-xl font-bold text-center mt-4">Anda yakin ingin menghapus akun?</p>
            <div className="bg-neutral-75 p-3 rounded-md">
                <p className="text-xs text-danger">Jika Anda menghapus akun, semua informasi Anda akan dihapus dari database kami dan proses ini tidak dapat dibatalkan.</p>
            </div>
            <YesNoButton isLoading={isLoading} yesClick={handleYesClick} noClick={() => setopenModal(false)} />
        </ModalTemplate>
    )
}

export default ConfirmDeleteAccountModal