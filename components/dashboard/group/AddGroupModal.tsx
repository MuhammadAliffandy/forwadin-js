
import ModalTemplate from '@/components/template/ModalTemplate'
import { Dispatch, SetStateAction } from 'react'
const AddGroupModal = (
    { openModal, setopenModal }:
        {
            openModal: boolean, setopenModal: Dispatch<SetStateAction<boolean>>,
        }
) => {
    return (
        <ModalTemplate outsideClose={false} openModal={openModal} setopenModal={setopenModal}>
            <p className='text-center font-lexend text-xl'>Buat Group Baru</p>
            <input type="text" className='w-full border border-customGray rounded-md text-xs mt-4 px-4 py-3' placeholder='Nama Group' />
            <div className="flex justify-between gap-4 mt-4">
                <div className="bg-white border border-customGray w-full py-2 rounded-md text-center hover:cursor-pointer" onClick={() => setopenModal(false)}>Kembali</div>
                <div className="bg-primary border border-primary w-full py-2 rounded-md text-center text-white">Buat</div>
            </div>
        </ModalTemplate>
    )
}

export default AddGroupModal