'use client';
import Image from "next/image"
import logoPic from '@/public/assets/icons/logo.png'
import dropdownPic from '@/public/assets/icons/dropdown.png'
import forwardInPic from '@/public/assets/icons/forwardin_black.png'
import Link from "next/link"
import React, { useState, useEffect } from 'react'
import { useTransition, animated } from "@react-spring/web";
import Button from "./landing/Button";
const Navbar = () => {
    const [isDropdown, setIsDropdown] = useState(false)
    const [signInDropdown, setSignInDropdown] = useState(false)
    const handleDropdownClick = (e: React.MouseEvent) => {
        if (!document.getElementById('mobile_nav_dropdown')?.contains(e.target as Node)) {
            setIsDropdown(false)
        }
    }
    return (
        <nav className="top-0 z-10 w-full py-6 bg-white lg:shadow">
            <div className="flex justify-between items-center px-8 relative xl:px-0 xl:w-[85%] mx-auto">
                <div className="flex gap-4 items-center">
                    <div>
                        <Image
                            src={logoPic}
                            alt="logo"
                        />
                    </div>
                    <div className="hidden md:block">
                        <Image
                            src={forwardInPic}
                            alt="forwardin"
                        />
                    </div>
                </div>
                <div className="hidden lg:flex xl:gap-10 gap-6 font-bold">
                    <Link href={'/'}>
                        Get Started
                    </Link>
                    <Link href={'/'}>
                        Features
                    </Link>
                    <Link href={'/'}>
                        Integrations
                    </Link>
                    <Link href={'/'}>
                        Pricing
                    </Link>
                    <Link href={'/'}>
                        FAQ
                    </Link>
                    <Link href={'/'}>
                        Demo
                    </Link>


                </div>
                <div>
                    <div className="block lg:hidden" onClick={() => setIsDropdown(!isDropdown)}>
                        <Image
                            src={dropdownPic}
                            alt="dropdown"
                        />
                    </div>
                    <div className="hidden lg:flex justify-end gap-4">
                        <Button text='Sign Up' href='/signup' isPrimary={false} />
                        <Button text='Sign In' href='/signin' isPrimary={true} />
                    </div>
                </div>
            </div>
            <div className="lg:hidden w-full" onClick={(e) => handleDropdownClick(e)}>
                {isDropdown && (
                    <div id="mobile_nav_dropdown" className="bg-white-50 rounded-lg w-full py-4 flex flex-col gap-8 mx-auto font-semibold text-center px-4">
                        <Link href={'/'}>
                            Get Started
                        </Link>
                        <Link href={'/'}>
                            Features
                        </Link>
                        <Link href={'/'}>
                            Integrations
                        </Link>
                        <Link href={'/'}>
                            Pricing
                        </Link>
                        <Link href={'/'}>
                            FAQ
                        </Link>
                        <Link href={'/'}>
                            Demo
                        </Link>
                        <div className="flex flex-col gap-4">
                            <Button text={'Sign Up'} href={'/signup'} isPrimary={false} />
                            <div className='border border-primary rounded-full px-6 py-2 text-center whitespace-nowrap bg-primary text-white flex gap-2 justify-center'
                                onClick={() => setSignInDropdown(!signInDropdown)}>
                                <p>Sign in </p>
                                <div className='flex items-center' >
                                    <Image
                                        src={'/assets/icons/caret-down.svg'}
                                        width={14}
                                        height={9}
                                        alt='caret down'
                                    />
                                </div>
                            </div>
                        </div>
                        {signInDropdown && (
                            <>
                                <Link href={'/signin'} className={'opacity-60'}>
                                    Sign In as Admin
                                </Link>
                                <Link href={''} className={'opacity-60'}>
                                    Sign In as Customer Service
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar 