'use client'
import Link from "next/link"
import { useState } from "react"
import DetailGroup from "./DetailGroup"
const Group = ({ groupId }) => {
    const [countContact, setcountContact] = useState(0)
    const [groupName, setgroupName] = useState('')
    return (
        <>
            <div className='flex'>
                <Link href={'/dashboard/group'} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</Link>
            </div>
            <div className="flex gap-2 lg:justify-start justify-center items-center mt-4 w-full">
                <p className='font-lexend text-2xl font-bold'>Group: {groupName}</p>
                <div>
                    <div className="flex-none bg-black rounded-full text-white text-[10px] font-regular h-4 w-4 flex items-center justify-center">
                        <p>{countContact}</p>
                    </div>
                </div>
            </div>
            <DetailGroup groupId={groupId} setcountContact={setcountContact} groupName={groupName} setgroupName={setgroupName} />
        </>
    )
}

export default Group