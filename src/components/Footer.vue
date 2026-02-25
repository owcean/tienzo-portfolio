<template>
  <footer class="site-footer" ref="footerEl">

    <!-- Particle canvas — same system as projects section -->
    <canvas class="footer-canvas" ref="canvasEl"></canvas>

    <!-- Subtle top glow line -->
    <div class="footer-glow-line"></div>

    <div class="footer-inner">

      <!-- LEFT: headline + description -->
      <div class="footer-left">
        <div class="footer-eyebrow">
          <span class="eyebrow-dot"></span>
          Available for work
          <span class="eyebrow-dot"></span>
        </div>
        <h2 class="footer-heading">
          Let's <em>Connect.</em>
        </h2>
        <p class="footer-desc">
          Whether you're searching for a dedicated developer to
          bring ideas to life or simply want to chat, I'd love to hear
          from you.
        </p>
      </div>

      <!-- RIGHT: email + socials -->
      <div class="footer-right">
        <a href="mailto:tienzokrisean@gmail.com" class="footer-email">
          <span class="email-label">Drop a message</span>
          <span class="email-addr">tienzokrisean@gmail.com</span>
        </a>

        <div class="footer-socials">
          <a href="https://linkedin.com/in/krisean-tienzo" target="_blank" aria-label="LinkedIn" class="social-icon-link">
            <img src="/linkedin.png" alt="LinkedIn" />
          </a>
          <a href="https://github.com/owcean" target="_blank" aria-label="GitHub" class="social-icon-link">
            <img src="/github.png" alt="GitHub" />
          </a>
          <a href="https://www.facebook.com/kgtnzo" target="_blank" aria-label="Facebook" class="social-icon-link">
            <img src="/facebook.png" alt="Facebook" />
          </a>
          <a href="https://instagram.com" target="_blank" aria-label="Instagram" class="social-icon-link">
            <img src="/instagram.png" alt="Instagram" />
          </a>
        </div>
      </div>

    </div>

    <!-- Bottom bar -->
    <div class="footer-bar">
      <span class="footer-copy">© 2026 Krisean Tienzo. All rights reserved.</span>
      <span class="footer-made">Designed & Built with ♥</span>
    </div>

  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasEl = ref(null)
const footerEl = ref(null)
let animId     = null

