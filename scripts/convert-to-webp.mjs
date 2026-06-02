import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const targetDir = 'public/images/works';

const entries = await readdir(targetDir);
const pngFiles = entries.filter((f) => extname(f).toLowerCase() === '.png');

for (const file of pngFiles) {
  const src = join(targetDir, file);
  const dst = join(targetDir, basename(file, '.png') + '.webp');

  const srcSize = (await stat(src)).size;
  await sharp(src).webp({ quality: 82, effort: 6 }).toFile(dst);
  const dstSize = (await stat(dst)).size;

  const reduction = (((srcSize - dstSize) / srcSize) * 100).toFixed(1);
  console.log(
    `${file} (${(srcSize / 1024).toFixed(1)} KB) -> ${basename(dst)} (${(dstSize / 1024).toFixed(1)} KB)  -${reduction}%`,
  );

  await unlink(src);
}

console.log(`\nDone. Converted ${pngFiles.length} files. Original PNGs removed.`);
