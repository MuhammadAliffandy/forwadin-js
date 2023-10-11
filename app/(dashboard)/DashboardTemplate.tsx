'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import NavButton from '../../components/dashboard/NavButton'
import MessageList from '../../components/dashboard/MessageList'
import ContactList from '@/components/dashboard/ContactList'
import { signOut } from "next-auth/react";
const DashboardTemplate = ({ currentPage, children }: { currentPage: string, children: React.ReactNode }) => {
    const [sideNavDropdown, setsideNavDropdown] = useState(false)

    const handleClick = (event: React.MouseEvent) => {
        setsideNavDropdown(true)
    }
    const handleWindowClick = (e: React.MouseEvent) => {
        const sideNav = document.getElementById('side_nav')
        const mainContent = document.getElementById('main_content')
        if (sideNavDropdown)
            if (mainContent?.contains(e.target as Node))
                setsideNavDropdown(false)
    }

    return (
        <>
            <div className={(sideNavDropdown ? 'block' : 'hidden') + " h-full w-[200px] lg:w-[250px] z-10 top-0 left-0 overflow-y-auto bg-white fixed lg:block pb-12"} id="side_nav">
                <nav className="mt-8 px-4 " >
                    <div className='flex justify-center items-center gap-2 hover:cursor-pointer' onClick={() => signOut()}>
                        <div className=''>
                            <img src={'/assets/icons/logo.png'} alt="logo" />

                        </div>
                        <div className=''>
                            <img src={'/assets/icons/forwardin.png'} alt="logo" />

                        </div>
                    </div>
                    <div className='flex flex-col mt-12 gap-2'>
                        <NavButton text='Dashboard' href='/dashboard' currentPage={currentPage} />
                        <NavButton text='Devices' href='/dashboard/device' currentPage={currentPage} />
                        <ContactList currentPage={currentPage} />
                        {/* Message List */}
                        <MessageList currentPage={currentPage} />
                        <p className='text-sm mt-2'>Tools</p>
                        <NavButton text='Broadcast' href='/dashboard/broadcast' currentPage={currentPage} />
                        <NavButton text='Campaign' href='/dashboard/campaign' currentPage={currentPage} />
                        <NavButton text='Auto Reply' href='/dashboard/auto-reply' currentPage={currentPage} />
                        <p className='text-sm mt-2'>Others</p>
                        <NavButton text='Settings' href='/dashboard/settings' currentPage={currentPage} />
                    </div>
                </nav>
            </div>
            <div onClick={handleWindowClick} className="lg:pl-[250px] p-2 lg:p-6 h-[100vh] overflow-hidden" id='main_content'>
                {/* Mobile Dashboard Nav */}
                <div className='flex w-full justify-between lg:hidden pb-4 pt-2 px-2'>
                    <div onClick={handleClick} id="dropdown_icon">
                        <img src={'/assets/icons/dropdown.png'} alt="" />

                    </div>
                    <div className='flex justify-end gap-2'>
                        <div className='flex-none bg-white rounded-full p-2 hover:cursor-pointer'>
                            <img src="/assets/icons/dashboard/comments.svg" alt="" />
                        </div>
                        <div className='flex-none bg-white rounded-full p-2 hover:cursor-pointer'>
                            <img src="/assets/icons/dashboard/bell.svg" alt="" />
                        </div>
                        <div className='flex-none bg-white rounded-full hover:cursor-pointer flex w-[180px]'>
                            <div className='flex-1 flex justify-center items-center'>
                                <p>User Name</p>
                            </div>
                            <div className='flex-none bg-primary rounded-full p-2 hover:cursor-pointer'>
                                <img src="/assets/icons/dashboard/user.svg" alt="" />
                            </div>
                        </div>
                        <div className='flex-none bg-white rounded-full p-2 hover:cursor-pointer'>
                            <img src="/assets/icons/dashboard/gear.svg" alt="" />
                        </div>
                    </div>
                </div>
                <div className='bg-neutral-75 h-[95vh] overflow-y-scroll rounded-2xl text-sm p-2 lg:pt-6 lg:px-6 relative '>
                    {/* Desktop Dashboard nav */}
                    <div className='lg:flex w-full justify-end gap-2 hidden'>
                        <div className='flex-none bg-white rounded-full p-2 hover:cursor-pointer'>
                            <img src="/assets/icons/dashboard/comments.svg" alt="" />
                        </div>
                        <div className='flex-none bg-white rounded-full p-2 hover:cursor-pointer'>
                            <img src="/assets/icons/dashboard/bell.svg" alt="" />
                        </div>
                        <div className='flex-none bg-white rounded-full hover:cursor-pointer flex w-[180px]'>
                            <div className='flex-1 flex justify-center items-center'>
                                <p>User Name</p>
                            </div>
                            <div className='flex-none bg-primary rounded-full p-2 hover:cursor-pointer'>
                                <img src="/assets/icons/dashboard/user.svg" alt="" />
                            </div>
                        </div>
                        <div className='flex-none bg-white rounded-full p-2 hover:cursor-pointer'>
                            <img src="/assets/icons/dashboard/gear.svg" alt="" />
                        </div>
                    </div>
                    <main className='lg:mt-12'>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default DashboardTemplate