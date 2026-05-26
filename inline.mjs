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

// Inline JS — wrap in a readyState guard so React only mounts after the DOM
// is fully parsed. Without this, Safari (and some other browsers) may run a
// synchronous inline script before getElementById('root') returns the element,
// causing React error #299 and a blank/black screen.
for (const f of readdirSync(assets).filter(f => f.endsWith('.js'))) {
  const js = readFileSync(join(assets, f), 'utf8')
  html = html.replace(`<script type="module" crossorigin src="./assets/${f}"></script>`, '')
  // If DOMContentLoaded has already fired (script at end of body), run immediately;
  // otherwise wait for it. This pattern works in all browsers back to IE9.
  const guard = `;(function(){function _r(){${js}}` +
    `if(document.readyState==='loading'){` +
    `document.addEventListener('DOMContentLoaded',_r);}else{_r();}})();`
  html = html.replace('</body>', () => `<script>${guard}</script>\n</body>`)
}

const out = join(dist, 'afresh-prototype.html')
writeFileSync(out, html)
console.log(`✓  Single file ready: ${out}`)
