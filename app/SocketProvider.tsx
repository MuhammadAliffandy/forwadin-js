'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { io as ClientIO } from 'socket.io-client'
type SocketContextType = {
    socket: any | null,
    isConnected: boolean
}
const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false
})
export const useSocket = () => {
    return useContext(SocketContext)
}
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setsocket] = useState(null)
    const [isConnected, setisConnected] = useState(false)
    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_BASE_URL)
        const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: '/api/socket/io',
            addTrailingSlash: false,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        })
        socketInstance.on("connect", () => {
            setisConnected(true)
        })
        socketInstance.on("disconnected", () => {
            setisConnected(false)
        })
        setsocket(socketInstance)
        return () => {
            socketInstance.disconnect()
        }
    }, [])
    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}