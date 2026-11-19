export type EffectCategory =
  | 'buttons'
  | 'loaders'
  | 'text'
  | 'cards'
  | 'backgrounds'
  | 'borders'

export type Effect = {
  id: string
  name: string
  category: EffectCategory
  description: string
  html: string
  css: string
}

export type CategoryMeta = {
  id: EffectCategory
  label: string
  emoji: string
}

export const categories: CategoryMeta[] = [
  { id: 'buttons', label: 'Buttons', emoji: '◉' },
  { id: 'loaders', label: 'Loaders', emoji: '◐' },
  { id: 'text', label: 'Text Effects', emoji: 'Aa' },
  { id: 'cards', label: 'Cards & Hover', emoji: '▤' },
  { id: 'backgrounds', label: 'Backgrounds', emoji: '░' },
  { id: 'borders', label: 'Borders & Misc', emoji: '▢' },
]

export const effects: Effect[] = [
  // ----------------------------------------------------------------- BUTTONS
  {
    id: 'glow-btn',
    name: 'Glow Pulse Button',
    category: 'buttons',
    description: 'A gradient button with a pulsing radial glow that radiates outward in a loop.',
    html: `<button class="glow-btn">Get Started</button>`,
    css: `.glow-btn {
  position: relative;
  padding: 0.85rem 2.4rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #fff;
  background: linear-gradient(135deg, #f43f5e, #f59e0b);
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.25s ease;
  animation: glow-btn-pulse 2.2s infinite;
}

.glow-btn:hover {
  transform: translateY(-3px) scale(1.02);
}

@keyframes glow-btn-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.55); }
  70%  { box-shadow: 0 0 0 20px rgba(244, 63, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0); }
}`,
  },
  {
    id: 'grad-btn',
    name: 'Animated Gradient Flow',
    category: 'buttons',
    description: 'A button whose multi-stop gradient flows seamlessly across its surface.',
    html: `<button class="grad-btn">Animate Me</button>`,
    css: `.grad-btn {
  padding: 0.9rem 2.4rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background: linear-gradient(120deg, #ec4899, #8b5cf6, #d946ef, #ec4899);
  background-size: 300% 300%;
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.35);
  animation: grad-btn-flow 6s ease infinite;
}

@keyframes grad-btn-flow {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
  },
  {
    id: 'neon-btn',
    name: 'Neon Border Button',
    category: 'buttons',
    description: 'A glowing pink neon outline that fills in with a bright glow on hover.',
    html: `<button class="neon-btn">Activate</button>`,
    css: `.neon-btn {
  padding: 0.9rem 2.4rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #f472b6;
  background: transparent;
  border: 2px solid #f472b6;
  border-radius: 8px;
  cursor: pointer;
  text-shadow: 0 0 8px rgba(244, 114, 182, 0.8);
  box-shadow:
    inset 0 0 10px rgba(244, 114, 182, 0.3),
    0 0 12px rgba(244, 114, 182, 0.4);
  transition: all 0.3s ease;
}

.neon-btn:hover {
  color: #0a0a0f;
  background: #f472b6;
  box-shadow:
    0 0 25px rgba(244, 114, 182, 0.9),
    inset 0 0 12px rgba(244, 114, 182, 0.5);
}`,
  },
  {
    id: 'liquid-btn',
    name: 'Liquid Fill Button',
    category: 'buttons',
    description: 'A rounded outline button that fills from the bottom with a liquid color on hover.',
    html: `<button class="liquid-btn">Hover Me</button>`,
    css: `.liquid-btn {
  position: relative;
  padding: 0.9rem 2.4rem;
  font-size: 1rem;
  font-weight: 600;
  color: #e2e8f0;
  background: transparent;
  border: 2px solid #e2e8f0;
  border-radius: 999px;
  cursor: pointer;
  overflow: hidden;
  z-index: 0;
  transition: color 0.4s ease;
}

.liquid-btn::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #34d399, #10b981);
  border-radius: 50% 50% 0 0;
  transform: translateY(100%);
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.liquid-btn:hover { color: #fff; }
.liquid-btn:hover::before { transform: translateY(0); }`,
  },
  {
    id: 'push-btn',
    name: '3D Push Button',
    category: 'buttons',
    description: 'A tactile button with a solid shadow stem that compresses on click.',
    html: `<button class="push-btn">Press Me</button>`,
    css: `.push-btn {
  padding: 0.85rem 2.2rem;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background: #e11d48;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow:
    0 6px 0 #9f1239,
    0 8px 16px rgba(159, 18, 57, 0.4);
  transition: all 0.12s ease;
}

.push-btn:hover { background: #be123c; }

.push-btn:active {
  transform: translateY(6px);
  box-shadow:
    0 0 0 #9f1239,
    0 2px 6px rgba(159, 18, 57, 0.4);
}`,
  },
  {
    id: 'ripple-btn',
    name: 'Ripple Hover Button',
    category: 'buttons',
    description: 'A circular ripple expands from the center across the button on hover.',
    html: `<button class="ripple-btn">Click Me</button>`,
    css: `.ripple-btn {
  position: relative;
  padding: 0.9rem 2.4rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: #10b981;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  z-index: 0;
  transition: background 0.3s ease;
}

.ripple-btn::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transform: translate(-50%, -50%);
  transition: width 0.5s ease, height 0.5s ease;
}

.ripple-btn:hover { background: #059669; }
.ripple-btn:hover::after { width: 320px; height: 320px; }`,
  },

  // ----------------------------------------------------------------- LOADERS
  {
    id: 'spinner',
    name: 'Dual Ring Spinner',
    category: 'loaders',
    description: 'A classic circular spinner with a lime arc that rotates continuously.',
    html: `<div class="spinner"></div>`,
    css: `.spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 4px solid rgba(132, 204, 22, 0.25);
  border-top-color: #84cc16;
  border-right-color: #84cc16;
  animation: spinner-rotate 0.9s linear infinite;
}

@keyframes spinner-rotate {
  to { transform: rotate(360deg); }
}`,
  },
  {
    id: 'dots',
    name: 'Bouncing Dots',
    category: 'loaders',
    description: 'Three colored dots that bounce up and down in a staggered rhythm.',
    html: `<div class="dots"><span></span><span></span><span></span></div>`,
    css: `.dots {
  display: flex;
  gap: 10px;
}

.dots span {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #f43f5e;
  animation: dots-bounce 0.6s ease-in-out infinite alternate;
}

.dots span:nth-child(2) {
  background: #f59e0b;
  animation-delay: 0.2s;
}

.dots span:nth-child(3) {
  background: #10b981;
  animation-delay: 0.4s;
}

@keyframes dots-bounce {
  to {
    transform: translateY(-16px);
    opacity: 0.5;
  }
}`,
  },
  {
    id: 'bars',
    name: 'Equalizer Bars',
    category: 'loaders',
    description: 'Five vertical bars that scale like an audio equalizer in a rainbow cascade.',
    html: `<div class="bars"><span></span><span></span><span></span><span></span><span></span></div>`,
    css: `.bars {
  display: flex;
  gap: 6px;
  align-items: flex-end;
  height: 50px;
}

.bars span {
  width: 8px;
  height: 100%;
  background: #8b5cf6;
  border-radius: 4px;
  animation: bars-wave 1s ease-in-out infinite;
}

.bars span:nth-child(2) { animation-delay: 0.1s; background: #d946ef; }
.bars span:nth-child(3) { animation-delay: 0.2s; background: #ec4899; }
.bars span:nth-child(4) { animation-delay: 0.3s; background: #f43f5e; }
.bars span:nth-child(5) { animation-delay: 0.4s; background: #f59e0b; }

@keyframes bars-wave {
  0%, 100% { transform: scaleY(0.4); }
  50%      { transform: scaleY(1); }
}`,
  },
  {
    id: 'orbit',
    name: 'Orbiting Planets',
    category: 'loaders',
    description: 'Three colored dots orbit a shared center point at staggered intervals.',
    html: `<div class="orbit"><span></span><span></span><span></span></div>`,
    css: `.orbit {
  position: relative;
  width: 64px;
  height: 64px;
}

.orbit span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  margin: -6px;
  border-radius: 50%;
}

.orbit span:nth-child(1) {
  background: #f43f5e;
  animation: orbit-spin 1.4s linear infinite;
}
.orbit span:nth-child(2) {
  background: #8b5cf6;
  animation: orbit-spin 1.4s linear infinite;
  animation-delay: -0.45s;
}
.orbit span:nth-child(3) {
  background: #10b981;
  animation: orbit-spin 1.4s linear infinite;
  animation-delay: -0.9s;
}

@keyframes orbit-spin {
  0%   { transform: rotate(0deg) translateX(26px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(26px) rotate(-360deg); }
}`,
  },
  {
    id: 'sqflip',
    name: 'Color Flip Square',
    category: 'loaders',
    description: 'A rounded square that rotates a full turn while cycling its fill color.',
    html: `<div class="sqflip"></div>`,
    css: `.sqflip {
  width: 48px;
  height: 48px;
  background: #ec4899;
  border-radius: 10px;
  animation: sqflip-rotate 1.6s ease-in-out infinite;
}

@keyframes sqflip-rotate {
  0%   { transform: rotate(0deg);   background: #ec4899; }
  25%  { transform: rotate(90deg);  background: #8b5cf6; }
  50%  { transform: rotate(180deg); background: #10b981; }
  75%  { transform: rotate(270deg); background: #f59e0b; }
  100% { transform: rotate(360deg); background: #ec4899; }
}`,
  },

  // ----------------------------------------------------------------- TEXT
  {
    id: 'grad-text',
    name: 'Animated Gradient Text',
    category: 'text',
    description: 'Text filled with a flowing multi-color gradient using background-clip.',
    html: `<div class="grad-text">Beautiful CSS</div>`,
    css: `.grad-text {
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(
    90deg, #f43f5e, #f59e0b, #10b981, #8b5cf6, #ec4899, #f43f5e
  );
  background-size: 300% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: grad-text-move 6s linear infinite;
}

@keyframes grad-text-move {
  to { background-position: 300% center; }
}`,
  },
  {
    id: 'typewriter',
    name: 'Typewriter Effect',
    category: 'text',
    description: 'Text that types itself out and erases on a loop, with a blinking caret.',
    html: `<div class="typewriter">Hello, World!</div>`,
    css: `.typewriter {
  font-family: var(--font-geist-mono, ui-monospace, monospace);
  font-size: 1.6rem;
  font-weight: 600;
  color: #f59e0b;
  border-right: 3px solid #f59e0b;
  white-space: nowrap;
  overflow: hidden;
  width: 14ch;
  animation:
    type 3.5s steps(14) infinite,
    caret 0.8s step-end infinite;
}

@keyframes type {
  0%   { width: 0; }
  50%  { width: 14ch; }
  100% { width: 0; }
}

@keyframes caret {
  50% { border-color: transparent; }
}`,
  },
  {
    id: 'glitch',
    name: 'Glitch Text',
    category: 'text',
    description: 'RGB-split glitch distortion using duplicated pseudo-elements and clip-path.',
    html: `<div class="glitch" data-text="GLITCH">GLITCH</div>`,
    css: `.glitch {
  position: relative;
  font-size: 2.6rem;
  font-weight: 800;
  color: #f43f5e;
  letter-spacing: 0.05em;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  overflow: hidden;
}

.glitch::before {
  color: #10b981;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  animation: glitch-top 2s infinite linear alternate-reverse;
}

.glitch::after {
  color: #f59e0b;
  clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  animation: glitch-bottom 2.5s infinite linear alternate-reverse;
}

@keyframes glitch-top {
  0%   { transform: translate(0); }
  20%  { transform: translate(-3px, -2px); }
  40%  { transform: translate(3px, 1px); }
  60%  { transform: translate(-2px, 2px); }
  80%  { transform: translate(2px, -1px); }
  100% { transform: translate(0); }
}

@keyframes glitch-bottom {
  0%   { transform: translate(0); }
  20%  { transform: translate(3px, 2px); }
  40%  { transform: translate(-3px, -1px); }
  60%  { transform: translate(2px, -2px); }
  80%  { transform: translate(-2px, 1px); }
  100% { transform: translate(0); }
}`,
  },
  {
    id: 'neon-text',
    name: 'Neon Glow Text',
    category: 'text',
    description: 'Pink neon lettering with layered text-shadow glow and a subtle flicker.',
    html: `<div class="neon-text">NEON</div>`,
    css: `.neon-text {
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #f472b6;
  text-shadow:
    0 0 5px #f472b6,
    0 0 10px #f472b6,
    0 0 20px #ec4899,
    0 0 40px #ec4899,
    0 0 80px #ec4899;
  animation: neon-flicker 3s infinite;
}

@keyframes neon-flicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
  20%, 24%, 55% { opacity: 0.55; }
}`,
  },
  {
    id: 'layer3d-text',
    name: '3D Layered Text',
    category: 'text',
    description: 'Text given depth through a stack of progressively offset shadow layers.',
    html: `<div class="layer3d-text">DEPTH</div>`,
    css: `.layer3d-text {
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  color: #fb7185;
  text-shadow:
    1px 1px 0 #f43f5e,
    2px 2px 0 #e11d48,
    3px 3px 0 #be123c,
    4px 4px 0 #9f1239,
    5px 5px 0 #881337,
    6px 7px 12px rgba(0, 0, 0, 0.35);
}`,
  },

  // ----------------------------------------------------------------- CARDS
  {
    id: 'tilt-card',
    name: '3D Tilt Card',
    category: 'cards',
    description: 'A gradient card that lifts and tilts in 3D space with perspective on hover.',
    html: `<div class="tilt-card"></div>`,
    css: `.tilt-card {
  width: 160px;
  height: 200px;
  border-radius: 16px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  box-shadow: 0 15px 35px rgba(139, 92, 246, 0.4);
  transform: perspective(800px) rotateY(0) rotateX(0);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  cursor: pointer;
}

.tilt-card:hover {
  transform: perspective(800px) rotateY(-18deg) rotateX(12deg) scale(1.05);
  box-shadow: 0 30px 60px rgba(139, 92, 246, 0.5);
}`,
  },
  {
    id: 'reveal-card',
    name: 'Reveal Overlay Card',
    category: 'cards',
    description: 'A card whose hidden description panel slides up from the bottom on hover.',
    html: `<div class="reveal-card">
  <div class="rc-body">Hover Me</div>
  <div class="rc-overlay">Hidden details slide in smoothly when you hover.</div>
</div>`,
    css: `.reveal-card {
  position: relative;
  width: 220px;
  height: 150px;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, #10b981, #14b8a6);
  cursor: pointer;
}

.reveal-card .rc-body {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
}

.reveal-card .rc-overlay {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  background: rgba(15, 23, 42, 0.85);
  color: #fff;
  font-size: 0.85rem;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal-card:hover .rc-overlay { transform: translateY(0); }`,
  },
  {
    id: 'shine-card',
    name: 'Shine Sweep Card',
    category: 'cards',
    description: 'A diagonal light streak sweeps across the card surface on hover.',
    html: `<div class="shine-card">Shine</div>`,
    css: `.shine-card {
  position: relative;
  width: 200px;
  height: 130px;
  border-radius: 16px;
  background: linear-gradient(135deg, #f59e0b, #f43f5e);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
}

.shine-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  transform: skewX(-20deg);
}

.shine-card:hover::after { animation: shine-sweep 0.9s ease; }

@keyframes shine-sweep {
  100% { left: 125%; }
}`,
  },
  {
    id: 'gborder-card',
    name: 'Gradient Border Card',
    category: 'cards',
    description: 'A dark card framed by a conic-gradient border that rotates endlessly.',
    html: `<div class="gborder-card"><div class="gc-inner">Border</div></div>`,
    css: `.gborder-card {
  position: relative;
  width: 200px;
  height: 130px;
  border-radius: 16px;
  background: #0f172a;
  padding: 2px;
  overflow: hidden;
}

.gborder-card::before {
  content: "";
  position: absolute;
  inset: -50%;
  background: conic-gradient(
    from 0deg,
    #f43f5e, #f59e0b, #10b981, #8b5cf6, #ec4899, #f43f5e
  );
  animation: gborder-rotate 4s linear infinite;
  z-index: 0;
}

.gborder-card .gc-inner {
  position: relative;
  z-index: 1;
  height: 100%;
  border-radius: 14px;
  background: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f3f4f6;
  font-weight: 600;
}

@keyframes gborder-rotate {
  to { transform: rotate(360deg); }
}`,
  },
  {
    id: 'flip-card',
    name: 'Flip Card',
    category: 'cards',
    description: 'A card that rotates 180 degrees on hover to reveal content on its back face.',
    html: `<div class="flip-card">
  <div class="fc-inner">
    <div class="fc-face fc-front">Front</div>
    <div class="fc-face fc-back">Back</div>
  </div>
</div>`,
    css: `.flip-card {
  width: 200px;
  height: 140px;
  perspective: 1000px;
  cursor: pointer;
}

.flip-card .fc-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.7s;
}

.flip-card:hover .fc-inner { transform: rotateY(180deg); }

.flip-card .fc-face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  backface-visibility: hidden;
}

.flip-card .fc-front {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
}

.flip-card .fc-back {
  background: linear-gradient(135deg, #10b981, #14b8a6);
  transform: rotateY(180deg);
}`,
  },

  // ----------------------------------------------------------------- BACKGROUNDS
  {
    id: 'mesh-bg',
    name: 'Animated Gradient Mesh',
    category: 'backgrounds',
    description: 'Soft radial color blobs drift across a dark canvas to form a living mesh.',
    html: `<div class="mesh-bg"></div>`,
    css: `.mesh-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(244, 63, 94, 0.5), transparent 40%),
    radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.5), transparent 40%),
    radial-gradient(circle at 60% 80%, rgba(16, 185, 129, 0.5), transparent 40%),
    radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.5), transparent 40%),
    #0f172a;
  background-size: 200% 200%;
  animation: mesh-move 12s ease-in-out infinite;
}

@keyframes mesh-move {
  0%, 100% { background-position: 0% 0%, 100% 0%, 50% 100%, 0% 100%; }
  50%      { background-position: 50% 50%, 50% 50%, 50% 50%, 50% 50%; }
}`,
  },
  {
    id: 'particles-bg',
    name: 'Floating Particles',
    category: 'backgrounds',
    description: 'Multicolored particles rise upward and fade, generated purely with CSS.',
    html: `<div class="particles-bg">
  <span></span><span></span><span></span>
  <span></span><span></span><span></span>
</div>`,
    css: `.particles-bg {
  position: absolute;
  inset: 0;
  background: #0b1020;
  overflow: hidden;
}

.particles-bg span {
  position: absolute;
  bottom: -20px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0.8;
  animation: particles-rise linear infinite;
}

.particles-bg span:nth-child(1) { left: 10%; animation-duration: 7s;  background: #f43f5e; }
.particles-bg span:nth-child(2) { left: 25%; animation-duration: 9s;  background: #f59e0b; width: 6px; height: 6px; }
.particles-bg span:nth-child(3) { left: 40%; animation-duration: 6s;  background: #10b981; }
.particles-bg span:nth-child(4) { left: 55%; animation-duration: 10s; background: #8b5cf6; width: 5px; height: 5px; }
.particles-bg span:nth-child(5) { left: 70%; animation-duration: 8s;  background: #ec4899; }
.particles-bg span:nth-child(6) { left: 85%; animation-duration: 11s; background: #14b8a6; width: 7px; height: 7px; }

@keyframes particles-rise {
  0%   { transform: translateY(0); opacity: 0; }
  10%  { opacity: 0.9; }
  90%  { opacity: 0.9; }
  100% { transform: translateY(-260px); opacity: 0; }
}`,
  },
  {
    id: 'grid-bg',
    name: 'Pulsing Grid',
    category: 'backgrounds',
    description: 'A rose-colored neon grid that breathes by animating its tile size and opacity.',
    html: `<div class="grid-bg"></div>`,
    css: `.grid-bg {
  position: absolute;
  inset: 0;
  background-color: #0f172a;
  background-image:
    linear-gradient(rgba(244, 63, 94, 0.35) 1px, transparent 1px),
    linear-gradient(90deg, rgba(244, 63, 94, 0.35) 1px, transparent 1px);
  background-size: 32px 32px;
  animation: grid-pulse 3s ease-in-out infinite;
}

@keyframes grid-pulse {
  0%, 100% { background-size: 32px 32px; opacity: 0.5; }
  50%      { background-size: 44px 44px; opacity: 1; }
}`,
  },
  {
    id: 'aurora-bg',
    name: 'Aurora Waves',
    category: 'backgrounds',
    description: 'Two blurred radial blobs slowly drift and rotate to mimic aurora borealis.',
    html: `<div class="aurora-bg"></div>`,
    css: `.aurora-bg {
  position: absolute;
  inset: 0;
  background: #020617;
  overflow: hidden;
}

.aurora-bg::before,
.aurora-bg::after {
  content: "";
  position: absolute;
  width: 150%;
  height: 150%;
  top: -50%;
  left: -25%;
  filter: blur(40px);
  animation: aurora-move 14s ease-in-out infinite;
}

.aurora-bg::before {
  background: radial-gradient(circle, rgba(16, 185, 129, 0.55), transparent 60%);
}

.aurora-bg::after {
  background: radial-gradient(circle, rgba(236, 72, 153, 0.55), transparent 60%);
  animation-delay: -7s;
  animation-duration: 18s;
}

@keyframes aurora-move {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50%      { transform: translate(10%, -10%) rotate(20deg); }
}`,
  },

  // ----------------------------------------------------------------- BORDERS & MISC
  {
    id: 'conic-border',
    name: 'Rotating Conic Border',
    category: 'borders',
    description: 'A conic-gradient border whose angle rotates via the CSS @property Houdini API.',
    html: `<div class="conic-border">Houdini</div>`,
    css: `/* CSS Houdini: register a custom angle property so it can be animated */
@property --conic-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.conic-border {
  position: relative;
  padding: 0.9rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #f3f4f6;
  background: #0f172a;
  border-radius: 12px;
  z-index: 0;
}

.conic-border::before {
  content: "";
  position: absolute;
  inset: -3px;
  border-radius: 14px;
  background: conic-gradient(
    from var(--conic-angle),
    #f43f5e, #f59e0b, #10b981, #8b5cf6, #ec4899, #f43f5e
  );
  animation: conic-rotate 4s linear infinite;
  z-index: -1;
}

.conic-border::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: #0f172a;
  z-index: -1;
}

@keyframes conic-rotate {
  to { --conic-angle: 360deg; }
}`,
  },
  {
    id: 'dash-border',
    name: 'Marching Ants Border',
    category: 'borders',
    description: 'A dashed amber border that marches continuously around its element.',
    html: `<div class="dash-border">Selection</div>`,
    css: `.dash-border {
  position: relative;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #f59e0b;
  border-radius: 12px;
  background:
    repeating-linear-gradient(90deg, #f59e0b 0 8px, transparent 8px 16px) top    / 100% 3px no-repeat,
    repeating-linear-gradient(90deg, #f59e0b 0 8px, transparent 8px 16px) bottom / 100% 3px no-repeat,
    repeating-linear-gradient(0deg,  #f59e0b 0 8px, transparent 8px 16px) left   / 3px 100% no-repeat,
    repeating-linear-gradient(0deg,  #f59e0b 0 8px, transparent 8px 16px) right  / 3px 100% no-repeat;
  animation: dash-march 0.6s linear infinite;
}

@keyframes dash-march {
  to {
    background-position:
      top 16px 0,
      bottom 16px 0,
      left 0 16px,
      right 0 16px;
  }
}`,
  },
  {
    id: 'neu-toggle',
    name: 'Neumorphic Toggle',
    category: 'borders',
    description: 'A soft-UI switch that slides its knob and turns green when enabled.',
    html: `<input type="checkbox" id="neu-toggle-cb" class="neu-toggle-cb">
<label for="neu-toggle-cb" class="neu-toggle"></label>`,
    css: `.neu-toggle-cb { display: none; }

.neu-toggle {
  display: inline-block;
  width: 64px;
  height: 32px;
  border-radius: 999px;
  background: #e0e5ec;
  position: relative;
  cursor: pointer;
  box-shadow:
    inset 4px 4px 8px #b8bec7,
    inset -4px -4px 8px #ffffff;
  transition: background 0.3s ease;
}

.neu-toggle::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e0e5ec;
  box-shadow:
    3px 3px 6px #b8bec7,
    -3px -3px 6px #ffffff;
  transition: transform 0.3s ease, background 0.3s ease;
}

.neu-toggle-cb:checked + .neu-toggle::after {
  transform: translateX(32px);
  background: #10b981;
}`,
  },
  {
    id: 'check-anim',
    name: 'Animated Checkbox',
    category: 'borders',
    description: 'A custom checkbox that draws its checkmark stroke with a dash animation.',
    html: `<input type="checkbox" id="check-anim-cb" class="check-anim-cb">
<label for="check-anim-cb" class="check-anim">
  <span class="box">
    <svg viewBox="0 0 24 24"><polyline points="4 12 10 18 20 6"></polyline></svg>
  </span>
  <span>Toggle me</span>
</label>`,
    css: `.check-anim-cb { display: none; }

.check-anim {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-weight: 600;
  color: #f8fafc;
  user-select: none;
}

.check-anim .box {
  width: 28px;
  height: 28px;
  border: 2px solid #94a3b8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.check-anim .box svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: #fff;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  transition: stroke-dashoffset 0.4s ease 0.1s;
}

.check-anim-cb:checked + .check-anim .box {
  background: #10b981;
  border-color: #10b981;
}

.check-anim-cb:checked + .check-anim .box svg {
  stroke-dashoffset: 0;
}`,
  },
]

/** Combined CSS for every effect, injected once into the page. */
export const allEffectsCss = effects.map((e) => e.css).join('\n\n')
