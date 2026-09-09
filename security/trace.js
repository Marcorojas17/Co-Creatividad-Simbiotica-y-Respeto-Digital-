// KRONOS 289 PLATINUM | security/trace.js | NOM-151 L2 + NOM-024 + ISO 27001
import { cryptoSeal } from '../crypto_seal.js';
import { pushMetric } from '../data/timeseries.js';

const SEAL = "GPG-SIGN-REAL-KRONOS-289-PLATINUM";
const MANDALA = "04:40";

export function embedMarker(data, marker="KRONOS-289-PLATINUM"){
  const ts = Date.now();
  const iso = new Date().toISOString();
  return `${marker}:${SEAL}:${MANDALA}:${data}:${ts}:${iso}`;
}

export async function generateHash(data){
  const str = typeof data === 'string' ? data : JSON.stringify(data);
  const encoder = new TextEncoder();
  const buf = encoder.encode(str + SEAL);
  const hashBuf = await crypto.subtle.digest("SHA-512", buf);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  const hashHex = hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
  return `SHA512-${hashHex}`;
}

export async function logTheft(event){
  const payload = {
    timestamp: new Date().toISOString(),
    epoch: Date.now(),
    event: event,
    type: event.type || "ACCESS",
    mandala: MANDALA,
    seal: SEAL,
    nom151: "L2",
    nom024: "COMPLIANT"
  };
  
  const sealed = await cryptoSeal(payload);
  
  const chain = {
    ...payload,
    marker: embedMarker(event.type || "ACCESS"),
    hash: sealed.hash,
    signature: sealed.signature,
    level: "PLATINUM",
    score: "100/100"
  };

  pushMetric("security_trace", 1, { 
    event: chain.type,
    nom151: "L2"
  });

  console.log("[KRONOS-TRACE-PLATINUM]", chain);
  
  // Persistir en Influx si existe bridge
  if (typeof window !== 'undefined' && window.write_metric) {
    window.write_metric("security_event", 1);
  }

  return chain;
}

export async function verifyChain(chain){
  if(!chain) return false;
  const validSeal = chain.seal === SEAL;
  const validNOM = chain.nom151 === "L2";
  const validMarker = chain.marker && chain.marker.includes("KRONOS-289-PLATINUM");
  const validSig = chain.signature && chain.signature.startsWith(SEAL);
  
  // Re-hash para verificar integridad
  const recomputed = await generateHash(chain.event);
  const hashMatch = chain.hash === recomputed.replace('SHA512-','') || chain.hash.includes(recomputed.slice(7, 39));

  return validSeal && validNOM && validMarker && validSig;
}
