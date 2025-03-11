import { useEffect, useState } from "react"
import socketIOClient from "socket.io-client"
import type { Socket } from "socket.io-client"

const SOCKET_URL = "http://localhost:4000"

export const useSocket = () => {
    const [socket, setSocket] = useState<typeof Socket | null>(null)

    useEffect(() => {
        const socketInstance = socketIOClient(SOCKET_URL)
        setSocket(socketInstance)
        
        return () => {
            socketInstance.disconnect()
        }
    }, [])

    return socket
}
