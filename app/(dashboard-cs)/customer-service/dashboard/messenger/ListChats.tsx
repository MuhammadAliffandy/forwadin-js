import { getFirst2Digits, getInitials, getNumberFromString } from "@/utils/helper"
import { MessengerList, ContactLatestMessage, ConversationMessage } from "@/utils/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface ListChatsProps {
    listMessenger: ContactLatestMessage[],
    currentMessenger: MessengerList | undefined,
    setcurrentMessenger: Dispatch<SetStateAction<MessengerList | undefined>>,
    setlistMessage: Dispatch<SetStateAction<ConversationMessage[]>>,
    // fetchMessage: (page: number) => void
}
const ListChats = ({ listMessenger, currentMessenger, setcurrentMessenger, setlistMessage }: ListChatsProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!
    const [switchButton, setswitchButton] = useState('active')
    const [inputText, setinputText] = useState('')
    const [activeListMessenger, setActiveListMessenger] = useState<ContactLatestMessage[]>([])
    const [pendingListMessenger, setPendingListMessenger] = useState<ContactLatestMessage[]>([])
    const [searchedMessenger, setsearchedMessenger] = useState<ContactLatestMessage[]>([])
    const handleClickMessenger = (messenger: MessengerList) => {
        if (currentMessenger?.phone === messenger.phone) return
        setlistMessage([])
        setcurrentMessenger(messenger)
        const params = new URLSearchParams(searchParams)
        params.set('phone', messenger.phone)
        router.push(pathname + '?' + params.toString())
    }
    const filterMessenger = (text: string, currentListMessenger: ContactLatestMessage[]) => {
        const regex = new RegExp(text, 'i')
        return currentListMessenger.filter(item => {
            const contact = item.messenger.contact
            if (regex.test(item.messenger.phone)) return item
            if (contact) {
                if (regex.test(contact.firstName) || regex.test(contact.lastName) || regex.test(contact.phone) || regex.test(contact.email))
                    return item
                const findLabel = contact.ContactLabel?.find(contact => regex.test(contact.label.name))
                if (findLabel)
                    return item
            }
        })
    }
    useEffect(() => {
        if (switchButton === 'active') {
            const searchResult = filterMessenger(inputText, activeListMessenger)
            setsearchedMessenger(searchResult)
        } else {
            const searchResult = filterMessenger(inputText, pendingListMessenger)
            setsearchedMessenger(searchResult)
        }
    }, [inputText, switchButton])
    useEffect(() => {
        setActiveListMessenger(listMessenger.filter(item => item.messenger.contact))
        setPendingListMessenger(listMessenger.filter(item => !item.messenger.contact))
    }, [listMessenger])
    return (
        <div className="flex flex-col gap-4 mt-4 h-full">
            <div className='flex gap-2'>
                <div className={'flex justify-center gap-2 w-full px-4 py-2 items-center rounded-md group hover:bg-primary hover:cursor-pointer ' + (switchButton === 'active' ? 'bg-primary' : '')} onClick={() => setswitchButton('active')}>
                    <div className={'group-hover:text-white ' + (switchButton === 'active' ? 'text-white' : 'text-black')}>Active</div>
                    <div className={'rounded-md group-hover:text-black group-hover:bg-white flex items-center justify-center h-5 w-5 text-xs ' + (switchButton === 'active' ? 'bg-white text-black' : 'bg-black text-white')} >{activeListMessenger.length}</div>
                </div>
                <div className={'flex justify-center gap-2 w-full px-4 py-2 items-center rounded-md group hover:bg-primary hover:cursor-pointer ' + (switchButton === 'pending' ? 'bg-primary' : '')} onClick={() => setswitchButton('pending')}>
                    <div className={'group-hover:text-white ' + (switchButton === 'pending' ? 'text-white' : 'text-black')}>Pending</div>
                    <div className={'rounded-md group-hover:text-black group-hover:bg-white flex items-center justify-center h-5 w-5 text-xs ' + (switchButton === 'pending' ? 'bg-white text-black' : 'bg-black text-white')}>{pendingListMessenger.length}</div>
                </div>
            </div>
            <div className="flex gap-2">
                <div className="">
                    <input type="text" value={inputText} onChange={e => setinputText(e.target.value)} className="w-full rounded-md bg-[#E6E8F0] outline-none focus:ring-0 border-none" placeholder="search contact" />
                </div>
                <div className="flex-none flex items-center">
                    <img src="/assets/icons/filter_list.svg" alt="" width={24} />
                </div>
            </div>
            <div className=" flex flex-col gap-2 overflow-y-auto pb-12">
                {/* Contacts */}
                {inputText ? (
                    <>
                        {searchedMessenger.map(item => (
                            <MessengerCard
                                currentMessenger={currentMessenger}
                                handleClick={handleClickMessenger}
                                item={item}
                                key={item.messenger.phone} />
                        ))}
                    </>
                ) : (
                    <>
                        {switchButton === 'active' ? (
                            <>
                                {activeListMessenger.map(item => (
                                    <MessengerCard
                                        currentMessenger={currentMessenger}
                                        handleClick={handleClickMessenger}
                                        item={item}
                                        key={item.messenger.phone} />
                                ))}
                            </>
                        ) : (
                            <>
                                {pendingListMessenger.map(item => (
                                    <MessengerCard
                                        currentMessenger={currentMessenger}
                                        handleClick={handleClickMessenger}
                                        item={item}
                                        key={item.messenger.phone} />
                                ))}
                            </>)}
                    </>
                )}
            </div>
        </div>
    )
}

export default ListChats


const MessengerCard = ({ item, handleClick, currentMessenger }: {
    item: ContactLatestMessage,
    currentMessenger: MessengerList | undefined,
    handleClick: (item: MessengerList) => void
}) => {
    return (
        <div key={item.messenger.phone} className={"rounded-md p-3 " + (currentMessenger?.phone === item.messenger.phone ? 'bg-white' : 'hover:cursor-pointer ')} onClick={() => handleClick(item.messenger)}>
            <div className="flex gap-2 items-center w-full">
                {item.messenger.contact ? (
                    <>
                        <div style={{
                            backgroundColor: '#' + item.messenger.contact.colorCode
                        }} className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center`}>{getInitials(item.messenger.contact.firstName + ' ' + item.messenger.contact.lastName)}</div>
                        <div className=" w-48">
                            <p>{item.messenger.contact.firstName} {item.messenger.contact.lastName || ''}</p>
                            <p className="truncate text-ellipsis overflow-hidden  whitespace-nowrap text-[#777C88] mt-1">
                                {item.latestMessage?.message || ''}
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center bg-primary`}>{getNumberFromString(getFirst2Digits(item.messenger.phone))}</div>
                        <div className=" w-48">
                            <p>{item.messenger.phone}</p>
                            <p className="truncate text-ellipsis overflow-hidden  whitespace-nowrap text-[#777C88] mt-1">
                                {item.latestMessage?.message || ''}
                            </p>
                        </div>
                    </>
                )}

            </div>
        </div>

    )
}
