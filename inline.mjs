// Reads the Vite build output and inlines all JS/CSS into a single HTML file.
// Using a function replacer avoids the $& / $' special-char bug in minified JS.
// Run: node inline.mjs
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'

const dist   = 'dist'
const assets = join(dist, 'assets')

let html = readFileSync(join(dist, 'index.html'), 'utf8')

// Inline CSS
for (const f of readdirSync(assets).filter(f => f.endsWith('.css'))) {
  const css = readFileSync(join(assets, f), 'utf8')
  html = html.replace(
    `<link rel="stylesheet" crossorigin href="./assets/${f}">`,
    () => `<style>${css}</style>`
  )
}

// Inline JS — remove from <head>, inject before </body> so #root already
// exists in the DOM when the script runs synchronously. No wrapper needed:
// the script tag position guarantees DOM order.
for (const f of readdirSync(assets).filter(f => f.endsWith('.js'))) {
  const js = readFileSync(join(assets, f), 'utf8')
  html = html.replace(`<script type="module" crossorigin src="./assets/${f}"></script>`, '')
  html = html.replace('</body>', () => `<script>${js}</script>\n</body>`)
}

const out = join(dist, 'afresh-prototype.html')
writeFileSync(out, html)
console.log(`✓  Single file ready: ${out}`)
