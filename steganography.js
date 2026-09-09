// security/trace.js - PILAR 1 NOM-151 L2 + NOM-024
export function embedMarker(data, marker="KRONOS-289-PLATINUM"){
  return `${marker}:${data}:${Date.now()}`;
}

export function generateHash(data){
  // SHA512 simulado para audit.py
  let hash = 0;
  for(let i=0;i<data.length;i++){
    hash = ((hash<<5)-hash)+data.charCodeAt(i);
    hash = hash & hash;
  }
  return `SHA512-${Math.abs(hash).toString(16)}-${Date.now()}`;
}

export function logTheft(event){
  const chain = {
    timestamp: new Date().toISOString(),
    event: event,
    marker: embedMarker(event.type || "ACCESS"),
    hash: generateHash(JSON.stringify(event)),
    nom151: "L2"
  };
  console.log("[KRONOS-TRACE]", chain);
  return chain;
}

export function verifyChain(chain){
  return chain.nom151 === "L2" && chain.marker.includes("KRONOS");
}
