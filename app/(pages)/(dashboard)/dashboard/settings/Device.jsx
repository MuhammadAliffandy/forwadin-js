import DisabledForm from "@/app/components/DisabledForm"
import InputForm from "@/app/components/form/InputForm"
import { formatHoursMinutes } from "@/app/utils/helper"
import { fetchClient } from "@/app/utils/helper/fetchClient"
import { BusinessHours, DeviceData, SessionProfile } from "@/app/utils/types"
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Slider, Tab, Tabs } from "@nextui-org/react"
import { User } from "next-auth"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import TimezoneSelect from 'react-timezone-select'
import { toast } from "react-toastify"
import { getAllDevice } from "../../../../api/repository/deviceRepository"
import { createBusinessHours, getBusinessHours, updateBusinessHours } from "../../../../api/repository/businessHoursRepository"
import { getProfileSession, updateProfileSession } from "../../../../api/repository/sessionRepository"


const Device = ({ user }) => {
    const presenceList = [
        'unavailable', 'available', 'composing', 'recording', 'paused'
    ]
    const [listDevice, setlistDevice] = useState()
    const [isDisabled, setisDisabled] = useState(true)
    const [isLoading, setisLoading] = useState(false)
    const [profileIsLoading, setprofileIsLoading] = useState(false)
    const [currentDevice, setcurrentDevice] = useState()
    const { handleSubmit, register, control, setValue, watch, setError, formState: { errors } } = useForm()
    const [profileAddress, setprofileAddress] = useState('lorem')
    const [timezone, settimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
    const [text, settext] = useState('')
    const [hoursMonday, sethoursMonday] = useState([0, 1440])
    const [hoursTuesday, sethoursTuesday] = useState([0, 1440])
    const [hoursThursday, sethoursThursday] = useState([0, 1440])
    const [hoursWednesday, sethoursWednesday] = useState([0, 1440])
    const [hoursFriday, sethoursFriday] = useState([0, 1440])
    const [hoursSaturday, sethoursSaturday] = useState([0, 1440])
    const [hoursSunday, sethoursSunday] = useState([0, 1440])
    const [isBHEmpty, setisBHEmpty] = useState(true)
    const fetchListDevice = async () => {

        const result = await getAllDevice(user.token)

        if (result.status === 200) {
            const resultData = result.data
            setlistDevice(resultData)
        }
    }
    const fetchBusinessHours = async () => {

        const result = getBusinessHours(user.token,currentDevice.id)

        if (result.status === 200) {
            const resultData = result.data
            console.log('businesshours')
            console.log(resultData)
            if (!resultData) {
                setisBHEmpty(true)
                return
            }
            settimezone(resultData.timeZone)
            sethoursMonday([resultData.monStart, resultData.monEnd])
            sethoursTuesday([resultData.tueStart, resultData.tueEnd])
            sethoursWednesday([resultData.wedStart, resultData.wedEnd])
            sethoursThursday([resultData.thuStart, resultData.thuEnd])
            sethoursFriday([resultData.friStart, resultData.friEnd])
            sethoursSaturday([resultData.satStart, resultData.satEnd])
            sethoursSunday([resultData.sunStart, resultData.sunEnd])
            settext(resultData.message)
            setisBHEmpty(false)
        }
    }
    const handleClickSubmit = async () => {
        setisLoading(true)
        if (!currentDevice && !text) return
        console.log(timezone)
        const body = {
            message: text,
            monStart: hoursMonday[0],
            monEnd: hoursMonday[1],
            tueStart: hoursTuesday[0],
            tueEnd: hoursTuesday[1],
            wedStart: hoursWednesday[0],
            wedEnd: hoursWednesday[1],
            thuStart: hoursThursday[0],
            thuEnd: hoursThursday[1],
            friStart: hoursFriday[0],
            friEnd: hoursFriday[1],
            satStart: hoursSaturday[0],
            satEnd: hoursSaturday[1],
            sunStart: hoursSunday[0],
            sunEnd: hoursSunday[1],
            timeZone: timezone,
            deviceId: currentDevice?.id
        }
        if (isBHEmpty) {
 
            const result =await  createBusinessHours(user.token,body)

            if (result.status === 200) {
                toast.success('Berhasil set business hours')
            } else if (result?.status === 400) {
                toast.error('Gagal set business hours')
            }
        } else {
     
            const result = await updateBusinessHours(user.token, body)

            if (result.status === 200) {
                toast.success('Berhasil update business hours')
            } else if (result?.status === 400) {
                toast.error('Gagal update business hours')
            }
        }
        setisLoading(false)
    }
    const fetchSessionProfile = async () => {
        if (!currentDevice) return

        const result = await getProfileSession(user.token,currentDevice.id)

        if (result.status === 200) {
            const resultData = result.data
            if (!resultData) return
            console.log(resultData)
            setprofileAddress((resultData.address ? resultData.address : '-'))
            setValue('presence', resultData.presence)
            setValue('status', resultData.status)
            setValue('profileName', resultData.profileName)
        }
    }
    const submitSessionProfile = async (data) => {
        setprofileIsLoading(true)
        if (!currentDevice) return

        const result = await updateProfileSession(user.token,currentDevice.id,{
            name: data.profileName,
            presence: data.presence,
            status: data.status
        })

        if (result.status === 200) {
            toast.success('berhasil update profile device')
        } else {
            toast.error('gagal update profile device')

        }
        setprofileIsLoading(false)
    }
    useEffect(() => {
        if (user?.token) {
            fetchListDevice()
        }
    }, [user?.token])
    useEffect(() => {
        if (listDevice && !currentDevice) {
            setcurrentDevice(listDevice[0])
        }
    }, [listDevice])
    useEffect(() => {
        if (currentDevice) {
            fetchBusinessHours()
            fetchSessionProfile()
        }
    }, [currentDevice])
    useEffect(() => {
        if (text && currentDevice)
            setisDisabled(false)
        else
            setisDisabled(true)
    }, [text, currentDevice])

    return (
        <>
            {listDevice?.length === 0 ? (
                <>
                    <p className='text-customGray text-xs text-center'>Belum ada device yang terhubung</p>
                </>
            ) : (
                <>
                    <p className="font-lexend font-bold text-2xl mt-8 mb-2">Basic Information</p>
                    <Dropdown>
                        <DropdownTrigger className="p-3">
                            <div className="bg-white border border-customGray px-4 py-3 flex gap-2 hover:cursor-pointer rounded-md w-full items-center">
                                <div className="flex-none">
                                    <img src="/assets/icons/dashboard/Devices.svg" alt="" className="invert-[1] grayscale-0" />
                                </div>
                                <p className="font-bold min-w-0 whitespace-nowrap overflow-hidden overflow-ellipsis w-max">{currentDevice?.name}</p>
                                <p className="text-customGray min-w-0 whitespace-nowrap overflow-hidden overflow-ellipsis w-max">
                                    {currentDevice?.phone ? '+' + currentDevice.phone : ''}</p>
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu items={listDevice} aria-label="device list">
                            {(item) => (
                                <DropdownItem
                                    key={item.id}
                                    onClick={() => {
                                        setcurrentDevice(item)
                                    }}
                                >
                                    <div className="flex gap-2">
                                        <p className="font-bold">{item.name}</p>
                                        <p>{item.phone}</p>
                                    </div>
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <form onSubmit={handleSubmit(submitSessionProfile)} className="flex flex-col gap-4 mt-4">
                        <div className="flex justify-between gap-4">
                            <div className="basis-1/2">
                                <p className="mb-2">Profile Name</p>
                                <InputForm register={register} config={{
                                    name: 'profileName',
                                    placeholder: 'Profile Name',
                                    type: 'text',
                                    error: errors.profileName,
                                    registerConfig: {
                                        required: 'tidak boleh kosong'
                                    }
                                }} />
                            </div>
                            <div className="basis-1/2">
                                <p className="mb-2">Presence</p>
                                <Controller
                                    name="presence"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value } }) => (
                                        <select value={value} onChange={onChange} name="device" id="device" className="px-4 py-3 focus:outline-none text-sm rounded-md focus:ring-0 w-full border-[#B0B4C5]/50 hover:border-[#B0B4C5] focus:border-primary">
                                            {presenceList.map(presence => (
                                                <option value={presence}>
                                                    <p className="px-4 py-3">
                                                        {presence}
                                                    </p>
                                                </option>
                                            ))}

                                        </select>
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="mb-2">Status</p>
                            <InputForm register={register} config={{
                                name: 'status',
                                placeholder: 'WhatsApp Status',
                                type: 'text',
                                error: errors.status,
                                registerConfig: {
                                    required: 'tidak boleh kosong'
                                }
                            }} />
                        </div>
                        <div>
                            <p className="mb-2">Address</p>
                            <DisabledForm text={profileAddress} type="text" />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" color="primary" className="rounded-md px-12 py-6" isLoading={profileIsLoading} >
                                Update
                            </Button>
                        </div>
                    </form>
                    <p className="font-lexend font-bold text-2xl mt-8 mb-2">Business Hours</p>
                    <Tabs aria-label="Options" variant="light" color="primary" fullWidth>
                        <Tab key="monday" title="Monday">
                            <BarSlider selectedHours={hoursMonday} setselectedHours={sethoursMonday} />
                        </Tab>
                        <Tab key="tuesday" title="Tuesday">
                            <BarSlider selectedHours={hoursTuesday} setselectedHours={sethoursTuesday} />
                        </Tab>
                        <Tab key="wednesday" title="Wednesday">
                            <BarSlider selectedHours={hoursWednesday} setselectedHours={sethoursWednesday} />
                        </Tab>
                        <Tab key="thursday" title="Thursday">
                            <BarSlider selectedHours={hoursThursday} setselectedHours={sethoursThursday} />
                        </Tab>
                        <Tab key="friday" title="Friday">
                            <BarSlider selectedHours={hoursFriday} setselectedHours={sethoursFriday} />
                        </Tab>
                        <Tab key="saturday" title="Saturday">
                            <BarSlider selectedHours={hoursSaturday} setselectedHours={sethoursSaturday} />
                        </Tab>
                        <Tab key="sunday" title="Sunday">
                            <BarSlider selectedHours={hoursSunday} setselectedHours={sethoursSunday} />
                        </Tab>
                    </Tabs>
                    <TimezoneSelect
                        value={timezone}
                        onChange={e => settimezone(e.value)}
                    />
                    <p className='mt-4'>Outside Business Hours Message</p>
                    <textarea className="rounded-md w-full overflow-y-auto text-sm mt-2" placeholder="Tuliskan pesan anda" cols={4} rows={4} value={text} onChange={e => settext(e.target.value)} maxLength={255}></textarea>
                    <div className="mt-4 flex justify-end">
                        <Button color="primary" className="rounded-md px-12 py-6" isDisabled={isDisabled} isLoading={isLoading} onClick={handleClickSubmit}>
                            {isBHEmpty ? (
                                <p>Simpan</p>
                            ) : (
                                <p>Update</p>
                            )}
                        </Button>
                    </div>
                </>
            )}
        </>
    )
}

export default Device


const BarSlider = ({ selectedHours, setselectedHours }) => {
    const formatValue = (text) => {
        const splittedValue = text.split(',')
        return formatHoursMinutes(parseInt(splittedValue[0])) + ' - ' + formatHoursMinutes(parseInt(splittedValue[1]))
    }

    return (
        <>
            <Slider
                label="Active Hours"
                step={10}
                size="sm"
                minValue={0}
                maxValue={1440}
                value={selectedHours}
                onChange={setselectedHours}
                getValue={value => formatValue(value.toString())}
                color="primary"
            />
        </>
    )
}
