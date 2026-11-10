import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../public/ads/', import.meta.url));
const files = (await readdir(root)).filter((file) => file.endsWith('.svg'));
for (const file of files) {
  const source = join(root, file);
  const target = source.replace(/\.svg$/i, '.png');
  await sharp(source).png().toFile(target);
  console.log(target);
}
