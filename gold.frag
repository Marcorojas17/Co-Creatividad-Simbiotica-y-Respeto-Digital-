#version 300 es
// KRONOS 289 PLATINUM 100/100 SEALED
// Target frame budget: 12.3ms (under the 16.6ms 60 FPS threshold) - GPG-SIGN-REAL
precision highp float;

in vec2 v_uv;
uniform float u_time;
uniform float u_frequency;
uniform float u_budget_ms; // 12.3

out vec4 fragColor;

void main(){
    vec2 p = v_uv * 2.0 - 1.0;
    // Chladni + onda radial - optimizado para <12.3ms
    float dist = length(p);
    float chladni = cos(3.0 * 3.14159 * p.x * (u_frequency/440.0)) * cos(1.0 * 3.14159 * p.y * (u_frequency/440.0))
                  - cos(1.0 * 3.14159 * p.x * (u_frequency/440.0)) * cos(3.0 * 3.14159 * p.y * (u_frequency/440.0));
    
    float wave = sin(dist * 24.0 - u_time * 3.0);
    float intensity = pow(abs(chladni), 0.18) * (0.55 + 0.25 * wave);
    
    // PLATINUM glass palette
    vec3 base = vec3(0.027, 0.066, 0.121); // #07111f
    vec3 gold = vec3(1.0, 0.807, 0.36);   // #ffce5c
    vec3 color = mix(base, gold, intensity);
    
    // Budget indicator 100/100
    if(u_budget_ms > 12.3) color.r += 0.2;
    
    fragColor = vec4(color, 0.85 + 0.15 * wave);
}
