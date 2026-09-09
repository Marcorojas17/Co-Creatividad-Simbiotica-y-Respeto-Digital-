export function trace(event, metadata={}){return {event,metadata,timestamp:new Date().toISOString()};}
