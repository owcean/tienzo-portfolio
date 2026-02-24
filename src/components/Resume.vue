<template>
  <main class="resume-page" :class="{ 'start-animation': isVisible }">
    <div class="resume-container">

      <!-- ── SIDEBAR ── -->
      <aside class="resume-sidebar reveal-up">

        <section class="sidebar-block">
          <h3 class="sidebar-title">Education</h3>
          <div class="education-item">
            <p class="edu-school">Holy Angel University</p>
            <p class="edu-degree">BS Major in Web Development</p>
            <p class="edu-date">2023 — 2027</p>
          </div>
        </section>

        <section class="sidebar-block">
          <h3 class="sidebar-title">Technical Skills</h3>
          <div class="skill-category-label">Front-End</div>
          <ul class="skills-list">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
          <div class="skill-category-label">Back-End</div>
          <ul class="skills-list">
            <li>SQL</li>
            <li>NoSQL (MongoDB)</li>
            <li>Python</li>
          </ul>
          <div class="skill-category-label">Design</div>
          <ul class="skills-list">
            <li>UI/UX Design</li>
            <li>Prototyping (Figma)</li>
            <li>Responsive Design</li>
          </ul>
        </section>

        <section class="sidebar-block">
          <h3 class="sidebar-title">Soft Skills</h3>
          <div class="soft-skills-tags">
            <span v-for="s in softSkills" :key="s" class="soft-tag">{{ s }}</span>
          </div>
        </section>

        <section class="sidebar-block">
          <h3 class="sidebar-title">Tools</h3>
          <div class="soft-skills-tags">
            <span v-for="t in tools" :key="t" class="soft-tag">{{ t }}</span>
          </div>
        </section>

        <section class="sidebar-block">
          <h3 class="sidebar-title">Certifications</h3>
          <div v-for="group in certGroups" :key="group.label" class="cert-sidebar-group">
            <div class="cert-group-label">{{ group.label }}</div>
            <ul class="cert-list">
              <li v-for="c in group.items" :key="c.name">
                <span class="cert-name">{{ c.name }}</span>
                <span class="cert-issuer">{{ c.issuer }}</span>
              </li>
            </ul>
          </div>
        </section>

      </aside>

      <!-- ── MAIN ── -->
      <section class="resume-main">

        <header class="resume-header reveal-up">
          <div>
            <h1 class="huge-text">RESUME</h1>
            <p class="resume-subtitle">Krisean Tienzo · Frontend Developer & UI/UX Designer</p>
          </div>
          <a href="/CREATIVE_RESUME_-_TIENZO.pdf" download class="download-btn">
            <span>Download PDF</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1v8M7 9l-3-3M7 9l3-3M1 12h12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </header>

        <!-- BIO -->
        <div class="resume-bio reveal-up">
          <p>I am an inspiring <strong>Front-end Developer & UI Designer</strong> pursuing a degree in Web Development. Enthusiastic about designing intuitive and component-based UIs and closing the gap between design and functionality. Experienced in turning complex requirements into responsive web applications with a focus on clean, maintainable code and outstanding user experience.</p>
        </div>

        <!-- PROJECTS -->
        <div class="resume-section reveal-up">
          <h2 class="section-heading">Projects</h2>
          <div class="timeline-block" v-for="p in projects" :key="p.title">
            <div class="tl-meta">
              <span class="tl-stack">{{ p.stack }}</span>
            </div>
            <div class="tl-content">
              <h4 class="job-title">{{ p.title }}</h4>
              <p class="job-desc">{{ p.desc }}</p>
              <div class="tl-tags">
                <span v-for="tag in p.tags" :key="tag" class="tl-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- EXPERIENCE -->
        <div class="resume-section reveal-up">
          <h2 class="section-heading">Experience</h2>
          <div class="timeline-block" v-for="e in experiences" :key="e.title">
            <div class="tl-meta">
              <span class="time-mark">{{ e.years }}</span>
            </div>
            <div class="tl-content">
              <h4 class="job-title">{{ e.title }}</h4>
              <p class="job-org">{{ e.org }}</p>
              <p class="job-desc">{{ e.desc }}</p>
            </div>
          </div>
        </div>

      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '../assets/resume.css'

const isVisible = ref(false)
onMounted(() => setTimeout(() => { isVisible.value = true }, 100))

const softSkills = ['Attention to Detail', 'Problem Solving', 'Time Management', 'Creativity', 'Collaboration', 'Adaptability']
const tools = ['Git / GitHub', 'VS Code', 'Figma', 'Canva', 'npm', 'Flexbox / Grid']

const certGroups = [
  {
    label: 'Technical Core',
    items: [
      { name: 'JavaScript Essentials 1', issuer: 'Cisco Networking Academy' },
      { name: 'Responsive Web Design',   issuer: 'freeCodeCamp' },
      { name: 'JavaScript Algorithms',   issuer: 'freeCodeCamp' },
    ]
  },
  {
    label: 'UI/UX & Design',
    items: [
      { name: 'Website UI/UX with ChatGPT', issuer: 'Simplilearn' },
      { name: 'Intro to Graphic Design',    issuer: 'Simplilearn' },
    ]
  },
  {
    label: 'Digital Strategy',
    items: [
      { name: 'Digital Advertising', issuer: 'HubSpot Academy' },
      { name: 'Digital Marketing',   issuer: 'HubSpot Academy' },
      { name: 'SEO Certification',   issuer: 'HubSpot Academy' },
    ]
  },
]

const projects = [
  {
    title: 'Personal Portfolio Website',
    stack: 'HTML · CSS · JavaScript',
    desc: 'Designed and developed a responsive portfolio to showcase UI/UX case studies. Demonstrated attention to detail by ensuring 100% Lighthouse accessibility scores.',
    tags: ['Attention to Detail', 'Problem Solving'],
  },
  {
    title: 'Component-Based UI System',
    stack: 'Figma · HTML/CSS · Tailwind CSS',
    desc: 'Built a reusable component library with design tokens for consistent styling. Balanced academic workload while maintaining project timelines.',
    tags: ['Time Management', 'Creativity'],
  },
]

const experiences = [
  {
    years: '2024 — 2026',
    title: 'HR Office & Member',
    org: 'CODE GEEKS',
    desc: 'Collaboration with student developers, organizing technical workshops, and managing internal communications.',
  },
  {
    years: '2024 — 2025',
    title: 'Events Staff',
    org: 'CSIA',
    desc: 'Project management and coordination between different stakeholders.',
  },
  {
    years: '2023 — 2025',
    title: 'Facilities & Logistics Staff',
    org: 'CSC – SOC',
    desc: 'Managed facilities planning and logistics coordination for school events and activities.',
  },
]
</script>