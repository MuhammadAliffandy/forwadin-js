import { useEffect, useState } from "react"
import { Dispatch, SetStateAction } from "react";
import NavButton from "./NavButton";
const ContactList = ({ currentPage }: { currentPage: string }) => {
    const [isDropdown, setIsDropdown] = useState(false)
    const [isActive, setisActive] = useState(false)
    useEffect(() => {
        if (currentPage === 'Contacts' || currentPage === 'Groups')
            setisActive(true)
    }, [])

    return (
        <>
            <div className={(isActive ? 'bg-primary text-white' : 'bg-white hover:bg-neutral-75') + ' select-none hover:cursor-pointer rounded-xl py-2 px-4 flex gap-2 items-center relative'} onClick={() => setIsDropdown(!isDropdown)} >
                <img src={`/assets/icons/dashboard/Contacts.svg`} alt="" className={(isActive ? '' : 'invert-[1] grayscale-0')} />
                <p>Contacts</p>
                <img src="/assets/icons/caret-down.svg" className="absolute invert-[1] grayscale-0 right-4 top-1/2 -translate-y-1/2" />
            </div>
            {isDropdown && (
                <div className="pl-4 flex flex-col gap-2">
                    <NavButton text='Contacts' href='/dashboard/contact' currentPage={currentPage} />
                    <NavButton text='Groups' href='/dashboard/group' currentPage={currentPage} />
                </div>
            )}

        </>
    )
}

export default ContactList