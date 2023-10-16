import { ContactData } from "@/utils/types"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ProfileDetail = () => {
    const { push } = useRouter()
    const [contactData, setcontactData] = useState<ContactData>({
        id: '1',
        phone: "6281357995175",
        firstName: 'Ihsanul',
        lastName: 'Afkar',
        initial: 'IA',
        colorCode: '4FBEAB',
        gender: "Laki-laki",
        email: 'ihsanulafkar@gmail.com',
        honorific: 'Mr',
        country: 'Indonesia',
        dob: '10/10/2010',
        ContactLabel: [],
        checked: false,
        createdAt: '11.9.2023, 2:43 PM',
        updatedAt: '11.9.2023, 2:43 PM'
    })
    return (
        <>
            <div className='flex flex-col items-center'>
                <div style={{
                    backgroundColor: '#' + '4FBEAB'
                }} className={`flex-none rounded-full text-white w-20 h-20 text-[32px] flex items-center justify-center`}>IA</div>
                <p className='font-lexend text-2xl font-bold mt-4'>{contactData.firstName} {contactData.lastName}</p>
                <p className='mt-2 text-[#777C88]'>+{contactData.phone}</p>
            </div>
            <div className="border border-customGray text-center py-2 rounded-md my-4 hover:cursor-pointer"
                onClick={() => push('/dashboard/contact/' + contactData.id)}>
                Detail
            </div>
            <div className="flex gap-2 ">
                <div className="w-full rounded-md bg-primary p-2 text-white flex items-center">
                    <div className="w-full flex justify-center items-center">
                        <img src="/assets/icons/history.svg" alt="" />
                    </div>
                    <div className="w-full">
                        <p className="text-xs">Histori</p>
                        <p className="text-2xl font-bold">3</p>
                    </div>
                </div>
                <div className="w-full rounded-md bg-primary p-2 text-white flex items-center">
                    <div className="w-full flex justify-center items-center">
                        <img src="/assets/icons/media.svg" alt="" />
                    </div>
                    <div className="w-full">
                        <p className="text-xs">Media</p>
                        <p className="text-2xl font-bold">3</p>
                    </div>
                </div>
            </div>
            <table className='w-full border-spacing-y-2 border-spacing-x-2 -mx-2 border-separate mt-4'>
                <tbody >
                    <tr>
                        <th className='font-medium whitespace-pre '>First Name</th>
                        <td>{contactData.firstName}</td>
                    </tr>
                    <tr>
                        <th className='font-medium whitespace-pre'>Last Name</th>
                        <td>{contactData.lastName}</td>
                    </tr>
                    <tr>
                        <th className='font-medium whitespace-pre'>Email</th>
                        <td>{contactData.email}</td>
                    </tr>
                    <tr>
                        <th className='font-medium whitespace-pre'>Phone Number</th>
                        <td>+{contactData.phone}</td>
                    </tr>
                    <tr>
                        <th className='font-medium whitespace-pre'>Gender</th>
                        <td>{contactData.gender ? contactData.gender : '-'}</td>
                    </tr>
                    <tr>
                        <th className='font-medium whitespace-pre'>Honorific</th>
                        <td>{contactData.honorific ? contactData.honorific : '-'}</td>
                    </tr>
                    <tr>
                        <th className='font-medium whitespace-pre'>Country</th>
                        <td>{contactData.country ? contactData.country : '-'}</td>
                    </tr>
                    <tr>
                        <th className='font-medium whitespace-pre'>Birthdate</th>
                        <td>{contactData.dob ? contactData.dob : '-'}</td>
                    </tr>
                    <tr>
                        <th className='font-medium whitespace-pre'>Labels</th>
                        <td className='flex flex-wrap justify-center lg:justify-start items-center gap-2'>
                            {contactData.ContactLabel.map((item, idx) => (
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
}

export default ProfileDetail