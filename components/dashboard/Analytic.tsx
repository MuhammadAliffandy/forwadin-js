'use client'
import { useEffect, useState } from "react"
import MessageReceivedChart from "./chart/MessageReceivedChart"
import MessageHourChart from "./chart/MessageHourChart"
import zoomPlugin from 'chartjs-plugin-zoom';
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ArcElement
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    zoomPlugin,
    ArcElement
);

const Analytic = () => {
    const [deviceDropdown, setdeviceDropdown] = useState(false)
    return (
        <div className='mt-4 bg-white w-full rounded-md p-4 lg:p-8'>
            <p className='font-lexend text-2xl font-bold'>Analitik</p>
            <div className='flex flex-col lg:flex-row gap-4 justify-between mt-4'>
                <div className='border border-black/20 rounded-md w-full lg:max-w-sm p-4'>
                    <p className='font-bold '>Ringkasan hari ini</p>
                    <div className='flex justify-between gap-4 mt-4 '>
                        <div className='basis-2/3 bg-neutral-75 rounded-sm py-2 px-4 relative'>
                            <div className='flex justify-between hover:cursor-pointer' onClick={() => setdeviceDropdown(!deviceDropdown)}>
                                <div>
                                    <p className='text-[10px]'>Device</p>
                                    <p className='font-semibold text-sm mt-[-2px]'>SMX18</p>
                                </div>
                                <div className='flex items-center'>
                                    <img
                                        src={'/assets/icons/chevron-down.svg'}
                                        width={18}
                                        height={15}
                                        alt='caret down'
                                    />
                                    {/* <Image
                                        src={'/assets/icons/chevron-down.svg'}
                                        width={18}
                                        height={15}
                                        alt='caret down'
                                    /> */}
                                </div>
                            </div>
                            {deviceDropdown && (
                                <div className={'absolute flex flex-col items-center w-[80%] text-center'}>
                                    <div className='px-4 py-2 bg-white hover:bg-neutral-75 w-full hover:cursor-pointer'>
                                        Device Name
                                    </div>
                                    <div className='px-4 py-2 bg-white hover:bg-neutral-75 w-full hover:cursor-pointer'>
                                        Device Name
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='basis-1/3 bg-neutral-75 rounded-sm p-2'>
                            <p className='text-[10px]'>Aktif sejak</p>
                            <p className='text-sm font-semibold'>29.8.2022</p>
                        </div>
                    </div>
                    <div className='flex justify-between gap-4 mt-4 w-[90%] mx-auto'>
                        <div>
                            <p className='text-[10px]'>Pesan Keluar</p>
                            <p className='font-bold mt-[-2px]'>24</p>
                        </div>
                        <div>
                            <p className='text-[10px]'>Pesan Masuk</p>
                            <p className='font-bold mt-[-2px]'>24</p>
                        </div>
                        <div>
                            <p className='text-[10px]'>Pesan Gagal</p>
                            <p className='font-bold mt-[-2px]'>24</p>
                        </div>

                    </div>
                </div>
                <div className='grow border border-black/20 rounded-md w-full p-4 flex justify-between'>
                    <div className='basis-1/2 flex flex-col justify-between'>
                        <p className='font-bold'>Total statistik pesan</p>
                        <div className='flex flex-wrap w-2/3 gap-2'>
                            <div>
                                <p className='text-[10px]'>Total Pesan Keluar</p>
                                <p className='font-bold'>24</p>
                            </div>
                            <div>
                                <p className='text-[10px]'>Total Pesan Gagal</p>
                                <p className='font-bold'>8</p>
                            </div>
                            <div>
                                <p className='text-[10px]'>Total Pesan Masuk</p>
                                <p className='font-bold'>12</p>
                            </div>
                        </div>
                    </div>
                    <div className='basis-1/2  flex justify-end'>
                        <div className="w-[150px]">

                            <MessageReceivedChart />
                        </div>
                    </div>
                </div>
            </div>
            <div className="border border-black/20 rounded-md w-full p-4 mt-4">
                <div className="flex flex-wrap gap-4 w-full max-w-lg ">
                    <div className="bg-neutral-75 rounded-sm py-2 px-4 ">
                        <p className="text-[10px]">Hari ini</p>
                        <p className="font-bold">24</p>
                    </div>
                    <div className="bg-neutral-75 rounded-sm py-2 px-4 ">
                        <p className="text-[10px]">Rata-rata harian</p>
                        <p className="font-bold">7</p>
                    </div>
                    <div className="bg-neutral-75 rounded-sm py-2 px-4 ">
                        <p className="text-[10px]">Bulan ini</p>
                        <p className="font-bold">40</p>
                    </div>
                    <div className="bg-neutral-75 rounded-sm py-2 px-4 ">
                        <p className="text-[10px]">Rata-rata waktu</p>
                        <p className="font-bold">00:02:42</p>
                    </div>
                </div>
                <p className="font-lexend font-bold mt-12">Grafik chart perjam</p>
                <div className="w-full h-[250px] overflow-x-auto">
                    <MessageHourChart />
                </div>
                <p className="font-lexend font-bold mt-12">Trend interaksi pesan</p>
                <div className="w-full h-[250px] overflow-x-scroll">
                    <MessageHourChart />
                </div>
            </div>
        </div>
    )
}

export default Analytic