import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const sharp = require('c:/p/BOTS/web/landing/node_modules/sharp');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const images = path.join(root, 'images');

await sharp(path.join(images, 'logo.png'))
  .resize(512, 512, { fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 78, effort: 6 })
  .toFile(path.join(images, 'logo.webp'));

await sharp(path.join(images, 'girl.png'))
  .resize(960, 1190, { fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 78, effort: 6 })
  .toFile(path.join(images, 'girl.webp'));

const ogPath = path.join(images, 'og-image.jpg');
for (const attempt of [
  { w: 1200, h: 630, quality: 52 },
  { w: 1200, h: 630, quality: 42 },
]) {
  await sharp(path.join(images, 'girl.png'))
    .resize(attempt.w, attempt.h, { fit: 'cover', position: 'top' })
    .jpeg({ quality: attempt.quality, mozjpeg: true })
    .toFile(ogPath);
  const size = fs.statSync(ogPath).size;
  console.log('og', attempt, size);
  if (size < 100 * 1024) break;
}

const icon512 = path.join(root, 'android-chrome-512x512.png');
fs.writeFileSync(
  icon512,
  await sharp(icon512)
    .resize(512, 512)
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true })
    .toBuffer()
);

for (const rel of ['images/logo.webp', 'images/girl.webp', 'images/og-image.jpg', 'android-chrome-512x512.png']) {
  console.log(rel, fs.statSync(path.join(root, rel)).size);
}
