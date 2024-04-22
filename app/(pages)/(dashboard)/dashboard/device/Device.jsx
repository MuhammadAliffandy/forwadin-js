'use client'
import { useState } from "react"
import DeviceTable from "./DeviceTable"

const Device = () => {
    const [countDevice, setcountDevice] = useState(0)
    return (
        <>
            <div className="flex gap-2 lg:justify-start justify-center items-center mt-2 lg:mt-0 w-full">
                <p className='font-lexend text-2xl font-bold'>All device</p>
                <div>
                    <div className="flex-none bg-black rounded-full text-white text-[10px] font-regular h-4 w-4 flex items-center justify-center">
                        <p>{countDevice}</p>
                    </div>
                </div>
            </div>

            {countDevice > 0 && (
                <div className='border-2 border-danger rounded-md px-4 py-3 flex justify-between mt-4'>
                    <div className='flex gap-4 items-center'>
                        <div className='flex-none'>
                            <img src="/assets/icons/dashboard/assignment_late.svg" alt="" />
                        </div>
                        <p className='font-bold text-md'>Tekan tombol Scan QR untuk mengkoneksikan device Anda dan membuka fitur-fitur yang ada</p>
                    </div>
                </div>
            )}

            <DeviceTable setcountDevice={setcountDevice} />
        </>
    )
}

export default Device