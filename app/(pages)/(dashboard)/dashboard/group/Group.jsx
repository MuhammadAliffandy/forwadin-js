'use client'
import { useState } from "react"
import GroupTable from "./GroupTable"

const Group = () => {
    const [countGroup, setcountGroup] = useState(0)
    return (
        <>
            <div className="flex gap-2 lg:justify-start justify-center items-center mt-2 lg:mt-0 w-full">
                <p className='font-lexend text-2xl font-bold'>Groups</p>
                <div>
                    <div className="flex-none bg-black rounded-full text-white text-[10px] font-regular h-4 w-4 flex items-center justify-center">
                        <p>{countGroup}</p>
                    </div>
                </div>
            </div>
            <GroupTable setcountGroup={setcountGroup} />
        </>
    )
}

export default Group