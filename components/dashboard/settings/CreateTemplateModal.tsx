import InputForm from "@/components/form/InputForm"
import ModalTemplate from "@/components/template/ModalTemplate"
import { User } from "next-auth"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import TextAreaInput from "../chat/TextAreaInput"
import ButtonSubmit from "@/components/form/ButtonSubmit"
import { Button } from "@nextui-org/react"
import { fetchClient } from "@/utils/helper/fetchClient"
import { toast } from "react-toastify"

interface CreateTemplateModalProps {
  openModal: boolean,
  setopenModal: Dispatch<SetStateAction<boolean>>,
  user: User | undefined,
  refresh: () => void
}
interface TemplateForm {
  name: string,
  message: string
}
const CreateTemplateModal = ({ refresh, openModal, setopenModal, user }: CreateTemplateModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const { handleSubmit, register, reset, formState: { errors } } = useForm<TemplateForm>()
  const [inputText, setinputText] = useState('')
  const submitTemplate = async (data: TemplateForm) => {
    setIsLoading(true)
    const result = await fetchClient({
      url: '/templates',
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        message: inputText,
        userId: user?.id
      }),
      user: user
    })
    if (result?.ok) {
      refresh()
      toast.success('berhasil simpan template')
      setopenModal(false)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    if (inputText) setIsDisabled(false)
    else setIsDisabled(true)
  }, [inputText])
  return (
    <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={false}>
      <form onSubmit={handleSubmit(submitTemplate)} className="flex flex-col gap-4">
        <p className='font-bold text-2xl'>Tambah Template</p>
        <div>
          <p className="mb-2">Nama Template</p>
          <InputForm register={register} config={{
            name: 'name',
            placeholder: 'Nama',
            type: 'text',
            error: errors.name,
            registerConfig: {
              required: 'tidak boleh kosong'
            }
          }} />
        </div>
        <div>
          <p className="mb-2">Pesan</p>
          <TextAreaInput settext={setinputText} text={inputText} limit={1500} />
        </div>
        <Button color="primary" fullWidth className="rounded-md" size="lg" type="submit" isLoading={isLoading} isDisabled={isDisabled}>
          Simpan
        </Button>
      </form>

    </ModalTemplate>
  )
}

export default CreateTemplateModal