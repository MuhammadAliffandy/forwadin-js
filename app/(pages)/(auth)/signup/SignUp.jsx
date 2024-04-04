'use client';
import dynamic from 'next/dynamic';
const DynamicRegisterForm = dynamic(() => import('@/app/components/auth/RegisterForm'), { ssr: false, })
// import RegisterForm from '@/app/components/auth/RegisterForm'
import OTPForm from '@/app/components/auth/OTPForm'
import React, { useEffect, useState } from 'react';
import { animated, useTransition } from '@react-spring/web';
import SuccessForm from '@/app/components/auth/SuccessForm';
import PolicyForm from '@/app/components/auth/PolicyForm';
const SignUp = () => {
    const [currentStep, setCurrentStep] = useState('register')
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        phone: '',
        password: '',
        confirmPassword: '',
        otp: ''
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
                <animated.div style={style} className='bg-white md:shadow-xl px-8 py-10 rounded-xl mx-auto max-w-md lg:max-h-[80vh] overflow-y-scroll'>
                    <DynamicRegisterForm setCurrentStep={setCurrentStep} setUserData={setUserData} userData={userData} />
                </animated.div>
            ))}
            {componentTransition((style, item) => item === "policy" && (
                <animated.div style={style} className='bg-white md:shadow-xl px-8 py-10 rounded-xl mx-auto max-w-md lg:max-h-[80vh] overflow-y-scroll'>
                    <PolicyForm setCurrentStep={setCurrentStep} setUserData={setUserData} userData={userData} />
                </animated.div>
            ))}

            {componentTransition((style, item) => item === "otp" && (
                <animated.div style={style} className='bg-white md:shadow-xl px-8 py-10 rounded-xl mx-auto max-w-md lg:max-h-[80vh] overflow-y-scroll'>
                    <OTPForm setCurrentStep={setCurrentStep} />
                </animated.div>
            ))}
            {componentTransition((style, item) => item === "success" && (
                <animated.div style={style} className='bg-white md:shadow-xl px-8 py-10 rounded-xl mx-auto max-w-md lg:max-h-[80vh] overflow-y-scroll'>
                    <SuccessForm />
                </animated.div>
            ))}
        </>
    )
}

export default SignUp