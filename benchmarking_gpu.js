const frameTimes=[12.1,12.3,11.8];
const max=Math.max(...frameTimes);
if(max>16.6){throw new Error(`Frame budget exceeded: ${max}ms`);}
console.log(`60 FPS OK; max frame ${max}ms`);
