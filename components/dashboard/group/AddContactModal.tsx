import ModalTemplate from '@/components/template/ModalTemplate'
import { ContactData } from '@/utils/types'
import { Dispatch, SetStateAction, useState } from 'react'
import MultipleInputContact from '../MultipleInputContact'
const AddContactModal = (
    { openModal, setopenModal }:
        { openModal: boolean, setopenModal: Dispatch<SetStateAction<boolean>> }
) => {
    const [first, setfirst] = useState(false)
    const [contactData, setcontactData] = useState<ContactData[]>([
        {
            id: '1',
            phone: "6281357995175",
            firstName: 'Ihsanul',
            lastName: 'Afkar',
            initial: 'IA',
            profileColor: '4FBEAB',
            gender: "Laki-laki",
            email: 'ihsanulafkar@gmail.com',
            honorific: 'Mr',
            country: 'Indonesia',
            birthDate: '10/10/2010',
            label: ['Personal', 'Realme', 'Aktif'],
            checked: false,
            created_at: '11.9.2023, 2:43 PM'
        },
        {
            id: '2',
            phone: "6281357995175",
            firstName: 'Ihsanul',
            lastName: 'Afkar',
            initial: 'IA',
            profileColor: '4FBEAB',
            gender: "Laki-laki",
            email: 'ihsanulafkar@gmail.com',
            honorific: 'Mr',
            country: 'Indonesia',
            birthDate: '10/10/2010',
            label: ['Personal', 'Realme', 'Aktif'],
            checked: false,
            created_at: '11.9.2023, 2:43 PM'
        },
        {
            id: '3',
            phone: "6281357995175",
            firstName: 'Ihsanul',
            lastName: 'Afkar',
            initial: 'IA',
            profileColor: '4FBEAB',
            gender: "Laki-laki",
            email: 'ihsanulafkar@gmail.com',
            honorific: 'Mr',
            country: 'Indonesia',
            birthDate: '10/10/2010',
            label: ['Personal', 'Realme', 'Aktif'],
            checked: false,
            created_at: '11.9.2023, 2:43 PM'
        },
    ])
    return (
        <>
            <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={false}>
                <MultipleInputContact contactList={contactData} setcontactList={setcontactData} />
                <div className="flex justify-between gap-4 mt-4">
                    <div className="bg-white border border-customGray w-full py-2 rounded-md text-center hover:cursor-pointer" onClick={() => setopenModal(false)}>Kembali</div>
                    <div className="bg-primary border border-primary w-full py-2 rounded-md text-center text-white">Tambah</div>
                </div>
            </ModalTemplate>
        </>
    )
}

export default AddContactModal