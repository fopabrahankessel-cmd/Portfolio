// Renders cv/cv.html to public/cv/Brahan-Kessel-Fopa-CV.pdf with a headless
// Chromium-based browser already installed on the machine (Edge or Chrome).
// Run with `npm run cv` after editing the CV.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'cv', 'cv.html')
const outDir = join(root, 'public', 'cv')
const output = join(outDir, 'Brahan-Kessel-Fopa-CV.pdf')

const candidates = [
  process.env.CV_BROWSER,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)

const browser = candidates.find((path) => existsSync(path))

if (!browser) {
  console.error(
    'No Chrome or Edge installation found. Install one, or set CV_BROWSER to the browser executable.',
  )
  process.exit(1)
}

mkdirSync(outDir, { recursive: true })

execFileSync(
  browser,
  [
    '--headless=new',
    '--disable-gpu',
    '--allow-file-access-from-files',
    '--no-pdf-header-footer',
    '--virtual-time-budget=5000',
    `--print-to-pdf=${output}`,
    pathToFileURL(source).href,
  ],
  { stdio: 'ignore' },
)

if (!existsSync(output)) {
  console.error('The browser ran but produced no PDF.')
  process.exit(1)
}

console.log(`CV written to ${output} (${(statSync(output).size / 1024).toFixed(0)} kB)`)
