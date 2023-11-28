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

interface UserLoginData {
    userEmail: string,
    password: string
}
const SignIn = () => {
    const searchParams = useSearchParams()!
    const callbackUrl = (searchParams.has('callbackUrl') ? searchParams.get('callbackUrl') : '/dashboard')!
    const { push } = useRouter()
    const [isLoading, setisLoading] = useState(false)
    const { handleSubmit, setError, register, formState: { errors } } = useForm<UserLoginData>()

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
                    <p className='font-lexend font-bold text-2xl'>Customer Service</p>
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
                <ButtonSubmit isLoading={isLoading} text='Sign In' />
            </form >
        </animated.div>
    )
}

export default SignIn