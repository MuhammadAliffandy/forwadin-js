import { Dispatch, SetStateAction } from "react"

const ResetSuccess = ({ userEmail, setCurrentStep }: { userEmail: string, setCurrentStep: Dispatch<SetStateAction<string>> }) => {
    const sendOTP = async () => {

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
                <div>Ingin mengganti email? <span onClick={() => setCurrentStep('forgot')} className="text-primary hover:cursor-pointer">Kembali</span></div>
            </div>
        </>
    )
}

export default ResetSuccess