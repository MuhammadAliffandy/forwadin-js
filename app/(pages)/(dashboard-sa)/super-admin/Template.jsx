'use client'
import { useEffect, useState } from 'react'
import DashboardTemplate from '@/app/(pages)/(dashboard-sa)/super-admin/DashboardTemplate'
import { usePathname } from 'next/navigation'
const Template = ({ children }) => {

    const [currentPage, setCurrentPage] = useState('')
    const pathName = usePathname()
    useEffect(() => {
        if (pathName.includes('/super-admin/dashboard'))
            setCurrentPage('Dashboard')
        else if (pathName.includes('/super-admin/dashboard/user'))
            setCurrentPage('User')
        else if (pathName.includes('/super-admin/dashboard/subscription'))
            setCurrentPage('Subscription')

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