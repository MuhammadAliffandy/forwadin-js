'use client'
import { useEffect, useState } from 'react'
import DashboardTemplate from '@/app/(dashboard)/DashboardTemplate'
import { usePathname } from 'next/navigation'
const Template = ({ children }: { children: React.ReactNode }) => {
    const [currentPage, setCurrentPage] = useState<string>('')
    const pathName = usePathname()
    useEffect(() => {
        if (pathName.includes('/dashboard/device'))
            setCurrentPage('Devices')
        else if (pathName.includes('/dashboard/contact'))
            setCurrentPage('Contact')
        else if (pathName.includes('/dashboard/group'))
            setCurrentPage('Groups')
        else if (pathName.includes('/dashboard/incoming'))
            setCurrentPage('Incoming Chat')
        else if (pathName.includes('/dashboard/outgoing'))
            setCurrentPage('Outgoing Chat')
        else if (pathName.includes('/dashboard/broadcast'))
            setCurrentPage('Broadcast')
        else if (pathName.includes('/dashboard/campaign'))
            setCurrentPage('Campaign')
        else if (pathName.includes('/dashboard/auto-reply'))
            setCurrentPage('Auto Reply')
        else if (pathName.includes('/dashboard/settings'))
            setCurrentPage('Settings')
        else if (pathName.includes('/dashboard'))
            setCurrentPage('Dashboard')

    }, [pathName])
    return (
        <>
            <DashboardTemplate currentPage={currentPage} >
                {children}
            </DashboardTemplate>
        </>
    )
}

export default Template