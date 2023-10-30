'use client';
import { DeviceData } from '@/utils/types';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ModalTemplate from '../../template/ModalTemplate';
import { MoonLoader } from 'react-spinners';
import { fetchClient } from '@/utils/helper/fetchClient';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
interface QRModalProps {
    openModal: boolean,
    setopenModal: Dispatch<SetStateAction<boolean>>,
    data: DeviceData | undefined,
    session: Session | null,
    update: (data?: any) => Promise<Session | null>,
    refresh: () => void
}

const QRModal = ({ openModal, setopenModal, data, session, update, refresh }: QRModalProps) => {
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
            if (result && result.ok) {
                const resultData = await result.json()
                setqrData(resultData.qr)
                setisLoaded(true)
            } else {
                toast.error('Gagal generate QR')
                setisLoaded(true)
            }
        }
        generateQR()
        const checkScan = setInterval(async () => {
            if (session?.user?.device && data) {
                const device = session?.user?.device.find(obj => obj.id === data.id)
                console.log(device?.sessionId)
                console.log(session.user.token)

                const checkResult = await fetchClient({
                    method: 'GET',
                    url: '/sessions/' + device?.sessionId + '/status'
                })
                if (checkResult) {
                    const body = await checkResult.json()
                    console.log(body)
                    if (body.status === 'AUTHENTICATED') {
                        toast.success('Device berhasil terkoneksi')

                        clearInterval(checkScan)
                        setopenModal(false)
                    }
                }
            }
        }, 7000)
        const refreshSession = async () => {
            await signIn('refresh', {
                redirect: false,
                user: session?.user
            })
        }
        return () => {
            clearInterval(checkScan)
            refresh()
            refreshSession()
        }

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