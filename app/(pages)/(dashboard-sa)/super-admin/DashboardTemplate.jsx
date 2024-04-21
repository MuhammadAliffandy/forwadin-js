'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import NavButton from '../../../components/dashboard/NavButton'
import { signIn, signOut, useSession } from "next-auth/react";
import { Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";;
import { useRouter } from "next/navigation";
import Notification from "../../(dashboard)/dashboard/Notification";
import { useSocket } from "../../../SocketProvider";
import { getUserProfile } from "@/app/api/repository/userRepository";
import { BarLoader } from "react-spinners";
const DashboardTemplate = ({ currentPage, children }) => {
    const { data: session } = useSession()
    const { socket, isConnected } = useSocket()
    const router = useRouter()
    const [isPopover, setisPopover] = useState(false)
    const [notification, setnotification] = useState([])

    const [sideNavDropdown, setsideNavDropdown] = useState(false)
    const [isDisabled, setisDisabled] = useState(true)
    const [user, setuser] = useState()
    const handleClick = (event) => {
        setsideNavDropdown(true)
    }
    const handleWindowClick = (e) => {
        const mainContent = document.getElementById('main_content')
        if (sideNavDropdown)
            if (mainContent?.contains(e.target))
                setsideNavDropdown(false)
    }
    const fetchUserProfile = async () => {

        const result = await getUserProfile(session.superAdmin.token,session.superAdmin.id)

        if (result && result.status === 200) {
            const body = result.data
            setuser(body)
        }
    }

    useEffect(() => {
        if (session?.superAdmin?.token) {
            fetchUserProfile()
            console.log(session.superAdmin)
        }

    }, [session?.superAdmin?.token])

    return (
        <>
            <div className={(sideNavDropdown ? 'block' : 'hidden') + " h-full w-[200px] lg:w-[250px] z-10 top-0 left-0 overflow-y-auto bg-white fixed lg:block pb-12"} id="side_nav">
                <nav className="mt-8 px-4 " >
                    <div className='flex justify-center items-center gap-2 hover:cursor-pointer' onClick={() => router.push('/')}>
                        <div className=''>
                            <img src={'/assets/icons/logo.png'} alt="logo" />

                        </div>
                        <div className=''>
                            <img src={'/assets/icons/forwardin.png'} alt="logo" />

                        </div>
                    </div>
                    <div className='flex flex-col mt-12 gap-2'>
                        <NavButton text='Dashboard' href='/super-admin/dashboard' currentPage={currentPage} />
                        <NavButton text='User' href='/super-admin/dashboard/user' currentPage={currentPage} />
                        <NavButton text='Subscription' href='/super-admin/dashboard/subscription' currentPage={currentPage} />
                    </div>
                </nav>
            </div>
            <div onClick={handleWindowClick} className="lg:pl-[250px] p-2 lg:p-6 h-[100vh] overflow-hidden" id='main_content'>
                {/* Mobile Dashboard Nav */}
                <div className='flex w-full justify-between lg:hidden pb-4 pt-2 px-2'>
                    <div onClick={handleClick} id="dropdown_icon">
                        <img src={'/assets/icons/dropdown.png'} alt="" />

                    </div>
                    <Dropdown>
                        <DropdownTrigger>
                            <div className='flex-none bg-neutral-75 rounded-full hover:cursor-pointer flex w-[180px]'>
                                <div className='flex-1 flex justify-center items-center'>
                                    <p>{user?.username}</p>
                                </div>
                                {session?.user?.image ? (
                                    <img src={session.superAdmin.image} alt="" className="rounded-full" width={33} />
                                ) : (
                                    <div className='flex-none bg-primary rounded-full p-2 hover:cursor-pointer flex items-center justify-center'>
                                        <img src="/assets/icons/dashboard/user.svg" alt="" />
                                    </div>
                                )}
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu
                            disabledKeys={["profile"]}
                            aria-label="mobile_profile">
                            <DropdownSection showDivider={true}>
                                <DropdownItem
                                    isReadOnly
                                    key={'profile'}
                                    className="opacity-100"
                                >
                                    <div className="flex justify-center">
                                        {session?.user?.image ? (
                                            <img
                                                src={session.superAdmin.image} alt="profile"
                                                width={54}
                                                height={54}
                                                className="rounded-full" />
                                        ) : (
                                            <div className='flex-none bg-primary rounded-full w-[54px] h-[54px] p-4 hover:cursor-pointer flex items-center justify-center'>
                                                <img src="/assets/icons/dashboard/user.svg" alt="" className="w-full" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="font-bold text-sm text-center mt-2">{user?.firstName} {user?.lastName}</p>
                                    <p className="text-[10px] text-center">{user?.email}</p>
                                </DropdownItem>
                            </DropdownSection>

                            <DropdownItem key='sign out' className="text-danger" onClick={() => signOut({ callbackUrl: '/super-admin/signin' })}>Sign Out</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                {/*  */}
                <div className='bg-neutral-75 h-[95vh] overflow-y-scroll rounded-2xl text-sm p-2 lg:pt-6 lg:px-6 relative'>
                    {/* Desktop Dashboard nav */}
                    <div className='lg:flex w-full justify-end gap-2 hidden'>
                        <Popover placement="bottom" isOpen={isPopover} onOpenChange={(open) => setisPopover(open)}>
                            <PopoverTrigger onClick={() => setisPopover(true)}>
                                <div>

                                    <Badge content={notification.length} color="primary"
                                        isInvisible={notification.length === 0} size="sm" shape="circle"

                                    >
                                        <div className='flex-none bg-white rounded-full p-2 hover:cursor-pointer'>
                                            <img src="/assets/icons/dashboard/bell.svg" alt="" />
                                        </div>
                                    </Badge>

                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="">
                                <Notification notification={notification} />
                            </PopoverContent>
                        </Popover>

                        <Dropdown>
                            <DropdownTrigger>
                                <div className='flex-none bg-white rounded-full hover:cursor-pointer flex w-[180px]'>
                                    <div className='flex-1 flex justify-center items-center'>
                                    {
                                            user != null ? <p>{user?.username}</p> : <BarLoader/> 
                                        }
                                    </div>
                                    {session?.user?.image ? (
                                        <img src={session.superAdmin.image} alt="" className="rounded-full" width={33} />
                                    ) : (
                                        <div className='flex-none bg-primary rounded-full p-2 hover:cursor-pointer flex items-center justify-center'>
                                            <img src="/assets/icons/dashboard/user.svg" alt="" />
                                        </div>
                                    )}
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu
                                disabledKeys={["profile"]}
                                aria-label="desktop_profile"
                            >
                                <DropdownSection showDivider={true}>
                                    <DropdownItem
                                        isReadOnly
                                        key={'profile'}
                                        className="opacity-100"
                                    >
                                        <div className="flex justify-center">
                                            {session?.user?.image ? (
                                                <img
                                                    src={session.superAdmin.image} alt="profile"
                                                    width={54}
                                                    height={54}
                                                    className="rounded-full" />
                                            ) : (
                                                <div className='flex-none bg-primary rounded-full w-[54px] h-[54px] p-4 hover:cursor-pointer flex items-center justify-center'>
                                                    <img src="/assets/icons/dashboard/user.svg" alt="" className="w-full" />
                                                </div>
                                            )}
                                        </div>
                                        <p className="font-bold text-sm text-center mt-2">{user?.firstName} {user?.lastName}</p>
                                        <p className="text-[10px] text-center">{user?.email}</p>
                                    </DropdownItem>
                                </DropdownSection>

                                <DropdownItem key='sign out' className="text-danger" onClick={() => signOut({ callbackUrl: '/super-admin/signin' })}>Sign Out</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <div className='flex-none bg-white rounded-full p-2 hover:cursor-pointer' onClick={() => router.push('/dashboard/settings?section=system')}>
                            <img src="/assets/icons/dashboard/gear.svg" alt="" />
                        </div>
                    </div>
                    <main className='lg:mt-4'>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default DashboardTemplate