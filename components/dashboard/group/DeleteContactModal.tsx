
import ModalTemplate from '@/components/template/ModalTemplate'
import { fetchClient } from '@/utils/helper/fetchClient'
import { ContactData } from '@/utils/types'
import { Dispatch, SetStateAction } from 'react'
const DeleteContactModal = (
    { openModal, setopenModal, contacts }:
        {
            openModal: boolean, setopenModal: Dispatch<SetStateAction<boolean>>,
            contacts: ContactData[]
        }
) => {
    const deleteContact = async () => {
        const result = await fetchClient({
            url: '/groups/remove',
            method: 'DELETE',
            body: JSON.stringify({

            })
        })
        console.log(contacts)
    }
    return (
        <ModalTemplate outsideClose={true} openModal={openModal} setopenModal={setopenModal}>
            <p className='font-lexend text-xl text-center'>Hapus {contacts.length} Kontak dari Group ?</p>
            <div className="flex justify-between gap-4 mt-8">
                <div className="bg-white border border-customGray w-full py-2 rounded-md text-center hover:cursor-pointer" onClick={() => setopenModal(false)}>Tidak</div>
                <div className="bg-danger border border-danger w-full py-2 rounded-md text-center text-white hover:cursor-pointer" onClick={deleteContact}>Ya</div>
            </div>
        </ModalTemplate>
    )
}

export default DeleteContactModal