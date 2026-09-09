export const BASE_FREQUENCY_HZ = 440;
export function frequencyAt(note=0){ return BASE_FREQUENCY_HZ * Math.pow(2, note/12); }
export function cymaticSample(x,y,time,frequency=BASE_FREQUENCY_HZ){ const k=frequency/BASE_FREQUENCY_HZ; return Math.sin((x*x+y*y)*0.04*k-time*2); }
if(typeof window!=='undefined') window.CymaticFrequency={BASE_FREQUENCY_HZ,frequencyAt,cymaticSample};
