<template>
  <section class="projects-section" :class="{ loaded: isLoaded }">

    <!-- Particle canvas -->
    <canvas id="particle-canvas" ref="canvasEl"></canvas>

    <!-- Header -->
    <div class="projects-header">
      <h1 class="projects-title stag-1">Designed. Built. Shipped.</h1>
      <p class="projects-sub stag-2">A selection of projects where creativity, functionality, and thoughtful design come together.</p>
    </div>

    <!-- Horizontal stacked cards -->
    <div class="stack-stage stag-3">
      <div
        class="stack-rail"
        :style="{ width: railW + 'px' }"
      >
        <div
          v-for="(project, i) in projects"
          :key="project.id"
          class="p-card"
          :class="{ active: activeIndex === i }"
          :data-dist="Math.abs(i - activeIndex)"
          :style="cardStyle(i)"
          @click="setActive(i)"
        >
          <!-- Collapsed peek label -->
          <div class="card-collapsed-label">
            <span class="ccl-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="ccl-title">{{ project.title }}</span>
          </div>

          <!-- Expanded landscape layout -->
          <div class="card-expanded">

            <!-- Top title bar -->
            <div class="card-header">
              <div class="card-header-inner">
                <h3 class="card-title-main">{{ project.title }}</h3>
                <span class="card-cat-badge">{{ project.category }}</span>
              </div>
            </div>

            <!-- Image left + Info right -->
            <div class="card-content-row">

              <!-- Image column -->
              <div class="card-img-col">
                <img :src="project.mainImage" :alt="project.title" class="card-img" />
                <div class="card-img-shine"></div>
              </div>

              <!-- Info column -->
              <div class="card-info-col">
                <p class="card-desc">{{ project.description }}</p>

                <div class="card-info-spacer"></div>

                <div class="card-tags">
                  <span v-for="t in project.tools" :key="t" class="ctag">{{ t }}</span>
                </div>

                <div class="card-actions">
                  <a :href="project.repo" target="_blank" rel="noopener" class="btn-ghost">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    Code
                  </a>
                  <a :href="project.demo" target="_blank" rel="noopener" class="btn-ghost">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Live
                  </a>
                  <a :href="project.demo" target="_blank" rel="noopener" class="btn-filled">
                    Explore +
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="stack-nav stag-4">
      <button class="nav-arr" @click="prev" :disabled="activeIndex === 0" aria-label="Previous">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="nav-dots">
        <button
          v-for="(_, i) in projects"
          :key="i"
          class="ndot"
          :class="{ on: activeIndex === i }"
          @click="setActive(i)"
        ></button>
      </div>
      <button class="nav-arr" @click="next" :disabled="activeIndex === projects.length - 1" aria-label="Next">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>

  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import '../assets/project.css'

// ── State ──────────────────────────────────────
const isLoaded    = ref(false)
const activeIndex = ref(2)
const canvasEl    = ref(null)

// ── Card dimensions ────────────────────────────
const CARD_H   = 440   // active card height (landscape)
const ACTIVE_W = 760   // active card width  (landscape)
const PEEK_W   = 82    // collapsed card peek width

const projects = ref([
  {
    id: 1, title: 'StudioSpot', category: 'Web Development',
    description: 'A platform for creative spaces with seamless booking and modern UI/UX. Built with Vue.js with a clean, editorial aesthetic for easy navigation and discovery.',
    tools: ['Vue.js', 'CSS3', 'JavaScript', 'Firebase'],
    mainImage: '/project.png',
    demo: 'https://github.com/owcean/StudioSpot',
    repo: 'https://github.com/owcean/StudioSpot.git',
  },
  {
    id: 2, title: 'Crumbs & Layer', category: 'E-commerce Concept',
    description: 'Bespoke cake business interface blending baking passion with clean frontend code. Features a custom cake builder, product gallery, and responsive checkout flow.',
    tools: ['HTML5', 'CSS3', 'JavaScript', 'Figma'],
    mainImage: '/project.png',
    demo: 'https://github.com/owcean/Crumbs-Layer',
    repo: 'https://github.com/owcean/Crumbs-Layer.git',
  },
  {
    id: 3, title: 'Bloom Blossom Florals', category: 'Frontend Design',
    description: 'Elegant floral shop showcasing editorial HTML/CSS/JS design. Features animated product cards, a filterable catalogue, and a soft organic visual language.',
    tools: ['HTML5', 'CSS3', 'JavaScript'],
    mainImage: '/project.png',
    demo: 'https://github.com/owcean/Bloom-Blossom-Florals',
    repo: 'https://github.com/owcean/Bloom-Blossom-Florals.git',
  },
  {
    id: 4, title: 'Portfolio 2026', category: 'Vue & Web Design',
    description: 'Modern editorial portfolio featuring cinematic hero animations, orb backgrounds, and a rose gold design system. Built entirely in Vue 3 with scoped CSS.',
    tools: ['Vue 3', 'CSS3', 'Figma', 'Vite'],
    mainImage: '/project.png',
    demo: 'https://github.com/owcean',
    repo: 'https://github.com/owcean',
  },
  {
    id: 5, title: 'Pulse Dashboard', category: 'UI/UX Design',
    description: 'Analytics dashboard with real-time data visualisation, dark mode toggle, and a component library built from scratch. Focused on clarity and data density.',
    tools: ['Vue 3', 'D3.js', 'CSS3', 'Vite'],
    mainImage: '/project.png',
    demo: 'https://github.com/owcean',
    repo: 'https://github.com/owcean',
  },
])

