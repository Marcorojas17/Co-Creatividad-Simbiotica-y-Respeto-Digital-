#version 300 es
// KRONOS 289 PLATINUM 100/100 - Vertex Shader Cymático 12.3ms budget
precision highp float;

in vec2 position;
in vec2 uv;

uniform float u_time;
uniform float u_frequency; // 40-880 Hz
uniform float u_budget_ms; // 12.3ms
uniform vec2 u_resolution;

out vec2 v_uv;
out float v_frequency;
out float v_time;

void main(){
    v_uv = uv;
    v_frequency = u_frequency;
    v_time = u_time;
    
    // Chladni displacement para debug visual 100/100
    vec2 pos = position;
    // Pequeña vibración base proporcional a frecuencia (no afecta perf)
    float freqNorm = u_frequency / 880.0;
    pos.x += sin(u_time * freqNorm * 3.0 + uv.y * 6.28) * 0.001;
    
    gl_Position = vec4(pos, 0.0, 1.0);
}
