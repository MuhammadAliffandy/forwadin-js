'use client'
import { fetchClient } from '@/utils/helper/fetchClient'
import { BroadcastData } from '@/utils/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import EditBroadcast from './EditBroadcast'

const EditBroadcastPage = ({ broadcastId }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [broadcastData, setbroadcastData] = useState()
    const fetchBroadcastData = async () => {
        const result = await fetchClient({
            url: '/broadcasts/' + broadcastId,
            method: 'GET',
            user: session?.user
        })
        if (result?.ok) {
            const resultData = await result.json()
            setbroadcastData(resultData)
            console.log(resultData)
        } else if (result?.status === 404) {
            toast.error('Broadcast Tidak ditemukan')
            router.push('/dashboard/broadcast')
        } else {
            toast.error('Server Error')

        }
    }
    useEffect(() => {
        if (session?.user?.token && !broadcastData) {
            fetchBroadcastData()
        }
    }, [session?.user?.token])
    return (
        <>
            <div className='flex'>
                <p onClick={() => router.back()} className='rounded-md py-3 px-4 border border-black/50 text-black/50'>Kembali</p>
            </div>
            <p className='text-lexend font-bold text-2xl mt-4'>Buat Broadcast Baru</p>
            {broadcastData &&
                <EditBroadcast broadcastData={broadcastData} />
            }
        </>
    )
}

export default EditBroadcastPage