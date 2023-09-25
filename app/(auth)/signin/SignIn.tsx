'use client';
import { useState, useEffect } from 'react'
import { animated, useSpring } from '@react-spring/web'
import Link from 'next/link'
import { useForm, useController } from "react-hook-form"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
interface UserLoginData {
    userEmail: string,
    password: string
}
const SignIn = () => {
    const { push } = useRouter()
    const [loginData, setloginData] = useState({
        userEmail: "",
        password: ""
    })
    const [isLoading, setisLoading] = useState(false)
    const { handleSubmit, setError, setValue, register, formState: { errors } } = useForm<UserLoginData>()

    const componentSpring = useSpring({
        from: {
            transform: "translateX(100px)",
            opacity: "0",
        },
        to: {
            transform: "translateX(0px)",
            opacity: "1",
        },
    })
    const onSubmit = async (formData: UserLoginData) => {
        setisLoading(true)
        const login = await signIn('credentials', {
            identifier: formData.userEmail,
            password: formData.password,
            redirect: false
        })
        if (!login?.error) {
            push('/dashboard')
        } else {
            setError('userEmail', {
                type: 'custom',
                message: 'invalid credentials'
            })
            setError('password', {
                type: 'custom',
                message: ''
            })
            setValue('password', '')
        }
        setisLoading(false)
    }
    return (
        <animated.div style={componentSpring} className='bg-white md:shadow-xl px-8 py-10 rounded-xl mx-auto max-w-lg lg:max-h-[80vh] overflow-y-scroll'>

            <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
                <div className='text-center'>
                    <p className='font-lexend font-bold text-3xl'>Welcome Back</p>
                    <p className=''>We're so excited to see you again!</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className="relative">
                        {errors.userEmail && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errors.userEmail.message}`}</p>)}
                        <input type="text" placeholder='Username / Email' className={'p-4 focus:outline-none  rounded-md focus:ring-0 w-full ' + (errors.userEmail ? 'border-danger focus:border-danger' : 'border-[#B0B4C5] focus:border-primary ')} {...register('userEmail', {
                            required: 'field required',
                        }
                        )} />
                    </div>
                    <div className="relative">
                        {errors.password && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errors.password.message}`}</p>)}
                        <input type="password" placeholder='password' className={'p-4 focus:outline-none  rounded-md focus:ring-0 w-full ' + (errors.password ? 'border-danger focus:border-danger' : 'border-[#B0B4C5] focus:border-primary ')} {...register('password', {
                            required: 'field required',
                        }
                        )} />
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
                        <Link href={'/'} className='p-4  rounded-md w-full text-primary bg-white border border-primary block text-center'>Sign In</Link>
                    </div>
                </div>
                <div className='text-center text-lg'>
                    <p>Butuh buat akun? <Link href={'/'} className='text-primary'>Daftar di sini</Link> </p>
                </div>
            </form >
        </animated.div>
    )
}

export default SignIn