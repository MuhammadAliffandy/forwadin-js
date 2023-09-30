import InputForm from "@/components/form/InputForm"
import ModalTemplate from "@/components/template/ModalTemplate"
import { ContactData } from "@/utils/types"
import { useState, Dispatch, SetStateAction, } from "react"
import { useForm } from "react-hook-form"
import MultipleInputLabel from "../MultipleInputLabel"
interface AddContactModalProps {
    openModal: boolean,
    setopenModal: Dispatch<SetStateAction<boolean>>
}
const AddContactModal = ({ openModal, setopenModal }: AddContactModalProps) => {
    const { handleSubmit, register, setValue, watch, setError, formState: { errors } } = useForm<ContactData>()
    const [labelList, setlabelList] = useState([
        { name: 'asd', active: true },
        { name: 'asd2', active: true },
        { name: 'asd3', active: true },
        { name: 'asd4', active: false }
    ])
    const onSubmit = async (formData: ContactData) => {
        alert('y')
    }
    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={false}>
            <p className="font-bold text-2xl">Tambah Kontak</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-sm w-full mt-8 max-h-[80vh] overflow-y-auto">
                <div>
                    <p className="font-bold mb-2">First Name</p>
                    <InputForm register={register} config={{
                        name: 'firstName',
                        type: 'text',
                        placeholder: 'First Name',
                        error: errors.firstName,
                        registerConfig: {
                            required: 'tidak boleh kosong',
                        }
                    }} />
                </div>
                <div>
                    <p className="font-bold mb-2">Last Name</p>
                    <InputForm register={register} config={{
                        name: 'lastName',
                        type: 'text',
                        placeholder: 'Last Name',
                        error: errors.lastName,
                        registerConfig: {
                        }
                    }} />
                </div>
                <div>
                    <p className="font-bold mb-2">Email</p>
                    <InputForm register={register} config={{
                        name: 'email',
                        type: 'text',
                        placeholder: 'Email',
                        error: errors.email,
                        registerConfig: {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            },
                        }
                    }} />
                </div>
                <div>
                    <p className="font-bold mb-2">Phone Number</p>
                    <InputForm register={register} config={{
                        name: 'phone',
                        type: 'text',
                        placeholder: 'Phone Number',
                        error: errors.firstName,
                        registerConfig: {
                            required: 'tidak boleh kosong'
                        }
                    }} />
                </div>
                <div>
                    <p className="font-bold mb-2">Gender</p>
                    <select {...register('gender')} className="px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border-[#B0B4C5] focus:border-primary">
                        <option value="male" className="">Laki-laki</option>
                        <option value="female">Perempuan</option>
                    </select>
                </div>
                <div>
                    <p className="font-bold mb-2">Country</p>
                    <select name="gender" id="gender" className="px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border-[#B0B4C5] focus:border-primary">
                        <option value="male" className="">Laki-laki</option>
                        <option value="female">Perempuan</option>
                    </select>
                </div>
                <div>
                    <p className="font-bold mb-2">Birthdate</p>
                    <InputForm register={register} config={{
                        name: 'birthDate',
                        placeholder: 'DD/MM/YYYY',
                        type: 'date',
                        error: errors.birthDate,
                        registerConfig: {
                            required: 'tidak boleh kosong'
                        }
                    }} />
                </div>
                <div>
                    <p className="font-bold mb-2">Label</p>
                    <MultipleInputLabel labelList={labelList} setlabelList={setlabelList} />
                </div>
                <div className="mt-4">
                    <button type="submit" className="bg-primary rounded-md text-white border border-primary px-4 py-3 text-center w-full">Simpan</button>
                </div>

            </form>

        </ModalTemplate>
    )
}

export default AddContactModal