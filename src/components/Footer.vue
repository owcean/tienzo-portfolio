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
import '../assets/foot-nav.css'

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

