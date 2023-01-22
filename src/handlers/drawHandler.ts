import { down, left, mouse, right, up } from '@nut-tree/nut-js';
import { validCommands } from '../utils/commands';

export const drawHandler = async (command: string, params: string[]) => {
  const [first, second] = params.map(Number);

  if (command === validCommands[0]) {
    if (second) {
      return mouse.move(up(second));
    } else {
      return mouse.move(up(first));
    }
  } else if (command === validCommands[1]) {
    if (second) {
      return mouse.move(down(second));
    } else {
      return mouse.move(down(first));
    }
  } else if (command === validCommands[2]) {
    return mouse.move(left(first));
  } else if (command === validCommands[3]) {
    return mouse.move(right(first));
  } else if (command === validCommands[4]) {
    const { x, y } = await mouse.getPosition();
    return `{${x},${y}`;
  }
};
