import { ContactData } from "@/app/utils/types"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

const MultipleInputContact = (
    { contactList, setcontactList }
) => {
    const contactInputRef = useRef(null)
    const [searchContactList, setsearchContactList] = useState([])

    const [inputText, setinputText] = useState('')
    const handleContactDataClick = (contactId, status) => {
        const newContactDataList = contactList.map((list => list.id === contactId ? { ...list, active: status } : list))
        // console.log(newContactDataList)
        setcontactList(newContactDataList)
    }
    useEffect(() => {
        const newSearchContactData = contactList.filter(item =>
            item.firstName.toLowerCase().includes(inputText.toLowerCase())
            || item.lastName?.toLowerCase().includes(inputText.toLowerCase())
        )
        setsearchContactList(newSearchContactData)
    }, [inputText])
    return (
        <>
            <div className='rounded-t-md text-xs w-full border border-customGray relative'>
                <div className='py-4 px-4 flex '>
                    {contactList.filter(contact => contact.active === true).length === 0 && (
                        <p className="text-customGray whitespace-pre"
                            style={{
                                WebkitTouchCallout: 'none',
                                WebkitUserSelect: 'none',
                            }}
                        >Pilih kontak</p>
                    )}
                    <div className=" flex flex-wrap gap-2">
                        {contactList.map((contact, idx) => contact.active && (
                            <div key={idx} style={{ backgroundColor: '#' + contact.colorCode }} className='flex gap-2 rounded-full px-4 py-1 hover:cursor-pointer text-white' onClick={() => handleContactDataClick(contact.id, false)}>
                                <span className=''>{contact.firstName}</span>
                                <span>&times;</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-white w-full border-x border-x-customGray">
                <div className="flex items-center gap-2 px-6 py-2">
                    <div className="hover:cursor-pointer" onClick={() => contactInputRef.current?.focus()} >
                        <img src="/assets/icons/search_grey.png" alt="" />
                    </div>
                    <input maxLength={10} ref={contactInputRef} type="text" placeholder="Cari contact" className=" flex-1 w-full text-xs placeholder:text-customGray outline-none border-none focus:ring-0 focus:outline-none focus:border-transparent" value={inputText} onChange={(e) => setinputText(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col overflow-x-auto max-h-40 border-x border-t border-customGray rounded-b-md text-xs">
                {inputText ? (
                    <>
                        {searchContactList.map((contact, idx) => !contact.active && (
                            <div key={idx} onClick={() => handleContactDataClick(contact.id, true)} className={"border-b border-b-customGray px-6 py-2 hover:cursor-pointer flex gap-2"}>
                                <div className="flex items-center gap-2">
                                    <div className="">
                                        <div style={{
                                            backgroundColor: '#' + contact.colorCode
                                        }} className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center`}>{contact.initial}</div>
                                    </div>
                                    <p>{contact.firstName + ' ' + (contact.lastName ? contact.lastName : '')}</p>
                                </div>
                            </div>
                        ))}
                    </>) :
                    (
                        <>
                            {contactList.map((contact, idx, { length }) => !contact.active && (
                                <div key={idx} onClick={() => handleContactDataClick(contact.id, true)} className={"border-b border-b-customGray px-6 py-2 hover:cursor-pointer flex gap-2"}>
                                    <div className="flex items-center gap-2">
                                        <div className="">
                                            <div style={{
                                                backgroundColor: '#' + contact.colorCode
                                            }} className={`flex-none rounded-full text-white w-8 h-8 flex items-center justify-center`}>{contact.initial}</div>
                                        </div>
                                        <p>{contact.firstName + ' ' + (contact.lastName ? contact.lastName : '')}</p>
                                    </div></div>
                            ))}
                        </>)
                }
            </div>

        </>

    )
}

export default MultipleInputContact
