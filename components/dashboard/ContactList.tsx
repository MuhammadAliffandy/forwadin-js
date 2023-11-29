import { useEffect, useState } from "react"
import { Dispatch, SetStateAction } from "react";
import NavButton from "./NavButton"
const ContactList = ({ currentPage, isDisabled }: { currentPage: string, isDisabled: boolean }) => {
    const [isDropdown, setIsDropdown] = useState(false)
    const [isActive, setisActive] = useState(false)
    useEffect(() => {
        if (currentPage === 'Contacts' || currentPage === 'Groups')
            setisActive(true)
        else
            setisActive(false)
    }, [currentPage])

    return (
        <>
            <div className={(isActive ? 'bg-[#F3F5F8]' : 'hover:text-primary') + ' select-none hover:cursor-pointer rounded-xl py-2 px-4 flex gap-2 items-center relative'} onClick={() => setIsDropdown(!isDropdown)} >
                <img src={`/assets/icons/dashboard/Contacts.svg`} alt="" className={'invert-[1] grayscale-0'} />
                <p>Contacts</p>
                <img src="/assets/icons/caret-down.svg" className="absolute invert-[1] grayscale-0 right-4 top-1/2 -translate-y-1/2" />
            </div>
            {isDropdown && (
                <div className="pl-4 flex flex-col gap-2">
                    <NavButton text='Contacts' href='/dashboard/contact' currentPage={currentPage} isDisabled={isDisabled} />
                    <NavButton text='Groups' href='/dashboard/group' currentPage={currentPage} isDisabled={isDisabled} />
                </div>
            )}

        </>
    )
}

export default ContactList