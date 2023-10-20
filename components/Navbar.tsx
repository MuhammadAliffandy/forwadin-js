'use client';
import { animated, useTransition } from "@react-spring/web";
import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react'
import Button from "./landing/Button";
import { useSession } from "next-auth/react";
const Navbar = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [isDropdown, setIsDropdown] = useState(false)
    const [signInDropdown, setSignInDropdown] = useState(false)
    const [featureDropdown, setfeatureDropdown] = useState(false)
    const handleDropdownClick = (e: React.MouseEvent) => {
        if (!document.getElementById('mobile_nav_dropdown')?.contains(e.target as Node)) {
            setIsDropdown(false)
        }
    }
    const featureTransition = useTransition(featureDropdown, {
        from: {
            opacity: '0'
        },
        enter: {
            opacity: '1'
        },
        leave: {
            opacity: '0'
        }
    })
    const buttonTransition = useTransition(signInDropdown, {
        from: {
            opacity: '0'
        },
        enter: {
            opacity: '1'
        },
        leave: {
            opacity: '0'
        }
    })
    return (
        <>
            <nav className="absolute flex md:hidden bg-white w-full justify-between px-8 py-4 top-0 z-10 shadow">
                <div className="flex gap-4 items-center hover:cursor-pointer" onClick={() => router.push('/')}>
                    <img src="/assets/icons/logo_black.svg"
                        width={18}
                        height={26}
                        alt="logo" />
                    <img src="/assets/icons/forwardin_black.png"
                        alt="logo"
                        width={105}
                        height={11} />

                </div>
                <div className="flex items-center" onClick={() => setIsDropdown(!isDropdown)}>
                    <img
                        src={'/assets/icons/dropdown.png'}
                        alt="dropdown"
                        width={22}
                    />
                </div>
            </nav>
            <nav className="fixed hidden bg-white bg-opacity-80 backdrop-blur md:flex justify-between gap-12 top-5 left-1/2 -translate-x-1/2 z-10 p-3 rounded-lg shadow-xl text-sm">
                <div className="flex gap-4 items-center hover:cursor-pointer" onClick={() => router.push('/')}>
                    <div className='flex-none'>
                        <img
                            src={'/assets/icons/logo.png'}
                            alt="logo"
                            width={18}
                            height={26}
                        />
                    </div>
                    <div className='flex-none hidden lg:block'>
                        <img
                            src={'/assets/icons/forwardin_black.png'}
                            alt="forwardin"
                            width={105}
                            height={11}
                        />
                    </div>
                </div>
                <div className="gap-8 items-center relative hidden md:flex">
                    <div className="flex gap-2 items-center hover:cursor-pointer" onClick={() => setfeatureDropdown(!featureDropdown)}>
                        <p className="text-primary">Features</p>
                        <div>
                            <img src="/assets/icons/caret-down-blue.svg" alt="" />
                        </div>

                    </div>
                    <div className="hover:cursor-pointer">Pricing</div>
                    <div className="hover:cursor-pointer">Demo</div>
                    {featureTransition((style, item) => item && (
                        <animated.div style={style} className="absolute bg-white px-8 py-4 -left-8 top-16 flex flex-col text-center gap-6 rounded-md shadow-xl">
                            <div className="hover:cursor-pointer hover:text-primary">Broadcast</div>
                            <div className="hover:cursor-pointer hover:text-primary">Campaign</div>
                            <div className="whitespace-pre hover:cursor-pointer hover:text-primary">Auto Reply</div>
                        </animated.div>
                    ))}
                </div>
                <div className="flex-items center relative">
                    {session?.user ? (<>
                        <div className="bg-primary px-8 py-2 text-white rounded-md hover:cursor-pointer whitespace-pre" onClick={() => router.push('/dashboard')}>Dashboard</div>
                    </>) : (<>
                        <div className="bg-primary px-8 py-2 text-white rounded-md hover:cursor-pointer whitespace-pre" onClick={() => setSignInDropdown(!signInDropdown)}>Sign In</div>
                        {buttonTransition((style, item) => item && (
                            <animated.div style={style} className="absolute bg-white px-8 py-4 -left-10 top-16 flex flex-col text-center gap-4 rounded-md shadow-xl">
                                <Link href={'/signin'} className=" hover:text-primary">Admin</Link >
                                <Link href={'/signin'} className=" hover:text-primary whitespace-pre">Customer Service</Link >
                            </animated.div>
                        ))}
                    </>)}
                </div >
            </nav >
            {isDropdown && (
                <div id="mobile_nav_dropdown" className="absolute bg-white z-10 rounded-lg w-full py-4 flex flex-col gap-8 mx-auto font-semibold text-center px-4 top-12 md:hidden shadow">
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

                        {session?.user ? (<>
                            <div className='border border-primary rounded-full px-6 py-2 text-center whitespace-nowrap bg-primary text-white flex gap-2 justify-center'
                                onClick={() => router.push('/dashboard')}>Dashboard</div>
                        </>) : (<>
                            <Button text={'Sign Up'} href={'/signup'} isPrimary={false} />
                            <div className='border border-primary rounded-full px-6 py-2 text-center whitespace-nowrap bg-primary text-white flex gap-2 justify-center'
                                onClick={() => setSignInDropdown(!signInDropdown)}>
                                <p>Sign in </p>
                                <div className='flex items-center' >
                                    <img
                                        src={'/assets/icons/caret-down.svg'}
                                        width={14}
                                        height={9}
                                        alt='caret down'
                                    />
                                </div>
                            </div>
                        </>)}
                    </div>
                    {(signInDropdown && !session?.user) && (
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
        </>
    )
}

export default Navbar 
