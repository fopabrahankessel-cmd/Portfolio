// Generates the favicons and the social preview image in public/:
//   favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png (from favicon.svg)
//   og-image.png (1200x630, from scripts/og-image.html, rendered by Chrome or Edge)
// Run with `npm run brand` after changing the logo, the photo or the template.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')
const svg = readFileSync(join(pub, 'favicon.svg'))

const png = (size) =>
  sharp(svg, { density: 72 * (size / 64) * 2 })
    .resize(size, size)
    .png()

await png(180).toFile(join(pub, 'apple-touch-icon.png'))
await png(192).toFile(join(pub, 'icon-192.png'))
await png(512).toFile(join(pub, 'icon-512.png'))

// A .ico file holding a single 32x32 PNG, for crawlers that only ask for /favicon.ico.
const ico32 = await png(32).toBuffer()
const header = Buffer.alloc(22)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(1, 4) // one image
header.writeUInt8(32, 6) // width
header.writeUInt8(32, 7) // height
header.writeUInt16LE(1, 10) // colour planes
header.writeUInt16LE(32, 12) // bits per pixel
header.writeUInt32LE(ico32.length, 14)
header.writeUInt32LE(22, 18) // image data offset
writeFileSync(join(pub, 'favicon.ico'), Buffer.concat([header, ico32]))

const candidates = [
  process.env.CV_BROWSER,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)
const browser = candidates.find((path) => existsSync(path))
if (!browser) {
  console.error('Icons written. No Chrome or Edge found, so og-image.png was not rendered.')
  process.exit(1)
}

const raw = join(pub, 'og-image.raw.png')
execFileSync(
  browser,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    '--virtual-time-budget=5000',
    `--screenshot=${raw}`,
    pathToFileURL(join(root, 'scripts', 'og-image.html')).href,
  ],
  { stdio: 'ignore' },
)
const og = join(pub, 'og-image.png')
await sharp(raw).resize(1200, 630, { position: 'top' }).png({ compressionLevel: 9 }).toFile(og)
rmSync(raw)

console.log(`Icons and og-image.png written (${(statSync(og).size / 1024).toFixed(0)} kB)`)
