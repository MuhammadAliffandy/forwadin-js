'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react"
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
import { User } from "next-auth";
import { DeviceData, DeviceSession } from "@/app/utils/types";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { fetchClient } from "@/app/utils/helper/fetchClient";
import { formatDate, getYearMonthDate } from "@/app/utils/helper";

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

const Analytic = ({ user, currentDevice, setcurrentDevice }) => {
    const [isDeviceLoaded, setisDeviceLoaded] = useState(false)
    const [deviceList, setdeviceList] = useState([])
    const [currentDeviceDetail, setcurrentDeviceDetail] = useState()
    const fetchDetailDevice = async () => {
        const result = await fetchClient({
            url: '/devices/' + currentDevice?.id,
            method: 'GET',
            user: user
        })
        if (result.status === 200) {
            const resultData = result.data
            console.log(resultData)
            setcurrentDeviceDetail(resultData)
        }
    }
    useEffect(() => {
        if (user?.token) {

        }
    }, [user?.token])
    useEffect(() => {
        if (user?.device) {
            setdeviceList(user.device)
            setcurrentDevice(user.device[0])
            setisDeviceLoaded(true)
        }
    }, [user?.device])
    useEffect(() => {
        if (currentDevice)
            fetchDetailDevice()
    }, [currentDevice])
    return (
        <>
            <div className='flex flex-col lg:flex-row gap-4 justify-between mt-4'>
                <div className='border border-black/20 rounded-md w-full lg:max-w-sm p-4'>
                    <p className='font-bold '>Ringkasan hari ini</p>
                    <div className='flex justify-between gap-4 mt-4 '>
                        <Dropdown isDisabled={!isDeviceLoaded}>
                            <DropdownTrigger className="p-3">
                                <div className="basis-2/3 bg-neutral-75 rounded-sm py-2 px-4 hover:cursor-pointer">
                                    <p className="text-[10px]">Device</p>
                                    <p className="font-bold min-w-0 whitespace-nowrap overflow-hidden overflow-ellipsis w-max text-sm">{currentDevice?.name}</p>

                                </div>
                            </DropdownTrigger>
                            <DropdownMenu items={deviceList} aria-label="device list">
                                {(item) => (
                                    <DropdownItem
                                        key={item.id}
                                        onClick={() => {
                                            setcurrentDevice(item)
                                        }}
                                    >
                                        <div className="flex gap-2">
                                            <p className="font-bold">{item.name}</p>
                                            <p>{item.phone}</p>
                                        </div>
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>

                        <div className='basis-1/3 bg-neutral-75 rounded-sm p-2 flex items-center'>
                            <div>

                                <p className='text-[10px]'>Aktif sejak</p>
                                <p className='text-sm font-bold'>{getYearMonthDate(currentDeviceDetail?.createdAt)}</p>
                            </div>
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

        </>
    )
}

export default Analytic