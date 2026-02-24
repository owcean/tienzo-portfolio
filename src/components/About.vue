<template>
  <div class="page about-page">

    <section class="about-hero">
      <div class="hero-content">

        <div class="hero-left">
          <h1 class="hero-name">KRISEAN<br>TIENZO</h1>
          <div class="bio-wrapper">
            <p class="hero-bio-text">
              I am an inspiring <strong>Front-end Developer & UI Designer</strong> pursuing a degree in Web Development. 
              Enthusiastic about designing intuitive and component-based UIs and closing the gap between design and functionality. 
              Experienced in turning complex requirements into responsive web applications with a focus on clean and maintainable code and outstanding user experience.
            </p>
          </div>
        </div>

        <div class="hero-right">
          <div class="stats-vertical-column">
            <div v-for="stat in stats" :key="stat.label" class="stat-item-vertical">
              <span class="stat-num">{{ stat.num }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  
      <section class="skills">
        <p class="section-label">Technical Skills</p>
        <div class="skills-grid">
          <div v-for="group in skillGroups" :key="group.title" class="skill-group">
            <h3>{{ group.title }}</h3>
            <div v-for="skill in group.skills" :key="skill.name" class="skill-item">
              <div class="skill-name">
                {{ skill.name }} <span class="skill-pct">{{ skill.pct }}%</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" :style="{ width: barsVisible ? skill.pct + '%' : '0%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <section class="certs">
        <p class="section-label">Certifications</p>
        <div class="certs-accordion">
          <div v-for="group in certGroups" :key="group.id" class="acc-group">
            <div class="acc-header" @click="toggleAccordion(group.id)">
              <div class="acc-header-left">
                <span class="acc-cat-label">{{ group.category }}</span>
                <span class="acc-header-title">{{ group.title }}</span>
              </div>
              <div class="acc-meta">
                <span class="acc-count">{{ group.certs.length }} certs</span>
                <span class="acc-arrow" :class="{ open: openAccordions.includes(group.id) }">▾</span>
              </div>
            </div>
            
            <div class="acc-body" :class="{ open: openAccordions.includes(group.id) }">
              <div v-for="cert in group.certs" :key="cert.name" class="acc-item">
                <div class="acc-text-info">
                  <span class="acc-iname">{{ cert.name }}</span>
                  <span class="acc-iissuer">{{ cert.issuer }}</span>
                </div>
                
                <div class="cert-thumbnail" @click="selectedImage = (cert.image || '/project.png')">
                  <img :src="cert.image || '/project.png'" alt="Preview" />
                  <div class="thumb-overlay"><span>VIEW FULL</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <transition name="fade">
        <div v-if="selectedImage" class="lightbox-overlay" @click="selectedImage = null">
          <div class="lightbox-content" @click.stop>
            <img :src="selectedImage" alt="Enlarged Certificate" />
            <button class="close-btn" @click="selectedImage = null">&times;</button>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import '../assets/about.css'
  
  const barsVisible = ref(false)
  const openAccordions = ref(['tech'])
  const selectedImage = ref(null)
  
  onMounted(() => {
    setTimeout(() => { barsVisible.value = true }, 400)
  })
  
  function toggleAccordion(id) {
    const idx = openAccordions.value.indexOf(id)
    if (idx === -1) openAccordions.value.push(id)
    else openAccordions.value.splice(idx, 1)
  }
  const stats = [
  { num: '7+',   label: 'Certifications' },
  { num: '3+',   label: 'Projects' },
  { num: '2',    label: 'Years Exp.' },
]

  const skillGroups = [
    { title: 'Front-end', skills: [ { name: 'HTML', pct: 100 }, { name: 'CSS', pct: 100 }, { name: 'JavaScript', pct: 80 } ] },
    { title: 'Back-end', skills: [ { name: 'SQL', pct: 80 }, { name: 'NoSQL (MongoDB)', pct: 80 }, { name: 'Python', pct: 60 } ] },
    { title: 'Design', skills: [ { name: 'UI/UX Design', pct: 90 }, { name: 'Figma', pct: 100 }, { name: 'Responsive Design', pct: 100 } ] }
  ]
  
  const certGroups = [
    { id: 'tech', category: 'Technical', title: 'Core Development', certs: [
      { name: 'JavaScript Essentials 1', issuer: 'Cisco Networking Academy', image: '/project.png' },
      { name: 'Responsive Web Design', issuer: 'freeCodeCamp', image: '/project.png' },
      { name: 'JavaScript Algorithms', issuer: 'freeCodeCamp', image: '/project.png' }
    ]},
    { id: 'design', category: 'Design', title: 'UI/UX & Graphic', certs: [
      { name: 'Website UI/UX with ChatGPT', issuer: 'Simplilearn', image: '/project.png' },
      { name: 'Intro to Graphic Design', issuer: 'Simplilearn', image: '/project.png' }
    ]},
    { id: 'mkt', category: 'Marketing', title: 'Digital Strategy', certs: [
      { name: 'SEO Certification', issuer: 'HubSpot Academy', image: '/project.png' },
      { name: 'Digital Marketing', issuer: 'HubSpot Academy', image: '/project.png' }
    ]}
  ]
  </script>