'use client'
import Link from "next/link"
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
const OTPForm = ({ setCurrentStep }: { setCurrentStep: Dispatch<SetStateAction<string>> }) => {
    const [formData, setFormData] = useState({
        otp1: null,
        otp2: null,
        otp3: null,
        otp4: null,
    })
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { maxLength, name, value } = e.target;
        const [fieldName, index] = name.split('_')
        let current = parseInt(index, 10)
        if (current <= 3)
            if (value) {
                const nextInput: HTMLElement | null = document.querySelector(
                    `input[name=${fieldName}_${current + 1}]`
                );
                nextInput?.focus()
            }
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setCurrentStep('success')
        //  TODO
    }
    return (
        <form className='flex flex-col gap-8 ' onSubmit={handleSubmit}>
            <div className='text-center'>
                <p className='font-lexend font-bold text-3xl'>Verifikasi Akun </p>
                <p className='w-[80%] mx-auto'>Masukkan kode verifikasi yang telah dikirimkan ke email</p>
            </div>
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                <div className="w-16 h-16 ">
                    <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="otp_1" id="otp_1" maxLength={1} onChange={handleInputChange} />
                </div>
                <div className="w-16 h-16 ">
                    <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="otp_2" id="otp_2" maxLength={1} onChange={handleInputChange} />
                </div>
                <div className="w-16 h-16 ">
                    <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="otp_3" id="otp_3" maxLength={1} onChange={handleInputChange} />
                </div>
                <div className="w-16 h-16 ">
                    <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="otp_4" id="otp_4" maxLength={1} onChange={handleInputChange} />
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div>
                    <button type="submit" className='p-4  rounded-md w-full bg-primary text-white border border-primary'>Submit</button>
                </div>
            </div>
            <div className="text-center ">
                <p>Kode tidak terkirim? <Link href={'/'} className="text-primary">Coba Lagi</Link></p>
                <p className="mt-2">Ingin mengganti data? <span className="text-primary hover:cursor-pointer" onClick={() => setCurrentStep('register')}>Kembali</span></p>
            </div>
        </form>
    )
}

export default OTPForm