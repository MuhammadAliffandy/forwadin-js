import { useEffect, useState } from "react"
import { Dispatch, SetStateAction } from "react";
import NavButton from "./NavButton";
import { User } from "next-auth";
const MessageList = ({ currentPage, user }: { currentPage: string, user: User | undefined }) => {
    const [isDropdown, setIsDropdown] = useState(false)
    const [isActive, setisActive] = useState(false)
    const listActivePages = [
        'Incoming Chat',
        'Outgoing Chat',
        'Messenger'
    ]
    useEffect(() => {
        if (listActivePages.find(item => item === currentPage))
            setisActive(true)
        else
            setisActive(false)
    }, [currentPage])

    return (
        <>
            <div className={(isActive ? 'bg-[#F3F5F8]' : 'hover:text-primary') + ' select-none hover:cursor-pointer rounded-xl py-2 px-4 flex gap-2 items-center relative'} onClick={() => setIsDropdown(!isDropdown)} >
                <img src={`/assets/icons/dashboard/Message List.svg`} alt="" className={'invert-[1] grayscale-0'} />
                <p>Message List</p>
                <img src="/assets/icons/caret-down.svg" className="absolute invert-[1] grayscale-0 right-4 top-1/2 -translate-y-1/2" />
            </div>
            {isDropdown && (
                <div className="pl-4 flex flex-col gap-2">
                    <NavButton text='Messenger' href='/dashboard/messenger' currentPage={currentPage} isDisabled={user?.device.length === 0} />
                    <NavButton text='Incoming Chat' href='/dashboard/incoming' currentPage={currentPage} isDisabled={user?.device.length === 0} />
                    <NavButton text='Outgoing Chat' href='/dashboard/outgoing' currentPage={currentPage} isDisabled={user?.device.length === 0} />
                </div>
            )}

        </>
    )
}

export default MessageList