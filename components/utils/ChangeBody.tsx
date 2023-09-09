'use client'
import { useEffect } from 'react'
const ChangeBody = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        return () => {
            document.body.style.backgroundColor = '#F3F5F8'
        }
    }, [])
    return (<>
        {children}
    </>)
}

export default ChangeBody