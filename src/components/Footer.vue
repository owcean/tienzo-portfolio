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

function initParticles(canvas, container) {  const ctx = canvas.getContext('2d')
  let W = 0, H = 0

  function resize() {
    const rect = container.getBoundingClientRect()
    W = canvas.width  = rect.width  || window.innerWidth
    H = canvas.height = rect.height || 320
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(container)

  const COLORS = [
    { r: 245, g: 200, b: 160 },
    { r: 220, g: 160, b: 110 },
    { r: 255, g: 220, b: 180 },
    { r: 192, g: 130, b: 90  },
    { r: 255, g: 240, b: 200 },
  ]

  function spawnFirefly() {
    const col = COLORS[Math.floor(Math.random() * COLORS.length)]
    return {
      x:        Math.random() * (W || 800),
      y:        Math.random() * (H || 320),
      r:        Math.random() * 1.6 + 0.6,
      col,
      blinkPh:  Math.random() * Math.PI * 2,
      blinkSpd: Math.random() * 0.018 + 0.008,
      blinkAmp: Math.random() * 0.35 + 0.25,
      baseA:    Math.random() * 0.22 + 0.12,
      angle:    Math.random() * Math.PI * 2,
      turnSpd:  (Math.random() - 0.5) * 0.04,
      speed:    Math.random() * 0.32 + 0.10,
      tail:     [],
      tailLen:  Math.floor(Math.random() * 8 + 4),
    }
  }

  const COUNT = 32
  const flies = Array.from({ length: COUNT }, spawnFirefly)

  function drawFirefly(f) {
    const alpha = f.baseA + Math.sin(f.blinkPh) * f.blinkAmp
    const a     = Math.max(0, Math.min(1, alpha))
    const { r, g, b } = f.col
    for (let i = 0; i < f.tail.length; i++) {
      const t    = f.tail[i]
      const frac = i / f.tail.length
      ctx.beginPath()
      ctx.arc(t.x, t.y, f.r * frac * 0.6, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r},${g},${b},${a * frac * 0.18})`
      ctx.fill()
    }
    const halo = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 9)
    halo.addColorStop(0,    `rgba(${r},${g},${b},${a * 0.28})`)
    halo.addColorStop(0.35, `rgba(${r},${g},${b},${a * 0.10})`)
    halo.addColorStop(1,    `rgba(${r},${g},${b},0)`)
    ctx.beginPath()
    ctx.arc(f.x, f.y, f.r * 9, 0, Math.PI * 2)
    ctx.fillStyle = halo
    ctx.fill()
    const core = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 1.6)
    core.addColorStop(0,   `rgba(255,248,230,${a * 0.95})`)
    core.addColorStop(0.4, `rgba(${r},${g},${b},${a * 0.85})`)
    core.addColorStop(1,   `rgba(${r},${g},${b},0)`)
    ctx.beginPath()
    ctx.arc(f.x, f.y, f.r * 1.6, 0, Math.PI * 2)
    ctx.fillStyle = core
    ctx.fill()
  }

  function draw() {
    ctx.clearRect(0, 0, W, H)
    for (const f of flies) {
      f.blinkPh += f.blinkSpd
      f.angle   += f.turnSpd + Math.sin(f.blinkPh * 0.3) * 0.012
      f.x += Math.cos(f.angle) * f.speed
      f.y += Math.sin(f.angle) * f.speed
      if (f.x < 0) { f.x = 0; f.angle = Math.PI - f.angle }
      if (f.x > W) { f.x = W; f.angle = Math.PI - f.angle }
      if (f.y < 0) { f.y = 0; f.angle = -f.angle }
      if (f.y > H) { f.y = H; f.angle = -f.angle }
      f.tail.unshift({ x: f.x, y: f.y })
      if (f.tail.length > f.tailLen) f.tail.pop()
      drawFirefly(f)
    }
    animId = requestAnimationFrame(draw)
  }
  draw()
  return () => { cancelAnimationFrame(animId); ro.disconnect() }
}

let cleanup = null
onMounted(() => {
  if (canvasEl.value && footerEl.value) {
    cleanup = initParticles(canvasEl.value, footerEl.value)
  }
})
onUnmounted(() => cleanup?.())
</script>