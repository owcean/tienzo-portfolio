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

              <!-- Image column — manual carousel -->
              <div class="card-img-col">
                <transition name="img-fade" mode="out-in">
                  <img
                    :key="slideIndices[project.id] ?? 0"
                    :src="project.images[slideIndices[project.id] ?? 0]"
                    :alt="`${project.title} screenshot ${(slideIndices[project.id] ?? 0) + 1}`"
                    class="card-img"
                  />
                </transition>
                <div class="card-img-shine"></div>

                <!-- Carousel arrows -->
                <div v-if="project.images.length > 1" class="carousel-controls" @click.stop>
                  <button
                    class="carousel-arr carousel-prev"
                    :disabled="(slideIndices[project.id] ?? 0) === 0"
                    @click.stop="slideProject(project, -1)"
                    aria-label="Previous image"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <button
                    class="carousel-arr carousel-next"
                    :disabled="(slideIndices[project.id] ?? 0) === project.images.length - 1"
                    @click.stop="slideProject(project, 1)"
                    aria-label="Next image"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>

                <!-- Dot indicators -->
                <div v-if="project.images.length > 1" class="slide-dots" @click.stop>
                  <button
                    v-for="(_, si) in project.images"
                    :key="si"
                    class="sdot"
                    :class="{ active: (slideIndices[project.id] ?? 0) === si }"
                    @click.stop="goToSlide(project, si)"
                    :aria-label="`Image ${si + 1}`"
                  ></button>
                </div>

                <!-- Counter -->
                <div v-if="project.images.length > 1" class="slide-counter">
                  {{ (slideIndices[project.id] ?? 0) + 1 }} / {{ project.images.length }}
                </div>
              </div>

              <!-- Info column -->
              <div class="card-info-col">
                <p class="card-desc">{{ project.description }}</p>

                <div class="card-info-spacer"></div>

                <div class="card-tags">
                  <span v-for="t in project.tools" :key="t" class="ctag">{{ t }}</span>
                </div>

                <div class="card-actions">
                  <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener" class="btn-ghost">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    Code
                  </a>
                  <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener" class="btn-ghost">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Live
                  </a>
                  <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener" class="btn-filled">
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import '../assets/project.css'

// ── State ──────────────────────────────────────
const isLoaded    = ref(false)
const activeIndex = ref(0)
const canvasEl    = ref(null)

// ── Card dimensions ────────────────────────────
const CARD_H   = 440
const ACTIVE_W = 760
const PEEK_W   = 82

// ── Projects ───────────────────────────────────
const projects = ref([
  {
    id: 1,
    title: 'Velasquez Funeral',
    category: 'Web Development',
    description:
      'A dignified and compassionate funeral services website built for Velasquez Funeral. Designed with a calm, respectful aesthetic and clear navigation to guide families through services, arrangements, and contact information.',
    tools: ['Vue.js', 'CSS3', 'JavaScript'],
    images: ['/velasquez.png', '/velasquez-2.png', '/velasquez-3.png'],
    demo: null,
    repo: null,
  },
  {
    id: 2,
    title: 'HAU ECO QUEST',
    category: 'Full Stack Web App',
    description:
      'An interactive eco-awareness web application promoting sustainability within the university community. Features quests, progress tracking, and gamified learning to encourage greener campus habits.',
    tools: ['Vue.js', 'Node.js', 'Express', 'MongoDB'],
    images: ['/haueco.png', '/haueco-2.png', '/haueco-3.png'],
    demo: 'https://hauecoquest.vercel.app/',
    repo: 'https://github.com/Josh-Aguiluz/6WCSERVER-Final-Project.git',
  },
  {
    id: 3,
    title: 'Web Dev Portfolio',
    category: 'Portfolio Design',
    description:
      'A personal developer portfolio showcasing projects, skills, and experience with a clean editorial layout. Built with Vue.js, featuring smooth animations, a typewriter hero, and a dark/light theme toggle.',
    tools: ['Vue.js', 'CSS3', 'JavaScript', 'Figma'],
    images: ['/portfolio.png', '/portfolio-2.png', '/portfolio-3.png'],
    demo: null,
    repo: 'https://github.com/owcean',
  },
  {
    id: 4,
    title: 'StudioSpot',
    category: 'Web Development',
    description:
      'A professional platform for creative spaces featuring seamless booking, modern UI/UX, and a clean editorial layout. Built with Vue.js for easy studio discovery and reservation management.',
    tools: ['Vue.js', 'CSS3', 'JavaScript', 'Firebase'],
    images: ['/studio.png', '/studio-2.png', '/studio-3.png'],
    demo: 'https://github.com/owcean/StudioSpot',
    repo: 'https://github.com/owcean/StudioSpot.git',
  },
  {
    id: 5,
    title: 'Crumbs & Layer',
    category: 'E-commerce Concept',
    description:
      'A bespoke cake business interface blending warmth and clean frontend craftsmanship. Features a custom cake builder, product gallery, and a fully responsive checkout flow.',
    tools: ['HTML5', 'CSS3', 'JavaScript', 'Figma'],
    images: ['/crumbs.png', '/crumbs-2.png', '/crumbs-3.png'],
    demo: 'https://owcean.github.io/Crumbs-Layer/',
    repo: 'https://github.com/owcean/Crumbs-Layer.git',
  },
])

// ── Carousel (per-project slide index) ────────
const slideIndices = ref({})

function slideProject(project, dir) {
  const cur   = slideIndices.value[project.id] ?? 0
  const total = project.images.length
  const next  = Math.min(Math.max(cur + dir, 0), total - 1)
  slideIndices.value = { ...slideIndices.value, [project.id]: next }
}

function goToSlide(project, idx) {
  slideIndices.value = { ...slideIndices.value, [project.id]: idx }
}

// Reset slide to 0 when switching to a new card
watch(activeIndex, (newIdx) => {
  const project = projects.value[newIdx]
  slideIndices.value = { ...slideIndices.value, [project.id]: 0 }
})

// ── Rail width ─────────────────────────────────
const n     = computed(() => projects.value.length)
const railW = computed(() => ACTIVE_W + (n.value - 1) * PEEK_W)

// ── Card positioning ───────────────────────────
function cardStyle(i) {
  const a        = activeIndex.value
  const isActive = i === a
  const dist     = Math.abs(i - a)

  let left = 0
  for (let j = 0; j < i; j++) {
    left += (j === a ? ACTIVE_W : PEEK_W)
  }

  const height = isActive ? CARD_H : Math.round(CARD_H * Math.max(0.88, 1 - dist * 0.035))
  const yShift = isActive ? '-50%' : `calc(-50% + ${dist * 8}px)`

  return {
    left:      left + 'px',
    width:     (isActive ? ACTIVE_W : PEEK_W) + 'px',
    height:    height + 'px',
    top:       '50%',
    transform: `translateY(${yShift})`,
    zIndex:    n.value - dist,
  }
}

function setActive(i) { activeIndex.value = i }
function next() { if (activeIndex.value < projects.value.length - 1) activeIndex.value++ }
function prev() { if (activeIndex.value > 0) activeIndex.value-- }
function onKey(e) {
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft')  prev()
}

// ── Fireflies ────────────────────────────────────────────────
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

  return () => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  }
}

let cleanupParticles = null

onMounted(() => {
  setTimeout(() => { isLoaded.value = true }, 80)
  window.addEventListener('keydown', onKey)
  if (canvasEl.value) cleanupParticles = initParticles(canvasEl.value)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  cleanupParticles?.()
})
</script>