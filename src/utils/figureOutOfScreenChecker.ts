import { mouse, screen } from '@nut-tree/nut-js';

export const rectangleChecker = async (width: number, length: number) => {
  const { x, y } = await mouse.getPosition();

  const screenWidth = await screen.width();
  const screenHeight = await screen.height();

  const mouseWillOutOfScreen = x + width > screenWidth || y + length > screenHeight;

  if (mouseWillOutOfScreen) {
    throw new Error('figure_out_of_screen');
  }
};

export const circleChecker = async (radius: number) => {
  const { x, y } = await mouse.getPosition();

  const screenWidth = await screen.width();
  const screenHeight = await screen.height();

  const mouseWillOutOfScreen =
    x - radius < 0 || y - radius < 0 || x + 2 * radius > screenWidth || y + radius > screenHeight;

  if (mouseWillOutOfScreen) {
    throw new Error('figure_out_of_screen');
  }
};
