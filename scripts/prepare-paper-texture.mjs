import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Resize and compress the supplied photo; all visual treatment lives in CSS.
const source = fileURLToPath(new URL('../Texturelabs_Paper_373XL.jpg', import.meta.url));
const destination = new URL('../src/assets/', import.meta.url);
await mkdir(destination, { recursive: true });

for (const [width, quality] of [[1920, 82], [3840, 62]]) {
  const output = fileURLToPath(new URL(`paper-${width}.webp`, destination));
  const { size } = await sharp(source)
    .resize({ width })
    .webp({ quality, effort: 6 })
    .toFile(output);
  console.log(`paper-${width}.webp: ${Math.round(size / 1024)} KiB`);
}
