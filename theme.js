/**
 * theme.js — KRONOS 289 PLATINUM
 * 04:40 Gold Glass | 12.3ms budget
 */

import theme from './theme.json' assert { type: 'json' };

export const COLORS = theme.colors;
export const GLASS = theme.glass;
export const PERF = theme.performance;
export const CYMATIC = theme.cymatic;
export const PWA = theme.pwa;

// Helper para aplicar el tema al <html>
export function applyThemeToRoot() {
  const root = document.documentElement;
  root.style.setProperty('--bg', COLORS.bg);
  root.style.setProperty('--bg-deep', COLORS.bg_deep);
  root.style.setProperty('--gold', COLORS.gold);
  root.style.setProperty('--gold-glow', COLORS.gold_glow);
  root.style.setProperty('--text', COLORS.text);
  root.style.setProperty('--text-muted', COLORS.text_muted);
  root.style.setProperty('--glass-bg', GLASS.bg);
  root.style.setProperty('--glass-blur', GLASS.blur);
  root.style.setProperty('--glass-border', GLASS.border);
}

// Helper para obtener el presupuesto de frame
export function getBudget() {
  return PERF.frame_target_ms;
}

// Helper para saber si un frame cumple el budget
export function checkFrameBudget(ms) {
  return {
    ok: ms <= PERF.frame_target_ms,
    ms,
    budget: PERF.frame_target_ms,
    status: ms <= PERF.frame_target_ms ? '✅ PLATINUM' : '⚠️ OVER BUDGET'
  };
}

// Si estás en el navegador, aplica el tema automáticamente
if (typeof window !== 'undefined') {
  applyThemeToRoot();
  console.log('◍ KRONOS 289 THEME LOADED', {
    mandala: CYMATIC.mandala,
    budget: PERF.frame_target_ms + 'ms',
    gold: COLORS.gold
  });
}
