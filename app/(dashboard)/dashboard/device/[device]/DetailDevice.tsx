'use client'
import MultipleInputLabel from "@/components/dashboard/MultipleInputLabel"

import React, { useEffect, useState } from "react"
const DetailDevice = ({ device }: { device: string }) => {

    const [labelList, setlabelList] = useState([
        { name: 'asd', active: true },
        { name: 'asd2', active: true },
        { name: 'asd3', active: true },
        { name: 'asd4', active: false }
    ])

    useEffect(() => {

    }, [])
    return (
        <>
            <div className='mt-8 flex flex-col lg:flex-row justify-center lg:justify-between gap-4'>
                <div className='bg-white rounded-md w-full max-w-md p-4 mx-auto'>
                    <p className='font-lexend text-2xl font-bold '>Device Detail</p>
                    <p className='mt-8'>Nama Device</p>
                    <input type="text" name='inputText' className='rounded-md border border-customGray text-sm w-full py-3 px-4 mt-4' defaultValue={device} />
                    <p className='mt-8'>Labels</p>
                    <MultipleInputLabel labelList={labelList} setlabelList={setlabelList} />
                    <p className='mt-8'>API Key</p>
                    <div className='w-full px-4 py-3 bg-neutral-75 rounded-md break-words mt-4 text-[#777C88]'>
                        6ncnNW1vR7CVgypJrYPNKmrKhml79lL6nuGR5zvDEF4dWb4R54Mhu3MMLMW8hgqc
                    </div>
                    <div className='px-4 py-3 text-center border border-black/50 rounded-md mt-4'>Generate API key baru</div>
                    <div className='mt-8 bg-primary rounded-md text-white border border-primary px-4 py-3 text-center'>Simpan perubahan</div>
                    <div className='mt-4 bg-white rounded-md text-danger border border-black/50 px-4 py-3 text-center'>Hapus</div>
                </div>
                <div className='bg-white rounded-md w-full max-w-md lg:max-w-none mx-auto p-4 flex flex-col gap-4'>
                    <p className='font-lexend text-2xl font-bold '>Logging</p>
                    <div className='bg-neutral-75 rounded-md h-full text-[#777C88] p-4'>
                        <ul className='list-inside list-disc'>
                            <li >Device berhasil terkoneksi [15 Jun 2023 22:36:29]</li>
                            <li className='mt-2'>Device berhasil terkoneksi [15 Jun 2023 22:36:29]</li>
                            <li className='mt-2'>Device berhasil terkoneksi [15 Jun 2023 22:36:29]</li>
                            <li className='mt-2'>Device berhasil terkoneksi [15 Jun 2023 22:36:29]</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailDevice