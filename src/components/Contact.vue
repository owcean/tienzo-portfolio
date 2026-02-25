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
              <a href="https://instagram.com" target="_blank" aria-label="Instagram" class="icon-link">
                <img src="/instagram.png" alt="Instagram" class="social-icon-img" />
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

function initParticles(canvas) {
  const ctx = canvas.getContext('2d')
  let W = 0, H = 0

  function resize() {
    W = canvas.width  = window.innerWidth
    H = canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const PALETTE = [
    'rgba(138,74,58,',
    'rgba(110,52,40,',
    'rgba(160,90,70,',
    'rgba(192,112,96,',
    'rgba(80,42,36,',
  ]

  const COUNT = 70
  const particles = Array.from({ length: COUNT }, () => spawn())

  function spawn() {
    return {
      x:   Math.random() * (W || 1200),
      y:   Math.random() * (H || 800),
      r:   Math.random() * 2.8 + 0.7,
      vx:  (Math.random() - 0.5) * 0.36,
      vy:  (Math.random() - 0.5) * 0.36,
      col: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      a:   Math.random() * 0.40 + 0.15,
      pa:  Math.random() * Math.PI * 2,
      ps:  Math.random() * 0.011 + 0.004,
    }
  }

  const CONN = 130

  function draw() {
    ctx.clearRect(0, 0, W, H)
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy; p.pa += p.ps
      if (p.x < -10) p.x = W + 10
      if (p.x > W + 10) p.x = -10
      if (p.y < -10) p.y = H + 10
      if (p.y > H + 10) p.y = -10
      const alpha = p.a + Math.sin(p.pa) * 0.12
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
          ctx.strokeStyle = `rgba(110,52,40,${r * 0.28})`
          ctx.lineWidth   = r * 1.0
          ctx.stroke()
        }
      }
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