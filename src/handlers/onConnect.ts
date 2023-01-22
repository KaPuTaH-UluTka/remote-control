import { IncomingMessage } from 'http';
import { ExtendedWebSocket } from '../types/types';
import { createWebSocketStream } from 'ws';
import { streamHandler } from './streamHandler';

export const onConnect = () => {
  return async (ws: ExtendedWebSocket, req: IncomingMessage) => {
    const user = `${req.socket.remoteAddress}:${req.socket.remotePort}`;
    console.log(`New connection: ${user}`);

    ws.on('close', () => {
      console.log(`User ${user} is out`);
    });

    ws.isExist = true;

    ws.on('pong', () => {
      ws.isExist = true;
    });

    const duplex = createWebSocketStream(ws, {
      encoding: 'utf8',
      decodeStrings: false,
    });

    duplex.on('readable', streamHandler(duplex));
  };
};
