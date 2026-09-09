precision mediump float;
uniform float u_time;
// Target frame budget: 12.3ms (under the 16.6ms 60 FPS threshold).
void main(){vec2 p=gl_FragCoord.xy/600.0;float wave=sin(length(p)*24.0-u_time*3.0);gl_FragColor=vec4(0.84,0.66,0.31,0.55+0.25*wave);}
