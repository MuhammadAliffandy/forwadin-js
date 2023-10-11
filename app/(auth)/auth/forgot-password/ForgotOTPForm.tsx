'use client'
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import ButtonSubmit from "@/components/form/ButtonSubmit";
import { MultipleInputRef, ResetUserData } from "@/utils/types";

const ForgotOTPForm = ({ setCurrentStep, userData, setuserData }: { setCurrentStep: Dispatch<SetStateAction<string>>, userData: ResetUserData, setuserData: Dispatch<SetStateAction<ResetUserData>> }) => {
    const [isLoading, setisLoading] = useState(false)
    const multipleInputRef = useRef<MultipleInputRef>({})
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [fieldName, index] = name.split('_')
        let current = parseInt(index, 10)

        if (current <= 5)
            if (value) {
                multipleInputRef.current[`otp_${current + 1}`].focus()
            }
    }
    const handleRefChange = (element: HTMLInputElement | null, id: number) => {
        if (multipleInputRef.current && element) {
            multipleInputRef.current[`otp_${id}`] = element
        }
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const otp = multipleInputRef.current['otp_1'].value.toString() +
            multipleInputRef.current['otp_2'].value.toString() +
            multipleInputRef.current['otp_3'].value.toString() +
            multipleInputRef.current['otp_4'].value.toString() +
            multipleInputRef.current['otp_5'].value.toString() +
            multipleInputRef.current['otp_6'].value.toString()
        setuserData(prev => ({ ...prev, otp: otp }))
        setCurrentStep('reset')
    }

    const sendOTP = async () => {
        setisLoading(true)
        try {
            const result = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email: userData.email })
            })
            if (result.status === 200) {
                setisLoading(false)
                setCurrentStep('reset')
            } else {
                const body = await result.json()
                toast.error(body.message)
                setisLoading(false)
            }
        } catch (error) {
            setisLoading(false)
            toast.error('Gagal konfirmasi email')
        }
        for (let i = 1; i <= 6; i++) {
            multipleInputRef.current[`otp_${i}`].value = ''
        }
    }
    const handlePaste = (e: React.ClipboardEvent) => {
        const pasteText = e.clipboardData.getData('text')
        multipleInputRef.current['otp_1'].value = pasteText[0]
        multipleInputRef.current['otp_2'].value = pasteText[1]
        multipleInputRef.current['otp_3'].value = pasteText[2]
        multipleInputRef.current['otp_4'].value = pasteText[3]
        multipleInputRef.current['otp_5'].value = pasteText[4]
        multipleInputRef.current['otp_6'].value = pasteText[5]
    }
    return (
        <form className='flex flex-col gap-8 ' onSubmit={handleSubmit}>
            <div className='text-center'>
                <p className='font-lexend font-bold text-3xl'>Verifikasi Akun </p>
                <p className='w-[80%] mx-auto'>Masukkan kode verifikasi yang telah dikirimkan ke email</p>
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
            <div className="text-center ">
                <div>Kode tidak terkirim? <div onClick={sendOTP} className="text-primary hover:cursor-pointer">Coba Lagi</div></div>
            </div>
        </form>
    )
}

export default ForgotOTPForm