import ModalTemplate from '@/app/components/template/ModalTemplate'
import { ContactData } from '@/app/utils/types'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import MultipleInputContact from '../MultipleInputContact'
import { useSession } from 'next-auth/react'
import { Button, Skeleton } from '@nextui-org/react'
import { fetchClient } from '@/app/utils/helper/fetchClient'
import { toast } from 'react-toastify'
import { addMemberGroup } from '@/app/api/repository/groupRepository'
import { getAllContacts } from '@/app/api/repository/contactRepository'
const AddContactModal = (
    { openModal, setopenModal, fetchGroupData, groupId, activeContactData }
) => {
    const { data: session } = useSession()
    const [isLoading, setisLoading] = useState(false)
    const [contactData, setcontactData] = useState([
    ])
    const [isLoaded, setisLoaded] = useState(false)
    const fetchContactData = async () => {

        const result = await getAllContacts(session.user.token)

        if (result && result.status === 200) {
            const resultData = result.data
            setcontactData(resultData.filter(contact => !activeContactData.find(existContact => existContact.id === contact.id)))
        }
        setisLoaded(true)
    }
    const handleAddContact = async () => {
        setisLoading(true)
        // console.log(contactData)
        const result = await addMemberGroup(session.user.token,{
            groupId: groupId,
            contactIds: contactData.filter(item => item.active).map(item => item.id)
        } )
        const resultData = await result.data
        if (result && result.status === 201) {
            toast.success('Berhasil menambah member!')
            fetchGroupData()
            setopenModal(false)
        }
        else {
            toast.error('Gagal menambah member')
            console.log(resultData)
        }
        setisLoading(false)
    }
    useEffect(() => {
        fetchContactData()
    }, [activeContactData])

    return (
        <>
            <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={false}>
                <div className='mt-4'>

                    {isLoaded ? (
                        <>
                            <MultipleInputContact contactList={contactData} setcontactList={setcontactData} />
                            <div className="flex justify-between gap-4 mt-4">
                                <div className="bg-white border border-customGray w-full py-2 rounded-md text-center hover:cursor-pointer" onClick={() => setopenModal(false)}>Kembali</div>
                                <Button onClick={handleAddContact} fullWidth color='primary' className='rounded-md' isLoading={isLoading}>
                                    Tambah
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className='mt-4 flex flex-col gap-2'>
                            <Skeleton className={'w-full h-3 rounded-full'} />
                            <Skeleton className={'w-full h-3 rounded-full'} />
                            <Skeleton className={'w-full h-3 rounded-full'} />
                        </div>
                    )}
                </div>
            </ModalTemplate>
        </>
    )
}

export default AddContactModal