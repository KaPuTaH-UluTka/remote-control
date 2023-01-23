import { IncomingMessage } from 'http';
import { createWebSocketStream, WebSocket } from 'ws';
import { streamHandler } from './streamHandler';

export const onConnect = () => {
  return async (ws: WebSocket, req: IncomingMessage) => {
    const user = `${req.socket.remoteAddress}:${req.socket.remotePort}`;
    console.log(`New connection: ${user}`);

    const duplex = createWebSocketStream(ws, {
      encoding: 'utf8',
      decodeStrings: false,
    });

    duplex.on('readable', streamHandler(duplex));
  };
};