function initParticles(canvas, container) {
  const ctx = canvas.getContext('2d')
  let W = 0, H = 0

  function resize() {
    const rect = container.getBoundingClientRect()
    W = canvas.width  = rect.width  || window.innerWidth
    H = canvas.height = rect.height || 320
  }
  resize()

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)

  // Same dark rose/brown palette as projects section
  const PALETTE = [
    'rgba(138,74,58,',
    'rgba(110,52,40,',
    'rgba(160,90,70,',
    'rgba(192,112,96,',
    'rgba(80,42,36,',
  ]

  const COUNT = 55
  const particles = Array.from({ length: COUNT }, () => spawn())

  function spawn() {
    return {
      x:  Math.random() * (W || 800),
      y:  Math.random() * (H || 320),
      r:  Math.random() * 3.0 + 0.7,
      vx: (Math.random() - 0.5) * 0.36,
      vy: (Math.random() - 0.5) * 0.36,
      col: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      a:  Math.random() * 0.42 + 0.16,
      pa: Math.random() * Math.PI * 2,
      ps: Math.random() * 0.012 + 0.004,
    }
  }

  const CONN = 140

  function draw() {
    ctx.clearRect(0, 0, W, H)

    for (const p of particles) {
      p.x  += p.vx
      p.y  += p.vy
      p.pa += p.ps
      if (p.x < -10) p.x = W + 10
      if (p.x > W + 10) p.x = -10
      if (p.y < -10) p.y = H + 10
      if (p.y > H + 10) p.y = -10

      const alpha = p.a + Math.sin(p.pa) * 0.13
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = p.col + alpha + ')'
      ctx.fill()
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < CONN) {
          const r = 1 - d / CONN
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(110,52,40,${r * 0.30})`
          ctx.lineWidth   = r * 1.1
          ctx.stroke()
        }
      }
    }

    animId = requestAnimationFrame(draw)
  }

  draw()

  return () => {
    cancelAnimationFrame(animId)
    resizeObserver.disconnect()
  }
}

let cleanup = null
onMounted(() => {
  if (canvasEl.value && footerEl.value) {
    cleanup = initParticles(canvasEl.value, footerEl.value)
  }
})
onUnmounted(() => cleanup?.())
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

/* ── Tokens (mirror projects section) ── */
:root {
  --fp-bg:           #faf7f4;
  --fp-accent:       #c07060;
  --fp-accent-soft:  #e8c4b8;
  --fp-accent-deep:  #8a4a3a;
  --fp-text-dark:    #1a1210;
  --fp-text-muted:   #5a3e38;
  --fp-border:       rgba(192,112,96,0.14);
}

/* ── Shell ── */
.site-footer {
  position: relative;
  background: #faf7f4;
  border-top: 1px solid rgba(192,112,96,0.15);
  padding: 44px 6vw 20px;
  font-family: 'DM Sans', sans-serif;
  overflow: hidden;
  isolation: isolate;
}

/* Particle canvas — fills footer */
.footer-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* Glowing top accent line */
.footer-glow-line {
  position: absolute;
  top: 0; left: 10%; right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(192,112,96,0.55) 40%,
    rgba(232,196,184,0.7) 50%,
    rgba(192,112,96,0.55) 60%,
    transparent 100%
  );
  z-index: 1;
  animation: glowPulse 4s ease-in-out infinite;
}

@keyframes glowPulse {
  0%,100% { opacity: .5; }
  50%     { opacity: 1;  }
}

/* ── TWO-COLUMN INNER ── */
.footer-inner {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(192,112,96,0.12);
}

/* ── LEFT ── */
.footer-left {
  flex: 1;
  max-width: 520px;
}

/* Eyebrow label */
.footer-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(192,112,96,0.7);
  margin-bottom: 12px;
}

.eyebrow-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #c07060;
  animation: dotPulse 2.2s ease-in-out infinite;
}
.eyebrow-dot:last-child { animation-delay: 1.1s; }

@keyframes dotPulse {
  0%,100% { opacity: 1;  transform: scale(1);   }
  50%     { opacity: .3; transform: scale(2.2); }
}

/* Heading — animated gradient shimmer matching .projects-title */
.footer-heading {
  font-family: 'Syne', sans-serif;
  font-size: clamp(34px, 4vw, 54px);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.04em;
  margin-bottom: 14px;

  background: linear-gradient(
    120deg,
    #8a4a3a  0%,
    #c07060  28%,
    #d49070  52%,
    #e8c4b8  68%,
    #c07060  82%,
    #8a4a3a  100%
  );
  background-size: 250% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleShimmer 5s linear infinite;
}

@keyframes titleShimmer {
  0%   { background-position: 0% center; }
  100% { background-position: 250% center; }
}

.footer-heading em {
  font-style: italic;
}

.footer-desc {
  font-family: 'DM Sans', sans-serif;
  font-size: 13.5px;
  line-height: 1.85;
  color: #5a3e38;
  font-weight: 300;
  max-width: 380px;
}

/* ── RIGHT ── */
.footer-right {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
  padding-top: 14px;
}

/* Email block */
.footer-email {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  text-decoration: none;
  transition: transform .25s ease;
}
.footer-email:hover { transform: translateY(-2px); }

.email-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(192,112,96,0.55);
}

.email-addr {
  font-family: 'DM Sans', sans-serif;
  font-size: 14.5px;
  font-weight: 500;
  color: #1a1210;
  letter-spacing: 0.01em;
  transition: color .22s;
}
.footer-email:hover .email-addr { color: #c07060; }

/* Social icons */
.footer-socials {
  display: flex;
  gap: 12px;
  align-items: center;
}

.social-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(192,112,96,0.22);
  background: rgba(250,247,244,0.6);
  backdrop-filter: blur(8px);
  transition: background .28s, border-color .28s, transform .28s, box-shadow .28s;
}
.social-icon-link img {
  width: 17px;
  height: 17px;
  object-fit: contain;
  opacity: 0.55;
  transition: opacity .25s, transform .25s;
  /* tint icons to match brand */
  filter: sepia(40%) saturate(80%);
}
.social-icon-link:hover {
  background: rgba(192,112,96,0.1);
  border-color: #c07060;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(192,112,96,0.2);
}
.social-icon-link:hover img {
  opacity: 1;
  transform: scale(1.12);
  filter: sepia(60%) saturate(120%);
}

/* ── BOTTOM BAR ── */
.footer-bar {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  margin: 16px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-copy,
.footer-made {
  font-size: 11px;
  font-weight: 400;
  color: rgba(90,62,56,0.38);
  letter-spacing: 0.5px;
}

.footer-made {
  color: rgba(192,112,96,0.5);
}

/* ── RESPONSIVE ── */
@media (max-width: 720px) {
  .footer-inner {
    flex-direction: column;
    gap: 36px;
  }
  .footer-right { align-items: flex-start; }
  .footer-email { align-items: flex-start; }
  .footer-bar {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  .footer-heading { font-size: clamp(36px, 9vw, 56px); }
}
</style>