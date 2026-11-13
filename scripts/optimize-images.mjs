// Converts the original photos in source-assets/ to optimised WebP files in
// src/assets/. Run with `npm run images` after replacing a photo.
import { mkdir, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'src', 'assets')

const images = [
  { source: 'portrait.jpg', target: 'portrait.webp', width: 900 },
  { source: 'graduation.jpg', target: 'graduation.webp', width: 900 },
]

await mkdir(outDir, { recursive: true })

for (const { source, target, width } of images) {
  const input = join(root, 'source-assets', source)
  const output = join(outDir, target)
  await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(output)
  const [before, after] = await Promise.all([stat(input), stat(output)])
  console.log(`${source} ${(before.size / 1024).toFixed(0)} kB -> ${target} ${(after.size / 1024).toFixed(0)} kB`)
}
