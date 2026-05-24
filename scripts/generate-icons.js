const fs = require('fs')
const path = require('path')

function createSVG(size) {
  const rx = Math.round(size * 0.22)
  const fontSize = Math.round(size * 0.38)
  const cy = Math.round(size / 2 + fontSize * 0.36)
  return [
    '<svg xmlns="http://www.w3.org/2000/svg"',
    ' width="' + size + '" height="' + size + '"',
    ' viewBox="0 0 ' + size + ' ' + size + '">',
    '<defs>',
    '<linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">',
    '<stop offset="0%" stop-color="#A78BFA"/>',
    '<stop offset="100%" stop-color="#7C3AED"/>',
    '</linearGradient>',
    '</defs>',
    '<rect width="' + size + '" height="' + size + '"',
    ' rx="' + rx + '" ry="' + rx + '" fill="url(#g)"/>',
    '<text x="' + (size / 2) + '" y="' + cy + '"',
    ' font-family="Arial Black, sans-serif"',
    ' font-size="' + fontSize + '"',
    ' font-weight="900"',
    ' fill="white"',
    ' text-anchor="middle">T</text>',
    '</svg>'
  ].join('')
}

const publicDir = path.join(__dirname, '..', 'public')
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true })

fs.writeFileSync(path.join(publicDir, 'icon-192.svg'), createSVG(192))
fs.writeFileSync(path.join(publicDir, 'icon-512.svg'), createSVG(512))
fs.writeFileSync(path.join(publicDir, 'icon.svg'), createSVG(512))

console.log('SVG icons created successfully')
