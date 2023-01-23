import { mouse, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';

export const printScreen = async () => {
  const { x, y } = await mouse.getPosition();
  const left = x - 100;
  const top = y - 100;
  const width = 200;
  const height = 200;
  const region = new Region(left, top, width, height);

  const screenshot = await (await screen.grabRegion(region)).toRGB();

  const jimp = new Jimp({
    data: screenshot.data,
    width: screenshot.width,
    height: screenshot.height,
  });

  const buffer = await jimp.getBufferAsync(Jimp.MIME_PNG);
  const base64 = buffer.toString('base64');

  console.log(`Screenshot on position ${region}`);

  return base64;
};
