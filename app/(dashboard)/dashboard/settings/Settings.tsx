'use client'

import { fetchClient } from "@/utils/helper/fetchClient"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Account from "./Account"
import { animated, useTransition } from "@react-spring/web"
import Profile from "./Profile"
import Device from "./Device"
import System from "./System"
import { UserProfile } from "@/utils/types"

const Settings = () => {
    const [isLoaded, setisLoaded] = useState(false)
    const activeButtonStyle = 'bg-primary text-white'
    const inactiveButtonStyle = 'hover:cursor-pointer bg-white hover:text-primary text-black hover:bg-neutral-75'
    const [userData, setuserData] = useState<UserProfile>({
        firstName: '',
        lastName: '',
        username: '',
        phone: '',
        email: '',
        accountApiKey: '',
        affiliationCode: ''
    })
    const [currentPage, setcurrentPage] = useState('profile')
    const componentTransition = useTransition(currentPage, {
        from: {
            transform: "translateX(100px)",
            opacity: "0",
        },
        enter: {
            transform: "translateX(0px)",
            opacity: "1",
        },
    })
    useEffect(() => {
        const fetchUser = async () => {
            const result = await fetchClient({ url: '/users/', method: 'GET' })
            if (result && result.ok) {
                const data = await result.json()
                setuserData(data)
            } else {
                toast.error('Failed to fetch user!')
            }
            setisLoaded(true)
        }
        fetchUser()
        return () => {

        }
    }, [])

    return (
        <>
            <div className="w-full bg-white rounded-md px-3 py-3 pb-6 mt-2">
                <div className="flex gap-2">

                    <div className={"rounded-md px-4 py-2 " + (currentPage === 'profile' ? activeButtonStyle : inactiveButtonStyle)} onClick={() => setcurrentPage('profile')}>
                        Profile
                    </div>
                    <div className={"rounded-md px-4 py-2 " + (currentPage === 'device' ? activeButtonStyle : inactiveButtonStyle)} onClick={() => setcurrentPage('device')}>
                        Device
                    </div>
                    <div className={"rounded-md px-4 py-2 " + (currentPage === 'account' ? activeButtonStyle : inactiveButtonStyle)} onClick={() => setcurrentPage('account')}>
                        Account
                    </div>
                    <div className={"rounded-md px-4 py-2 " + (currentPage === 'system' ? activeButtonStyle : inactiveButtonStyle)} onClick={() => setcurrentPage('system')}>
                        System
                    </div>
                </div>

                <div className="w-full max-w-2xl mx-auto mt-4">
                    {isLoaded ? (
                        <>
                            {componentTransition((style, item) => item === 'profile' && (
                                <animated.div style={style}>
                                    <Profile profileData={userData} />
                                </animated.div>
                            ))}
                            {componentTransition((style, item) => item === 'device' && (
                                <animated.div style={style}>
                                    <Device />
                                </animated.div>
                            ))}
                            {componentTransition((style, item) => item === 'account' && (
                                <animated.div style={style}>
                                    <Account />
                                </animated.div>
                            ))}
                            {componentTransition((style, item) => item === 'system' && (
                                <animated.div style={style}>
                                    <System />
                                </animated.div>
                            ))}
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </div>

            </div>
        </>
    )
}

export default Settings