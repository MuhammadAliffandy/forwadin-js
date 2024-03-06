'use client';
import { useState, useEffect } from 'react'
import { animated, useSpring } from '@react-spring/web'
import Link from 'next/link'
import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import InputForm from '@/components/form/InputForm';
import ButtonSubmit from '@/components/form/ButtonSubmit';
import { toast } from 'react-toastify';

const SignIn = () => {
    const searchParams = useSearchParams()
    const callbackUrl = (searchParams.has('callbackUrl') ? searchParams.get('callbackUrl') : '/dashboard')
    const { push } = useRouter()
    const [isLoading, setisLoading] = useState(false)
    const { handleSubmit, setError, register, formState: { errors } } = useForm()

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
    const onSubmit = async (formData) => {
        setisLoading(true)
        try {
            const login = await signIn('credentials', {
                identifier: formData.userEmail,
                password: formData.password,
                redirect: false
            })
            if (!login?.error) {
                push('/dashboard')
            } else if (login.error === 'fetch failed') {
                toast.error('check your credentials or network connections')
                setError('userEmail', {
                    type: 'custom',
                    message: ''
                })
                setError('password', {
                    type: 'custom',
                    message: ''
                })
            }
            else {
                setError('userEmail', {
                    type: 'custom',
                    message: 'invalid credentials'
                })
                setError('password', {
                    type: 'custom',
                    message: ''
                })
            }
            setisLoading(false)
        } catch (error) {
            setisLoading(false)
            console.log(error)
        }

    }

    useEffect(() => { }, [])
    return (
        <animated.div style={componentSpring} className='bg-white md:shadow-xl px-8 py-10 rounded-xl mx-auto max-w-md lg:max-h-[80vh] overflow-y-scroll'>

            <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
                <div className='text-center'>
                    <p className='font-lexend font-bold text-2xl'>Welcome Back</p>
                    <p className='text-sm'>We're so excited to see you again!</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <InputForm register={register} config={{
                        name: 'userEmail',
                        placeholder: 'Username / Email',
                        type: 'text',
                        error: errors.userEmail,
                        registerConfig: {
                            required: 'tidak boleh kosong'
                        }
                    }} />
                    <InputForm register={register} config={{
                        name: 'password',
                        placeholder: 'Password',
                        type: 'password',
                        error: errors.password,
                        registerConfig: {
                            required: 'tidak boleh kosong',
                        }
                    }} />
                </div>
                <div>
                    <Link href={'/auth/forgot-password'} className='text-primary'>
                        Lupa Password?</Link>
                </div>
                <div className='flex flex-col gap-4'>
                    <div>
                        <ButtonSubmit isLoading={isLoading} text='Sign In' />
                    </div>
                    <div className='flex justify-center items-center gap-6 md:px-6'>
                        <hr className='border border-[#B0B4C5] h-px basis-1/3' />
                        <p className='whitespace-nowrap text-xs'>Atau sign in dengan Google</p>
                        <hr className='border border-[#B0B4C5] h-px basis-1/3' />
                    </div>
                    <div>
                        <div className="px-4 py-3 flex items-center justify-center gap-2 rounded-md w-full text-primary bg-white border border-primary text-center hover:cursor-pointer" onClick={() => signIn('google', {
                            callbackUrl: callbackUrl
                        })}>
                            <div className="flex-none">
                                <img src="/assets/icons/google-icon.svg" alt="" />
                            </div>
                            <p>Masuk dengan Google</p>
                        </div>
                    </div>
                </div>
                <div className='text-center text-sm'>
                    <p>Butuh buat akun? <Link href={'/signup'} className='text-primary'>Daftar di sini</Link> </p>
                    <p className='mt-2'>Login sebagai Customer Service? <Link href={'/customer-service/signin'} className='text-primary'>Klik di sini</Link> </p>
                </div>
            </form >
        </animated.div>
    )
}

export default SignIn