'use client'
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { useForm, useController } from "react-hook-form"
import { Dispatch, SetStateAction } from "react";
import { PulseLoader } from "react-spinners"
import { toast } from "react-toastify"
import { UserRegisterData, CountryCode } from "@/utils/types"
import { signIn } from "next-auth/react"
import { animated, useTransition } from "@react-spring/web";
import { formatPhoneCode, getCountryList } from "@/utils/helper/countryCode";
import CountryFlagSvg from 'country-list-with-dial-code-and-flag/dist/flag-svg'

const Register = ({ setCurrentStep, setUserData, userData }: {
    setCurrentStep: Dispatch<SetStateAction<string>>,
    setUserData: Dispatch<SetStateAction<UserRegisterData>>,
    userData: UserRegisterData
}) => {
    const { handleSubmit, register, setValue, watch, setError, formState: { errors } } = useForm<UserRegisterData>()
    const [isLoading, setIsLoading] = useState(false)
    const [countryCodeDropdown, setcountryCodeDropdown] = useState(false)
    const [countryCodeSearchText, setcountryCodeSearchText] = useState('')
    const [countryCodeData, setcountryCodeData] = useState<CountryCode[]>([])
    const [countryCodeSearchData, setcountryCodeSearchData] = useState<CountryCode[]>([])
    const [showPasswordCriteria, setshowPasswordCriteria] = useState(false)
    const [currentCountryCode, setcurrentCountryCode] = useState<CountryCode>({
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

    const onSubmit = async (formData: UserRegisterData) => {
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
                const userStatus: { email: boolean, phone: boolean, username: boolean } = body
                console.log(userStatus)
                if (!userStatus.email || !userStatus.phone || !userStatus.username) {
                    if (!userStatus.email)
                        setError('email', {
                            type: 'custom',
                            message: 'email already taken'
                        })
                    if (!userStatus.phone)
                        setError('phone', {
                            type: 'custom',
                            message: 'phone already taken'
                        })
                    if (!userStatus.username)
                        setError('username', {
                            type: 'custom',
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
    const handleCountryCodeClick = (countryCode: CountryCode) => {
        setcurrentCountryCode(countryCode)
        setcountryCodeDropdown(false)
    }
    useEffect(() => {
        setcountryCodeData(getCountryList() as CountryCode[])
        setcurrentCountryCode(getCountryList('+62') as CountryCode)
        window.scrollTo(0, 0)
        // console.log(CountryFlagSvg[getCountryList()[0].code])
        // console.log(JSON.stringify(getCountryList()[0]))
    }, [])
    useEffect(() => {
        const newCountryCodeData = countryCodeData.filter(item => item.name.toLowerCase().includes(countryCodeSearchText.toLowerCase()) || item.dial_code.includes(countryCodeSearchText) || item.code.includes(countryCodeSearchText))
        setcountryCodeSearchData(newCountryCodeData)
    }, [countryCodeSearchText])
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
                <div className='flex flex-col gap-4 text-xs'>
                    <div className="relative">
                        {errors.email && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errors.email.message}`}</p>)}
                        <input type="text" placeholder='Email' className={'p-4 text-xs focus:outline-none  rounded-md focus:ring-0 w-full ' + (errors.email ? 'border-danger focus:border-danger' : 'border-[#B0B4C5] focus:border-primary ')} {...register('email', {
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
                        <input type="text" placeholder='Username' className={'p-4 focus:outline-none text-xs rounded-md focus:ring-0 w-full ' + (errors.username ? 'border-danger focus:border-danger' : 'border-[#B0B4C5] focus:border-primary ')} {...register('username', {
                            required: 'Username Required',
                            value: userData.username
                        })} />
                    </div>
                    <div className="flex gap-2 relative">
                        <div className="flex" >
                            <div className="rounded-md  border-[#B0B4C5] border flex items-center justify-between gap-1 w-full p-3 hover:cursor-pointer" onClick={() => setcountryCodeDropdown(!countryCodeDropdown)}>
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
                            <div className="absolute top-1/2 -translate-y-1/2 text-customGray left-4">{currentCountryCode.dial_code}</div>
                            <input type="text" placeholder='Whatsapp Number' className={'text-xs pr-4 pl-12 py-4 focus:outline-none  rounded-md focus:ring-0 w-full ' + (errors.phone ? 'border-danger focus:border-danger' : 'border-[#B0B4C5] focus:border-primary ')} {...register('phone', {
                                required: 'Whatsapp Required',
                                value: userData.phone
                            })} />
                        </div>
                        {componentTransition((style, item) => item && (
                            <animated.div style={style} className="absolute bg-white rounded-md border border-customGray w-full mt-16 z-10 shadow-lg text-xs">
                                <div className="flex items-center gap-2 border-b border-customGray px-6 py-2">
                                    <div className="hover:cursor-pointer" onClick={() => countryCodeInputRef.current?.focus()} >
                                        <img src="/assets/icons/search_grey.png" alt="" />
                                    </div>
                                    <input ref={countryCodeInputRef} type="text" placeholder="Cari kode negara" className=" flex-1 w-full text-xs outline-none border-none focus:ring-0 focus:outline-none focus:border-transparent" value={countryCodeSearchText} onChange={(e) => setcountryCodeSearchText(e.target.value)} />
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
                        <input type="password" placeholder='Password' className={'text-xs p-4 focus:outline-none  rounded-md focus:ring-0 w-full ' + (errors.password ? 'border-danger focus:border-danger' : 'border-[#B0B4C5] focus:border-primary ')} {...register('password', {
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
                                        {/* {passwordValidator.numeric ? (<p className='text-green-40'>&#10003; Angka</p>
                                    ) : (<p className='text-danger'>Angka</p>)}
                                    {passwordValidator.specialChar ? (<p className='text-green-40'>&#10003; Karakter Spesial (!@#$%^&*)</p>
                                ) : (<p className='text-danger'>Karakter Spesial (!@#$%^&*)</p>)} */}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        {errors.confirmPassword && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errors.confirmPassword.message}`}</p>)}
                        <input type="password" placeholder='Confirm Password' className={'text-xs p-4 focus:outline-none  rounded-md focus:ring-0 w-full ' + (errors.confirmPassword ? 'border-danger focus:border-danger' : 'border-[#B0B4C5] focus:border-primary ')} {...register('confirmPassword', {
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
                        <p className='whitespace-nowrap text-xs'>Atau sign in dengan Google</p>
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