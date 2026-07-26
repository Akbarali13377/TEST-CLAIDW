export const profile = {
  name: 'Alex Morgan',
  wordmark: 'Morgan',
  discipline: 'Real-time graphics for the browser',
  location: 'Remote — UTC+0',
  email: 'hello@alexmorgan.dev',
  social: {
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
    twitter: 'https://twitter.com/',
  },
}

export const hero = {
  eyebrow: 'Independent practice',
  headline: 'Scenes that hold their frame budget.',
  sub: 'I build real-time graphics for the open web — and treat the cost of a frame as part of the design, not an afterthought.',
}

export const thesis = {
  question: 'What if a scene had to justify every frame it draws?',
  body: "Most WebGL on the web is billed to the visitor: a shader that runs while nobody is looking, a mesh that ships at full density to a phone, a transition that ignores the fact somebody asked the system to stop moving things. None of that shows up in a screenshot, which is exactly why it survives. I build the other way round — the budget first, then whatever fits inside it.",
}

/* Named like lab artifacts rather than agency projects: codename plus revision. */
export const artifacts = [
  {
    category: 'Renderer',
    name: 'Drift-2',
    line: 'A scene graph that budgets draw calls per frame instead of per scene. Holds sixty on integrated graphics with 200k instanced voxels in view.',
    cta: 'Technical report',
  },
  {
    category: 'Shading',
    name: 'Ferrite-1',
    line: 'Noise-displaced surfaces whose normals are rebuilt from tangent-offset samples, so light follows the deformation instead of the base sphere.',
    cta: 'Read the shader',
  },
  {
    category: 'Motion',
    name: 'Cadence-1',
    line: 'Interruptible springs that survive being retargeted mid-flight and still resolve to rest, rather than snapping to the new value.',
    cta: 'Learn more',
  },
  {
    category: 'Measurement',
    name: 'Ledger',
    line: 'A frame-budget harness wired into CI. A commit that adds more than 1.2ms of main-thread work per frame fails the gate.',
    cta: 'Read the paper',
  },
]

/* Each claim below is demonstrated by this page — verifiable, not decorative. */
export const behaviours = [
  {
    label: 'Stops when unseen',
    body: 'The viewport above drops to zero frames once it leaves the screen, and resumes on return. Measured in-browser, not assumed.',
  },
  {
    label: 'Survives no GPU',
    body: 'With WebGL unavailable the panel falls back to a static composition and the layout holds, instead of collapsing to an empty column.',
  },
  {
    label: 'Honours reduced motion',
    body: 'A reduced-motion preference stops the noise field, the pointer drift and every transition on the page — not just the obvious ones.',
  },
  {
    label: 'Keyboard first',
    body: 'A skip link takes the first Tab, and every interactive element carries a visible focus ring. No exceptions, no suppressed outlines.',
  },
]

export const about = {
  body: "Six years in, mostly in WebGL. I like problems where the physics matter — camera easing, material response, the way sixty frames a second either holds together or doesn't. Most of what I ship ends up being about restraint: fewer draw calls, fewer effects, a scene that runs the same on a five-year-old laptop as it does in the studio.",
  facts: [
    ['Focus', 'WebGL · GLSL · React'],
    ['Working since', '2019'],
    ['Based', 'Remote — UTC+0'],
    ['Status', 'Two slots, Q3'],
  ],
}
