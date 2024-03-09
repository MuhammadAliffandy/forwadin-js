const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');

class SocketServer extends HTTPServer {
    constructor() {
        super();
        this.io = undefined;
    }
}


class SocketWithIO extends NetSocket {
    constructor(server) {
        super();
        this.server = server;
    }
}

class NextApiResponseWithSocket extends NextApiResponse {
    constructor(socket) {
        super();
        this.socket = socket;
    }
}


module.exports = {
    SocketServer,
    SocketWithIO,
    NextApiResponseWithSocket
};
