'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import DashboardTemplate from './DashboardTemplate'
const Template = ({ children }: { children: React.ReactNode }) => {

    const [currentPage, setCurrentPage] = useState<string>('')
    const pathName = usePathname()!
    useEffect(() => {
        if (pathName.includes('/dashboard/settings'))
            setCurrentPage('Settings')
        else if (pathName.includes('/dashboard/messenger'))
            setCurrentPage('Messenger')
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