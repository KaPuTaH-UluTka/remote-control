import * as dotenv from 'dotenv'
import {resolve} from 'path';
import {cwd} from 'process'
import  { WebSocketServer } from 'ws';
import {httpServer} from "./http_server";

dotenv.config({ path: resolve(cwd(), '.env') })

const HTTP_PORT = Number(process.env.HTTP_PORT) || 3000
const WS_PORT = Number(process.env.WSS_PORT) || 4000

httpServer.listen(HTTP_PORT).on('listening', () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`)
})

const wsServer = new WebSocketServer({port: WS_PORT})
const onConnect = () => {

}

wsServer.on('connection', onConnect);


