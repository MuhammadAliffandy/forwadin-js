'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import NavButton from '../../components/dashboard/NavButton'
import MessageList from '../../components/dashboard/MessageList'
import ContactList from '@/components/dashboard/ContactList'
import { signIn, signOut, useSession } from "next-auth/react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import { CustomerService, UserProfile } from "@/utils/types";
import { fetchClient } from "@/utils/helper/fetchClient";
import { useRouter } from "next/navigation";
const DashboardTemplate = ({ currentPage, children }) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [sideNavDropdown, setsideNavDropdown] = useState(false)
    const [isDisabled, setisDisabled] = useState(true)
    const handleClick = (event) => {
        setsideNavDropdown(true)
    }
    const handleWindowClick = (e) => {
        const mainContent = document.getElementById('main_content')
        if (sideNavDropdown)
            if (mainContent?.contains(e.target))
                setsideNavDropdown(false)
    }
    useEffect(() => {
        console.log(session?.customerService)
        if (session?.customerService?.sessionId)
            setisDisabled(false)
        else
            setisDisabled(true)
    }, [session?.customerService?.sessionId])

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
                        <NavButton text='Dashboard' href='/customer-service/dashboard' currentPage={currentPage} />
                        {/* Message List */}
                        <NavButton text='Messenger' href='/customer-service/dashboard/messenger' currentPage={currentPage} isDisabled={isDisabled} />
                        <p className='text-sm mt-2'>Tools</p>
                        <NavButton text='Auto Reply' href='/customer-service/dashboard/auto-reply' currentPage={currentPage} isDisabled={isDisabled} />
                        <NavButton text='Order' href='/customer-service/dashboard/order' currentPage={currentPage} isDisabled={isDisabled} />
                        <p className='text-sm mt-2'>Others</p>
                        <NavButton text='Settings' href='/customer-service/dashboard/settings' currentPage={currentPage} />
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
                                    <p>{session?.customerService?.username}</p>
                                </div>
                                <div className='flex-none bg-primary rounded-full p-2 hover:cursor-pointer flex items-center justify-center'>
                                    <img src="/assets/icons/dashboard/user.svg" alt="" />
                                </div>
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu
                            disabledKeys={["profile"]} aria-label="mobile_profile">
                            <DropdownSection showDivider={true}>
                                <DropdownItem
                                    isReadOnly
                                    key={'profile'}
                                    className="opacity-100"
                                >
                                    <div className="flex justify-center">
                                        <div className='flex-none bg-primary rounded-full w-[54px] h-[54px] p-4 hover:cursor-pointer flex items-center justify-center'>
                                            <img src="/assets/icons/dashboard/user.svg" alt="" className="w-full" />
                                        </div>
                                    </div>
                                    <p className="font-bold text-sm text-center mt-2">{session?.customerService?.username}</p>
                                    <p className="text-[10px] text-center">{session?.customerService?.email}</p>
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownItem key='sign out' className="text-danger" onClick={() => signOut({ callbackUrl: '/customer-service/signin' })}>Sign Out</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className='bg-neutral-75 h-[95vh] overflow-y-scroll rounded-2xl text-sm p-2 lg:pt-6 lg:px-6 relative'>
                    {/* Desktop Dashboard nav */}
                    <div className='lg:flex w-full justify-end gap-2 hidden'>
                        {/* <div className='flex-none bg-white rounded-full p-2 hover:cursor-pointer'>
                            <img src="/assets/icons/dashboard/comments.svg" alt="" />
                        </div> */}
                        <div className='flex-none bg-white rounded-full p-2 hover:cursor-pointer'>
                            <img src="/assets/icons/dashboard/bell.svg" alt="" />
                        </div>
                        <Dropdown>
                            <DropdownTrigger>
                                <div className='flex-none bg-white rounded-full hover:cursor-pointer flex w-[180px]'>
                                    <div className='flex-1 flex justify-center items-center'>
                                        <p>{session?.customerService?.username}</p>
                                    </div>
                                    <div className='flex-none bg-primary rounded-full p-2 hover:cursor-pointer flex items-center justify-center'>
                                        <img src="/assets/icons/dashboard/user.svg" alt="" />
                                    </div>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu
                                disabledKeys={["profile"]}
                                aria-label="desktop_profile">
                                <DropdownSection showDivider={true}>
                                    <DropdownItem
                                        isReadOnly
                                        key={'profile'}
                                        className="opacity-100"
                                    >
                                        <div className="flex justify-center">
                                            <div className='flex-none bg-primary rounded-full w-[54px] h-[54px] p-4 hover:cursor-pointer flex items-center justify-center'>
                                                <img src="/assets/icons/dashboard/user.svg" alt="" className="w-full" />
                                            </div>
                                        </div>
                                        <p className="font-bold text-sm text-center mt-2">{session?.customerService?.username}</p>
                                        <p className="text-[10px] text-center">{session?.customerService?.email}</p>
                                    </DropdownItem>
                                </DropdownSection>
                                <DropdownItem key='sign out' className="text-danger" onClick={() => signOut({ callbackUrl: '/customer-service/signin' })}>Sign Out</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <div className='flex-none bg-white rounded-full p-2 hover:cursor-pointer' onClick={() => router.push('/customer-service/dashboard/settings')}>
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