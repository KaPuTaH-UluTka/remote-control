import { drawHandler } from './drawHandler';
import { validCommands } from '../utils/commands';
import { Duplex } from 'stream';
import { log } from 'util';

export const streamHandler = (duplex: Duplex) => {
  let data = '';

  return async () => {
    try {
      let chunk;

      while (null !== (chunk = duplex.read())) {
        data += chunk;
      }
      let result;
      const [command, ...params] = data.split(' ');
      if (validCommands.includes(command)) {
        result = await drawHandler(command, params);
      } else {
        throw new Error(`${command} command not found`);
      }
      const [x, y] = params.map(Number);

      console.log(`Message: ${data}`);
      if (result) {
        duplex.write(`${command} ${result}`);
      } else {
        y ? duplex.write(`${command}\t${x}\t${y}`) : duplex.write(`${command}\t${x}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      data = '';
    }
  };
};
