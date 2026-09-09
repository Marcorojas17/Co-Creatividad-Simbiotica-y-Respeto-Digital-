// data/timeseries.js - KRONOS 289 - Telemetry 99.99%
export const timeseries = [];

export function pushMetric(name, value, tags = {}) {
  const point = {
    measurement: name,
    fields: { value },
    tags: {
      ...tags,
      version: "KRONOS-289-PLATINUM",
      mandala: "04:40"
    },
    timestamp: Date.now(),
    iso: new Date().toISOString()
  };
  timeseries.push(point);
  
  // Keep only last 1000 to not break 12.3ms frame
  if (timeseries.length > 1000) timeseries.shift();
  
  // Send to telemetry if available
  if (typeof window !== 'undefined' && window.kronosMetrics) {
    window.kronosMetrics.ingest(point);
  }
  
  return point;
}

export function getMetrics(filterName = null) {
  if (!filterName) return timeseries;
  return timeseries.filter(m => m.measurement === filterName);
}

// Auto metric for GPU performance - Pilar 4
export function trackFrame(durationMs) {
  pushMetric("gpu_frame_ms", durationMs, { 
    target: 12.3,
    status: durationMs <= 12.3 ? "OK" : "SLOW"
  });
}
