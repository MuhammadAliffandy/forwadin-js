import { Dispatch, SetStateAction, useState } from "react"
import { BarLoader } from "react-spinners"
import { toast } from "react-toastify"
import { forgotPasswordAuth } from "../../../../api/repository/authRepository"

const ResetSuccess = ({ userEmail, setCurrentStep }) => {
    const [isloading, setisloading] = useState(false)
    const sendOTP = async () => {
        setisloading(true)
        try {

            const data = { email: userEmail };
            const result = await forgotPasswordAuth(data)
            if (result.status === 200) {
                setisloading(false)
                toast.success('Success send verification!')
            } else {
                const body = result.data
                toast.error(body.message)
                setisloading(false)
            }
        } catch (error) {
            setisloading(false)
            console.log(error)
            toast.error('Gagal mengirim OTP')
        }
    }
    return (
        <>
            <div className='text-center'>
                <p className='font-lexend font-bold text-2xl'>Cek Email</p>
                <p className='text-sm'>Cek email yang anda masukkan tadi, kemudian ikuti instruksi untuk proses pemulihan</p>
            </div>
            <div className="text-center text-sm whitespace-pre mt-4">
                <div>Kode tidak terkirim? <span onClick={sendOTP} className="text-primary hover:cursor-pointer">Coba Lagi</span></div>
            </div>
            <div className="text-center text-sm whitespace-pre mt-2">
                {isloading ? (
                    <div className="flex justify-center">
                        <BarLoader color="#3366ff" />
                    </div>
                ) : (
                    <div>Ingin mengganti email? <span onClick={() => setCurrentStep('forgot')} className="text-primary hover:cursor-pointer">Kembali</span></div>
                )}
            </div>
        </>
    )
}

export default ResetSuccess