// security/trace.js - KRONOS 289 - PILAR 1 NOM-151 L2
export function trace(event, metadata = {}) {
  const payload = {
    event,
    metadata,
    timestamp: new Date().toISOString(),
    chain: {
      sha512: null, // se genera en gpg_sign_engine.sh
      nom151: "L2",
      version: "KRONOS-289-PLATINUM"
    }
  };

  // Guarda local
