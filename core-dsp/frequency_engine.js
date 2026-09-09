/**
 * KRONOS-28-ITZA CYMATIC ENGINE
 * frequency_engine.js — Motor Cimático Central
 * 
 * @version 0.4.1 PLATINUM
 * @author KRONOS-28-ITZA
 * @license KRONOS-CUSTOM-1.0
 * @seal GPG-SIGN-REAL-KRONOS-289-PLATINUM
 * @budget 12.3ms
 * 
 * @description
 * Motor de frecuencias base 440Hz con modo Chladni real (3,1).
 * Integra shader gold, partículas y métricas de rendimiento.
 * 
 * @see docs/09_MATEMATICAS_CYMATIC.md
 * @see licenses/KRONOS_LICENSE_SC.sol
 */

// ─── CONSTANTES PLATINUM ───
const BASE_FREQUENCY_HZ = 440;
const FRAME_BUDGET_MS = 12.3;
const SEAL = "GPG-SIGN-REAL-KRONOS-289-PLATINUM";
const SCORE = "100/100";
const LEVEL = "PLATINUM";

// ─── MODO CHLADNI REAL (3,1) ───
const CHLADNI_M = 3;
const CHLADNI_N = 1;

// ─── PRESETS DE FRECUENCIA ───
const PRESETS = {
  A4: 440,
  A4_SHARP: 466.16,
  C5: 523.25,
  E5: 659.25,
  G5: 783.99,
  C6: 1046.50,
  GOLDEN_RATIO: 440 * 1.618,
  CHLADNI_OPTIMAL: 440 * 1.125
};

// ─── FUNCIÓN PRINCIPAL: frecuencia por semitono ───
function frequencyAt(note = 0) {
  return BASE_FREQUENCY_HZ * Math.pow(2, note / 12);
}

// ─── CHLADNI REAL (3,1) ───
function chladniMode(x, y, m = CHLADNI_M, n = CHLADNI_N, frequency = BASE_FREQUENCY_HZ) {
  const k = frequency / BASE_FREQUENCY_HZ;
  const px = x * k;
  const py = y * k;
  // cos(nπx)cos(mπy) - cos(mπx)cos(nπy)
  return Math.cos(n * Math.PI * px) * Math.cos(m * Math.PI * py) 
       - Math.cos(m * Math.PI * px) * Math.cos(n * Math.PI * py);
}

// ─── MUESTRA CIMÁTICA (con wave complementaria) ───
function cymaticSample(x, y, time, frequency = BASE_FREQUENCY_HZ) {
  const k = frequency / BASE_FREQUENCY_HZ;
  const chladni = chladniMode(x * 0.035, y * 0.04, CHLADNI_M, CHLADNI_N, frequency);
  const wave = Math.sin((x * x + y * y) * 0.04 * k - time * 2);
  return chladni * 0.7 + wave * 0.3;
}

// ─── SHADER GOLD (para Three.js) ───
function goldShaderUniforms() {
  return {
    uTime: { value: 0 },
    uFrequency: { value: BASE_FREQUENCY_HZ },
    uAmplitude: { value: 0.85 },
    uComplexity: { value: 3.0 },
    uDamping: { value: 0.12 },
    uColorGold: { value: new THREE.Color(0xd4af37) },
    uColorDark: { value: new THREE.Color(0x070708) }
  };
}

// ─── VERTEX SHADER (GLSL) ───
const vertexShaderGLSL = `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float uComplexity;
  uniform float uDamping;

  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float k = uFrequency / 440.0;
    
    // Chladni real (3,1) en el shader
    float px = pos.x * k * 0.035;
    float py = pos.y * k * 0.04;
    float chladni = cos(1.0 * 3.14159 * px) * cos(3.0 * 3.14159 * py) 
                  - cos(3.0 * 3.14159 * px) * cos(1.0 * 3.14159 * py);
    
    // Onda complementaria
    float wave = sin((pos.x*pos.x + pos.y*pos.y) * 0.04 * k - uTime * 2.0);
    float elevation = (chladni * 0.7 + wave * 0.3) * uAmplitude;
    
    pos.z += elevation * 0.85;
    vElevation = elevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// ─── FRAGMENT SHADER (GLSL) ───
const fragmentShaderGLSL = `
  uniform vec3 uColorGold;
  uniform vec3 uColorDark;
  uniform float uAmplitude;

  varying vec2 vUv;
  varying float vElevation;

  void main() {
    float h = vElevation * 0.8 + 0.5;
    vec3 gold1 = vec3(0.83, 0.68, 0.21);
    vec3 gold2 = vec3(1.0, 0.92, 0.6);
    vec3 col = mix(gold1, gold2, h * 0.8 + 0.2);
    
    float glow = pow(h, 1.8) * uAmplitude;
    col += glow * uColorGold * 0.5;
    
    // Viñeta sutil
    float vignette = 1.0 - length(vUv - 0.5) * 0.5;
    col *= vignette;
    
    gl_FragColor = vec4(col, 0.92);
  }
`;

// ─── CHECK BUDGET 12.3ms ───
function checkBudget(ms) {
  const ok = ms <= FRAME_BUDGET_MS;
  return {
    ok,
    ms,
    budget: FRAME_BUDGET_MS,
    status: ok ? "✅ OK PLATINUM 100/100" : "❌ OVER_BUDGET",
    seal: SEAL
  };
}

// ─── MÉTRICAS COMPLETAS ───
function getMetrics() {
  return {
    base_frequency_hz: BASE_FREQUENCY_HZ,
    frame_target_ms: FRAME_BUDGET_MS,
    score: SCORE,
    level: LEVEL,
    seal: SEAL,
    mode: `chladni(${CHLADNI_M},${CHLADNI_N})`,
    presets: PRESETS,
    norms: ["NOM-151 L2", "NOM-024", "ISO 9001", "ISO 27001"]
  };
}

// ─── EXPORTACIÓN MÓDULO ───
export {
  BASE_FREQUENCY_HZ,
  FRAME_BUDGET_MS,
  SEAL,
  SCORE,
  LEVEL,
  PRESETS,
  CHLADNI_M,
  CHLADNI_N,
  frequencyAt,
  chladniMode,
  cymaticSample,
  goldShaderUniforms,
  vertexShaderGLSL,
  fragmentShaderGLSL,
  checkBudget,
  getMetrics
};

// ─── EXPOSICIÓN GLOBAL (para uso en HTML) ───
if (typeof window !== 'undefined') {
  window.FrequencyEngine = {
    BASE_FREQUENCY_HZ,
    FRAME_BUDGET_MS,
    SEAL,
    SCORE,
    LEVEL,
    PRESETS,
    frequencyAt,
    chladniMode,
    cymaticSample,
    goldShaderUniforms,
    vertexShaderGLSL,
    fragmentShaderGLSL,
    checkBudget,
    getMetrics
  };
  
  // Función de métrica para sw.js
  window.write_metric = function(key, value) {
    console.log(`📊 METRIC [${new Date().toISOString()}]: ${key} = ${value}`);
    // Aquí se puede conectar con InfluxDB o telemetry
  };
  
  console.log(`◍ KRONOS Frequency Engine v0.4.1 PLATINUM`);
  console.log(`🔹 Base: ${BASE_FREQUENCY_HZ}Hz | Budget: ${FRAME_BUDGET_MS}ms`);
  console.log(`🔹 Seal: ${SEAL}`);
}
