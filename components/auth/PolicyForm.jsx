import { CheckboxRef, UserRegisterData } from "@/utils/types";
import { signIn } from "next-auth/react";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
const PolicyForm = ({ setCurrentStep, setUserData, userData }) => {
    const [isLoading, setisLoading] = useState(false)
    const [isChecked, setisChecked] = useState(false)
    const checkboxRef = useRef<HTMLInputElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleClick = async () => {
        if (!isLoading) {
            setisLoading(true)
            // TODO Perform backend
            const result = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            const message = await result.json()
            if (result.ok) {
                const login = await signIn('credentials', {
                    identifier: userData.email,
                    password: userData.password,
                    redirect: false,
                })
                if (!login?.error) {
                    setCurrentStep('otp')
                }
                else
                    toast.error(message.message)
            } else {
                toast.error(message.message)
                console.log(result.status)
            }
            setisLoading(false)
        }
    }
    const handleCheckbox = () => {
        setisChecked(checkboxRef.current?.checked )
    }
    useEffect(() => {

        setisChecked(checkboxRef.current?.checked )
    }, [])


    return (
        <>
            <div className="flex flex-col gap-8 text-xs">
                <div className='text-center'>
                    <p className='font-lexend font-bold text-3xl'>Syarat dan Ketentuan</p>
                </div>
                <div className="h-80 overflow-y-scroll allowed-scroll pr-4 py-4 flex flex-col gap-2" >
                    <p className="font-bold text-lg">Privacy Policy for Forwardin</p>
                    <p>At Forwardin, accessible from -, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Forwardin and how we use it.
                    </p>
                    <p>
                        If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>
                    <p className="font-bold text-lg">Log Files</p>
                    <p>Forwardin follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information. Our Privacy Policy was created with the help of the Privacy Policy Generator.</p>
                    <p className="font-bold text-lg">Cookies and Web Beacons</p>
                    <p>Like any other website, Forwardin uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
                    <p className="font-bold text-lg">Privacy Policies</p>
                    <p>You may consult this list to find the Privacy Policy for each of the advertising partners of Forwardin.
                    </p>
                    <p>
                        Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Forwardin, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                    </p>
                    <p>
                        Note that Forwardin has no access to or control over these cookies that are used by third-party advertisers.
                    </p>
                    <p className="font-bold text-lg">Consent</p>
                    <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
                </div>
                <div className="flex gap-2 items-center">
                    <input type="checkbox" ref={checkboxRef} name="privacy_policy" id="privacy_policy" className="rounded-sm hover:cursor-pointer border-customGray" onChange={handleCheckbox} />
                    <div className="">I acknowledge that i agree to the <span className="underline">Terms of Use</span> and have read the <span className="underline">Privacy Policy</span></div>
                </div>
                <div>
                    <button ref={buttonRef} className='p-4  rounded-md w-full bg-primary text-white border border-primary text-lg disabled:bg-customGray disabled:border-customGray' disabled={!isChecked} onClick={handleClick}>
                        {isLoading ? (<PulseLoader size={10} color="#F3F5F8" />)
                            : (<p>
                                Continue
                            </p>)}
                    </button>
                </div>
            </div>
        </>
    )
}

export default PolicyForm