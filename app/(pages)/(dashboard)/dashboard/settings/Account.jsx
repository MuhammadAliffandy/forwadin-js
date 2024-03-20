import ConfirmDeleteAccountModal from "@/app/components/dashboard/settings/ConfirmDeleteAccountModal"
import ButtonSubmit from "@/app/components/form/ButtonSubmit"
import InputForm from "@/app/components/form/InputForm"
import { formatPhoneCode, getCountryList } from "@/app/utils/helper/countryCode"
import { fetchClient } from "@/app/utils/helper/fetchClient"
import { CountryCode, UserProfile } from "@/app/utils/types"
import { Button } from "@nextui-org/react"
import { useTransition, animated } from "@react-spring/web"
import CountryFlagSvg from "country-list-with-dial-code-and-flag/dist/flag-svg"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { deleteUser , changeEmailUser, changePhoneNumberUser, changePasswordUser } from '../../../../api/repository/userRepository'

const Account = ({ user, userProfile }) => {
    const router = useRouter()
    const [emailIsLoading, setemailIsLoading] = useState(false)
    const [phoneIsLoading, setphoneIsLoading] = useState(false)
    const [isPasswordLoading, setisPasswordLoading] = useState(false)
    const [deleteAccountModal, setdeleteAccountModal] = useState(false)
    const [showPasswordCriteria, setshowPasswordCriteria] = useState(false)
    const [countryCodeDropdown, setcountryCodeDropdown] = useState(false)
    const [countryCodeSearchText, setcountryCodeSearchText] = useState('')
    const [countryCodeData, setcountryCodeData] = useState([])
    const [countryCodeSearchData, setcountryCodeSearchData] = useState([])
    const countryCodeInputRef = useRef(null)
    const [currentCountryCode, setcurrentCountryCode] = useState({
        name: '',
        dial_code: '',
        code: '',
        flag: ''
    })
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
    const {
        handleSubmit: handleSubmitEmail,
        register: registerEmail,
        setValue: setValueEmail,
        formState: { errors: errorsEmail } } = useForm()
    const {
        handleSubmit: handleSubmitPhone,
        register: registerPhone,
        setValue: setValuePhone,
        formState: { errors: errorsPhone } } = useForm()
    const {
        handleSubmit: handleSubmitPassword,
        register: registerPassword,
        setValue: setValuePassword,
        watch: watchPassword,
        setError: setErrorPassword,
        formState: { errors: errorsPassword } } = useForm()

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
    const handleDeleteAccount = async () => {

        const result = await deleteUser(user.token,user.id)

        if (result?.ok) {
            await signOut()
            router.push('/')
        } else {
            toast.error('Gagal hapus akun')
        }
    }



    const onSubmitEmail = async (data) => {
        setemailIsLoading(true)
        if (data.email === userProfile.email) return

        const result = await changeEmailUser(user.token,user.id,{ email: data.email })

        if (result?.ok) {
            toast.success('Berhasil ubah email')
            await signOut()
            router.push('/signin')
        } else {
            toast.error('Gagal ubah email')
        }
        setemailIsLoading(false)
    }



    const onSubmitPhone = async (data) => {
        console.log(currentCountryCode)
        setphoneIsLoading(true)
        const formattedPhone = formatPhoneCode(data.phone, currentCountryCode.dial_code)
        if (formattedPhone === userProfile.phone) return
 
        const result = changePhoneNumberUser(user.token,user.id , { phoneNumber: formattedPhone })

        if (result?.ok) {
            toast.success('Berhasil ubah nomor')
        } else {
            toast.error('Gagal ubah nomor')
        }
        setphoneIsLoading(false)
    }
    const onSubmitPassword = async (data) => {
        setisPasswordLoading(true)

        const result = await changePasswordUser(user.token,data)

        console.log(await result?.json())
        if (result?.ok) {
            toast.success('password berhasil diubah')
            signOut()
        } else {
            toast.error('Gagal ubah password')
        }
        setisPasswordLoading(false)
    }
    const handleCountryCodeClick = (countryCode) => {
        setcurrentCountryCode(countryCode)
        setcountryCodeDropdown(false)
    }
    useEffect(() => {
        const watch = watchPassword(value => {
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
        return () => watch.unsubscribe()
    }, [watchPassword, passwordValidator])
    useEffect(() => {
        if (user?.token) {
        }
    }, [user?.token])
    useEffect(() => {
        if (userProfile) {
            console.log(userProfile)
            setValueEmail('email', userProfile.email)
            // setValuePhone('phone', userProfile.phone.slice(1))
        }
    }, [userProfile])
    useEffect(() => {
        setcountryCodeData(getCountryList())
        setcurrentCountryCode(getCountryList('+62'))
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        const newCountryCodeData = countryCodeData.filter(item => item.name.toLowerCase().includes(countryCodeSearchText.toLowerCase()) || item.dial_code.includes(countryCodeSearchText) || item.code.includes(countryCodeSearchText))
        setcountryCodeSearchData(newCountryCodeData)
    }, [countryCodeSearchText])
    return (
        <>
            <ConfirmDeleteAccountModal deleteFunction={handleDeleteAccount} openModal={deleteAccountModal} setopenModal={setdeleteAccountModal} />
            <div className="flex flex-col gap-4 mt-8">
                <p className="font-lexend font-bold text-2xl">Email</p>
                <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
                    <p className="mb-2">Email Address</p>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="relative w-full">
                            <input type='text' className={'px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full ' + (errorsEmail.email ? 'border-danger/50 hover:border-danger focus:border-danger' : 'border-[#B0B4C5]/50 hover:border-[#B0B4C5] focus:border-primary ')} {...registerEmail('email', {
                                required: 'email required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }

                            })} />
                            <div className="px-1 absolute right-4 top-1/2 -translate-y-1/2">
                                {userProfile && (
                                    <>
                                        {userProfile.emailVerifiedAt ? (
                                            <p className="text-green-40">verified</p>
                                        ) : (
                                            <p className="text-danger">not verified</p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="basis-1/5">
                            <ButtonSubmit isLoading={false} text="Change" />
                        </div>
                    </div>
                </form>
                <p className="font-lexend font-bold text-2xl">Phone Number</p>
                <form onSubmit={handleSubmitPhone(onSubmitPhone)}>
                    <p className="mb-2">Phone Number</p>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 relative w-full">
                            <div className="flex" >
                                <div className="rounded-md border-[#B0B4C5]/50 hover:border-[#B0B4C5] border flex items-center justify-between gap-1 w-full py-3 px-2  hover:cursor-pointer" onClick={() => setcountryCodeDropdown(!countryCodeDropdown)}>
                                    <div className="flex gap-2 font-bold items-center ">
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
                                {errorsPhone.phone && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errorsPhone.phone.message}`}</p>)}
                                <div className={'flex items-center px-2 text-sm rounded-md focus:outline-none focus:ring-0 w-full border ' + (errorsPhone.phone ? 'border-danger/50 hover:border-danger focus:border-danger' : 'border-[#B0B4C5]/50 hover:border-[#B0B4C5] focus:border-primary')} style={{ MozAppearance: 'textfield', WebkitAppearance: 'textfield' }}>
                                    <div className=" text-customGray ">{currentCountryCode.dial_code}</div>
                                    <input type="number" placeholder='Phone Number' className='focus:ring-0 focus:outline-none border-none' {...registerPhone('phone', {
                                        required: 'Required',
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
                        <div className="basis-1/5">
                            <ButtonSubmit text="Change" isLoading={false} />
                        </div>
                    </div>
                </form>
                <p className="font-lexend font-bold text-2xl">Password</p>
                <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
                    <p className="mb-2">Password</p>
                    <InputForm register={registerPassword} config={{
                        type: 'password',
                        name: 'currentPassword',
                        placeholder: 'Current Password',
                        error: errorsPassword.currentPassword,
                        registerConfig: {
                            required: 'Tidak boleh kosong',
                        }
                    }} />
                    <div className="flex items-center gap-4 mt-4">
                        <div className="w-full">
                            <p className="mb-2">New Password</p>
                            <div className="relative">
                                {errorsPassword.password && (<p className="px-1 text-danger absolute right-4 top-1/2 -translate-y-1/2">{`${errorsPassword.password.message}`}</p>)}
                                <input type="password" placeholder='Password' className={'text-sm px-4 py-3 focus:outline-none  rounded-md focus:ring-0 w-full ' + (errorsPassword.password ? 'border-danger/50 hover:border-danger focus:border-danger' : 'border-[#B0B4C5]/50 hover:border-[#B0B4C5] focus:border-primary ')} {...registerPassword('password', {
                                    required: true,
                                })} onFocus={() => setshowPasswordCriteria(true)} />
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="mb-2">Confirm Password</p>
                            <InputForm register={registerPassword} config={{
                                type: 'password',
                                name: 'confirmPassword',
                                placeholder: 'Confirm Password',
                                error: errorsPassword.confirmPassword,
                                registerConfig: {
                                    required: "Tidak boleh kosong"
                                }
                            }} />
                        </div>
                    </div>
                    {showPasswordCriteria && (
                        <div className="bg-neutral-75 rounded-md py-2 px-4 mt-4 text-[#777C88]">
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

                                </div>
                            </div>
                        </div>
                    )}
                    <div className="mt-4 flex gap-4 justify-start items-center">
                        <div className="">
                            <ButtonSubmit isLoading={isPasswordLoading} size="md" text="Update Password" />
                        </div>
                        <Link href={'/auth/forgot-password'} className="text-primary">I forgot my password</Link>
                    </div>
                </form>
                <p className="font-lexend font-bold text-2xl">Delete Account</p>
                <p className="text-customNeutral text-sm w-3/5">Ini akan menghapus semua data dan pengaturan Anda. Tindakan ini tidak dapat dibatalkan.</p>
                <div>
                    <Button onClick={() => setdeleteAccountModal(true)} color="danger" className="rounded-md">
                        Delete This Account
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Account