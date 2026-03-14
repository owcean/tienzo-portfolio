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

// ── Particle system ──────────────────────────────────
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

  const PALETTE = [
    'rgba(192,112,96,',
    'rgba(166,118,99,',
    'rgba(231,193,184,',
    'rgba(138,74,58,',
    'rgba(210,160,130,',
  ];

  const COUNT = 65;
  const CONN  = 130;

  const particles = Array.from({ length: COUNT }, () => ({
    x:   Math.random() * window.innerWidth,
    y:   Math.random() * window.innerHeight,
    r:   Math.random() * 2.2 + 0.6,
    vx:  (Math.random() - 0.5) * 0.35,
    vy:  (Math.random() - 0.5) * 0.35,
    col: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    a:   Math.random() * 0.28 + 0.08,
    pa:  Math.random() * Math.PI * 2,
    ps:  Math.random() * 0.012 + 0.004,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (const p of particles) {
      p.x += p.vx; p.y += p.vy; p.pa += p.ps;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      const alpha = p.a + Math.sin(p.pa) * 0.06;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + alpha + ')';
      ctx.fill();
    }

    // Draw connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CONN) {
          const ratio = 1 - d / CONN;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(166,118,99,${ratio * 0.18})`;
          ctx.lineWidth   = ratio * 0.9;
          ctx.stroke();
        }
      }
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