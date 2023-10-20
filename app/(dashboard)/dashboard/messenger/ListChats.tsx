import { ContactData } from "@/utils/types"
import { Dispatch, SetStateAction, useState } from "react"

interface ListChatsProps {
    listUser: any,
    currentUser: ContactData,
    setcurrentUser: Dispatch<SetStateAction<ContactData>>
}
const ListChats = ({ listUser, currentUser, setcurrentUser }: ListChatsProps) => {
    const [switchButton, setswitchButton] = useState('open')


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
                    <input type="text" className="w-full rounded-md bg-[#E6E8F0] outline-none focus:ring-0 border-none text-customGray" placeholder="search" />
                </div>
                <div className="flex-none flex items-center">
                    <img src="/assets/icons/filter_list.svg" alt="" width={24} />
                </div>
            </div>
            <div className=" flex flex-col gap-2 overflow-y-auto">
                {/* Contacts */}
                {listUser.map((user: any) => (
                    <div className={"rounded-md p-3 hover:cursor-pointer " + (currentUser.id === user.id ? 'bg-white' : '')} onClick={() => setcurrentUser(user)}>
                        <div className="flex gap-2 items-center w-full">
                            <div style={{
                                backgroundColor: '#' + user.profileColor
                            }} className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center`}>{user.initial}</div>
                            <div className=" w-48">
                                <p>{user.firstName} {user.lastName}</p>
                                <p className="truncate text-ellipsis overflow-hidden  whitespace-nowrap text-[#777C88] mt-1">{user.lastMessage}</p>
                            </div>
                        </div>
                        <div className="text-end text-[#777C88] mt-2">
                            {user.lastReceived}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListChats