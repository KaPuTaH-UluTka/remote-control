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
      let result;
      const [command, ...params] = data.split(' ');
      if (validCommands.includes(command)) {
        result = await drawHandler(command, params);
      } else {
        throw new Error(`${command} command not found`);
      }

      console.log(`Message: ${data}`);

      duplex.write(`${command} ${result}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      data = '';
    }
  };
};
