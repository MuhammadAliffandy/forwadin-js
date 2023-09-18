'use client'
import { useEffect, useState } from 'react'
import DashboardTemplate from '@/app/(dashboard)/DashboardTemplate'
import { usePathname } from 'next/navigation'
const Template = ({ children }: { children: React.ReactNode }) => {
    const [currentPage, setCurrentPage] = useState<string>('')
    const pathName = usePathname()
    useEffect(() => {
        switch (pathName) {
            case '/dashboard':
                setCurrentPage('Dashboard')
                break;
            case '/dashboard/device':
                setCurrentPage('Devices')
                break;
            case '/dashboard/contact':
                setCurrentPage('Contacts')
                break;
            case '/dashboard/group':
                setCurrentPage('Groups')
                break;
            case '/dashboard/incoming':
                setCurrentPage('Incoming Chat')
                break;
            case '/dashboard/outgoing':
                setCurrentPage('Outgoing Chat')
                break;
            case '/dashboard/broadcast':
                setCurrentPage('Broadcast')
                break;
            case '/dashboard/campaign':
                setCurrentPage('Campaign')
                break;
            case '/dashboard/auto-reply':
                setCurrentPage('Auto Reply')
                break;
            case '/dashboard/settings':
                setCurrentPage('Settings')
                break;
            default:
                break;
        }
        if (pathName.includes('/dashboard/device'))
            setCurrentPage('Devices')
    }, [pathName])
    return (
        <>
            {/* Side Nav */}
            <DashboardTemplate currentPage={currentPage} >
                {children}
            </DashboardTemplate>
        </>
    )
}

export default Template