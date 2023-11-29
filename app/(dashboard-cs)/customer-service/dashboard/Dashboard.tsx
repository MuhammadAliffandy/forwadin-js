'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"

const Dashboard = () => {
    const { data: session } = useSession()
    useEffect(() => {
        console.log(session?.customerService)

    }, [session])

    return (
        <>
            <div>Halo, {JSON.stringify(session)}</div>
        </>
    )
}

export default Dashboard