import { NextApiResponseWithSocket } from "@/utils/socketTypes";
import { Server as NetServer } from "http";
import { NextRequest } from "next/server";
import { Server as ServerIO } from 'Socket.IO'

export const config = {
    api: {
        bodyParser: false
    }
}

const ioHandler = (req: NextRequest, res: NextApiResponseWithSocket) => {
    if (!res.socket.server.io) {
        const path = "/api/socket/io"
        const httpServer: NetServer = res.socket.server
        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false,

        })
        res.socket.server.io = io
        console.log('Server Connect')
    }

    console.log('Server End')
    res.end()
}
export default ioHandler