const n     = computed(() => projects.value.length)
const railW = computed(() => ACTIVE_W + (n.value - 1) * PEEK_W)

function cardStyle(i) {
  const a   = activeIndex.value
  const rel = i - a
  const isActive = rel === 0
  const dist = Math.abs(rel)

  // Accumulate left by summing widths before card i
  let left = 0
  for (let j = 0; j < i; j++) {
    left += (j === a ? ACTIVE_W : PEEK_W)
  }

  const height   = isActive ? CARD_H : Math.round(CARD_H * Math.max(0.88, 1 - dist * 0.035))
  const yShift   = isActive ? '-50%' : `calc(-50% + ${dist * 8}px)`
  const z        = n.value - dist

  return {
    left:      left + 'px',
    width:     (isActive ? ACTIVE_W : PEEK_W) + 'px',
    height:    height + 'px',
    top:       '50%',
    transform: `translateY(${yShift})`,
    zIndex:    z,
  }
}

function setActive(i) { activeIndex.value = i }
function next() { if (activeIndex.value < projects.value.length - 1) activeIndex.value++ }
function prev() { if (activeIndex.value > 0) activeIndex.value-- }
function onKey(e) {
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft')  prev()
}

// ── Particle system ────────────────────────────
let animId = null

function initParticles(canvas) {
  const ctx = canvas.getContext('2d')
  let W = 0, H = 0

  function resize() {
    W = canvas.width  = window.innerWidth
    H = canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  // Colour palette matching brand — darker values
  const PALETTE = [
    'rgba(138,74,58,',   // deep rose — dark
    'rgba(110,52,40,',   // very deep rose
    'rgba(160,90,70,',   // mid rose
    'rgba(192,112,96,',  // rose accent
    'rgba(80,42,36,',    // near-brown dark
  ]

  const COUNT = 65
  const particles = Array.from({ length: COUNT }, () => makeParticle(W, H, PALETTE))

  function makeParticle(W, H, PAL) {
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 3.2 + 0.8,
      vx:   (Math.random() - 0.5) * 0.38,
      vy:   (Math.random() - 0.5) * 0.38,
      col:  PAL[Math.floor(Math.random() * PAL.length)],
      a:    Math.random() * 0.45 + 0.18,   // much higher base opacity
      // pulse
      pa:   Math.random() * Math.PI * 2,
      ps:   Math.random() * 0.012 + 0.004,
    }
  }

  const CONNECTION_DIST = 145

  function draw() {
    ctx.clearRect(0, 0, W, H)

    // update + draw particles
    for (const p of particles) {
      p.x  += p.vx
      p.y  += p.vy
      p.pa += p.ps
      const alpha = p.a + Math.sin(p.pa) * 0.14

      // wrap
      if (p.x < -10) p.x = W + 10
      if (p.x > W + 10) p.x = -10
      if (p.y < -10) p.y = H + 10
      if (p.y > H + 10) p.y = -10

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = p.col + alpha + ')'
      ctx.fill()
    }

    // draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < CONNECTION_DIST) {
          const ratio = 1 - dist / CONNECTION_DIST
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(110,52,40,${ratio * 0.32})`
          ctx.lineWidth = ratio * 1.2
          ctx.stroke()
        }
      }
    }

    animId = requestAnimationFrame(draw)
  }

  draw()

  return () => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  }
}

let cleanupParticles = null

onMounted(() => {
  setTimeout(() => { isLoaded.value = true }, 80)
  window.addEventListener('keydown', onKey)
  if (canvasEl.value) {
    cleanupParticles = initParticles(canvasEl.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  cleanupParticles?.()
})
</script>