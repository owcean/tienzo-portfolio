<template>
  <main class="contact-page" :class="{ 'start-animation': isVisible }">

    <!-- Particle canvas — full page -->
    <canvas class="bg-canvas" ref="canvasEl"></canvas>

    <!-- Ambient orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    <div class="grain"></div>

    <!-- Single centred container -->
    <div class="contact-container">

      <!-- ── Left: Info ── -->
      <div class="info-col">
        <span class="info-eyebrow reveal-up">Let's Work Together</span>
        <h1 class="huge-text">
          <span class="word-reveal"><span>HELLO.</span></span>
        </h1>
        <p class="description-text reveal-up">
          Need a beautiful website you can maintain yourself?<br>
          Get in touch — I'd love to hear from you.
        </p>

        <div class="contact-list reveal-up">
          <div class="contact-item">
            <label>Email</label>
            <a href="mailto:tienzokrisean@gmail.com" class="email-link">tienzokrisean@gmail.com</a>
          </div>
          <div class="contact-item">
            <label>Location</label>
            <p>Angeles, Pampanga</p>
          </div>
          <div class="contact-item">
            <label>Socials</label>
            <div class="social-icons-grid">
              <a href="https://linkedin.com/in/krisean-tienzo" target="_blank" aria-label="LinkedIn" class="icon-link">
                <img src="/linkedin.png" alt="LinkedIn" class="social-icon-img" />
              </a>
              <a href="https://github.com/owcean" target="_blank" aria-label="GitHub" class="icon-link">
                <img src="/github.png" alt="GitHub" class="social-icon-img" />
              </a>
              <a href="https://www.facebook.com/kgtnzo" target="_blank" aria-label="Facebook" class="icon-link">
                <img src="/facebook.png" alt="Facebook" class="social-icon-img" />
              </a>               
            </div>
          </div>
        </div>
      </div>

      <!-- ── Right: Glass form card ── -->
      <div class="glass-card reveal-up">

        <div v-if="submitted" class="success-state">
          <div class="success-icon">✓</div>
          <h2 class="form-title">Message Sent</h2>
          <p class="form-subtitle">Thank you! I'll get back to you at tienzokrisean@gmail.com shortly.</p>
          <button @click="submitted = false" class="submit-btn refresh-btn">Send Another</button>
        </div>

        <div v-else>
          <div class="form-header">
            <span class="form-tag">New Message</span>
            <h2 class="form-title">Send a Message</h2>
            <p class="form-subtitle">I usually reply within 24 hours.</p>
          </div>

          <form
            action="https://formspree.io/f/xpqjygkd"
            method="POST"
            @submit.prevent="handleSubmit"
            class="message-form"
          >
            <div class="input-row">
              <div class="input-field">
                <label>Name</label>
                <input type="text" name="name" placeholder="Your Name" required />
              </div>
              <div class="input-field">
                <label>Email</label>
                <input type="email" name="email" placeholder="email@example.com" required />
              </div>
            </div>

            <div class="input-field">
              <label>Subject</label>
              <input type="text" name="subject" placeholder="Project inquiry..." />
            </div>

            <div class="input-field">
              <label>Message</label>
              <textarea name="message" placeholder="Tell me about your project..." rows="5" required></textarea>
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span class="submit-label">{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
              <span v-if="!isSubmitting" class="submit-arrow">→</span>
              <div class="submit-glow"></div>
            </button>
          </form>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import '../assets/contact.css'

const isVisible    = ref(false)
const isSubmitting = ref(false)
const submitted    = ref(false)
const canvasEl     = ref(null)
let animId         = null

function initParticles(canvas) {  const ctx = canvas.getContext('2d')
  let W = 0, H = 0

  function resize() {
    W = canvas.width  = window.innerWidth
    H = canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

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
    }
  }

  const COUNT = 55
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
  return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
}

const handleSubmit = async (event) => {
  isSubmitting.value = true
  const form = event.target
  const formData = new FormData(form)
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    if (res.ok) { submitted.value = true; form.reset() }
    else alert('Submission failed. Please try again.')
  } catch { alert('Error connecting to the server.') }
  finally { isSubmitting.value = false }
}

let cleanup = null
onMounted(() => {
  setTimeout(() => { isVisible.value = true }, 100)
  if (canvasEl.value) cleanup = initParticles(canvasEl.value)
})
onUnmounted(() => cleanup?.())
</script>