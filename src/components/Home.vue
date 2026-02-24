<template>
  <main class="home-page" :class="{ 'start-animation': isVisible }">

    <!-- ══ HERO ══ -->
    <section class="hero-layout">
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
        <button class="hire-me-btn reveal-up">
          <span>Hire Me</span>
          <div class="btn-glow"></div>
        </button>
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

      <!-- Dark orb container -->
      <div class="featured-universe">

        <!-- Animated glowing orbs -->
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>

        <!-- Noise grain texture overlay -->
        <div class="universe-grain"></div>

        <div class="universe-inner">

          <!-- LEFT: title block -->
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

          <!-- RIGHT: card deck -->
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
        <!-- Explore footer -->
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
import '../assets/home.css'; 


const isVisible = ref(false)
const isStamped = ref(false)
const currentProjectIndex = ref(0)

// Typewriter
const currentText = ref('')
const phrases = ['Frontend Developer', 'UI / UX Design']
let phraseIdx = 0, charIdx = 0, isDeleting = false

const type = () => {
  const phrase = phrases[phraseIdx]
  if (isDeleting) { currentText.value = phrase.substring(0, charIdx - 1); charIdx-- }
  else            { currentText.value = phrase.substring(0, charIdx + 1); charIdx++ }
  let speed = isDeleting ? 50 : 150
  if (!isDeleting && charIdx === phrase.length) { isDeleting = true; speed = 2000 }
  else if (isDeleting && charIdx === 0)         { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; speed = 500 }
  setTimeout(type, speed)
}

// Projects
const projectStack = ref([
  { 
    id: 1, 
    title: 'StudioSpot', 
    category: 'Web Development', 
    description: 'A professional platform designed for creative spaces, focusing on seamless booking and modern UI/UX.', 
    image: '/project.png', 
    link: 'https://github.com/owcean/StudioSpot.git' 
  },
  { 
    id: 2, 
    title: 'Crumbs & Layer', 
    category: 'E-commerce Concept', 
    description: 'A bespoke cake business interface blending your passion for baking with clean, responsive frontend code.', 
    image: '/project.png', 
    link: 'https://github.com/owcean/Crumbs-Layer.git' 
  },
  { 
    id: 3, 
    title: 'Bloom Blossom Florals', 
    category: 'Frontend Design', 
    description: 'An elegant floral shop project utilizing your HTML, CSS, and JavaScript skills for a high-end editorial feel.', 
    image: '/project.png', 
    link: 'https://github.com/owcean/Bloom-Blossom-Florals.git' 
  },
])

const cycleDeck = () => {
  const top = projectStack.value.shift()
  projectStack.value.push(top)
  currentProjectIndex.value = (currentProjectIndex.value + 1) % projectStack.value.length
}

const getCardStyle = (index) => {
  const rotations = [-5, 3, -2]
  const xOffsets  = [-12, 8, 0]
  return {
    transform: `rotate(${rotations[index] || 0}deg) translate(${xOffsets[index] || 0}px, ${index * 6}px)`,
    zIndex:  projectStack.value.length - index,
    opacity: 1 - index * 0.18,
  }
}

const handleScroll = () => {
  const section = document.querySelector('.work-section')
  if (section) {
    const rect = section.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.7) isStamped.value = true
  }
}

onMounted(() => {
  type()
  setTimeout(() => { isVisible.value = true }, 100)
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

