<template>
  <div id="app" :data-theme="theme">

    <!-- ══ PRELOADER ══ -->
    <Transition name="preloader-fade">
      <div v-if="showLanding" class="preloader-wrap">

        <!-- Particle canvas -->
        <canvas ref="canvasEl" class="pre-canvas"></canvas>

        <!-- Ambient orbs -->
        <div class="pre-orb pre-orb--1"></div>
        <div class="pre-orb pre-orb--2"></div>
        <div class="pre-orb pre-orb--3"></div>

        <!-- Grain texture -->
        <div class="pre-grain"></div>

        <!-- Content -->
        <div class="pre-content" :class="{ visible: isVisible }">

          <!-- Eyebrow -->
          <div class="pre-eyebrow">
            <span class="pre-dot"></span>
            Portfolio
            <span class="pre-dot"></span>
          </div>

          <!-- Name chars -->
          <h1 class="pre-name">
            <span
              v-for="(l, i) in 'KRISEAN'"
              :key="i"
              class="pre-char"
              :style="{ transitionDelay: `${i * 0.08 + 0.1}s` }"
            >{{ l }}</span>
          </h1>

          <!-- Role line -->
          <p class="pre-role" :style="{ transitionDelay: '0.75s' }">
            Front-end Developer &amp; UI/UX Designer
          </p>

          <!-- Progress bar -->
          <div class="pre-bar-wrap" :style="{ transitionDelay: '0.85s' }">
            <div class="pre-bar" :style="{ width: progress + '%' }"></div>
          </div>

          <!-- Counter -->
          <span class="pre-counter" :style="{ transitionDelay: '0.9s' }">
            {{ progress }}<span class="pre-pct">%</span>
          </span>

        </div>
      </div>
    </Transition>

    <!-- ══ MAIN APP ══ -->
    <div v-if="!showLanding">
      <Navbar :theme="theme" @toggle-theme="toggleTheme" />
      <router-view />
      <Footer />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const isVisible   = ref(false);
const showLanding = ref(true);
const progress    = ref(0);
const theme       = ref('light');
const canvasEl    = ref(null);

const applyTheme = (value) => {
  document.documentElement.setAttribute('data-theme', value);
  localStorage.setItem('theme', value);
};

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  applyTheme(theme.value);
};

provide('theme', theme);
provide('toggleTheme', toggleTheme);

// ── Fireflies ────────────────────────────────────────────────
function initParticles(canvas) {
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  let animId = null;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = [
    { r: 245, g: 200, b: 160 },
    { r: 220, g: 160, b: 110 },
    { r: 255, g: 220, b: 180 },
    { r: 192, g: 130, b: 90  },
    { r: 255, g: 240, b: 200 },
  ];

  function spawnFirefly() {
    const col = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x:        Math.random() * W,
      y:        Math.random() * H,
      r:        Math.random() * 1.8 + 0.8,
      col,
      blinkPh:  Math.random() * Math.PI * 2,
      blinkSpd: Math.random() * 0.018 + 0.008,
      blinkAmp: Math.random() * 0.35 + 0.25,
      baseA:    Math.random() * 0.25 + 0.15,
      angle:    Math.random() * Math.PI * 2,
      turnSpd:  (Math.random() - 0.5) * 0.04,
      speed:    Math.random() * 0.38 + 0.12,
      tail:     [],
      tailLen:  Math.floor(Math.random() * 10 + 6),
    };
  }

  const COUNT = 55;
  const flies = Array.from({ length: COUNT }, spawnFirefly);

  function drawFirefly(f) {
    const alpha = f.baseA + Math.sin(f.blinkPh) * f.blinkAmp;
    const a     = Math.max(0, Math.min(1, alpha));
    const { r, g, b } = f.col;

    for (let i = 0; i < f.tail.length; i++) {
      const t    = f.tail[i];
      const frac = i / f.tail.length;
      ctx.beginPath();
      ctx.arc(t.x, t.y, f.r * frac * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${a * frac * 0.18})`;
      ctx.fill();
    }

    const halo = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 9);
    halo.addColorStop(0,    `rgba(${r},${g},${b},${a * 0.28})`);
    halo.addColorStop(0.35, `rgba(${r},${g},${b},${a * 0.10})`);
    halo.addColorStop(1,    `rgba(${r},${g},${b},0)`);
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r * 9, 0, Math.PI * 2);
    ctx.fillStyle = halo;
    ctx.fill();

    const core = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 1.6);
    core.addColorStop(0,   `rgba(255,248,230,${a * 0.95})`);
    core.addColorStop(0.4, `rgba(${r},${g},${b},${a * 0.85})`);
    core.addColorStop(1,   `rgba(${r},${g},${b},0)`);
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r * 1.6, 0, Math.PI * 2);
    ctx.fillStyle = core;
    ctx.fill();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const f of flies) {
      f.blinkPh += f.blinkSpd;
      f.angle   += f.turnSpd + Math.sin(f.blinkPh * 0.3) * 0.012;
      f.x += Math.cos(f.angle) * f.speed;
      f.y += Math.sin(f.angle) * f.speed;
      if (f.x < 0) { f.x = 0; f.angle = Math.PI - f.angle; }
      if (f.x > W) { f.x = W; f.angle = Math.PI - f.angle; }
      if (f.y < 0) { f.y = 0; f.angle = -f.angle; }
      if (f.y > H) { f.y = H; f.angle = -f.angle; }
      f.tail.unshift({ x: f.x, y: f.y });
      if (f.tail.length > f.tailLen) f.tail.pop();
      drawFirefly(f);
    }
    animId = requestAnimationFrame(draw);
  }

  draw();
  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
  };
}

onMounted(() => {
  const saved = localStorage.getItem('theme');
  if (saved) {
    theme.value = saved;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark';
  }
  applyTheme(theme.value);

  // Start particles
  let cleanupParticles = null;
  if (canvasEl.value) {
    cleanupParticles = initParticles(canvasEl.value);
  }

  // Trigger entrance animations
  setTimeout(() => { isVisible.value = true; }, 100);

  // Progress bar ease-out animation
  const duration = 2000;
  const interval = 30;
  const steps    = duration / interval;
  let current    = 0;
  const timer = setInterval(() => {
    current++;
    progress.value = Math.round(100 * (1 - Math.pow(1 - current / steps, 2)));
    if (current >= steps) {
      progress.value = 100;
      clearInterval(timer);
    }
  }, interval);

  // Hide preloader, then clean up canvas
  setTimeout(() => {
    showLanding.value = false;
    setTimeout(() => { cleanupParticles?.(); }, 700);
  }, 2600);
});
</script>