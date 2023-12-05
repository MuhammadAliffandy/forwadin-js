import { ContactData, ContactLatestMessage, ConversationMessage } from "@/utils/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface ListChatsProps {
    listContact: ContactLatestMessage[],
    currentContact: ContactData | undefined,
    setcurrentContact: Dispatch<SetStateAction<ContactData | undefined>>,
    setlistMessage: Dispatch<SetStateAction<ConversationMessage[]>>,
    // fetchMessage: (page: number) => void
}
const ListChats = ({ listContact, currentContact, setcurrentContact, setlistMessage }: ListChatsProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!
    const [switchButton, setswitchButton] = useState('open')
    const [inputText, setinputText] = useState('')
    const [searchedContact, setsearchedContact] = useState<ContactLatestMessage[]>([])
    const handleClickContact = (contact: ContactData) => {
        if (currentContact?.id === contact.id) return
        setlistMessage([])
        setcurrentContact(contact)
        const params = new URLSearchParams(searchParams)
        params.set('contact', contact.id)
        router.push(pathname + '?' + params.toString())
    }
    const filterContact = (text: string) => {
        const regex = new RegExp(text, 'i')
        return listContact.filter(item => {
            const contact = item.contact
            if (regex.test(contact.firstName) || regex.test(contact.lastName) || regex.test(contact.phone) || regex.test(contact.email))
                return item
            const findLabel = contact.ContactLabel?.find(contact => regex.test(contact.label.name))
            if (findLabel)
                return item
        })
    }
    useEffect(() => {
        const searchResult = filterContact(inputText)
        setsearchedContact(searchResult)
    }, [inputText])

    return (
        <div className="flex flex-col gap-4 mt-4 h-full">
            <div className='flex gap-2'>
                <div className={'flex justify-center gap-2 w-full px-4 py-2 items-center rounded-md group hover:bg-primary hover:cursor-pointer ' + (switchButton === 'open' ? 'bg-primary' : '')} onClick={() => setswitchButton('open')}>
                    <div className={'group-hover:text-white ' + (switchButton === 'open' ? 'text-white' : 'text-black')}>Open</div>
                    <div className={'rounded-md group-hover:text-black group-hover:bg-white flex items-center justify-center h-5 w-5 text-xs ' + (switchButton === 'open' ? 'bg-white text-black' : 'bg-black text-white')} >3</div>
                </div>
                <div className={'flex justify-center gap-2 w-full px-4 py-2 items-center rounded-md group hover:bg-primary hover:cursor-pointer ' + (switchButton === 'closed' ? 'bg-primary' : '')} onClick={() => setswitchButton('closed')}>
                    <div className={'group-hover:text-white ' + (switchButton === 'closed' ? 'text-white' : 'text-black')}>Closed</div>
                    <div className={'rounded-md group-hover:text-black group-hover:bg-white flex items-center justify-center h-5 w-5 text-xs ' + (switchButton === 'closed' ? 'bg-white text-black' : 'bg-black text-white')}>3</div>
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
                        {searchedContact.map(contact => (
                            <div className={"rounded-md p-3 " + (currentContact?.id === contact.contact.id ? 'bg-white' : 'hover:cursor-pointer ')} onClick={() => handleClickContact(contact.contact)}>
                                <div className="flex gap-2 items-center w-full">
                                    <div style={{
                                        backgroundColor: '#' + contact.contact.colorCode
                                    }} className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center`}>{contact.contact.initial}</div>
                                    <div className=" w-48">
                                        <p>{contact.contact.firstName} {contact.contact.lastName}</p>
                                        <p className="truncate text-ellipsis overflow-hidden  whitespace-nowrap text-[#777C88] mt-1">
                                            {contact.latestMessage?.message || ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        {listContact.map(contact => (
                            <div className={"rounded-md p-3 " + (currentContact?.id === contact.contact.id ? 'bg-white' : 'hover:cursor-pointer ')} onClick={() => handleClickContact(contact.contact)}>
                                <div className="flex gap-2 items-center w-full">
                                    <div style={{
                                        backgroundColor: '#' + contact.contact.colorCode
                                    }} className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center`}>{contact.contact.initial}</div>
                                    <div className=" w-48">
                                        <p>{contact.contact.firstName} {contact.contact.lastName}</p>
                                        <p className="truncate text-ellipsis overflow-hidden  whitespace-nowrap text-[#777C88] mt-1">
                                            {contact.latestMessage?.message || ''}
                                        </p>
                                    </div>
                                </div>
                                {/* <div className="text-end text-[#777C88] mt-2">
                           
                            lorem
                        </div> */}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default ListChats