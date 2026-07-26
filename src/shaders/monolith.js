// Ashima 3D simplex noise — used for vertex displacement and surface iridescence.
const NOISE = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm(vec3 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    sum += amp * snoise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return sum;
}
`

export const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
uniform float uPulse;

varying vec3 vNormalW;
varying vec3 vViewDirW;
varying float vDisp;

${NOISE}

// Displace a point along its normal by the noise field.
vec3 displaced(vec3 pos, vec3 nrm, out float amount) {
  amount = fbm(pos * uFreq + vec3(0.0, 0.0, uTime * 0.22));
  return pos + nrm * amount * uAmp * uPulse;
}

void main() {
  vec3 nrm = normalize(normal);

  float d;
  vec3 pos = displaced(position, nrm, d);
  vDisp = d;

  // Rebuild the normal from two tangent-offset samples so lighting
  // follows the deformed surface instead of the original sphere.
  vec3 upRef = mix(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 0.0), step(0.99, abs(nrm.y)));
  vec3 tangent = normalize(cross(nrm, upRef));
  vec3 bitangent = normalize(cross(nrm, tangent));
  float eps = 0.035;

  float dA, dB;
  vec3 pA = displaced(position + tangent * eps, normalize(nrm + tangent * eps), dA);
  vec3 pB = displaced(position + bitangent * eps, normalize(nrm + bitangent * eps), dB);

  vec3 newNormal = normalize(cross(pA - pos, pB - pos));
  if (dot(newNormal, nrm) < 0.0) newNormal = -newNormal;

  vec4 worldPos = modelMatrix * vec4(pos, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * newNormal);
  vViewDirW = normalize(cameraPosition - worldPos.xyz);

  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`

export const fragmentShader = /* glsl */ `
uniform vec3 uBase;
uniform vec3 uAccent;
uniform vec3 uSheen;
uniform float uTime;

varying vec3 vNormalW;
varying vec3 vViewDirW;
varying float vDisp;

void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(vViewDirW);

  // Fresnel: the silhouette lights up, the face stays near-black.
  float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.0);

  // One key light, one cold fill, so the form still reads at the core.
  vec3 keyDir = normalize(vec3(0.7, 0.9, 0.55));
  float key = max(dot(N, keyDir), 0.0);
  float fill = max(dot(N, normalize(vec3(-0.6, -0.35, 0.4))), 0.0);

  vec3 col = uBase;
  col += uSheen * pow(key, 1.9) * 0.34;
  col += vec3(0.06, 0.09, 0.12) * fill * 0.5;

  // Crests catch a trace of accent — enough to read as material, not as fire.
  float ridge = smoothstep(0.14, 0.46, vDisp);
  col = mix(col, uAccent * 0.62, ridge * 0.14);

  // A cool edge at the true silhouette, so the mass separates from the
  // dark panel it sits in without glowing.
  col += uAccent * pow(fres, 2.1) * 0.42;

  // Very slight banding so large flat areas aren't dead-flat 8-bit gradients.
  float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  col += dither * 0.006;

  gl_FragColor = vec4(col, 1.0);
}
`
