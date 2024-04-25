import ButtonSubmit from '@/app/components/form/ButtonSubmit'
import ModalTemplate from '@/app/components/template/ModalTemplate'
import { useEffect, useRef, useState } from 'react';
import { BarLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const EmailVerifyModal = ({ openModal, setopenModal, refresh }) => {
    const [isLoading, setisLoading] = useState(false)
    const [otpLoading, setotpLoading] = useState(false)
    const multipleInputRef = useRef<MultipleInputRef>({})
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [fieldName, index] = name.split('_')
        let current = parseInt(index, 10)

        if (current <= 5)
            if (value) {
                multipleInputRef.current[`otp_${current + 1}`].focus()
            }
    }
    const handleRefChange = (element, id) => {
        if (multipleInputRef.current && element) {
            multipleInputRef.current[`otp_${id}`] = element
        }
    }
    const handleSubmit = async (e) => {
        setisLoading(true)
        e.preventDefault()
        const otp = multipleInputRef.current['otp_1'].value.toString() +
            multipleInputRef.current['otp_2'].value.toString() +
            multipleInputRef.current['otp_3'].value.toString() +
            multipleInputRef.current['otp_4'].value.toString() +
            multipleInputRef.current['otp_5'].value.toString() +
            multipleInputRef.current['otp_6'].value.toString()
        try {
            const result = await fetch('/api/auth/otp', {
                method: 'POST',
                body: JSON.stringify({ token: otp })
            })
            const body = result.json()
            if (result.ok) {
                // Sukses TODO
                toast.success('Berhasil verifikasi email')
                refresh()
                setopenModal(false)
            }
            else
                toast.error(body.message)
        } catch (error) {
            toast.error('Server Error')
        }
        setisLoading(false)
    }
    const sendOTP = async () => {
        setotpLoading(true)
        try {
            const result = await fetch('/api/auth/otp', {
                method: 'GET',
            })
            const body = result.json()
            if (result.ok)
                toast.success('otp sent! please check your email')
            else
                toast.error(body.message)
        } catch (error) {
            toast.error('Server Error')
        }
        for (let i = 1; i <= 6; i++) {
            multipleInputRef.current[`otp_${i}`].value = ''
        }
        setotpLoading(false)
    }
    const handlePaste = (e) => {
        const pasteText = e.clipboardData.getData('text')
        multipleInputRef.current['otp_1'].value = pasteText[0]
        multipleInputRef.current['otp_2'].value = pasteText[1]
        multipleInputRef.current['otp_3'].value = pasteText[2]
        multipleInputRef.current['otp_4'].value = pasteText[3]
        multipleInputRef.current['otp_5'].value = pasteText[4]
        multipleInputRef.current['otp_6'].value = pasteText[5]
    }
    useEffect(() => {

        sendOTP()
    }, [])
    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal}
            outsideClose={false}>
            <form className='flex flex-col gap-8 ' onSubmit={handleSubmit}>
                <div className='text-center'>
                    <p className='font-lexend font-bold text-2xl'>Verifikasi Akun </p>
                    <p className='w-[80%] mx-auto text-sm'>Masukkan kode verifikasi yang telah dikirimkan ke email</p>
                </div>
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-12 h-12 ">
                        <input onPaste={handlePaste} ref={element => handleRefChange(element, 1)} className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="otp_1" id="otp_1" maxLength={1} onChange={handleInputChange} />
                    </div>
                    <div className="w-12 h-12 ">
                        <input ref={element => handleRefChange(element, 2)} className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="otp_2" id="otp_2" maxLength={1} onChange={handleInputChange} />
                    </div>
                    <div className="w-12 h-12 ">
                        <input ref={element => handleRefChange(element, 3)} className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="otp_3" id="otp_3" maxLength={1} onChange={handleInputChange} />
                    </div>
                    <div className="w-12 h-12 ">
                        <input ref={element => handleRefChange(element, 4)} className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="otp_4" id="otp_4" maxLength={1} onChange={handleInputChange} />
                    </div>
                    <div className="w-12 h-12 ">
                        <input ref={element => handleRefChange(element, 5)} className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="otp_5" id="otp_4" maxLength={1} onChange={handleInputChange} />
                    </div>
                    <div className="w-12 h-12 ">
                        <input ref={element => handleRefChange(element, 6)} className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="otp_6" id="otp_4" maxLength={1} onChange={handleInputChange} />
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div>
                        <ButtonSubmit isLoading={isLoading} text='Submit' />
                    </div>
                </div>
                <div className="text-center text-sm">

                    {otpLoading ? (
                        <div className="flex justify-center">

                            <BarLoader color="#3366ff" />
                        </div>
                    ) : (
                        <div>Kode tidak terkirim? <span onClick={sendOTP} className="text-primary hover:cursor-pointer">Coba Lagi</span></div>
                    )}
                </div>
            </form>
        </ModalTemplate>
    )
}

export default EmailVerifyModal