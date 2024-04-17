'use client'

import { fetchClient } from "@/app/utils/helper/fetchClient"
import { Button, Tab, Tabs } from "@nextui-org/react"
import { useTransition, animated } from "@react-spring/web"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Profile from "./Profile"
import System from "./System"
import { CSProfile } from "@/app/utils/types"

const Settings = () => {
    const { data: session } = useSession()
    const [isLoaded, setisLoaded] = useState(false)
    const [currentPage, setcurrentPage] = useState('profile')
    const [csProfile, setcsProfile] = useState()
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

    const fetchProfile = async () => {
        const result = await fetchClient({
            url: '/customer-services/' + session?.customerService?.id,
            method: 'GET',
            user: session?.customerService
        })
        if (result.ok) {
            const res = await result.json()

            console.log(res)
            setcsProfile(res)
            setisLoaded(true)
        }
    }
    useEffect(() => {
        if (session?.customerService?.token) {
            fetchProfile()
        }
    }, [session?.customerService?.token])
    return (
        <>
            <div className="w-full bg-white rounded-md px-3 py-3 pb-6 mt-2">
                <div className="flex gap-2">
                    <Button color="primary" className="rounded-md">
                        Profile
                    </Button>
                </div>

                <div className="w-full max-w-2xl mx-auto mt-4">
                    {isLoaded ? (
                        <>
                            {componentTransition((style, item) => item === 'profile' && (
                                <animated.div style={style}>
                                    <Profile csProfile={csProfile} />
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