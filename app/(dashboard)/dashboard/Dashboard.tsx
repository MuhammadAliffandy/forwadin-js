'use client'
import Message from '@/components/dashboard/Message'
import Button from '@/components/landing/Button'
import Link from 'next/link'
import { Dropdown } from 'flowbite-react';
import Image from 'next/image';
import { useState } from 'react';
import Analytic from '@/components/dashboard/Analytic';
const Dashboard = () => {

    return (
        <>
            <div className='flex flex-col-reverse lg:flex-row lg:justify-between items-center'>
                <div>
                    <p className='font-lexend text-2xl font-bold'>Selamat Siang, User Name</p>
                </div>
                <div>
                    <div className='flex items-center gap-2'>
                        <div className='text-xs text-right flex flex-row lg:flex-col gap-2 lg:gap-0'>
                            <p className='text-[#B0B4C5]'>Tanggal hari ini</p>
                            <p className='text-[#777C88]'>Selasa, 29 Agustus 2019</p>
                        </div>
                        <div className='flex-none hidden lg:block'>
                            <img src="/assets/icons/dashboard/calendar.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-4 mt-8 flex-col xl:flex-row '>
                <div className='bg-white rounded-md px-4 lg:px-8 pt-8 pb-12 grow flex flex-col justify-between gap-2 relative'>
                    <Link href={'/dashboard'} className='whitespace-nowrap text-[#B0B4C5] text-sm absolute left-1/2 -translate-x-1/2 bottom-2'>Tampilkan kapasitas fitur lainnya</Link>
                    <div className='flex lg:flex-row flex-col justify-between w-full basis-1/3 items-end lg:items-center'>
                        <div className='flex justify-between w-full gap-10'>
                            <div>
                                <p>Paket <br /> saat ini</p>
                            </div>
                            <div className='flex gap-2 items-center flex-1 justify-end lg:justify-start'>
                                <p className='text-2xl font-bold font-lexend'>Trial</p>
                                <div className='bg-black rounded-full px-2 text-white text-[10px]'>free</div>
                            </div>
                        </div>
                        <div className='text-right whitespace-nowrap'>
                            <p className='font-normal text-[10px] text-[#777C88]'>Aktif sampai dengan</p>
                            <p className='font-nunito font-bold text-[12px]'>Selasa, 29 Agustus 2023</p>
                        </div>
                    </div>
                    <div className='flex lg:flex-row flex-col basis-2/3 gap-8'>
                        <div className='flex gap-8 flex-1'>
                            <div className='flex flex-col flex-none justify-around w-[60px]'>
                                <div>
                                    Devices
                                </div>
                                <div>Contacts</div>
                            </div>
                            <div className='flex flex-col justify-between flex-1 mt-4'>
                                <div className='max-w-[250px] gap-2 w-full'>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                                    </div>
                                    <p className='text-[#777C88] text-[10px]'>8 dari 10 device yang tersedia</p>
                                </div>
                                <div className='max-w-[250px] gap-2 w-full'>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                                    </div>
                                    <p className='text-[#777C88] text-[10px]'>20 dari 100 kontak yang tersedia</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 items-center '>
                            <div className='text-right hidden lg:block'>
                                <p className='font-nunito font-bold text-[12px]'>Upgrade paket untuk meningkatkan<br /> batasan fitur yang ada</p>
                            </div>
                            <Button text={'Upgrade Paket'} href={'/'} isPrimary={false} styles={'w-full max-w-sm'} />
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-md px-4 pt-4 pb-2 grow-0 w-full xl:max-w-sm flex flex-col justify-between'>
                    <p className='font-nunito font-bold text-[16px]'>Pesan terakhir</p>
                    <div className='flex flex-col gap-2 mt-2'>
                        <Message />
                        <Message />
                        <Message />
                    </div>
                    <div className=' flex items-end justify-center mt-2'>
                        <Link href={'/dashboard'} className=" text-primary">Tampilkan lainnya</Link>
                    </div>
                </div>
            </div>
            <Analytic />
        </>
    )
}

export default Dashboard
{/*
<div className='bg-white rounded-md px-4 lg:px-8 pt-8 pb-4 grow flex flex-col justify-between gap-4'>
<div className='flex flex-col lg:flex-row lg:justify-between lg:items-center'>
                        <div className='flex justify-between gap-12'>
                            <p className='text-xs w-[50px]'>Paket <br /> saat ini</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-2xl font-bold font-lexend'>Trial</p>
                                <div className='bg-black rounded-full px-2 text-white text-[10px]'>free</div>
                            </div>
                        </div>
                        <div className='text-right'>
                            <p className='font-normal text-[10px] text-[#777C88]'>Aktif sampai dengan</p>
                            <p className='font-nunito font-bold text-[12px]'>Selasa, 29 Agustus 2023</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex grow'>
                            <p className='text-xs w-[50px] '>Devices</p>
                            <div className=' gap-2 w-full max-w-[350px] ml-12'>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                                </div>
                                <p className='text-[#777C88] text-[10px]'>8 dari 10 device yang tersedia</p>
                            </div>
                        </div>
                        <div className='text-right hidden lg:block'>
                            <p className='font-nunito font-bold text-[12px]'>Upgrade paket untuk meningkatkan<br /> batasan fitur yang ada</p>
                        </div>
                    </div>
                    <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center'>
                        <div className='flex grow'>
                            <p className='text-xs w-[50px] '>Contacts</p>
                            <div className='ml-12 gap-2 w-full max-w-[350px]'>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                                </div>
                                <p className='text-[#777C88] text-[10px]'>8 dari 10 device yang tersedia</p>
                            </div>
                        </div>
                        <div className='flex justify-center lg:justify-normal mt-4 lg:mt-0 lg:items-end'>
                            <div className='flex-none'>
                                <Button text={'Upgrade Paket'} href={'/'} isPrimary={false} />
                            </div>
                        </div>
                    </div>
                    <div className=' flex items-end justify-center mt-2'>
                        <Link href={'/dashboard'} className='text-[#B0B4C5] text-sm '>Tampilkan kapasitas fitur lainnya</Link>
                    </div> */}