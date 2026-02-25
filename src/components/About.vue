<template>
  <div class="about-page" :class="{ loaded: isLoaded }">

    <!-- ══ HERO ══ -->
    <section class="about-hero">

      <div class="snippets-layer" aria-hidden="true">
        <div v-for="s in snippets" :key="s.code + s.style.top" class="snippet-badge" :style="s.style">
          <span class="snippet-dot"></span>
          <code>{{ s.code }}</code>
        </div>
      </div>

      <div class="hero-cards-wrap stag-1">
        <div class="photo-card photo-card--left">
          <img src="/kt_pic1.jpg" alt="Krisean 1" />
        </div>
        <div class="photo-card photo-card--center">
          <img src="/kt_pic3.jpg" alt="Krisean 2" />
        </div>
        <div class="photo-card photo-card--right">
          <img src="/kt_pic2.jpg" alt="Krisean 3" />
        </div>
      </div>

      <div class="hero-name-block stag-2">
        <h1 class="hero-name">KRISEAN<span class="name-break"> TIENZO</span></h1>
        <p class="hero-tagline">Front-end Developer &amp; UI/UX Designer</p>
      </div>

      <div class="hero-stats stag-3">
        <div v-for="stat in stats" :key="stat.label" class="stat-pill">
          <span class="stat-num">{{ stat.num }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>

    </section>

    <!-- ══ BIO STRIP — editorial layout ══ -->
    <section class="bio-strip stag-4" ref="bioEl">
      <canvas class="bio-particles" ref="bioCanvas"></canvas>

      <div class="bio-inner">

        <!-- Left: large label + tagline -->
        <div class="bio-left">
          <span class="bio-eyebrow">About Me</span>
          <h2 class="bio-headline">
            Crafting<br>
            <em>digital</em><br>
            experiences.
          </h2>
          <div class="bio-deco-line"></div>
        </div>

        <!-- Right: description + typed traits -->
        <div class="bio-right">
          <p class="bio-text">
            I'm an aspiring <strong>Front-end Developer & UI Designer</strong> pursuing a
            degree in Web Development — passionate about designing intuitive,
            component-based UIs and closing the gap between design and functionality.
          </p>

          <!-- Animated typed traits -->
          <div class="bio-traits">
            <div
              v-for="(trait, i) in traits"
              :key="trait.label"
              class="bio-trait"
              :class="{ visible: traitStep > i }"
            >
              <span class="trait-icon" v-html="trait.icon"></span>
              <div class="trait-body">
                <span class="trait-label">{{ trait.label }}</span>
                <span class="trait-value">
                  <span class="trait-text" :class="{ typing: traitStep === i + 1, done: traitStep > i + 1 }">
                    {{ trait.value }}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <!-- Tech chips -->
          <div class="bio-chips">
            <span v-for="chip in chips" :key="chip" class="bio-chip">{{ chip }}</span>
          </div>
        </div>

      </div>
    </section>

    <!-- ══ SKILLS ══ -->
    <section class="skills-section" ref="skillsEl">

      <div class="section-header stag-5">
        <span class="section-eyebrow">Technical Skills</span>
        <div class="section-rule"></div>
      </div>

      <div class="skills-grid">
        <div v-for="(group, gi) in skillGroups" :key="group.title" class="skill-group" :style="{ '--gi': gi }">
          <div class="sg-header">
            <span class="sg-icon" v-html="group.icon"></span>
            <h3 class="sg-title">{{ group.title }}</h3>
            <span class="sg-num">{{ group.skills.length }} skills</span>
          </div>
          <div class="sg-skills">
            <div v-for="skill in group.skills" :key="skill.name" class="skill-item">
              <div class="skill-row">
                <span class="skill-name">{{ skill.name }}</span>
                <div class="bar-track">
                  <div class="bar-fill" :style="{ width: barsVisible ? skill.pct + '%' : '0%' }"></div>
                </div>
              </div>
              <span class="skill-pct">{{ skill.pct }}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ CERTIFICATIONS ══ -->
    <section class="certs-section">
      <div class="section-header">
        <span class="section-eyebrow">Certifications</span>
        <div class="section-rule"></div>
      </div>

      <div class="cert-tabs">
        <button v-for="tab in certTabs" :key="tab" class="cert-tab" :class="{ active: activeTab === tab }" @click="activeTab = tab">
          {{ tab }}
        </button>
      </div>

      <div class="cert-grid">
        <div v-for="cert in filteredCerts" :key="cert.name" class="cert-card" @click="selectedImage = cert.image || '/project.png'">
          <div class="cert-card-img">
            <img :src="cert.image || '/project.png'" :alt="cert.name" />
            <div class="cert-card-overlay">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
          </div>
          <div class="cert-card-body">
            <span class="cert-cat-tag">{{ cert.category }}</span>
            <p class="cert-card-name">{{ cert.name }}</p>
            <span class="cert-card-issuer">{{ cert.issuer }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ LIGHTBOX ══ -->
    <Transition name="lb-fade">
      <div v-if="selectedImage" class="lightbox-overlay" @click="selectedImage = null">
        <div class="lightbox-card" @click.stop>
          <img :src="selectedImage" alt="Certificate" />
          <button class="lb-close" @click="selectedImage = null" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import '../assets/about.css'

const isLoaded      = ref(false)
const barsVisible   = ref(false)
const selectedImage = ref(null)
const activeTab     = ref('All')
const traitStep     = ref(0)
const bioEl         = ref(null)
const skillsEl      = ref(null)
const bioCanvas     = ref(null)

// ── Bio traits (typed one by one) ──
const traits = [
  {
    label: 'Role',
    value: 'Front-End Developer & UI Designer',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
  },
  {
    label: 'Education',
    value: 'BS in Web Development',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`
  },
  {
    label: 'Focus',
    value: 'Bridging design & functionality',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`
  },
  {
    label: 'Approach',
    value: 'Clean, scalable, maintainable code',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`
  },
]

const chips = ['Vue.js', 'Figma', 'HTML / CSS', 'JavaScript', 'MongoDB', 'Responsive Design']

const snippets = [
  { code: "const vibe = 'Creative + Clean'",  style: { top: '28%', left: '3%',   animationDelay: '0s',   animationDuration: '8s'  } },
  { code: "const coffee = 'true'",             style: { top: '42%', left: '18%',  animationDelay: '1.4s', animationDuration: '10s' } },
  { code: "const coffee = 'true'",             style: { top: '58%', left: '2%',   animationDelay: '0.7s', animationDuration: '7s'  } },
  { code: "const playlist = 'lofi'",           style: { top: '45%', right: '14%', animationDelay: '2s',   animationDuration: '9s'  } },
  { code: "const stack = ['HTML','CSS','JS']", style: { top: '30%', right: '3%',  animationDelay: '0.4s', animationDuration: '11s' } },
  { code: "const playlist = 'lofi'",           style: { top: '60%', right: '2%',  animationDelay: '1.8s', animationDuration: '8.5s'} },
]

const stats = [
  { num: '7+', label: 'Certifications' },
  { num: '3+', label: 'Projects' },
  { num: '2',  label: 'Years Exp.' },
]

const skillGroups = [
  {
    title: 'Front-end',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    skills: [{ name: 'HTML', pct: 100 }, { name: 'CSS', pct: 100 }, { name: 'JavaScript', pct: 80 }],
  },
  {
    title: 'Back-end',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
    skills: [{ name: 'SQL', pct: 80 }, { name: 'NoSQL (MongoDB)', pct: 80 }, { name: 'Python', pct: 60 }],
  },
  {
    title: 'Design',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
    skills: [{ name: 'UI/UX Design', pct: 90 }, { name: 'Figma', pct: 100 }, { name: 'Responsive Design', pct: 100 }],
  },
]

const allCerts = [
  { name: 'Back-End Development and APIs V8',                    issuer: 'freeCodeCamp', category: 'Technical', image: '/back-end.png' },
  { name: 'Legacy JavaScript Algorithms and Data Structures V7', issuer: 'freeCodeCamp', category: 'Technical', image: '/javascript.png' },
  { name: 'Legacy Responsive Web Design V8',                     issuer: 'freeCodeCamp', category: 'Technical', image: '/responsive_web.png' },
  { name: 'Design Thinking for Beginners',                       issuer: 'Simplilearn',  category: 'Design',    image: '/design.png' },
  { name: 'HubSpot SEO II Certified',                            issuer: 'HubSpot',      category: 'Marketing', image: '/seo2.png' },
  { name: 'SEO Certified',                                       issuer: 'HubSpot',      category: 'Marketing', image: '/seo1.png' },
  { name: 'Content Marketing Certified',                         issuer: 'HubSpot',      category: 'Marketing', image: '/content_marketing.png' },
  { name: 'Digital Advertising Certified',                       issuer: 'HubSpot',      category: 'Marketing', image: '/digital_advertising.png' },
]

const certTabs = ['All', 'Technical', 'Design', 'Marketing']
const filteredCerts = computed(() =>
  activeTab.value === 'All' ? allCerts : allCerts.filter(c => c.category === activeTab.value)
)

// ── Trait typing sequencer ──
function startTyping() {
  traitStep.value = 1
  const advance = () => {
    if (traitStep.value <= traits.length) {
      traitStep.value++
      setTimeout(advance, 620)
    }
  }
  setTimeout(advance, 620)
}

// ── Bio strip particle system ──
let bioAnimId = null
function initBioParticles(canvas) {
  const ctx = canvas.getContext('2d')
  let W = 0, H = 0

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect()
    W = canvas.width  = rect.width
    H = canvas.height = rect.height
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(canvas.parentElement)

  const PALETTE = [
    'rgba(192,112,96,', 'rgba(138,74,58,',
    'rgba(220,160,130,', 'rgba(192,112,96,',
  ]
  const COUNT = 40
  const pts = Array.from({ length: COUNT }, () => ({
    x:  Math.random() * (W || 900),
    y:  Math.random() * (H || 500),
    r:  Math.random() * 2 + 0.4,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    col: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    a:  Math.random() * 0.22 + 0.06,
    pa: Math.random() * Math.PI * 2,
    ps: Math.random() * 0.008 + 0.003,
  }))

  function draw() {
    ctx.clearRect(0, 0, W, H)
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy; p.pa += p.ps
      if (p.x < -10) p.x = W + 10
      if (p.x > W+10) p.x = -10
      if (p.y < -10) p.y = H + 10
      if (p.y > H+10) p.y = -10
      const alpha = p.a + Math.sin(p.pa) * 0.07
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = p.col + alpha + ')'
      ctx.fill()
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x
        const dy = pts[i].y - pts[j].y
        const d = Math.sqrt(dx*dx + dy*dy)
        if (d < 100) {
          const r = 1 - d / 100
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(192,112,96,${r * 0.15})`
          ctx.lineWidth = r * 0.7
          ctx.stroke()
        }
      }
    }
    bioAnimId = requestAnimationFrame(draw)
  }
  draw()
  return () => { cancelAnimationFrame(bioAnimId); ro.disconnect() }
}

let cleanupBio = null

onMounted(() => {
  setTimeout(() => { isLoaded.value = true }, 80)
  setTimeout(() => { barsVisible.value = true }, 500)

  const barObs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) barsVisible.value = true
  }, { threshold: 0.3 })
  if (skillsEl.value) barObs.observe(skillsEl.value)

  const typeObs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      typeObs.disconnect()
      startTyping()
    }
  }, { threshold: 0.2 })
  if (bioEl.value) typeObs.observe(bioEl.value)

  // Init bio particles
  if (bioCanvas.value) {
    cleanupBio = initBioParticles(bioCanvas.value)
  }
})

onUnmounted(() => { cleanupBio?.() })
</script>