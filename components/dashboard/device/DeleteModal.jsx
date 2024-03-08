import YesNoButton from "@/components/YesNoButton"
import ModalTemplate from "@/components/template/ModalTemplate"
import { fetchClient } from "@/utils/helper/fetchClient"
import { DeviceData } from "@/utils/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { toast } from "react-toastify"

const DeleteModal = ({ openModal, setopenModal, count, deleteFunction, type }) => {
    const [isLoading, setisLoading] = useState(false)
    const handleYesClick = async () => {
        setisLoading(true)
        await deleteFunction()
        setopenModal(false)
        setisLoading(false)
    }
    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={true}>
            <p className="font-lexend text-xl font-bold text-center mb-8 mt-4">Hapus {count} {type} yang terpilih?</p>
            <YesNoButton isLoading={isLoading} yesClick={handleYesClick} noClick={() => setopenModal(false)} />
        </ModalTemplate>
    )
}

export default DeleteModal