import { formatHoursMinutes } from "@/utils/helper"
import { fetchClient } from "@/utils/helper/fetchClient"
import { BusinessHours, DeviceData } from "@/utils/types"
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Slider, Tab, Tabs } from "@nextui-org/react"
import { User } from "next-auth"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import TimezoneSelect from 'react-timezone-select'
import { toast } from "react-toastify"
interface DevicePageProps {
    user: User | undefined,
}
type SliderValue = [number, number]

const Device = ({ user }: DevicePageProps) => {
    const [listDevice, setlistDevice] = useState<DeviceData[]>()
    const [isDisabled, setisDisabled] = useState(true)
    const [isLoading, setisLoading] = useState(false)
    const [currentDevice, setcurrentDevice] = useState<DeviceData>()
    const [timezone, settimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
    const [text, settext] = useState('')
    const [businessHours, setbusinessHours] = useState<BusinessHours>()
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
            const bhData: BusinessHours = resultData[0]
            console.log(resultData)
            setbusinessHours(resultData[0])
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
