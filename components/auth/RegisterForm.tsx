'use client'
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { useForm, useController } from "react-hook-form"
import { Dispatch, SetStateAction } from "react";
import { PulseLoader } from "react-spinners"
import { toast } from "react-toastify"
import { UserRegisterData } from "@/utils/types"
import { signIn } from "next-auth/react"

const Register = ({ setCurrentStep, setUserData, userData }: {
    setCurrentStep: Dispatch<SetStateAction<string>>,
    setUserData: Dispatch<SetStateAction<UserRegisterData>>,
    userData: UserRegisterData
}) => {
    const { handleSubmit, register, control, watch, formState: { errors } } = useForm<UserRegisterData>()
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit = async (formData: UserRegisterData) => {
        setIsLoading(true)
        // setTimeout(() => {
        //     setUserData(formData)
        //     setIsLoading(false)
        //     setCurrentStep('otp')
        // }, 3000)
        // setIsLoading(true)
        // alert(JSON.stringify(userData))
        try {
            const result = await signIn('credentials', {
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                redirect: false
            })
            setIsLoading(false)
            if (!result?.error) {
                setUserData(formData)
                toast.success('success')
                // setCurrentStep('otp')
            } else {
                toast.error(result.error)
                // console.log(result?.status)
            }

        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }

    }
    const [passwordValidator, setPasswordValidator] = useState({
        eightLength: false,
        lowerCase: false,
        upperCase: false,
        // numeric: false,
        // specialChar: false
    })

    const strongRegex = {
        eightLength: new RegExp("^(?=.{8,})"),
        lowerCase: new RegExp("^(?=.*[a-z])"),
        upperCase: new RegExp("^(?=.*[A-Z])"),
        // numeric: new RegExp("^(?=.*[0-9])"),
        // specialChar: new RegExp("^(?=.*[!@#$%^&*])")
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        const watchPassword = watch(value => {
            const password: string = value.password!
            if (strongRegex.eightLength.test(password))
                setPasswordValidator(prev => ({ ...prev, eightLength: true }))
            else
                setPasswordValidator(prev => ({ ...prev, eightLength: false }))
            if (strongRegex.lowerCase.test(password))
                setPasswordValidator(prev => ({ ...prev, lowerCase: true }))
            else
                setPasswordValidator(prev => ({ ...prev, lowerCase: false }))
            if (strongRegex.upperCase.test(password))
                setPasswordValidator(prev => ({ ...prev, upperCase: true }))
            else
                setPasswordValidator(prev => ({ ...prev, upperCase: false }))
            // if (strongRegex.specialChar.test(password))
            //     setPasswordValidator(prev => ({ ...prev, specialChar: true }))
            // else
            //     setPasswordValidator(prev => ({ ...prev, specialChar: false }))
            // if (strongRegex.numeric.test(password))
            //     setPasswordValidator(prev => ({ ...prev, numeric: true }))
            // else
            //     setPasswordValidator(prev => ({ ...prev, numeric: false }))
        })
        return () => watchPassword.unsubscribe()
    }, [watch, passwordValidator])

    return (
        <>
            <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
                <div className='text-center'>
                    <p className='font-lexend font-bold text-3xl'>Welcome to Forwardin</p>
                    <p className='w-[80%] mx-auto'>Revolutionize your communication journey with FowardIt today</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className="relative">
                        {errors.email && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errors.email.message}`}</p>)}
                        <input type="text" placeholder='Email' className={'p-4 focus:outline-none  rounded-md focus:ring-0 w-full ' + (errors.email ? 'border-danger focus:border-danger' : 'border-[#B0B4C5] focus:border-primary ')} {...register('email', {
                            required: 'email required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            },
                            value: userData.email
                        })} />
                    </div>
                    <div className="relative">
                        {errors.username && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errors.username.message}`}</p>)}
                        <input type="text" placeholder='Username' className={'p-4 focus:outline-none  rounded-md focus:ring-0 w-full ' + (errors.username ? 'border-danger focus:border-danger' : 'border-[#B0B4C5] focus:border-primary ')} {...register('username', {
                            required: 'Username Required',
                            value: userData.username
                        })} />
                    </div>
                    <div className="relative">
                        {errors.phone && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errors.phone.message}`}</p>)}
                        <input type="text" placeholder='Whatsapp Number' className={'p-4 focus:outline-none  rounded-md focus:ring-0 w-full ' + (errors.phone ? 'border-danger focus:border-danger' : 'border-[#B0B4C5] focus:border-primary ')} {...register('phone', {
                            required: 'Whatsapp Number Required',
                            value: userData.phone
                        })} />
                    </div>
                    <div className="relative">
                        {errors.password && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errors.password.message}`}</p>)}
                        <input type="password" placeholder='Password' className={'p-4 focus:outline-none  rounded-md focus:ring-0 w-full ' + (errors.password ? 'border-danger focus:border-danger' : 'border-[#B0B4C5] focus:border-primary ')} {...register('password', {
                            required: true,
                        })} />
                        <div className="bg-neutral-75 rounded-md py-2 px-4 mt-2 text-[#777C88]">
                            <p>Password harus mengandung :</p>
                            <div className="ml-2">
                                <div className="">
                                    {passwordValidator.eightLength ? (<p className='text-green-40'>&#10003; Paling tidak 8 karakter </p>
                                    ) : (<p className='text-danger'>Paling tidak 8 karakter </p>)}
                                    {passwordValidator.lowerCase ? (<p className='text-green-40'>&#10003; Huruf kecil (a-z) </p>
                                    ) : (<p className='text-danger'>Huruf kecil (a-z) </p>)}
                                    {passwordValidator.upperCase ? (<p className='text-green-40'>&#10003; Huruf besar (A-Z)</p>
                                    ) : (<p className='text-danger'>Huruf besar (A-Z)</p>)}
                                    {/* {passwordValidator.numeric ? (<p className='text-green-40'>&#10003; Angka</p>
                                    ) : (<p className='text-danger'>Angka</p>)}
                                    {passwordValidator.specialChar ? (<p className='text-green-40'>&#10003; Karakter Spesial (!@#$%^&*)</p>
                                    ) : (<p className='text-danger'>Karakter Spesial (!@#$%^&*)</p>)} */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        {errors.confirmPassword && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errors.confirmPassword.message}`}</p>)}
                        <input type="password" placeholder='Confirm Password' className={'p-4 focus:outline-none  rounded-md focus:ring-0 w-full ' + (errors.confirmPassword ? 'border-danger focus:border-danger' : 'border-[#B0B4C5] focus:border-primary ')} {...register('confirmPassword', {
                            required: true,
                            validate: (value: String) => {
                                if (value != watch('password'))
                                    return 'Password do not match'
                            }
                        })} />
                    </div>
                </div>
                <div>
                    <Link href={'/'} className='text-primary'>
                        Lupa Password?</Link>
                </div>
                <div className='flex flex-col gap-4'>
                    <div>
                        <button type="submit" className='p-4  rounded-md w-full bg-primary text-white border border-primary' disabled={isLoading ? true : false} >
                            {isLoading ? (<PulseLoader size={10} color="#F3F5F8" />)
                                : (<p>
                                    Sign Up
                                </p>)}
                        </button>
                    </div>
                    <div className='flex justify-center items-center gap-6 md:px-6'>
                        <hr className='border border-[#B0B4C5] h-px basis-1/3' />
                        <p className='whitespace-nowrap'>Atau sign in dengan Google</p>
                        <hr className='border border-[#B0B4C5] h-px basis-1/3' />
                    </div>
                    <div>
                        <a href="/" className='block p-4  rounded-md w-full text-primary bg-white border border-primary text-center'>Sign In</a>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Register