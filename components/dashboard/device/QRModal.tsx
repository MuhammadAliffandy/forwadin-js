'use client';
import { DeviceData } from '@/utils/types';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ModalTemplate from '../../template/ModalTemplate';
import { MoonLoader } from 'react-spinners';
import { fetchClient } from '@/utils/helper/fetchClient';
import { Session } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';
import { Socket, io } from "socket.io-client";
import { useSocket } from '@/app/SocketProvider';
interface QRModalProps {
    openModal: boolean,
    setopenModal: Dispatch<SetStateAction<boolean>>,
    data: DeviceData | undefined,
    session: Session | null,
    socket: Socket | null,
    refresh: () => void
}
const QRModal = ({ openModal, setopenModal, data, session, socket, refresh }: QRModalProps) => {
    const [isLoaded, setisLoaded] = useState(false)
    const [qrData, setqrData] = useState('')
    const generateQR = async () => {
        const result = await fetchClient({
            method: 'POST',
            body: JSON.stringify({
                deviceId: data?.id,
            }),
            url: '/sessions/create',
            user: session?.user

        })
        console.log(result?.status)
        if (result && result.ok) {
            const resultData = await result.json()
            setqrData(resultData.qr)
            setisLoaded(true)
        } else {
            toast.error('Gagal generate QR')
            setisLoaded(true)
        }
    }
    useEffect(() => {

        generateQR()

        const refreshSession = async () => {
            if (session?.user) {
                console.log('masuk refresh')
                const refresh = await signIn('refresh', {
                    redirect: false,
                    user: JSON.stringify(session?.user)
                })
                if (refresh?.error) {
                    toast.error('gagal update session')
                    console.log(refresh.error)
                } else {
                    console.log('sukses refresh')

                }
            }
        }
        return () => {
            console.log('close modal')
            refreshSession()
            refresh()
        }
    }, [])

    useEffect(() => {
        const channel = `device:${data?.id}:status`
        console.log(channel)
        if (socket) {
            socket.on(channel, (status: string) => {
                console.log(status)
                if (status === 'open') {
                    toast.success('Connected!')
                    setopenModal(false)
                }
                if (status === 'connecting') {
                    toast.info('Connecting...')
                }
            })
        }
        return () => {
            socket?.off(channel)
        }
    }, [socket])
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