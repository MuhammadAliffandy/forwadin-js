'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { io as ClientIO } from 'socket.io-client'

const SocketContext = createContext({
    socket: null,
    isConnected: false
})
export const useSocket = () => {
    return useContext(SocketContext)
}
export const SocketProvider = ({ children }) => {
    const [socket, setsocket] = useState(null)
    const [isConnected, setisConnected] = useState(false)
    useEffect(() => {
        // console.log(process.env.NEXT_PUBLIC_BASE_URL)
        const socketInstance = new (ClientIO)(process.env.BASE_URL_DEV, {
            // path: '/',
            // addTrasockerilingSlash: false,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        })
        socketInstance.on("connect", () => {
            console.log(socketInstance.id)

            socketInstance.emit('message', 'Hello from client!');
            setisConnected(true)
        })

        socketInstance.on('statusUpdate', (data) => {
            console.log('Received status update:', data);
        });

        socketInstance.on('message', (message) => {
            console.log(`Received message from server: ${message}`);
        });
        socketInstance.on("disconnected", () => {
            console.log('socket disconnected')
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