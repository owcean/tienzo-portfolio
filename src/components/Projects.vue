<template>
  <main class="projects-page" :class="{ loaded: isLoaded }">

    <!-- ── Animated background layer ── -->
    <div class="bg-scene">
      <div class="bg-orb orb-a"></div>
      <div class="bg-orb orb-b"></div>
      <div class="bg-orb orb-c"></div>
      <div class="bg-orb orb-d"></div>
      <div class="bg-grain"></div>
    </div>

    <!-- ── Header ── -->
    <header class="projects-header">
      <div class="eyebrow stag-1">
        <span class="e-dot"></span>
        Portfolio
        <span class="e-dot"></span>
      </div>
      <h1 class="page-title stag-2"><em>Works</em></h1>
      <p class="page-sub stag-3">{{ projects.length }} projects &nbsp;·&nbsp; 2024 – 2026</p>
    </header>

    <!-- ── Cards ── -->
    <div class="cards-grid">
      <article
        v-for="(project, i) in projects"
        :key="project.id"
        class="s-card"
        :class="{ 'in-view': inView.includes(project.id) }"
        :style="{ '--delay': (i * 0.13) + 's' }"
        :ref="el => cardEls[i] = el"
      >
        <!-- ── Photo zone ── -->
        <div class="card-photo">
          <img
            :src="active[project.id] || project.mainImage"
            :alt="project.title"
            class="photo-img"
          />
          <!-- dim vignette at bottom so glass panel reads -->
          <div class="photo-vignette"></div>
          <span class="cat-pill">{{ project.category }}</span>

          <div class="thumb-row" v-if="project.extras?.length">
            <button
              v-for="(img, ti) in [project.mainImage, ...project.extras]"
              :key="ti"
              class="tb"
              :class="{ on: (active[project.id] || project.mainImage) === img }"
              @click.stop="active[project.id] = img"
            ><img :src="img" alt="" /></button>
          </div>
        </div>

        <!-- ── Glass info panel ── -->
        <div class="card-info">
          <div class="info-top">
            <h3 class="proj-title">{{ project.title }}</h3>
            <span class="check-dot">✔</span>
          </div>

          <p class="proj-desc">{{ project.description }}</p>

          <div class="tags">
            <span v-for="t in project.tools" :key="t" class="tag">{{ t }}</span>
          </div>

          <div class="info-foot">
            <div class="foot-links">
              <a :href="project.repo" target="_blank" rel="noopener" class="foot-link">
                <!-- GitHub icon -->
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Code
              </a>
              <a :href="project.demo" target="_blank" rel="noopener" class="foot-link">
                <!-- External link icon -->
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Live
              </a>
            </div>
            <a :href="project.demo" target="_blank" rel="noopener" class="explore-btn">
              Explore +
            </a>
          </div>
        </div>
      </article>
    </div>

  </main>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import '../assets/project.css'

const isLoaded = ref(false)
const inView   = ref([])
const active   = reactive({})
const cardEls  = ref([])

const projects = ref([
  {
    id: 1,
    title: 'StudioSpot',
    category: 'Web Development',
    description: 'A platform for creative spaces with seamless booking and modern UI/UX. Built with Vue.js with a clean, editorial aesthetic for easy navigation and discovery.',
    tools: ['Vue.js', 'CSS3', 'JavaScript', 'Firebase'],
    mainImage: '/project.png',
    extras: ['/project.png', '/project.png'],
    demo: 'https://github.com/owcean/StudioSpot',
    repo: 'https://github.com/owcean/StudioSpot.git',
  },
  {
    id: 2,
    title: 'Crumbs & Layer',
    category: 'E-commerce Concept',
    description: 'Bespoke cake business interface blending baking passion with clean frontend code. Features a custom cake builder, product gallery, and responsive checkout flow.',
    tools: ['HTML5', 'CSS3', 'JavaScript', 'Figma'],
    mainImage: '/project.png',
    extras: ['/project.png', '/project.png'],
    demo: 'https://github.com/owcean/Crumbs-Layer',
    repo: 'https://github.com/owcean/Crumbs-Layer.git',
  },
  {
    id: 3,
    title: 'Bloom Blossom Florals',
    category: 'Frontend Design',
    description: 'Elegant floral shop showcasing editorial HTML/CSS/JS design. Features animated product cards, a filterable catalogue, and a soft organic visual language.',
    tools: ['HTML5', 'CSS3', 'JavaScript'],
    mainImage: '/project.png',
    extras: ['/project.png', '/project.png'],
    demo: 'https://github.com/owcean/Bloom-Blossom-Florals',
    repo: 'https://github.com/owcean/Bloom-Blossom-Florals.git',
  },
  {
    id: 4,
    title: 'Portfolio 2026',
    category: 'Vue & Web Design',
    description: 'Modern editorial portfolio featuring cinematic hero animations, orb backgrounds, and a rose gold design system. Built entirely in Vue 3 with scoped CSS.',
    tools: ['Vue 3', 'CSS3', 'Figma', 'Vite'],
    mainImage: '/project.png',
    extras: ['/project.png', '/project.png'],
    demo: 'https://github.com/owcean',
    repo: 'https://github.com/owcean',
  },
])

let observer
onMounted(() => {
  setTimeout(() => { isLoaded.value = true }, 80)

  observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const i = cardEls.value.indexOf(e.target)
        if (i !== -1 && !inView.value.includes(projects.value[i].id))
          inView.value.push(projects.value[i].id)
      }
    })
  }, { threshold: 0.08 })

  cardEls.value.forEach(el => el && observer.observe(el))
})
onUnmounted(() => observer?.disconnect())
</script>

