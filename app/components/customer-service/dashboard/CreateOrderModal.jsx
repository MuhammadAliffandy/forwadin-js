import DisabledForm from "@/app/components/DisabledForm"
import TextAreaInput from "@/app/components/dashboard/chat/TextAreaInput"
import ModalTemplate from "@/app/components/template/ModalTemplate"
import { fetchClient } from "@/app/utils/helper/fetchClient"
import { ContactData } from "@/app/utils/types"
import { Button } from "@nextui-org/react"
import { CustomerService } from "next-auth"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { createOrders } from '@/app/api/repository/orderRepository'

const CreateOrderModal = ({ customerService, openModal, setopenModal, contact }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [text, setText] = useState('')
    const submitOrder = async () => {
        setIsLoading(true)
        if (!contact || !text) {
            toast.error('Data masih kosong!')
            setIsLoading(false)
            return
        }

        const result = await createOrders(customerService.token, {
            name: (contact?.firstName + ' ' + (contact?.lastName || '')),
            phone: contact.phone,
            orderData: text
        } )

        const resultData = result.data

        if (result.status === 201) {
            toast.success('Berhasil buat order')
            setopenModal(false)
        } else {
            toast.error(resultData.message)
        }
        setIsLoading(false)
    }
    return (
        <>
            <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={true}>
                <p className="text-2xl font-bold font-lexend ">Buat Order</p>
                <div className="text-sm flex flex-col gap-4">
                    <div>
                        <p className="mb-1">Order</p>
                        <TextAreaInput text={text} settext={setText} placeholder="Order" />
                    </div>
                    <div>
                        <p className="mb-1">Nama</p>
                        <DisabledForm text={(contact?.firstName + ' ' + (contact?.lastName || ''))} type="text" />
                    </div>
                    <div>
                        <p className="mb-1">Nomor</p>
                        <DisabledForm text={contact?.phone} type="text" />
                    </div>
                    <Button fullWidth color="primary" className="rounded-md" onClick={submitOrder}
                        isLoading={isLoading}>
                        Buat Order
                    </Button>
                </div>
            </ModalTemplate>
        </>
    )
}

export default CreateOrderModal