'use client'
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify"
import { UserRegisterData, CountryCode } from "@/app/utils/types"
import { animated, useTransition } from "@react-spring/web";
import { formatPhoneCode, getCountryList } from "@/app/utils/helper/countryCode";
import CountryFlagSvg from 'country-list-with-dial-code-and-flag/dist/flag-svg'
import InputForm from "../form/InputForm";
import ButtonSubmit from "../form/ButtonSubmit";
import { text } from "stream/consumers";
import { signIn } from "next-auth/react";

const Register = ({ setCurrentStep, setUserData, userData }) => {
    const { handleSubmit, register, setValue, watch, setError, formState: { errors } } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [countryCodeDropdown, setcountryCodeDropdown] = useState(false)
    const [countryCodeSearchText, setcountryCodeSearchText] = useState('')
    const [countryCodeData, setcountryCodeData] = useState([])
    const [countryCodeSearchData, setcountryCodeSearchData] = useState([])
    const [showPasswordCriteria, setshowPasswordCriteria] = useState(false)
    const [currentCountryCode, setcurrentCountryCode] = useState({
        name: '',
        dial_code: '',
        code: '',
        flag: ''
    })
    const countryCodeInputRef = useRef<HTMLInputElement>(null)
    const componentTransition = useTransition(countryCodeDropdown, {
        from: {
            transform: "translateY(-50px)",
            opacity: "0",
        },
        enter: {
            transform: "translateY(0px)",
            opacity: "1",
        },
        leave: {
            transform: "translateY(50px)",
            opacity: "0",
        }

    })

    const onSubmit = async (formData) => {
        setIsLoading(true)
        try {
            const formattedPhone = formatPhoneCode(formData.phone, currentCountryCode.dial_code)
            formData.phone = formattedPhone.replace('+', '')
            const result = await fetch('/api/users/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    phone: formData.phone,
                })
            })
            const body = await result.json()
            if (result.ok) {
                const userStatus = body
                console.log(userStatus)
                if (!userStatus.email || !userStatus.phone || !userStatus.username) {
                    if (!userStatus.email)
                        setError('email', {
                            type: 'required',
                            message: 'email already taken'
                        })
                    if (!userStatus.phone)
                        setError('phone', {
                            type: 'required',
                            message: 'phone already taken'
                        })
                    if (!userStatus.username)
                        setError('username', {
                            type: 'required',
                            message: 'username already taken'
                        })
                    setValue('password', '')
                    setValue('confirmPassword', '')
                }
                else {
                    setUserData(formData)
                    setIsLoading(false)
                    setCurrentStep('policy')
                }
            } else {
                toast.error(body.message)
            }
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }

    }
    const [passwordValidator, setPasswordValidator] = useState({
        eightLength: false,
        lowerCase: false,
        upperCase: false,
        numeric: false,
        // specialChar: false
    })

    const strongRegex = {
        eightLength: new RegExp("^(?=.{8,})"),
        lowerCase: new RegExp("^(?=.*[a-z])"),
        upperCase: new RegExp("^(?=.*[A-Z])"),
        numeric: new RegExp("^(?=.*[0-9])"),
        // specialChar: new RegExp("^(?=.*[!@#$%^&*])")
    }
    const handleCountryCodeClick = (countryCode) => {
        setcurrentCountryCode(countryCode)
        setcountryCodeDropdown(false)
    }
    useEffect(() => {
        setcountryCodeData(getCountryList() )
        setcurrentCountryCode(getCountryList('+62'))
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        const newCountryCodeData = countryCodeData.filter(item => item.name.toLowerCase().includes(countryCodeSearchText.toLowerCase()) || item.dial_code.includes(countryCodeSearchText) || item.code.includes(countryCodeSearchText))
        setcountryCodeSearchData(newCountryCodeData)
    }, [countryCodeSearchText])
    useEffect(() => {
        const watchPassword = watch(value => {
            const password = value.password
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
            if (strongRegex.numeric.test(password))
                setPasswordValidator(prev => ({ ...prev, numeric: true }))
            else
                setPasswordValidator(prev => ({ ...prev, numeric: false }))
        })
        return () => watchPassword.unsubscribe()
    }, [watch, passwordValidator])

    return (
        <>
            <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
                <div className='text-center'>

                    <p className='font-lexend font-bold text-3xl'>Welcome to Forwardin</p>
                    <p className='w-[80%] mx-auto text-sm mt-2'>Revolutionize your communication journey with FowardIt today</p>
                </div>
                <div className='flex flex-col gap-4 text-sm'>
                    <div className="flex gap-4">
                        <InputForm register={register} config={{
                            name: 'firstName',
                            type: 'text',
                            placeholder: 'First Name',
                            error: errors.firstName,
                            registerConfig: {
                                required: 'required',
                                value: userData.firstName
                            }
                        }} />
                        <InputForm register={register} config={{
                            name: 'lastName',
                            type: 'text',
                            placeholder: 'Last Name',
                            error: errors.lastName,
                            registerConfig: {
                                required: 'required',
                                value: userData.lastName
                            }
                        }} />

                    </div>
                    <InputForm register={register} config={{
                        name: 'email',
                        type: 'text',
                        placeholder: 'Email',
                        error: errors.email,
                        registerConfig: {
                            required: 'email required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            },
                            value: userData.email
                        }
                    }} />
                    <InputForm register={register} config={{
                        name: 'username',
                        type: 'text',
                        placeholder: 'Username',
                        error: errors.username,
                        registerConfig: {
                            required: 'Username Required',
                            value: userData.username
                        }
                    }} />
                    <div className="flex gap-2 relative">
                        <div className="flex" >
                            <div className="rounded-md border-[#B0B4C5]/50 hover:border-[#B0B4C5] border flex items-center justify-between gap-1 w-full py-3 px-2  hover:cursor-pointer" onClick={() => setcountryCodeDropdown(!countryCodeDropdown)}>
                                <div className="flex gap-2 font-bold ">
                                    <div className="w-4" dangerouslySetInnerHTML={{ __html: CountryFlagSvg[currentCountryCode.code] }} />
                                    <div>{currentCountryCode?.code}</div>
                                </div>
                                <div className="flex-none">
                                    <img src="/assets/icons/caret-down-black.svg" alt=""
                                        className="" width={9} />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex-1 flex">
                            {errors.phone && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errors.phone.message}`}</p>)}
                            <div className={'flex items-center px-2 text-sm rounded-md focus:outline-none focus:ring-0 w-full border ' + (errors.phone ? 'border-danger/50 hover:border-danger focus:border-danger' : 'border-[#B0B4C5]/50 hover:border-[#B0B4C5] focus:border-primary')} style={{ MozAppearance: 'textfield', WebkitAppearance: 'textfield' }}>
                                <div className=" text-customGray ">{currentCountryCode.dial_code}</div>
                                <input type="number" placeholder='Whatsapp Number' className='focus:ring-0 focus:outline-none border-none' {...register('phone', {
                                    required: 'Required',
                                    value: userData.phone,
                                    pattern: /^[0-9]+$/
                                })} />
                            </div>
                        </div>
                        {componentTransition((style, item) => item && (
                            <animated.div style={style} className="absolute bg-white rounded-md border border-customGray w-full mt-16 z-10 shadow-lg text-sm">
                                <div className="flex items-center gap-2 border-b border-customGray px-6 py-2">
                                    <div className="hover:cursor-pointer" onClick={() => countryCodeInputRef.current?.focus()} >
                                        <img src="/assets/icons/search_grey.png" alt="" />
                                    </div>
                                    <input ref={countryCodeInputRef} type="text" placeholder="Cari kode negara" className=" flex-1 w-full text-sm outline-none border-none focus:ring-0 focus:outline-none focus:border-transparent" value={countryCodeSearchText} onChange={(e) => setcountryCodeSearchText(e.target.value)} />
                                </div>
                                <div className="overflow-x-scroll max-h-40 flex flex-col gap-2 font-bold">
                                    {countryCodeSearchText ? countryCodeSearchData.map(i => (
                                        <div className="border-b border-customGray px-6 py-2 hover:cursor-pointer flex gap-2" onClick={() => handleCountryCodeClick(i)}>
                                            <div className="w-4" dangerouslySetInnerHTML={{ __html: CountryFlagSvg[i.code] }} />
                                            <div>{i.name}&emsp;({i.dial_code})</div>
                                        </div>
                                    )) :
                                        countryCodeData.map(i => (
                                            <div className="border-b border-customGray px-6 py-2 hover:cursor-pointer flex gap-2" onClick={() => handleCountryCodeClick(i)}>
                                                <div className="w-4" dangerouslySetInnerHTML={{ __html: CountryFlagSvg[i.code] }} />
                                                <div>{i.name}&emsp;({i.dial_code})</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </animated.div>))}
                    </div>
                    <div className="relative">
                        {errors.password && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errors.password.message}`}</p>)}
                        <input type="password" placeholder='Password' className={'text-sm px-4 py-3 focus:outline-none  rounded-md focus:ring-0 w-full ' + (errors.password ? 'border-danger/50 hover:border-danger focus:border-danger' : 'border-[#B0B4C5]/50 hover:border-[#B0B4C5] focus:border-primary ')} {...register('password', {
                            required: true,
                        })} onFocus={() => setshowPasswordCriteria(true)} />
                        {showPasswordCriteria && (
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
                                        {passwordValidator.numeric ? (<p className='text-green-40'>&#10003; Angka</p>
                                        ) : (<p className='text-danger'>Angka</p>)}
                                        {/* {passwordValidator.specialChar ? (<p className='text-green-40'>&#10003; Karakter Spesial (!@#$%^&*)</p>
                                ) : (<p className='text-danger'>Karakter Spesial (!@#$%^&*)</p>)} */}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <InputForm register={register} config={{
                        name: 'confirmPassword',
                        type: 'password',
                        placeholder: 'Confirm Password',
                        error: errors.confirmPassword,
                        registerConfig: {
                            required: true,
                            validate: (value) => {
                                if (value != watch('password'))
                                    return 'Password do not match'
                            }
                        }
                    }} />
                </div>
                <div className='flex flex-col gap-4'>
                    <div>
                        <ButtonSubmit isLoading={isLoading} text='Sign Up' />
                    </div>
                    <div className='flex justify-center items-center gap-6 md:px-6'>
                        <hr className='border border-[#B0B4C5] h-px basis-1/3' />
                        <p className='whitespace-nowrap text-[10px]'>Atau sign up dengan Google</p>
                        <hr className='border border-[#B0B4C5] h-px basis-1/3' />
                    </div>
                    <div className="">
                        <div onClick={() => signIn('google', {
                            callbackUrl: "/dashboard"
                        })} className="px-4 py-3 flex items-center justify-center gap-2 rounded-md w-full text-primary bg-white border border-primary text-center hover:cursor-pointer">
                            <div className="flex-none">
                                <img src="/assets/icons/google-icon.svg" alt="" />
                            </div>
                            <p>Masuk dengan Google</p>
                        </div>
                    </div>
                </div>
                <p className="text-center text-sm">Sudah punya akun? <Link href={'/signin'} className='text-primary'>Masuk di sini</Link></p>
            </form>
        </>
    )
}

export default Register