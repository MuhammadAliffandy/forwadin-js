import InputForm from "@/components/form/InputForm"
import ModalTemplate from "@/components/template/ModalTemplate"
import { ContactData, CountryCode, DeviceData, Label } from "@/utils/types"
import { useState, Dispatch, SetStateAction, useEffect, useRef, } from "react"
import { useForm } from "react-hook-form"
import ButtonSubmit from "@/components/form/ButtonSubmit"
import { fetchClient } from "@/utils/helper/fetchClient"
import { toast } from "react-toastify"
import { animated, useTransition } from "@react-spring/web"
import CountryFlagSvg from "country-list-with-dial-code-and-flag/dist/flag-svg"
import { formatPhoneCode, getCountryList } from "@/utils/helper/countryCode"
import MultipleInputLabel from "../../MultipleInputLabel"
import { convertLabelList, formatBackendBirthDate } from "@/utils/helper"
import { useSession } from "next-auth/react"

const EditContactModal = ({ openModal, setopenModal, fetchData, contactData }) => {
    const { data: session } = useSession()
    const [isLoading, setisLoading] = useState(false)
    const [labelList, setlabelList] = useState([])
    const countryCodeInputRef = useRef(null)
    const [countryCodeDropdown, setcountryCodeDropdown] = useState(false)
    const [countryCodeSearchText, setcountryCodeSearchText] = useState('')
    const [countryCodeData, setcountryCodeData] = useState([])
    const [countryCodeSearchData, setcountryCodeSearchData] = useState([])
    const [currentCountryCode, setcurrentCountryCode] = useState({
        name: '',
        dial_code: '',
        code: '',
        flag: ''
    })
    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleCountryCodeClick = (countryCode) => {
        setcurrentCountryCode(countryCode)
        setcountryCodeDropdown(false)
    }
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
        setisLoading(true)
        const formattedPhone = formatPhoneCode(formData.phone, currentCountryCode.dial_code)
        formData.phone = formattedPhone.replace('+', '')
        const bodyForm = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            gender: formData.gender,
            dob: formatBackendBirthDate((formData.dob ? formData.dob : contactData?.dob)),
            labels: convertLabelList(labelList, true),
            deviceId: contactData?.contactDevices[0].device.id
        }
        console.log(bodyForm)
        const result = await fetchClient({
            method: 'PUT',
            body: JSON.stringify(bodyForm),
            url: '/contacts/' + contactData?.id,
            user: session?.user
        })
        if (result) {
            if (result.status === 200) {
                toast.success('Kontak berhasil diubah')
                fetchData()
                setisLoading(false)
                setopenModal(false)
            } else {
                const body = await result.json()
                console.log(body)
                toast.error('Gagal menyimpan kontak')
                setisLoading(false)
            }
        }
    }
    useEffect(() => {
        setcountryCodeData(getCountryList() )
        setcurrentCountryCode(getCountryList('+62') )
        if (contactData) {
            const newLabelList = contactData.ContactLabel?.map(obj => {
                return {
                    label: {
                        name: obj.label.name,
                        active: true
                    }
                }
            })
            setlabelList(newLabelList)
        }
    }, [contactData])
    useEffect(() => {
        const newCountryCodeData = countryCodeData.filter(item => item.name.toLowerCase().includes(countryCodeSearchText.toLowerCase()) || item.dial_code.includes(countryCodeSearchText) || item.code.includes(countryCodeSearchText))
        setcountryCodeSearchData(newCountryCodeData)
    }, [countryCodeSearchText])
    return (
        <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={false}>

            <p className="font-bold text-2xl">Ubah Kontak</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-sm w-full mt-8 max-h-[80vh] overflow-y-auto">
                <div>
                    <p className="font-bold mb-2">First Name</p>
                    <InputForm register={register} config={{
                        name: 'firstName',
                        type: 'text',
                        placeholder: 'First Name',
                        error: errors.firstName,
                        registerConfig: {
                            value: contactData?.firstName,
                            required: 'tidak boleh kosong',
                        }
                    }} />
                </div>
                <div>
                    <p className="font-bold mb-2">Last Name</p>
                    <InputForm register={register} config={{
                        name: 'lastName',
                        type: 'text',
                        placeholder: 'Last Name',
                        error: errors.lastName,
                        registerConfig: {
                            required: 'tidak boleh kosong',
                            value: contactData?.lastName
                        }
                    }} />
                </div>
                <div>
                    <p className="font-bold mb-2">Email</p>
                    <InputForm register={register} config={{
                        name: 'email',
                        type: 'text',
                        placeholder: 'Email',
                        error: errors.email,
                        registerConfig: {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",

                            },
                            value: contactData?.email,
                            required: 'tidak boleh kosong'
                        }
                    }} />
                </div>
                <div>
                    <p className="font-bold mb-2">Phone Number</p>
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
                            <div className={'flex items-center px-2 text-sm rounded-md focus:outline-none focus:ring-0 w-full border ' + (errors.phone ? 'border-danger/50 hover:border-danger focus:border-danger' : 'border-[#B0B4C5]/50 hover:border-[#B0B4C5] focus:border-primary')} style={{ MozAppearance: 'textfield', WebkitAppearance: 'textfield' }}>
                                <div className=" text-customGray ">{currentCountryCode.dial_code}</div>
                                <input type="text" placeholder='Whatsapp Number' className='focus:ring-0 focus:outline-none border-none text-sm' {...register('phone', {
                                    required: 'Required',
                                    value: contactData?.phone.substring(2)
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
                </div>
                <div>
                    <p className="font-bold mb-2">Gender</p>
                    <select {...register('gender')} value={contactData?.gender} className="px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border-[#B0B4C5] focus:border-primary">
                        <option value="male" className="">Laki-laki</option>
                        <option value="female">Perempuan</option>
                    </select>
                </div>
                <div>
                    <p className="font-bold mb-2">Birthdate</p>
                    <InputForm register={register} config={{
                        name: 'dob',
                        placeholder: '',
                        type: 'date',
                        registerConfig: {
                            required: false,
                        }
                    }} />
                </div>

                <div>
                    <p className="font-bold mb-2">Label</p>
                    <MultipleInputLabel labelList={labelList} setlabelList={setlabelList} />
                </div>

                <div className="mt-4">
                    <ButtonSubmit text="Simpan" isLoading={isLoading} />
                </div>
            </form>

        </ModalTemplate>
    )
}

export default EditContactModal