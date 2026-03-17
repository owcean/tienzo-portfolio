<template>
  <main class="home-page" :class="{ 'start-animation': isVisible }">

    <!-- ══ HERO ══ -->
    <section class="hero-layout">

      <!-- Floating skill badges -->
      <div class="badges-layer" aria-hidden="true">
        <div
          v-for="badge in skillBadges"
          :key="badge.label"
          class="skill-badge"
          :style="badge.style"
        >
          <span class="badge-icon" v-html="badge.icon"></span>
          <span class="badge-label">{{ badge.label }}</span>
        </div>
      </div>

      <div class="side-content left">
        <p class="greeting reveal-up">Hello, I'm</p>
        <h1 class="hero-name">
          <span class="word-reveal"><span>Krisean</span></span>
          <span class="word-reveal"><span>Tienzo</span></span>
        </h1>
        <div class="typewriter-container reveal-up">
          <span class="typewriter-text">{{ currentText }}</span>
          <span class="cursor">|</span>
        </div>
        <router-link to="/contact" class="hire-me-btn reveal-up">
          <span>Hire Me</span>
          <div class="btn-glow"></div>
        </router-link>
      </div>

      <div class="profile-center reveal-up">
        <div class="image-wrapper">
          <img src="/kt_profile.png" alt="Profile" class="profile-img" />
          <div class="glow-effect"></div>
        </div>
      </div>

      <div class="side-content right">
        <h2 class="hero-profession">
          <span class="word-reveal"><span>Developer</span></span>
          <span class="word-reveal"><span>&amp; Designer</span></span>
        </h2>
      </div>

    </section>

    <!-- ══ FEATURED PROJECTS ══ -->
    <section class="work-section" id="projects">
      <div class="featured-universe">

        <!-- Particle canvas inside dark section -->
        <canvas class="universe-canvas" ref="canvasEl"></canvas>

        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="universe-grain"></div>

        <div class="universe-inner">

          <div class="universe-left">
            <span class="universe-eyebrow">Selected Works</span>
            <h2 class="universe-title" :class="{ stamped: isStamped }">
              Featured<br><em>Projects</em>
            </h2>
            <p class="universe-sub">2024 – 2026</p>
            <div class="universe-counter">
              <span class="counter-current">0{{ currentProjectIndex + 1 }}</span>
              <span class="counter-sep">/</span>
              <span class="counter-total">0{{ projectStack.length }}</span>
            </div>
            <p class="universe-hint">Click the cards to cycle</p>
          </div>

          <div class="universe-right">
            <div class="deck-wrap" @click="cycleDeck">
              <div
                v-for="(project, index) in projectStack"
                :key="project.id"
                class="project-card"
                :style="getCardStyle(index)"
              >
                <div class="card-inner">
                  <div class="card-img-wrap">
                    <img :src="project.image" :alt="project.title" class="project-img" />
                  </div>
                  <div class="card-body">
                    <p class="card-category">{{ project.category }}</p>
                    <h3 class="card-title">{{ project.title }}</h3>
                    <p class="card-desc">{{ project.description }}</p>
                    <router-link :to="project.link" class="card-link" @click.stop>
                      View Project
                      <span class="card-link-line"></span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="explore-footer reveal-up">
          <router-link to="/projects" class="outline-btn">
            Explore All Projects
          </router-link>
        </div>

      </div>
    </section>

  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import '../assets/home.css'

const isVisible = ref(false)
const isStamped = ref(false)
const currentProjectIndex = ref(0)
const canvasEl  = ref(null)
let   animId    = null

// ── Typewriter ──────────────────────────────────────────────────
const currentText = ref('')
const phrases = ['Frontend Developer', 'UI / UX Design']
let phraseIdx = 0, charIdx = 0, isDeleting = false

const type = () => {
  const phrase = phrases[phraseIdx]
  if (isDeleting) { currentText.value = phrase.substring(0, charIdx - 1); charIdx-- }
  else            { currentText.value = phrase.substring(0, charIdx + 1); charIdx++ }
  let speed = isDeleting ? 50 : 150
  if (!isDeleting && charIdx === phrase.length) { isDeleting = true; speed = 2000 }
  else if (isDeleting && charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; speed = 500 }
  setTimeout(type, speed)
}



// ── Projects ────────────────────────────────────────────────────
const projectStack = ref([
  {
    id: 1,
    title: 'StudioSpot',
    category: 'Web Development',
    description:
      'A professional platform for creative spaces featuring seamless booking, modern UI/UX, and a clean editorial layout built with Vue.',
    image: '/studio.png',
    link: 'https://github.com/owcean/StudioSpot.git',
  },
  {
    id: 2,
    title: 'HAU ECO QUEST',
    category: 'Full Stack Web App',
    description:
      'An interactive eco-awareness platform that gamifies sustainability through quests, progress tracking, and community engagement.',
    image: '/haueco.png',
    link: 'https://github.com/Josh-Aguiluz/6WCSERVER-Final-Project.git',
  },
  {
    id: 3,
    title: 'Crumbs & Layer',
    category: 'E-commerce Concept',
    description:
      'A bespoke cake business interface combining thoughtful branding with responsive frontend development and clean user flows.',
    image: '/crumbs.png',
    link: 'https://github.com/owcean/Crumbs-Layer.git',
  },
])

const cycleDeck = () => {
  const top = projectStack.value.shift()
  projectStack.value.push(top)
  currentProjectIndex.value = (currentProjectIndex.value + 1) % projectStack.value.length
}

const getCardStyle = (index) => ({
  transform: `rotate(${[-5, 3, -2][index] || 0}deg) translate(${[-12, 8, 0][index] || 0}px, ${index * 6}px)`,
  zIndex:  projectStack.value.length - index,
  opacity: 1 - index * 0.18,
})

// ── Fireflies ────────────────────────────────────────────────
function initParticles(canvas) {  const ctx = canvas.getContext('2d')
  let W = 0, H = 0

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect()
    W = canvas.width  = rect.width
    H = canvas.height = rect.height
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(canvas.parentElement)

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
      y:        Math.random() * (H || 500),
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

  const COUNT = 48
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

const handleScroll = () => {
  const section = document.querySelector('.work-section')
  if (section) {
    const rect = section.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.7) isStamped.value = true
  }
}

let cleanupParticles = null
onMounted(() => {
  type()
  setTimeout(() => { isVisible.value = true }, 100)
  window.addEventListener('scroll', handleScroll)
  if (canvasEl.value) cleanupParticles = initParticles(canvasEl.value)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  cleanupParticles?.()
})
</script>