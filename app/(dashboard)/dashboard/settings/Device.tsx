import DisabledForm from "@/components/DisabledForm"
import InputForm from "@/components/form/InputForm"
import { formatHoursMinutes } from "@/utils/helper"
import { fetchClient } from "@/utils/helper/fetchClient"
import { BusinessHours, DeviceData, SessionProfile } from "@/utils/types"
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Slider, Tab, Tabs } from "@nextui-org/react"
import { User } from "next-auth"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import TimezoneSelect from 'react-timezone-select'
import { toast } from "react-toastify"
interface DevicePageProps {
    user: User | undefined,
}
type SliderValue = [number, number]

const Device = ({ user }: DevicePageProps) => {
    const presenceList = [
        'unavailable', 'available', 'composing', 'recording', 'paused'
    ]
    const [listDevice, setlistDevice] = useState<DeviceData[]>()
    const [isDisabled, setisDisabled] = useState(true)
    const [isLoading, setisLoading] = useState(false)
    const [profileIsLoading, setprofileIsLoading] = useState(false)
    const [currentDevice, setcurrentDevice] = useState<DeviceData>()
    const { handleSubmit, register, control, setValue, watch, setError, formState: { errors } } = useForm<SessionProfile>()
    const [profileAddress, setprofileAddress] = useState('lorem')
    const [timezone, settimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
    const [text, settext] = useState('')
    const [hoursMonday, sethoursMonday] = useState<SliderValue>([0, 1440])
    const [hoursTuesday, sethoursTuesday] = useState<SliderValue>([0, 1440])
    const [hoursThursday, sethoursThursday] = useState<SliderValue>([0, 1440])
    const [hoursWednesday, sethoursWednesday] = useState<SliderValue>([0, 1440])
    const [hoursFriday, sethoursFriday] = useState<SliderValue>([0, 1440])
    const [hoursSaturday, sethoursSaturday] = useState<SliderValue>([0, 1440])
    const [hoursSunday, sethoursSunday] = useState<SliderValue>([0, 1440])
    const fetchListDevice = async () => {
        const result = await fetchClient({
            url: '/devices/',
            method: 'GET',
            user: user
        })
        if (result?.ok) {
            const resultData = await result.json()
            setlistDevice(resultData)
        }
    }
    const fetchBusinessHours = async () => {
        const result = await fetchClient({
            url: '/business-hours/' + currentDevice?.id,
            method: 'GET',
            user: user,
        })
        if (result?.ok) {
            const resultData = await result.json()
            if (resultData.length === 0) return
            const bhData: BusinessHours = resultData
            console.log(resultData)
            settimezone(bhData.timeZone)
            sethoursMonday([bhData.monStart, bhData.monEnd])
            sethoursTuesday([bhData.tueStart, bhData.tueEnd])
            sethoursWednesday([bhData.wedStart, bhData.wedEnd])
            sethoursThursday([bhData.thuStart, bhData.thuEnd])
            sethoursFriday([bhData.friStart, bhData.friEnd])
            sethoursSaturday([bhData.satStart, bhData.satEnd])
            sethoursSunday([bhData.sunStart, bhData.sunEnd])
            settext(bhData.message)
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
        const result = await fetchClient({
            url: "/business-hours/",
            method: 'POST',
            body: JSON.stringify(body),
            user: user
        })
        if (result?.ok) {
            toast.success('Berhasil set business hours')
        }
        setisLoading(false)
    }
    const fetchSessionProfile = async () => {
        if (!currentDevice) return
        const result = await fetchClient({
            url: '/sessions/' + currentDevice?.id + '/profile',
            method: 'GET',
            user: user
        })
        if (result?.ok) {
            const resultData: SessionProfile = await result.json()
            if (!resultData) return
            console.log(resultData)
            setprofileAddress((resultData.address ? resultData.address : '-'))
            setValue('presence', resultData.presence)
            setValue('status', resultData.status)
            setValue('profileName', resultData.profileName)
        }
    }
    const submitSessionProfile = async (data: SessionProfile) => {
        setprofileIsLoading(true)
        if (!currentDevice) return
        const result = await fetchClient({
            url: '/sessions/' + currentDevice.id + '/profile',
            method: 'PUT',
            body: JSON.stringify({
                name: data.profileName,
                presence: data.presence,
                status: data.status
            }),
            user: user
        })
        if (result?.ok) {
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
            <p className="font-lexend font-bold text-2xl mt-8 mb-2">Basic Information</p>
            <Dropdown>
                <DropdownTrigger className="p-3">
                    <div className="bg-white border border-customGray px-4 py-3 flex gap-2 hover:cursor-pointer rounded-md w-full items-center">
                        <div className="flex-none">
                            <img src="/assets/icons/dashboard/Devices.svg" alt="" className="invert-[1] grayscale-0" />
                        </div>
                        <p className="font-bold min-w-0 whitespace-nowrap overflow-hidden overflow-ellipsis w-max">{currentDevice?.name}</p>
                        <p className="text-customGray min-w-0 whitespace-nowrap overflow-hidden overflow-ellipsis w-max">{'+' + currentDevice?.phone}</p>
                    </div>
                </DropdownTrigger>
                <DropdownMenu items={listDevice} aria-label="device list">
                    {(item: any) => (
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
                    Simpan
                </Button>
            </div>
        </>
    )
}

export default Device

interface BarSliderProps {
    selectedHours: SliderValue,
    setselectedHours: Dispatch<SetStateAction<SliderValue>>
}
const BarSlider = ({ selectedHours, setselectedHours }: BarSliderProps) => {
    const formatValue = (text: string) => {
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
                onChange={setselectedHours as any}
                getValue={value => formatValue(value.toString())}
                color="primary"
            />
        </>
    )
}
