'use client';
import { DeviceData } from '@/utils/types';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ModalTemplate from '../../template/ModalTemplate';
import { MoonLoader } from 'react-spinners';
import { fetchClient } from '@/utils/helper/fetchClient';
import { Session } from 'next-auth';
interface QRModalProps {
    openModal: boolean,
    setopenModal: Dispatch<SetStateAction<boolean>>,
    data: DeviceData | undefined,
    session: Session | null,
    update: (data?: any) => Promise<Session | null>,
}

const QRModal = ({ openModal, setopenModal, data, session, update }: QRModalProps) => {
    const [isLoaded, setisLoaded] = useState(false)
    const [qrData, setqrData] = useState('')
    useEffect(() => {
        const generateQR = async () => {
            const result = await fetchClient({
                method: 'POST',
                body: JSON.stringify({
                    deviceId: data?.id,
                }),
                url: '/sessions/create'
            })
            const resultData = await result.json()
            console.log(resultData)
            if (result.status === 200) {
                // if device already in session
                if (session?.user?.device?.find(obj => obj.id === data?.id)) {
                    const newDeviceList = session.user.device.map(obj => obj.id === data?.id ? { ...obj, sessionId: resultData.sessionId } : obj)
                    await update({
                        ...session,
                        user: {
                            ...session?.user,
                            device: newDeviceList
                        }
                    })
                } else {
                    // If new
                    const currentDeviceList = session?.user?.device!
                    currentDeviceList.push({ id: data?.id as string, sessionId: resultData.sessionId })
                    await update({
                        ...session,
                        user: {
                            ...session?.user,
                            device: currentDeviceList
                        }
                    })
                }
                setqrData(resultData.qr)
                setisLoaded(true)

            } else {
                toast.error('Gagal generate QR')
                setisLoaded(true)
            }
        }
        generateQR()
    }, [])
    return (
        <>
            <ModalTemplate openModal={openModal} setopenModal={setopenModal} outsideClose={false}>
                <div className='text-center font-bold text-2xl'>Verifikasi Device, {data?.name ? data.name : ''}</div>
                <div className='bg-neutral-75 text-xs text-[#777C88] p-4 rounded-md mt-8'>
                    <ul className='list-disc list-inside'>
                        <li>Disarankan menggunakan WhatsApp Business</li>
                        <li>Pastikan WhatsApp Anda diperbarui ke versi terbaru.</li>
                        <li>Pastikan izin kamera diaktifkan untuk WhatsApp.</li>
                        <li>Pastikan kondisi pencahayaan yang memadai untuk pemindaian QR code.</li>
                        <li>Pastikan Anda terhubung ke internet.</li>
                    </ul>
                </div>
                <div className='font-bold text-center mt-4'>Scan qr kode di bawah ini menggunakan kamera HP</div>
                <div className='flex justify-center'>
                    {isLoaded ? (
                        <img src={qrData} alt="" />
                    ) : (
                        <MoonLoader color='#3366FF' className='my-20' />
                    )}
                </div>
            </ModalTemplate>
        </>

    )
}

export default QRModal