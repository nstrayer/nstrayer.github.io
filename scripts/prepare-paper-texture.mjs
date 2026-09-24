import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Resize and compress the supplied photo; the rest of the visual treatment lives in CSS.
// The photo's large, cloudy tonal swings and darker edges read as smudges on a wide page,
// so divide each pixel by a heavily blurred copy of the image: what remains is the fine
// grain of the paper at an even tone. A little of the slow variation is kept so the sheet
// still looks like paper rather than a synthetic noise field.
const KEEP_LOW_FREQUENCY = 0.2;

const source = fileURLToPath(new URL('../Texturelabs_Paper_373XL.jpg', import.meta.url));
const destination = new URL('../src/assets/', import.meta.url);
await mkdir(destination, { recursive: true });

for (const [width, quality] of [[1920, 82], [3840, 62]]) {
  const { data, info } = await sharp(source)
    .resize({ width })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  // Sharp hands back three channels after the blur; keep one to match the source.
  const blurred = await sharp(data, { raw: info }).blur(width / 48).extractChannel(0).raw().toBuffer();

  let sum = 0;
  for (const value of data) sum += value;
  const mean = sum / data.length;

  const flattened = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i++) {
    const tone = mean + KEEP_LOW_FREQUENCY * (blurred[i] - mean);
    flattened[i] = Math.max(0, Math.min(255, Math.round((data[i] / Math.max(1, blurred[i])) * tone)));
  }

  const output = fileURLToPath(new URL(`paper-${width}.webp`, destination));
  const { size } = await sharp(flattened, { raw: info })
    .webp({ quality, effort: 6 })
    .toFile(output);
  console.log(`paper-${width}.webp: ${Math.round(size / 1024)} KiB`);
}
