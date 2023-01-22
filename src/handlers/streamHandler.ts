import { drawHandler } from './drawHandler';
import { validCommands } from '../utils/commands';
import { Duplex } from 'stream';

export const streamHandler = (duplex: Duplex) => {
  let data = '';

  return async () => {
    try {
      let chunk;

      while (null !== (chunk = duplex.read())) {
        data += chunk;
      }

      const [command, ...params] = data.split(' ');
      console.log(command);
      if (validCommands.includes(command)) {
        await drawHandler(command, params);
      } else {
        throw new Error(`${command} command not found`);
      }

      console.log(`got a message: ${data}`);

      duplex.write(`${command}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      data = '';
    }
  };
};
