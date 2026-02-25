<template>
  <section class="resume-page" :class="{ loaded: isLoaded }">

    <!-- ── Page Header ── -->
    <header class="resume-header">
      <div class="resume-eyebrow stag-1">
        <span class="e-dot"></span> Curriculum Vitae <span class="e-dot"></span>
      </div>
      <h1 class="resume-name stag-2">Krisean <em>Tienzo</em></h1>
      <p class="resume-role stag-3">Front-end Developer &amp; UI/UX Designer</p>

      <a href="/CREATIVE_RESUME_-_TIENZO.pdf" download class="dl-btn stag-4">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download Résumé
      </a>
    </header>

    <!-- ── Three-column layout ── -->
    <div class="resume-body stag-5">

      <!-- ══ EDUCATION ══ -->
      <div class="resume-col">
        <div class="col-label">
          <span class="col-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </span>
          Education
        </div>
        <div class="timeline">
          <div class="tl-item">
            <div class="tl-dot"></div>
            <div class="tl-line"></div>
            <div class="tl-card">
              <div class="tl-period">2023 — 2027</div>
              <h3 class="tl-title">Bachelor of Science</h3>
              <p class="tl-sub">Major in Web Development</p>
              <p class="tl-org">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Holy Angel University · Angeles, Pampanga
              </p>
              <p class="tl-body">Pursuing a degree in Web Development with a focus on front-end engineering, UI/UX design systems, and responsive application architecture.</p>
              <div class="tl-tags">
                <span class="tl-tag">Web Development</span>
                <span class="tl-tag">UI/UX Design</span>
                <span class="tl-tag">Responsive Design</span>
              </div>
            </div>
          </div>
          <div class="tl-item last">
            <div class="tl-dot"></div>
            <div class="tl-card">
              <div class="tl-period">2017 — 2023</div>
              <h3 class="tl-title">High School</h3>
              <p class="tl-sub">STEM Strand</p>
              <p class="tl-org">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Assumpta Technical High School
              </p>
              <p class="tl-body">Completed secondary education under the STEM strand, building a strong foundation in science, technology, engineering, and mathematics.</p>
              <div class="tl-tags">
                <span class="tl-tag">STEM</span>
                <span class="tl-tag">Science</span>
                <span class="tl-tag">Technology</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ EXPERIENCE ══ -->
      <div class="resume-col">
        <div class="col-label">
          <span class="col-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
          </span>
          Experience
        </div>
        <div class="timeline">
          <div
            v-for="(exp, i) in experiences"
            :key="exp.id"
            class="tl-item"
            :class="{ last: i === experiences.length - 1 }"
          >
            <div class="tl-dot"></div>
            <div class="tl-line" v-if="i < experiences.length - 1"></div>
            <div class="tl-card exp-card">
              <div class="tl-period">{{ exp.period }}</div>
              <h3 class="tl-title">{{ exp.title }}</h3>
              <p class="tl-sub">{{ exp.role }}</p>
              <p class="tl-org">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {{ exp.org }}
              </p>
              <p class="tl-body">{{ exp.desc }}</p>
              <div class="tl-tags">
                <span class="tl-tag" v-for="t in exp.tags" :key="t">{{ t }}</span>
              </div>
              <button class="exp-view-btn" @click="openModal(exp)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ SOFT SKILLS ══ -->
      <div class="resume-col">
        <div class="col-label">
          <span class="col-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </span>
          Soft Skills
        </div>
        <div class="skills-grid">
          <div class="skill-item" v-for="skill in softSkills" :key="skill.name">
            <div class="skill-icon-wrap" v-html="skill.icon"></div>
            <div class="skill-text">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-desc">{{ skill.desc }}</span>
            </div>
          </div>
        </div>
        <div class="skills-divider"></div>
        <div class="trait-cloud">
          <span class="trait">Detail-Oriented</span>
          <span class="trait accent">Fast Learner</span>
          <span class="trait">Team Player</span>
          <span class="trait">Self-Motivated</span>
          <span class="trait accent">Creative Thinker</span>
          <span class="trait">Reliable</span>
          <span class="trait">Open-Minded</span>
        </div>
      </div>

    </div>

    <!-- ══ EXPERIENCE MODAL ══ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="activeExp" class="modal-backdrop" @click.self="closeModal" @keydown.esc="closeModal">
          <div class="modal-card">

            <!-- Close button -->
            <button class="modal-close" @click="closeModal" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <div class="modal-inner">

              <!-- Left: image gallery -->
              <div class="modal-gallery">
                <div class="modal-main-img">
                  <Transition name="photo-fade" mode="out-in">
                    <img :src="activeExp.photos[activePhoto]" :key="activePhoto" :alt="activeExp.title" class="modal-img" />
                  </Transition>
                  <!-- Arrows -->
                  <button class="img-arrow img-prev" @click="prevPhoto" v-if="activeExp.photos.length > 1" aria-label="Previous">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <button class="img-arrow img-next" @click="nextPhoto" v-if="activeExp.photos.length > 1" aria-label="Next">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                  <span class="img-counter">{{ activePhoto + 1 }} / {{ activeExp.photos.length }}</span>
                </div>

                <!-- Thumbnail strip -->
                <div class="modal-thumbs" v-if="activeExp.photos.length > 1">
                  <button
                    v-for="(photo, pi) in activeExp.photos"
                    :key="pi"
                    class="modal-thumb"
                    :class="{ active: activePhoto === pi }"
                    @click="activePhoto = pi"
                  >
                    <img :src="photo" :alt="`Photo ${pi + 1}`" />
                  </button>
                </div>
              </div>

              <!-- Right: details -->
              <div class="modal-details">
                <div class="modal-header">
                  <div class="modal-meta-row">
                    <span class="modal-period">{{ activeExp.period }}</span>
                    <span class="modal-org-badge">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {{ activeExp.org }}
                    </span>
                  </div>
                  <h2 class="modal-title">{{ activeExp.title }}</h2>
                  <p class="modal-role">{{ activeExp.role }}</p>
                </div>

                <p class="modal-desc">{{ activeExp.longDesc }}</p>

                <div class="modal-highlights">
                  <p class="modal-hl-label">Key Highlights</p>
                  <ul class="modal-hl-list">
                    <li v-for="h in activeExp.highlights" :key="h">
                      <span class="hl-dot"></span>{{ h }}
                    </li>
                  </ul>
                </div>

                <div class="modal-tags-row">
                  <span class="tl-tag" v-for="t in activeExp.tags" :key="t">{{ t }}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import '../assets/resume.css'

