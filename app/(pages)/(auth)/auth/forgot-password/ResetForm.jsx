import ButtonSubmit from "@/app/components/form/ButtonSubmit"
import InputForm from "@/app/components/form/InputForm"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const ResetForm = ({ setCurrentStep, setuserEmail }) => {
    const [isLoading, setisLoading] = useState(false)
    const { handleSubmit, register } = useForm()
    const onSubmit = async (formData) => {
        setisLoading(true)
        console.log(formData)
        try {
            const result = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: formData.email })
            })
            if (result.status === 200) {
                setisLoading(false)
                setuserEmail(formData.email)
                setCurrentStep('success')
            } else {
                const body = await result.json()
                toast.error(body.message)
                setisLoading(false)
            }
        } catch (error) {
            setisLoading(false)
            console.log(error)
            toast.error('Gagal konfirmasi email')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className='text-center'>
                <p className='font-lexend font-bold text-2xl'>Password Recovery</p>
                <p className='text-sm'>Kami akan membantu Anda mengatur ulang kata sandi Anda dengan cepat</p>
            </div>
            <div className="bg-neutral-75 rounded-md py-3 px-4 text-[#777C88] text-xs">Mohon masukkan alamat email Anda di bawah ini, dan kami akan mengirimkan instruksi untuk proses pemulihan.</div>
            <InputForm register={register} config={{
                name: 'email',
                type: 'text',
                placeholder: 'Email',
                registerConfig: {
                    required: 'email required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                    }
                }
            }} />
            <ButtonSubmit isLoading={isLoading} text="Konfirmasi" />
        </form>
    )
}

export default ResetForm