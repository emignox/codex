varying vec2 vUv;
uniform float time;

void main() {
  // Simuliamo le onde sull'acqua usando il seno del tempo
  float waveHeight = sin(vUv.x * 10.0 + time) * 0.1;
  vec3 waterColor = vec3(0.0, 0.5, 1.0); // Colore blu per l'acqua
  gl_FragColor = vec4(waterColor, 1.0 - waveHeight);
}
