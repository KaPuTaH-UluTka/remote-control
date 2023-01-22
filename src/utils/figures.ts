import { Button, mouse, Point, straightTo } from '@nut-tree/nut-js';

export const circle = async (radius: number) => {
  const rad = 0.0175;

  const { x, y } = await mouse.getPosition();

  let angle = 0;
  let dx, dy;

  await mouse.pressButton(Button.LEFT);

  while (angle < 360) {
    dx = Math.round(Math.cos(++angle * rad) * radius * 10) / 10;
    dy = Math.round(Math.sin(angle * rad) * radius * 10) / 10;
    const point = new Point(x - radius + dx, y + dy);
    await mouse.move(straightTo(point));
  }

  await mouse.releaseButton(Button.LEFT);
};
