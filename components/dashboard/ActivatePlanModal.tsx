'use client'

import { fetchClient } from "@/utils/helper/fetchClient"
import { Button, Link } from "@nextui-org/react"
import { User } from "next-auth"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

const ActivatePlanModal = ({ user }: { user: User }) => {
    const [isLoading, setisLoading] = useState(false)
    const router = useRouter()
    const handleClick = async () => {
        setisLoading(true)
        const result = await fetchClient({
            url: '/payment/trial',
            method: 'POST',
        })
        if (result) {
            if (result.ok) {
                const refresh = await signIn('refresh', {
                    redirect: false,
                    user: JSON.stringify(user)
                })
                if (!refresh?.error) {
                    router.refresh()
                } else {
                    toast.error('Gagal refresh')
                    console.log(refresh.error)
                }
            } else if (result.status === 403) {
                toast.error('User sudah trial')
            }
        }
        setisLoading(false)
    }
    return (
        <div className={'fixed z-20 h-full w-full inset-0 top-0 left-0'}>
            <div className='w-full h-full bg-black/40 top-0 absolute'></div>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md w-full max-w-md '>
                <p className="font-bold text-base">Aktifkan paket Starter sekarang?</p>
                <p className="text-xs text-customNeutral mt-2">Paket starter selama 14 hari</p>
                <p className="text-xs mt-4">Ketika Anda memutuskan untuk melanjutkan, masa aktif paket starter akan dimulai.</p>
                <div className="flex gap-4 mt-4">
                    <Button onClick={handleClick} isLoading={isLoading} color="primary" className="rounded-md" fullWidth>
                        Aktifkan Paket
                    </Button>
                    <Button as={Link} href="/subscription" color="default" variant="bordered" className="rounded-md border-2" fullWidth>
                        Paket Lainnya
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ActivatePlanModal