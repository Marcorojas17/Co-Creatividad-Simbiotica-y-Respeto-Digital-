// KRONOS 289 PLATINUM — frequency_engine.js
// 09 MATEMATICAS CYMATIC | BASE 440Hz | BUDGET 12.3ms
import { 
  BASE_FREQUENCY_HZ, 
  FRAME_BUDGET_MS, 
  frequencyAt, 
  chladniMode, 
  cymaticSample, 
  checkBudget, 
  getMetrics 
} from './cymaticFrequency.js';

import { trackFrame } from './data/timeseries.js';

export const Engine = {
  base: BASE_FREQUENCY_HZ,
  budget: FRAME_BUDGET_MS,

  // f(n) = 440 * 2^(n/12)
  getFreq: (note = 0) => frequencyAt(note),

  // Motor real Chladni (3,1) — no fake radial
  getChladni: (x, y, m = 3, n = 1, freq = BASE_FREQUENCY_HZ) => chladniMode(x, y, m, n, freq),

  // Sample completo para shader
  getSample: (x, y, time, freq = BASE_FREQUENCY_HZ) => cymaticSample(x, y, time, freq),

  // 12.3ms guard + telemetry 99.99%
  tick: (start) => {
    const ms = performance.now() - start;
    trackFrame(ms);
    return checkBudget(ms);
  },

  // Para SEALO_CALIDAD.json
  metrics: () => getMetrics(),

  // Lista de notas 432 vs 440 sync — tu puente
  notes: Array.from({ length: 24 }, (_, i) => ({
    n: i - 12,
    freq: frequencyAt(i - 12),
    label: `N${i - 12}`
  }))
};

// Global para index.html sin importmap
if (typeof window !== 'undefined') {
  window.FrequencyEngine = Engine;
  console.log('KRONOS 289 PLATINUM ENGINE READY', Engine.metrics());
}
