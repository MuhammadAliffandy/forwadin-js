'use client'

import { fetchClient } from "@/utils/helper/fetchClient"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { animated, useTransition } from "@react-spring/web"
import Profile from "./Profile"
import Device from "./Device"
import System from "./System"
import { UserProfile } from "@/utils/types"
import { Tab, Tabs } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
const Account = dynamic(() => import('./Account'), { ssr: false, })
const Settings = () => {
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const [isLoaded, setisLoaded] = useState(false)
    const [userData, setuserData] = useState<UserProfile>({
        firstName: '',
        lastName: '',
        username: '',
        phone: '',
        email: '',
        accountApiKey: '',
        affiliationCode: '',
        emailVerifiedAt: ''
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
    const fetchUser = async () => {
        const result = await fetchClient({
            url: '/users/' + session?.user?.id, method: 'GET',
            user: session?.user
        })
        if (result?.ok) {
            const data = await result.json()
            setuserData(data)
        } else {
            toast.error('Failed to fetch user!')
        }
        setisLoaded(true)
    }
    useEffect(() => {

        if (session?.user?.token) {
            fetchUser()
        }
        return () => {

        }
    }, [session?.user?.token])
    useEffect(() => {
        if (searchParams?.has('section')) {
            const page = searchParams.get('section')
            if (page === 'system')
                setcurrentPage('system')
            else if (page === 'device')
                setcurrentPage('device')
            else if (page === 'account')
                setcurrentPage('account')
            else
                setcurrentPage('profile')
        }
    }, [searchParams])
    return (
        <>
            <div className="w-full bg-white rounded-md px-3 py-3 pb-6 mt-2">
                <div className="flex gap-2">
                    <Tabs aria-label="Options" variant="light" color="primary" radius="md" size="lg"
                        selectedKey={currentPage}
                        onSelectionChange={setcurrentPage as any}>
                        <Tab key="profile" title="Profile" />
                        <Tab key="device" title="Device" />
                        <Tab key="account" title="Account" />
                        <Tab key="system" title="System" />
                    </Tabs>
                </div>

                <div className="w-full max-w-2xl mx-auto mt-4">
                    {isLoaded ? (
                        <>
                            {componentTransition((style, item) => item === 'profile' && (
                                <animated.div style={style}>
                                    <Profile profileData={userData} user={session?.user} fetchUser={fetchUser} />
                                </animated.div>
                            ))}
                            {componentTransition((style, item) => item === 'device' && (
                                <animated.div style={style}>
                                    <Device user={session?.user} />
                                </animated.div>
                            ))}
                            {componentTransition((style, item) => item === 'account' && (
                                <animated.div style={style}>
                                    <Account user={session?.user} userProfile={userData} />
                                </animated.div>
                            ))}
                            {componentTransition((style, item) => item === 'system' && (
                                <animated.div style={style}>
                                    <System user={session?.user} />
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