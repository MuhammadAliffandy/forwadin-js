'use client';
import { DeviceData } from '@/utils/types';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ModalTemplate from './ModalTemplate';
interface QRModalProps {
    openModal: boolean,
    setopenModal: Dispatch<SetStateAction<boolean>>,
    data: DeviceData | undefined
}

const QRModal = ({ openModal, setopenModal, data }: QRModalProps) => {
    const [isLoaded, setisLoaded] = useState(false)
    const qrData = {
        qr: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARQAAAEUCAYAAADqcMl5AAAAAklEQVR4AewaftIAABIOSURBVO3BQY4YybLgQDJR978yR7vxVQCJjJL6fbiZ/cFaa13wsNZalzystdYlD2utdcnDWmtd8rDWWpc8rLXWJQ9rrXXJw1prXfKw1lqXPKy11iUPa611ycNaa13ysNZalzystdYlD2utdckPH6n8TRWTyknFpDJVvKEyVZyoTBUnKlPFb1L5omJSmSomlaliUpkqJpUvKr5QmSreUDmpmFT+poovHtZa65KHtda65GGttS754bKKm1RuqnhD5SaVqWKqOFGZKk5UpoovKiaVE5Wp4qRiUpkqJpU3VKaKSeUNlaniN1XcpHLTw1prXfKw1lqXPKy11iU//DKVNyreqDhROak4qZhUJpWbVKaKN1SmikllqviiYlKZKiaVk4oTlS8q3qh4Q+VvUnmj4jc9rLXWJQ9rrXXJw1prXfLD/ziVk4oTlanipOJEZao4UfmbKiaVk4ovVG6q+EJlqjhRualiUvm/5GGttS55WGutSx7WWuuSH/7HVUwqk8obKm9UnKicVHyhMlWcqLyh8psqJpWp4guVqeKmihOVSWWq+L/kYa21LnlYa61LHtZa65IfflnF31RxonJSMalMFScVk8qJylQxqZxUvFExqUwVb6hMFZPKVDGpvKEyVZxUTConFZPKicobFTdV/Jc8rLXWJQ9rrXXJw1prXfLDZSp/k8pUMalMFZPKFypTxUnFpPJGxaQyVUwqU8UbKlPFb6qYVKaKSWWqmFSmiknljYpJZaqYVE5UpooTlf+yh7XWuuRhrbUueVhrrUvsD/6HqZxUTCpvVEwqJxWTylQxqUwVJypvVEwqJxVvqJxUfKHymypOVE4q1v/3sNZalzystdYlD2utdckPH6lMFZPKScWk8kbFicpUMamcqPxNKlPFScVNKl9UTConFZPKScWkclLxhsp/icpUcaIyVUwqJxVfPKy11iUPa611ycNaa13yw2UqU8WkclLxhspU8UbFFyqTylTxRsWkMlVMKlPFpDJVTCq/qeJE5aRiUnlD5Y2KE5VJ5aTiDZUvKk4qJpWbHtZa65KHtda65GGttS754aOKE5WpYlJ5o+KNiv/LKt5QmSpOVKaKSeW/rGJSOVGZKr5QmSreqJhUTiomlaliqrjpYa21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"
    }
    useEffect(() => {
        if (openModal) {
            toast.success('QR Generated!')
        }
    }, [openModal])
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
                    <img src={qrData.qr} alt="" />
                </div>
            </ModalTemplate>
        </>

    )
}

export default QRModal