import { NextApiResponseWithSocket } from "@/utils/socketTypes"
import { NextRequest } from "next/server"

const handler = async (req: NextRequest, res: NextApiResponseWithSocket) => {
    if (req.method !== "POST") {
        res.status(405).json({ error: 'Method not allowed' })
    }
    try {
        const body: any = req.body
        if (res.socket.server.io) {
            const channel = `device:${body.deviceId}:status`
            // res.socket.server.io.emit(channel, body.status)
            res.socket.server.io.emit(channel, body.status)
            res.status(200).json({ message: 'Success' })
        }
        res.status(500).json({ message: 'No socket is connected' })
    } catch (error) {
        console.log("[DEVICE]", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
export default handler