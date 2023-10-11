'use client'
import { animated, useTransition } from "@react-spring/web"
import { useEffect, useState } from "react"
import ResetForm from "./ResetForm"
import ResetSuccess from "./ResetSuccess"


const ForgotPassword = () => {
    const [currentStep, setCurrentStep] = useState('forgot')
    const [userEmail, setuserEmail] = useState('')
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

    return (
        <>
            {componentTransition((style, item) => item === 'forgot' && (
                <animated.div style={style} className='bg-white md:shadow-xl px-8 py-10 rounded-xl mx-auto max-w-md lg:max-h-[80vh] overflow-y-scroll'>
                    <ResetForm setuserEmail={setuserEmail} setCurrentStep={setCurrentStep} />
                </animated.div>
            ))}
            {componentTransition((style, item) => item === 'success' && (
                <animated.div style={style} className='bg-white md:shadow-xl px-8 py-10 rounded-xl mx-auto max-w-md lg:max-h-[80vh] overflow-y-scroll'>
                    <ResetSuccess setCurrentStep={setCurrentStep} userEmail={userEmail} />
                </animated.div>
            ))}
        </>
    )
}

export default ForgotPassword