export const profile = {
  name: 'Alex Morgan',
  role: 'Creative Developer & 3D Designer',
  tagline: 'I build immersive, interactive experiences for the web.',
  location: 'Remote / Worldwide',
  email: 'hello@alexmorgan.dev',
  social: {
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
    twitter: 'https://twitter.com/',
  },
}

export const about = {
  bio: `I'm a frontend engineer specializing in WebGL and real-time 3D graphics.
Over the past several years I've combined design and engineering to craft
websites that feel alive — blending motion, depth, and interactivity into
products people remember.`,
  stats: [
    { label: 'Years of experience', value: '6+' },
    { label: 'Projects shipped', value: '48' },
    { label: 'Happy clients', value: '32' },
    { label: 'Awwwards & SOTD', value: '9' },
  ],
}

export const skills = [
  { name: 'React / Next.js', level: 95 },
  { name: 'Three.js / WebGL', level: 90 },
  { name: 'TypeScript', level: 88 },
  { name: 'GLSL Shaders', level: 75 },
  { name: 'UI / UX Design', level: 85 },
  { name: 'Motion & Animation', level: 92 },
]

export const projects = [
  {
    title: 'Nebula Studio',
    description: 'Interactive WebGL landing page with a real-time particle nebula and scroll-driven camera path.',
    tags: ['Three.js', 'React', 'GLSL'],
    color: '#7c5cff',
  },
  {
    title: 'Orbit Commerce',
    description: '3D product configurator for an e-commerce brand, letting shoppers customize items in real time.',
    tags: ['React Three Fiber', 'Zustand', 'Draco'],
    color: '#22d3ee',
  },
  {
    title: 'Aurora Dashboard',
    description: 'Data visualization dashboard with animated 3D charts and glassmorphic UI panels.',
    tags: ['D3.js', 'Three.js', 'Framer Motion'],
    color: '#ff6b9d',
  },
  {
    title: 'Voxel Worlds',
    description: 'Procedurally generated voxel playground exploring instanced meshes and chunked terrain.',
    tags: ['Three.js', 'WebWorkers', 'Perlin Noise'],
    color: '#ffb84d',
  },
]
