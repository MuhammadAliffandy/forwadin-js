'use client'

import { fetchClient } from "@/utils/helper/fetchClient"
import { Tab, Tabs } from "@nextui-org/react"
import { useTransition, animated } from "@react-spring/web"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Profile from "./Profile"
import System from "./System"

const Settings = () => {
    const { data: session } = useSession()
    const [isLoaded, setisLoaded] = useState(false)
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
        if (session?.customerService?.token) {
            setisLoaded(true)
        }
    }, [session?.customerService?.token])
    return (
        <>
            <div className="w-full bg-white rounded-md px-3 py-3 pb-6 mt-2">
                <div className="flex gap-2">
                    <Tabs aria-label="Options" variant="light" color="primary" radius="md" size="lg"
                        selectedKey={currentPage}
                        onSelectionChange={setcurrentPage as any}>
                        <Tab key="profile" title="Profile" />
                        <Tab key="system" title="System" />
                    </Tabs>
                </div>

                <div className="w-full max-w-2xl mx-auto mt-4">
                    {isLoaded ? (
                        <>
                            {componentTransition((style, item) => item === 'profile' && (
                                <animated.div style={style}>
                                    <Profile />
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