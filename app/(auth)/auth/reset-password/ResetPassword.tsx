'use client'
import { animated, useTransition } from "@react-spring/web"
import { useEffect, useState } from "react"

import ResetSuccess from "../forgot-password/ResetSuccess"
import { useRouter, useSearchParams } from "next/navigation"
import NewPasswordForm from "./NewPasswordForm"
import Link from "next/link"

const ResetPassword = () => {
    const searchParams = useSearchParams()
    const { push } = useRouter()
    const [currentStep, setCurrentStep] = useState('forgot')
    const [token, settoken] = useState('')
    const componentTransition = useTransition(currentStep, {
        from: {
            transform: "translateX(100px)",
            opacity: "0",
        },
        enter: {
            transform: "translateX(0px)",
            opacity: "1",
        },
    })

    useEffect(() => {
        document.querySelector('body')?.scroll(0, 0)
    }, [currentStep])
    useEffect(() => {
        if (searchParams.get('token'))
            settoken(searchParams.get('token')!)
        else
            push('/auth/forgot-password')
    }, [])
    return (
        <>
            {componentTransition((style, item) => item === 'forgot' && (
                <animated.div style={style} className='bg-white md:shadow-xl px-8 py-10 rounded-xl mx-auto max-w-md lg:max-h-[80vh] overflow-y-scroll'>
                    <NewPasswordForm setCurrentStep={setCurrentStep} token={token} />
                </animated.div>
            ))}
            {componentTransition((style, item) => item === 'success' && (
                <animated.div style={style} className='bg-white md:shadow-xl px-8 py-10 rounded-xl mx-auto max-w-md lg:max-h-[80vh] overflow-y-scroll'>
                    {/* <ResetSuccess setCurrentStep={setCurrentStep} /> */}
                    <p className="text-center font-lexend text-2xl font-bold">Reset Password Berhasil</p>
                    <Link href={'/signin'} className='block  text-center p-4 mt-8 rounded-md w-full bg-primary text-white border border-primary' >
                        Kembali ke halaman login
                    </Link>
                </animated.div>
            ))}
        </>
    )
}

export default ResetPassword