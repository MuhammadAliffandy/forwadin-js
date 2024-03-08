
import ButtonSubmit from '@/components/form/ButtonSubmit'
import InputForm from '@/components/form/InputForm'
import ModalTemplate from '@/components/template/ModalTemplate'
import { fetchClient } from '@/utils/helper/fetchClient'
import { useSession } from 'next-auth/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const AddGroupModal = (
    { openModal, setopenModal, fetchData }
) => {
    const { data: session } = useSession()
    const [isLoading, setisLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = async (formData) => {
        setisLoading(true)

        const result = await fetchClient({
            method: 'POST',
            url: '/groups/create',
            body: JSON.stringify({ name: formData.name }),
            user: session?.user
        })
        if (result && result.ok) {
            toast.success('Group berhasil ditambahkan')
            fetchData()
            setopenModal(false)
        } else {
            toast.error('Gagal buat group')
        }

        setisLoading(false)
    }
    return (
        <ModalTemplate outsideClose={false} openModal={openModal} setopenModal={setopenModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className='text-center font-lexend text-xl mb-4'>Buat Group Baru</p>
                <InputForm register={register} config={{
                    name: 'name',
                    placeholder: 'Nama Group',
                    type: 'text',
                    error: errors.name,
                    registerConfig: {
                        required: 'tidak boleh kosong'
                    }
                }} />
                <div className="flex justify-between gap-2 mt-4">
                    <div className="w-full rounded-md border border-customGray py-3 text-center bg-white hover:cursor-pointer" onClick={() => setopenModal(false)}>Kembali</div>
                    <ButtonSubmit text='Buat' isLoading={isLoading} />
                </div>
            </form>
        </ModalTemplate>
    )
}

export default AddGroupModal