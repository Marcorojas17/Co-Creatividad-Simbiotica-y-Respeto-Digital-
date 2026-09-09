#!/usr/bin/env node

/**
 * KRONOS-28-ITZA-CYMATIC-ELITE — Generador de iconos PWA
 * @author Marco Antonio Rojas Valdovinos
 * @version 0.4.0 — B+ SUPER
 * @date 2026-09-09
 * 
 * Uso: node scripts/generate-icons.js
 * Genera icon-192.png y icon-512.png en la raíz del proyecto
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directorio de salida (raíz del proyecto)
const OUTPUT_DIR = './';

// Tamaños requeridos por el manifest
const SIZES = [192, 512];

// SVG base con el diseño gold ◍
const svgTemplate = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#070708" />
  <text x="50%" y="48%" font-family="Georgia, 'Times New Roman', serif" font-size="${size * 0.55}" fill="#d4af37" text-anchor="middle" dy=".35em">◍</text>
  <text x="50%" y="80%" font-family="ui-monospace, monospace" font-size="${size * 0.07}" fill="#9a9a9a" text-anchor="middle" letter-spacing="4">KRONOS</text>
</svg>
`;

// Asegurar que el directorio de salida existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Función para generar un icono
async function generateIcon(size) {
  const svg = svgTemplate(size);
  const filename = `icon-${size}.png`;
  try {
    await sharp(Buffer.from(svg))
      .resize(size, size, { fit: 'contain', background: { r: 7, g: 7, b: 8 } })
      .png()
      .toFile(path.join(OUTPUT_DIR, filename));
    console.log(`✅ ${filename} (${size}x${size}) generado en raíz.`);
  } catch (err) {
    console.error(`❌ Error generando ${filename}:`, err.message);
  }
}

(async () => {
  console.log('◍ KRONOS — Generando iconos PWA...\n');
  for (const size of SIZES) {
    await generateIcon(size);
  }
  console.log('\n✨ Iconos generados correctamente en la raíz.');
  console.log('📁 Ubicación: ./icon-192.png y ./icon-512.png');
})();
