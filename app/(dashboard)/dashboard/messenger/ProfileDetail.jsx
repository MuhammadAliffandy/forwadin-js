import { formatDate, getFirst2Digits, getNumberFromString } from "@/utils/helper"
import { MessengerList } from "@/utils/types"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ProfileDetail = ({ currentMessenger }) => {
    const { push } = useRouter()
    if (!currentMessenger)
        return (
            <div></div>
        )
    if (currentMessenger.contact)
        return (
            <>
                <div className='flex flex-col items-center'>
                    <div style={{
                        backgroundColor: '#' + '4FBEAB'
                    }} className={`flex-none rounded-full text-white w-20 h-20 text-[32px] flex items-center justify-center`}>IA</div>
                    <p className='font-lexend text-center text-2xl font-bold mt-4'>{currentMessenger.contact.firstName} {currentMessenger.contact.lastName || ''}</p>
                    <p className='mt-2 text-[#777C88]'>+{currentMessenger.phone}</p>
                </div>
                <div className="border border-customGray text-center py-2 rounded-md my-4 hover:cursor-pointer"
                    onClick={() => push('/dashboard/contact/' + currentMessenger.contact?.id)}>
                    Detail
                </div>
                <table className='w-full border-spacing-y-2 border-spacing-x-2 -mx-2 border-separate mt-4'>
                    <tbody >
                        <tr>
                            <th className='font-medium whitespace-pre '>First Name</th>
                            <td className="break-all">{currentMessenger.contact.firstName}</td>
                        </tr>
                        <tr>
                            <th className='font-medium whitespace-pre'>Last Name</th>
                            <td className="break-all">{currentMessenger.contact.lastName || '-'}</td>
                        </tr>
                        <tr>
                            <th className='font-medium whitespace-pre'>Email</th>
                            <td className="break-all">{currentMessenger.contact.email || '-'}</td>
                        </tr>
                        <tr>
                            <th className='font-medium whitespace-pre'>Phone Number</th>
                            <td className="break-all">+{currentMessenger.contact.phone}</td>
                        </tr>
                        <tr>
                            <th className='font-medium whitespace-pre'>Gender</th>
                            <td className="break-all">{currentMessenger.contact.gender || '-'}</td>
                        </tr>
                        <tr>
                            <th className='font-medium whitespace-pre'>Honorific</th>
                            <td className="break-all">{currentMessenger.contact.honorific || '-'}</td>
                        </tr>
                        <tr>
                            <th className='font-medium whitespace-pre'>Country</th>
                            <td className="break-all">{currentMessenger.contact.country || '-'}</td>
                        </tr>
                        <tr>
                            <th className='font-medium whitespace-pre'>Birthdate</th>
                            <td>{formatDate(currentMessenger.contact.dob) || '-'}</td>
                        </tr>
                        <tr>
                            <th className='font-medium whitespace-pre'>Labels</th>
                            <td className='flex flex-wrap justify-center lg:justify-start items-center gap-2'>
                                {currentMessenger.contact.ContactLabel?.map((item, idx) => (
                                    <div key={idx} className='text-white bg-primary px-4 py-1 rounded-full'>
                                        {item.label.name}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        )

    return (<>
        <div className='flex flex-col items-center'>
            <div className={`flex-none rounded-full text-white w-20 h-20 text-[32px] flex items-center justify-center bg-primary`}>{getFirst2Digits(currentMessenger.phone)}</div>
            <p className='font-lexend text-2xl font-bold mt-4 break-all'>+{currentMessenger.phone}</p>
        </div>
    </>)

}

export default ProfileDetail