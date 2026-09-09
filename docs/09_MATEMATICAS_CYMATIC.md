# 09 MATEMATICAS CYMATIC

> Documento base funcional del proyecto. 
> Las afirmaciones regulatorias deben validarse con asesoría especializada antes de producción.

## 1. Frecuencia Base
- Base: 432 Hz
- Formula: `f(n) = 432 * 2^(n/12)`
- Rango operativo: 28 Hz - 28 kHz

## 2. Geometría Chladni
- Placa: cuadrada / circular
- Modo: `m:n`
- Ecuación: `A(x,y) = sin(π·m·x) * sin(π·n·y)`

## 3. Motor
- WebGL + GLSL (gold shader)
- Input: audio / mic / oscilador
- Output: cymatic pattern + seal hash

## 4. Integridad
- Cada patrón genera SEALO_CALIDAD.json
- Validación: SHA3-256 + timestamp NOM-151 (cuando aplique)

## 5. Disclaimer
Este documento describe comportamiento funcional. No constituye asesoría legal, médica ni regulatoria.
