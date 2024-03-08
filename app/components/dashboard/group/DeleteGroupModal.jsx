
import ModalTemplate from '@/app/components/template/ModalTemplate'
import { Dispatch, SetStateAction } from 'react'
const DeleteGroupModal = (
    { openModal, setopenModal, group }
) => {
    return (
        <ModalTemplate outsideClose={true} openModal={openModal} setopenModal={setopenModal}>
            <p className='font-lexend text-xl text-center'>Hapus Group {group} ?</p>
            <div className="flex justify-between gap-4 mt-8">
                <div className="bg-white border border-customGray w-full py-2 rounded-md text-center hover:cursor-pointer" onClick={() => setopenModal(false)}>Tidak</div>
                <div className="bg-danger border border-danger w-full py-2 rounded-md text-center text-white">Ya</div>
            </div>
        </ModalTemplate>
    )
}

export default DeleteGroupModal