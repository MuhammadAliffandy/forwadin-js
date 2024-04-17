'use client';
import { DeviceData } from '@/app/utils/types';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { MoonLoader } from 'react-spinners';
import { fetchClient } from '@/app/utils/helper/fetchClient';
import { Session } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';
import { Socket, io } from "socket.io-client";
import { useSocket } from '@/app/SocketProvider';
import ModalTemplate from '@/app/components/template/ModalTemplate';
import { createSession } from '../../../../api/repository/sessionRepository'

const QRModal = ({ openModal, setopenModal, session, socket, refresh }) => {
    const [isLoaded, setisLoaded] = useState(false)
    const [qrData, setqrData] = useState('')
    const generateQR = async () => {

        const result = await createSession(session.customerService.token , {
            deviceId: session.customerService.deviceId,
        })

        console.log(result?.status)
        if (result && result.status === 200) {
            const resultData = result.data
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
            if (session.customerService) {
                console.log('masuk refresh')
                const refresh = await signIn('refresh', {
                    redirect: false,
                    user: JSON.stringify(session?.customerService)
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
            // refresh()
        }
    }, [])

    useEffect(() => {
        const channel = `device:${session.customerService.deviceId}:status`
        console.log(channel)
        if (socket) {
            socket.on(channel, (status) => {
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
                <div className='text-center font-bold text-2xl'>Verifikasi Device, {session?.customerService?.username || ''}</div>
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