const isLoaded  = ref(false)
const activeExp = ref(null)
const activePhoto = ref(0)

const experiences = ref([
  {
    id: 1,
    title: 'Code Geeks',
    role: 'HR Office & Member',
    org: 'Holy Angel University',
    period: '2024 — 2026',
    desc: 'Collaborated with student developers, organized technical workshops, and managed internal communications within the organization.',
    longDesc: 'As an active member and HR staff of Code Geeks, a student-led developer organization at Holy Angel University, I played a key role in bridging communication between members and leadership. I co-organized technical workshops that introduced students to modern web technologies, managed recruitment processes, and maintained internal documentation and communications channels.',
    highlights: [
      'Co-organized 5+ technical workshops on web development topics',
      'Managed onboarding process for new organization members',
      'Handled internal communications and announcements',
      'Collaborated with cross-functional student teams on projects',
    ],
    tags: ['Collaboration', 'Leadership', 'Workshops', 'HR Management'],
    photos: ['/exp-codegeeks-1.jpg', '/exp-codegeeks-2.jpg', '/exp-codegeeks-3.jpg'],
  },
  {
    id: 2,
    title: 'CSIA',
    role: 'Events Staff',
    org: 'Holy Angel University',
    period: '2024 — 2025',
    desc: 'Handled project management and coordination between different stakeholders for university-wide events and academic programs.',
    longDesc: 'During my time as Events Staff at CSIA, I was responsible for end-to-end coordination of university-wide events. This included liaising between academic departments, student groups, and external partners to ensure smooth event execution. I developed strong project management and stakeholder communication skills through managing multiple concurrent event timelines.',
    highlights: [
      'Coordinated logistics for multiple university-wide events',
      'Liaised between departments, students, and external stakeholders',
      'Managed event timelines and resource allocation',
      'Resolved on-site issues in real-time during live events',
    ],
    tags: ['Project Management', 'Coordination', 'Events', 'Stakeholder Relations'],
    photos: ['/exp-csia-1.jpg', '/exp-csia-2.jpg', '/exp-csia-3.jpg'],
  },
  {
    id: 3,
    title: 'CSC – SOC',
    role: 'Facilities & Logistics Staff',
    org: 'Holy Angel University',
    period: '2023 — 2025',
    desc: 'Managed facilities and logistics for student council operations, ensuring smooth execution of campus events and activities.',
    longDesc: 'As Facilities & Logistics Staff for the Supreme Student Council, I oversaw the physical and operational aspects of campus events. My responsibilities included coordinating venue setup, managing equipment inventory, and ensuring all logistical requirements were met for student council activities. This role strengthened my organizational skills and my ability to work under pressure.',
    highlights: [
      'Oversaw venue setup and teardown for campus events',
      'Managed equipment and materials inventory',
      'Coordinated with university facilities management',
      'Supported student council operations across 2 academic years',
    ],
    tags: ['Logistics', 'Organization', 'Adaptability', 'Facilities'],
    photos: ['/exp-csc-1.jpg', '/exp-csc-2.jpg', '/exp-csc-3.jpg'],
  },
])

const softSkills = [
  { name: 'Attention to Detail', desc: 'Meticulous in every pixel and line of code', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>` },
  { name: 'Creativity', desc: 'Transforms ideas into visual experiences', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` },
  { name: 'Collaboration', desc: 'Works effectively across cross-functional teams', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
  { name: 'Time Management', desc: 'Delivers consistently within deadlines', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>` },
  { name: 'Problem Solving', desc: 'Breaks down complex challenges clearly', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>` },
  { name: 'Adaptability', desc: 'Thrives in fast-paced, changing environments', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>` },
]

function openModal(exp) {
  activeExp.value = exp
  activePhoto.value = 0
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  activeExp.value = null
  document.body.style.overflow = ''
}

function nextPhoto() {
  if (activeExp.value && activePhoto.value < activeExp.value.photos.length - 1)
    activePhoto.value++
}

function prevPhoto() {
  if (activePhoto.value > 0) activePhoto.value--
}

function onKey(e) {
  if (!activeExp.value) return
  if (e.key === 'Escape')     closeModal()
  if (e.key === 'ArrowRight') nextPhoto()
  if (e.key === 'ArrowLeft')  prevPhoto()
}

onMounted(() => {
  setTimeout(() => { isLoaded.value = true }, 80)
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>