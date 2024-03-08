
import ModalTemplate from '@/components/template/ModalTemplate'
import { fetchClient } from '@/utils/helper/fetchClient'
import { ContactData } from '@/utils/types'
import { Button } from '@nextui-org/react'
import { User } from 'next-auth'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
const DeleteContactModal = (
    { openModal, setopenModal, deleteFunction, selectedKeys }
) => {
    const [count, setcount] = useState('')
    useEffect(() => {
        if ((selectedKeys ).size > 0 || selectedKeys === 'all') {
            if (selectedKeys === 'all')
                setcount('semua')
            else
                setcount((selectedKeys ).size)
        } else {
            setcount('-')
        }
    }, [selectedKeys])
    const handleDelete = async () => {
        await deleteFunction()
        setopenModal(false)
    }

    return (
        <ModalTemplate outsideClose={true} openModal={openModal} setopenModal={setopenModal}>
            <p className='font-lexend text-xl text-center'>Hapus {count} Kontak dari Group ?</p>
            <div className="flex justify-between gap-4 mt-8">
                <Button variant='bordered' className="rounded-md" fullWidth onClick={() => setopenModal(false)}>Tidak</Button>
                <Button color='danger' className="rounded-md" fullWidth onClick={handleDelete}>Ya</Button>
            </div>
        </ModalTemplate>
    )
}

export default DeleteContactModal