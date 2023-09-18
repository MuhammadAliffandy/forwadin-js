'use client';
import AuthPage from '@/components/template/AuthPage'
import Link from 'next/link'
import RegisterForm from '@/components/auth/RegisterForm'
import OTPForm from '@/components/auth/OTPForm'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react';
import { useSpring, animated, useTransition } from '@react-spring/web';
import ReactCardFlip from 'react-card-flip';
import { UserRegisterData } from '@/utils/interfaces';
import SuccessForm from '@/components/auth/SuccessForm';
const SignUp = () => {
    const [currentStep, setCurrentStep] = useState('register')
    const [userData, setUserData] = useState({
        username: null,
        email: null,
        phone: null,
        otp: null
    })
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
            {componentTransition((style, item) => item === "register" && (
                <animated.div style={style} className='bg-white md:shadow-xl px-8 py-10 rounded-xl mx-auto max-w-lg lg:max-h-[80vh] overflow-y-scroll'>
                    <RegisterForm setCurrentStep={setCurrentStep} setUserData={setUserData} userData={userData} />
                </animated.div>
            ))}
            {componentTransition((style, item) => item === "otp" && (
                <animated.div style={style} className='bg-white md:shadow-xl px-8 py-10 rounded-xl mx-auto max-w-lg lg:max-h-[80vh] overflow-y-scroll'>
                    <OTPForm setCurrentStep={setCurrentStep} />
                </animated.div>
            ))}
            {componentTransition((style, item) => item === "success" && (
                <animated.div style={style} className='bg-white md:shadow-xl px-8 py-10 rounded-xl mx-auto max-w-lg lg:max-h-[80vh] overflow-y-scroll'>
                    <SuccessForm />
                </animated.div>
            ))}

        </>
    )
}

export default SignUp