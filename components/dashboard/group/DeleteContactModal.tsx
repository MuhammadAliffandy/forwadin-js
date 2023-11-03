
import ModalTemplate from '@/components/template/ModalTemplate'
import { fetchClient } from '@/utils/helper/fetchClient'
import { ContactData } from '@/utils/types'
import { User } from 'next-auth'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
const DeleteContactModal = (
    { openModal, setopenModal, contacts, user, groupId, refresh }:
        {
            openModal: boolean,
            setopenModal: Dispatch<SetStateAction<boolean>>,
            contacts: ContactData[],
            user: User,
            groupId: string,
            refresh: () => void
        }
) => {
    const deleteContact = async () => {

        const result = await fetchClient({
            url: '/groups/remove',
            method: 'DELETE',
            user: user,
            body: JSON.stringify({
                groupId: groupId,
                contactIds: contacts.map(item => item.id)
            }),
        })
        if (result && result.ok) {
            toast.success('Berhasil hapus member')
            refresh()
            setopenModal(false)
        } else {
            toast.error('Gagal hapus member')
        }
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