export const profile = {
  name: 'Alex Morgan',
  role: 'Frontend Engineer',
  tagline: 'Working at the edge of the browser, the GPU, and the type grid.',
  location: 'Remote',
  email: 'hello@alexmorgan.dev',
  social: {
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
    twitter: 'https://twitter.com/',
  },
}

export const about = {
  bio: "Six years in, mostly in WebGL. I like problems where the physics matter — camera easing, material response, the way sixty frames a second either holds together or doesn't. Most of what I ship ends up being about restraint: fewer draw calls, fewer effects, a scene that runs the same on a five-year-old laptop as it does in the studio.",
  stats: [
    { label: 'years building for the web', value: '06' },
    { label: 'shipped to production', value: '48' },
    { label: 'studios & teams', value: '12' },
    { label: 'unread eslint warnings', value: '00' },
  ],
}

export const skills = [
  { name: 'React & Next.js', level: 95 },
  { name: 'Three.js & WebGL', level: 90 },
  { name: 'TypeScript', level: 88 },
  { name: 'GLSL', level: 75 },
  { name: 'Layout & type', level: 85 },
  { name: 'Motion', level: 92 },
]

export const projects = [
  {
    title: 'Nebula Studio',
    description: 'Landing page for a motion studio. A particle field reads mouse velocity and settles back into formation after 400ms of rest.',
    tags: ['Three.js', 'React', 'GLSL'],
    color: '#ff5f1f',
  },
  {
    title: 'Orbit Commerce',
    description: 'Product configurator for a furniture brand — real fabric swatches mapped onto a compressed Draco mesh, under 800kb total.',
    tags: ['R3F', 'Zustand', 'Draco'],
    color: '#4d90a8',
  },
  {
    title: 'Aurora Dashboard',
    description: 'Internal analytics tool. Traded the obligatory 3D charts for something simpler once we measured the frame cost against the payoff.',
    tags: ['D3.js', 'Canvas', 'Framer Motion'],
    color: '#8a9a4d',
  },
  {
    title: 'Voxel Worlds',
    description: 'A weekend project that didn\'t stay a weekend project: chunked terrain, instanced meshes, 200k voxels at 60fps on integrated graphics.',
    tags: ['Three.js', 'Web Workers', 'Simplex'],
    color: '#7a6dd4',
  },
]
