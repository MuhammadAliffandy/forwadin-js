'use client'
import { useState } from "react"
import ProfileDetail from "./ProfileDetail"
import Chat from "./Chat"
import ListChats from "./ListChats"
import { ContactData, DeviceData } from "@/utils/types"
import TextAreaInput from "@/components/dashboard/chat/TextAreaInput"

const Messenger = () => {
    const currentDate = new Date()
    const [textInput, settextInput] = useState('')
    const [mobileDropdown, setmobileDropdown] = useState(false)
    const [listDevice, setlistDevice] = useState<DeviceData[]>([
        {
            pkId: 1,
            id: 'asdasdadad',
            name: 'Coba coba',
            phone: '6291919191',
            apiKey: 'oaod-1091d-12en',
            serverId: 1,
            status: 'CONNECTED',
            created_at: '11.9.2023, 2:43 PM',
            updated_at: '11.9.2023, 2:43 PM',
            userId: 1,
            DeviceLabel: [],
        }
    ])
    const [listUser, setlistUser] = useState([
        {
            id: '1',
            phone: "6281357995175",
            firstName: 'Ihsanul',
            lastName: 'Afkar',
            initial: 'IA',
            profileColor: '4FBEAB',
            gender: "Laki-laki",
            email: 'ihsanulafkar@gmail.com',
            honorific: 'Mr',
            country: 'Indonesia',
            birthDate: '10/10/2010',
            label: ['Personal', 'Realme', 'Aktif', 'asd', 'asd2', 'asd3'],
            lastMessage: 'Join us this month for a celebration this day',
            lastReceived: '9/27/2023',
            created_at: '11.9.2023, 2:43 PM'
        },
        {
            id: '2',
            phone: "6281357995175",
            firstName: 'Ihsanul',
            lastName: 'Afkar',
            initial: 'IA',
            profileColor: 'D14343',
            gender: "Laki-laki",
            email: 'ihsanulafkar@gmail.com',
            honorific: 'Mr',
            country: 'Indonesia',
            birthDate: '10/10/2010',
            label: ['Personal', 'Realme', 'Aktif', 'asd', 'asd2', 'asd3'],
            lastMessage: 'Join us this month for a celebration this day',
            lastReceived: '9/27/2023',
            created_at: '11.9.2023, 2:43 PM'
        },
        {
            id: '3',
            phone: "6281357995175",
            firstName: 'Ihsanul',
            lastName: 'Afkar',
            initial: 'IA',
            profileColor: '3366FF',
            gender: "Laki-laki",
            email: 'ihsanulafkar@gmail.com',
            honorific: 'Mr',
            country: 'Indonesia',
            birthDate: '10/10/2010',
            label: ['Personal', 'Realme', 'Aktif', 'asd', 'asd2', 'asd3'],
            lastMessage: 'Join us this month for a celebration this day',
            lastReceived: '9/27/2023',
            created_at: '11.9.2023, 2:43 PM'
        },
        {
            id: '4',
            phone: "6281357995175",
            firstName: 'Ihsanul',
            lastName: 'Afkar',
            initial: 'IA',
            profileColor: '3366FF',
            gender: "Laki-laki",
            email: 'ihsanulafkar@gmail.com',
            honorific: 'Mr',
            country: 'Indonesia',
            birthDate: '10/10/2010',
            label: ['Personal', 'Realme', 'Aktif', 'asd', 'asd2', 'asd3'],
            lastMessage: 'Join us this month for a celebration this day',
            lastReceived: '9/27/2023',
            created_at: '11.9.2023, 2:43 PM'
        },
        {
            id: '5',
            phone: "6281357995175",
            firstName: 'Ihsanul',
            lastName: 'Afkar',
            initial: 'IA',
            profileColor: '3366FF',
            gender: "Laki-laki",
            email: 'ihsanulafkar@gmail.com',
            honorific: 'Mr',
            country: 'Indonesia',
            birthDate: '10/10/2010',
            label: ['Personal', 'Realme', 'Aktif', 'asd', 'asd2', 'asd3'],
            lastMessage: 'Join us this month for a celebration this day',
            lastReceived: '9/27/2023',
            created_at: '11.9.2023, 2:43 PM'
        },
        {
            id: '6',
            phone: "6281357995175",
            firstName: 'Ihsanul',
            lastName: 'Afkar',
            initial: 'IA',
            profileColor: '3366FF',
            gender: "Laki-laki",
            email: 'ihsanulafkar@gmail.com',
            honorific: 'Mr',
            country: 'Indonesia',
            birthDate: '10/10/2010',
            label: ['Personal', 'Realme', 'Aktif', 'asd', 'asd2', 'asd3'],
            lastMessage: 'Join us this month for a celebration this day',
            lastReceived: '9/27/2023',
            created_at: '11.9.2023, 2:43 PM'
        },
    ])
    const [currentUser, setcurrentUser] = useState<ContactData>({
        id: '3',
        phone: "6281357995175",
        firstName: 'Ihsanul',
        lastName: 'Afkar',
        initial: 'IA',
        profileColor: '3366FF',
        gender: "Laki-laki",
        email: 'ihsanulafkar@gmail.com',
        honorific: 'Mr',
        country: 'Indonesia',
        birthDate: '10/10/2010',
        label: ['Personal', 'Realme', 'Aktif', 'asd', 'asd2', 'asd3'],
        created_at: '11.9.2023, 2:43 PM'
    })

    const [listMessage, setlistMessage] = useState([
        {
            id: '1',
            message: "Join us this month for a celebration of",
            // message: "Join us this month for a celebration of art and music! We'll be hosting the Harmony Heights Music Festival, Samantha Knight's solo art exhibition, and an album release party for River Reed's new album 'Echoes in the Wilderness'. Don't miss out on this exciting lineup of events! [website link]",
            status: 0,
            to: '',
            from: '',
        }
    ])
    return (
        <div className=" overflow-y-auto lg:overflow-y-hidden">
            <div className='flex lg:flex-row flex-col items-center justify-between gap-4 mb-12 lg:mb-0'>
                <div className='max-w-md lg:max-w-[250px] w-full lg:max-h-[78vh] bg-white lg:bg-neutral-75 p-4 lg:p-0 text-xs'>
                    <div className="bg-white border border-customGray p-3 flex justify-between gap-2 hover:cursor-pointer rounded-md w-full items-center">
                        <div className="flex-none">
                            <img src="/assets/icons/dashboard/Devices.svg" alt="" className="invert-[1] grayscale-0" />
                        </div>
                        <p>RMX123</p>
                        <p className="text-customGray">+6281357995175</p>
                        <div className="flex-none px-2">
                            <img src="/assets/icons/chevron-down.svg" alt="" width={12} />
                        </div>
                    </div>
                    <ListChats listUser={listUser} currentUser={currentUser} setcurrentUser={setcurrentUser} />
                </div>
                <div className="bg-white p-4 rounded-md w-full max-w-md lg:max-w-full ">
                    <div className='text-xs w-full max-h-[78vh] flex flex-col'>
                        <div className="flex flex-col overflow-y-auto allowed-scroll pr-2 h-full">
                            <Chat currentUser={currentUser} currentDate={currentDate} />
                        </div>
                        <div className="py-2 ">
                            <TextAreaInput text={textInput} settext={settextInput} />
                            <div className="flex justify-end mt-2">
                                <div className="rounded-md bg-primary px-6 py-3 text-center text-white text-sm">
                                    Kirim
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md max-w-md lg:max-w-xs w-full">
                    <div className='w-full lg:max-h-[78vh]  overflow-y-scroll'>
                        <ProfileDetail />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messenger