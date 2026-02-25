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

    <!-- Bottom download nudge -->
    <div class="resume-footer-cta stag-6">
      <span class="cta-line"></span>
      <span class="cta-text">Want the full picture?</span>
      <a href="/CREATIVE_RESUME_-_TIENZO.pdf" download class="cta-link">
        Download full résumé
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
      </a>
      <span class="cta-line"></span>
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


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ── Shell ── */
.resume-page {
  position: relative;
  min-height: 100vh;
  background: #faf7f4;
  font-family: 'DM Sans', sans-serif;
  padding: 100px 6vw 80px;
  overflow: hidden;
}

/* Subtle warm grain texture — no animation, just texture */
.resume-page::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.032'/%3E%3C/svg%3E");
}

/* ── Stagger reveals ── */
.stag-1,.stag-2,.stag-3,.stag-4,.stag-5,.stag-6 {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity .85s cubic-bezier(.16,1,.3,1),
              transform .85s cubic-bezier(.16,1,.3,1);
}
.loaded .stag-1 { opacity:1; transform:none; transition-delay:.06s; }
.loaded .stag-2 { opacity:1; transform:none; transition-delay:.18s; }
.loaded .stag-3 { opacity:1; transform:none; transition-delay:.30s; }
.loaded .stag-4 { opacity:1; transform:none; transition-delay:.42s; }
.loaded .stag-5 { opacity:1; transform:none; transition-delay:.56s; }
.loaded .stag-6 { opacity:1; transform:none; transition-delay:.72s; }

/* ══════════════════════════════════
   HEADER
══════════════════════════════════ */
.resume-header {
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: 72px;
}

.resume-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: rgba(192,112,96,0.7);
  margin-bottom: 16px;
}

.e-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: #c07060;
  animation: eDot 2.2s ease-in-out infinite;
}
.e-dot:last-child { animation-delay: 1.1s; }
@keyframes eDot {
  0%,100% { opacity:1; transform:scale(1); }
  50%     { opacity:.3; transform:scale(2); }
}

.resume-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(52px, 8vw, 96px);
  font-weight: 700;
  line-height: .88;
  letter-spacing: -2px;
  margin-bottom: 14px;
  background: linear-gradient(120deg, #8a4a3a 0%, #c07060 30%, #d49878 52%, #e8c4b8 68%, #c07060 82%, #8a4a3a 100%);
  background-size: 260% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: nameShimmer 6s linear infinite;
}
@keyframes nameShimmer {
  0%   { background-position: 0% center; }
  100% { background-position: 260% center; }
}
.resume-name em { font-style: italic; }

.resume-role {
  font-size: clamp(11px, 1.2vw, 13.5px);
  font-weight: 400;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(90,62,56,0.5);
  margin-bottom: 32px;
}

.dl-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 13px 30px;
  border-radius: 999px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  color: #faf7f4;
  background: linear-gradient(135deg, #c07060 0%, #8a4a3a 100%);
  box-shadow: 0 8px 28px rgba(192,112,96,0.35);
  transition: transform .25s, box-shadow .25s;
  position: relative;
  overflow: hidden;
}
.dl-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
  pointer-events: none;
}
.dl-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 36px rgba(192,112,96,0.48);
}

/* ══════════════════════════════════
   BODY — three columns
══════════════════════════════════ */
.resume-body {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 36px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: start;
}

/* Column label */
.col-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(192,112,96,0.75);
  margin-bottom: 32px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(192,112,96,0.18);
}

.col-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px; height: 28px;
  border-radius: 8px;
  background: rgba(192,112,96,0.1);
  border: 1px solid rgba(192,112,96,0.2);
  color: #c07060;
  flex-shrink: 0;
}

/* ══════════════════════════════════
   TIMELINE
══════════════════════════════════ */
.timeline { position: relative; }

.tl-item {
  position: relative;
  padding-left: 26px;
  padding-bottom: 32px;
}
.tl-item.last { padding-bottom: 0; }

.tl-dot {
  position: absolute;
  left: 0; top: 6px;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #c07060;
  box-shadow: 0 0 0 3px rgba(192,112,96,0.18), 0 0 12px rgba(192,112,96,0.3);
  z-index: 1;
  transition: transform .25s, box-shadow .25s;
}
.tl-item:hover .tl-dot {
  transform: scale(1.3);
  box-shadow: 0 0 0 5px rgba(192,112,96,0.22), 0 0 20px rgba(192,112,96,0.4);
}

.tl-line {
  position: absolute;
  left: 4px; top: 18px; bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, rgba(192,112,96,0.32) 0%, rgba(192,112,96,0.06) 100%);
}

.tl-card {
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(10px) saturate(1.2);
  -webkit-backdrop-filter: blur(10px) saturate(1.2);
  border: 1px solid rgba(192,112,96,0.12);
  border-radius: 16px;
  padding: 18px 20px;
  box-shadow: 0 4px 18px rgba(138,74,58,0.07), 0 1px 4px rgba(138,74,58,0.04);
  transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease, border-color .3s ease;
}
.tl-item:hover .tl-card {
  transform: translateY(-3px) translateX(2px);
  box-shadow: 0 12px 32px rgba(138,74,58,0.12), 0 2px 8px rgba(138,74,58,0.06);
  border-color: rgba(192,112,96,0.26);
}

.tl-period {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(192,112,96,0.75);
  background: rgba(192,112,96,0.08);
  border: 1px solid rgba(192,112,96,0.18);
  border-radius: 999px;
  padding: 3px 9px;
  margin-bottom: 9px;
}

.tl-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-weight: 700;
  color: #1a1210;
  line-height: 1.1;
  letter-spacing: -.3px;
  margin-bottom: 3px;
}

.tl-sub {
  font-size: 11px;
  font-weight: 500;
  color: #c07060;
  letter-spacing: .5px;
  margin-bottom: 7px;
}

.tl-org {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 400;
  color: rgba(90,62,56,0.52);
  margin-bottom: 10px;
}
.tl-org svg { flex-shrink: 0; opacity: .55; }

.tl-body {
  font-size: 11.5px;
  line-height: 1.75;
  color: rgba(26,18,16,0.55);
  font-weight: 300;
  margin-bottom: 11px;
}

.tl-tags { display: flex; flex-wrap: wrap; gap: 5px; }
.tl-tag {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 999px;
  border: 1px solid rgba(192,112,96,0.18);
  color: rgba(138,74,58,0.62);
  background: rgba(192,112,96,0.05);
  transition: background .2s, color .2s, border-color .2s;
}
.tl-tag:hover {
  background: rgba(192,112,96,0.13);
  color: #c07060;
  border-color: rgba(192,112,96,0.36);
}

/* ══════════════════════════════════
   SOFT SKILLS COLUMN
══════════════════════════════════ */
.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 0;
}

.skill-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255,255,255,0.6);
  border: 1px solid rgba(192,112,96,0.11);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(138,74,58,0.05);
  transition: transform .28s cubic-bezier(.16,1,.3,1),
              box-shadow .28s ease,
              border-color .28s ease,
              background .28s ease;
}
.skill-item:hover {
  transform: translateX(5px);
  background: rgba(255,255,255,0.85);
  border-color: rgba(192,112,96,0.26);
  box-shadow: 0 6px 22px rgba(138,74,58,0.10);
}

.skill-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px; height: 34px;
  border-radius: 10px;
  background: rgba(192,112,96,0.09);
  border: 1px solid rgba(192,112,96,0.18);
  color: #c07060;
  flex-shrink: 0;
  transition: background .25s, border-color .25s;
}
.skill-item:hover .skill-icon-wrap {
  background: rgba(192,112,96,0.16);
  border-color: rgba(192,112,96,0.35);
}

.skill-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.skill-name {
  font-size: 12.5px;
  font-weight: 600;
  color: #1a1210;
  letter-spacing: .1px;
}

.skill-desc {
  font-size: 10.5px;
  font-weight: 300;
  color: rgba(90,62,56,0.55);
  line-height: 1.5;
}

/* Divider between skill list and trait cloud */
.skills-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(192,112,96,0.22), transparent);
  margin: 20px 0;
}

/* Trait pill cloud */
.trait-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.trait {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 6px 13px;
  border-radius: 999px;
  border: 1px solid rgba(192,112,96,0.18);
  color: rgba(90,62,56,0.62);
  background: rgba(250,247,244,0.8);
  transition: background .2s, color .2s, border-color .2s, transform .2s;
}
.trait:hover {
  transform: translateY(-2px);
  background: rgba(192,112,96,0.08);
  color: #8a4a3a;
  border-color: rgba(192,112,96,0.32);
}

.trait.accent {
  background: rgba(192,112,96,0.1);
  border-color: rgba(192,112,96,0.28);
  color: #c07060;
}
.trait.accent:hover {
  background: rgba(192,112,96,0.18);
  color: #8a4a3a;
}

/* ══════════════════════════════════
   BOTTOM CTA
══════════════════════════════════ */
.resume-footer-cta {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 64px;
}

.cta-line {
  flex: 1;
  max-width: 120px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(192,112,96,0.35));
}
.cta-line:last-child {
  background: linear-gradient(90deg, rgba(192,112,96,0.35), transparent);
}

.cta-text {
  font-size: 11px;
  font-weight: 400;
  color: rgba(90,62,56,0.45);
  letter-spacing: 2px;
  text-transform: uppercase;
  white-space: nowrap;
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  color: #c07060;
  border-bottom: 1px solid rgba(192,112,96,0.35);
  padding-bottom: 1px;
  transition: color .2s, border-color .2s, gap .2s;
}
.cta-link:hover { color: #8a4a3a; border-color: #8a4a3a; gap: 10px; }

/* ══════════════════════════════════
   RESPONSIVE
══════════════════════════════════ */
@media (max-width: 1024px) {
  .resume-body {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  /* Soft skills spans full width on tablet */
  .resume-col:last-child {
    grid-column: 1 / -1;
  }
  /* On tablet, soft skills grid goes horizontal */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
}

@media (max-width: 700px) {
  .resume-page { padding: 80px 5vw 60px; }
  .resume-body {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .resume-col:last-child { grid-column: auto; }
  .skills-grid { grid-template-columns: 1fr; }
  .resume-name { letter-spacing: -1px; }
  .cta-line { display: none; }
}

@media (max-width: 480px) {
  .resume-name { font-size: 46px; }
  .tl-card { padding: 14px 15px; }
  .tl-title { font-size: 18px; }
}

/* ══════════════════════════════════
   EXPERIENCE — View Details Button
══════════════════════════════════ */
.exp-card { position: relative; }

.exp-view-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 12px;
  padding: 8px 16px;
  border-radius: 999px;
  font-family: 'DM Sans', sans-serif;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: .8px;
  text-transform: uppercase;
  cursor: pointer;
  border: 1px solid rgba(192,112,96,0.28);
  background: rgba(192,112,96,0.07);
  color: #c07060;
  transition: background .22s, border-color .22s, color .22s, transform .22s, box-shadow .22s;
}
.exp-view-btn:hover {
  background: #c07060;
  border-color: #c07060;
  color: #faf7f4;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(192,112,96,0.35);
}

/* ══════════════════════════════════
   MODAL BACKDROP
══════════════════════════════════ */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(26,18,12,0.62);
  backdrop-filter: blur(6px) saturate(1.2);
  -webkit-backdrop-filter: blur(6px) saturate(1.2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

/* ── Modal card ── */
.modal-card {
  position: relative;
  background: #faf7f4;
  border-radius: 24px;
  width: 100%;
  max-width: 860px;
  max-height: 88vh;
  overflow: hidden;
  box-shadow:
    0 40px 100px rgba(26,18,12,0.38),
    0 0 0 1px rgba(192,112,96,0.18);
  display: flex;
  flex-direction: column;
}

/* Close button */
.modal-close {
  position: absolute;
  top: 14px; right: 14px;
  z-index: 10;
  width: 36px; height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(192,112,96,0.22);
  background: rgba(250,247,244,0.9);
  backdrop-filter: blur(8px);
  color: rgba(90,62,56,0.7);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background .2s, color .2s, transform .2s, border-color .2s;
}
.modal-close:hover {
  background: #c07060;
  border-color: #c07060;
  color: #faf7f4;
  transform: rotate(90deg) scale(1.08);
}

/* Inner two-column layout */
.modal-inner {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* ── Gallery column (left) ── */
.modal-gallery {
  width: 52%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: #1a1210;
}

.modal-main-img {
  position: relative;
  flex: 1;
  overflow: hidden;
  min-height: 280px;
}

.modal-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Placeholder when no real image */
.modal-img[src$=".jpg"],
.modal-img[src$=".png"] {
  background: linear-gradient(135deg, #3a2018 0%, #6e4c42 100%);
}

/* Arrow buttons */
.img-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 34px; height: 34px;
  border-radius: 50%;
  border: none;
  background: rgba(250,247,244,0.15);
  backdrop-filter: blur(6px);
  color: rgba(250,247,244,0.85);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background .2s, transform .2s;
  z-index: 2;
}
.img-arrow:hover {
  background: rgba(192,112,96,0.75);
  transform: translateY(-50%) scale(1.1);
}
.img-prev { left: 10px; }
.img-next { right: 10px; }

.img-counter {
  position: absolute;
  bottom: 10px; right: 12px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.5px;
  color: rgba(250,247,244,0.65);
  background: rgba(26,18,12,0.45);
  backdrop-filter: blur(4px);
  padding: 3px 9px;
  border-radius: 999px;
}

/* Thumbnail strip */
.modal-thumbs {
  display: flex;
  gap: 4px;
  padding: 8px;
  background: rgba(26,18,12,0.5);
  overflow-x: auto;
  scrollbar-width: none;
  flex-shrink: 0;
}
.modal-thumbs::-webkit-scrollbar { display: none; }

.modal-thumb {
  width: 52px; height: 38px;
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  background: none;
  transition: border-color .2s, transform .2s, opacity .2s;
  opacity: 0.55;
}
.modal-thumb.active {
  border-color: #c07060;
  opacity: 1;
  transform: scale(1.06);
}
.modal-thumb:hover:not(.active) { opacity: 0.82; }
.modal-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* ── Details column (right) ── */
.modal-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px 26px 24px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(192,112,96,0.2) transparent;
}

.modal-header { display: flex; flex-direction: column; gap: 4px; }

.modal-meta-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.modal-period {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(192,112,96,0.75);
  background: rgba(192,112,96,0.09);
  border: 1px solid rgba(192,112,96,0.2);
  border-radius: 999px;
  padding: 3px 10px;
}

.modal-org-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: rgba(90,62,56,0.5);
  font-weight: 400;
}

.modal-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  font-weight: 700;
  color: #1a1210;
  letter-spacing: -.5px;
  line-height: 1.05;
}

.modal-role {
  font-size: 12px;
  font-weight: 500;
  color: #c07060;
  letter-spacing: .4px;
}

.modal-desc {
  font-size: 12.5px;
  line-height: 1.82;
  color: rgba(26,18,16,0.6);
  font-weight: 300;
}

/* Highlights list */
.modal-highlights {
  background: rgba(192,112,96,0.05);
  border: 1px solid rgba(192,112,96,0.12);
  border-radius: 12px;
  padding: 14px 16px;
}

.modal-hl-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(192,112,96,0.65);
  margin-bottom: 10px;
}

.modal-hl-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.modal-hl-list li {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  font-size: 12px;
  line-height: 1.6;
  color: rgba(26,18,16,0.62);
  font-weight: 300;
}

.hl-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #c07060;
  flex-shrink: 0;
  margin-top: 6px;
}

.modal-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 4px;
  border-top: 1px solid rgba(192,112,96,0.1);
}

/* ── Modal transition ── */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-active .modal-card,
.modal-fade-leave-active .modal-card {
  transition: transform 0.35s cubic-bezier(.16,1,.3,1), opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-from .modal-card {
  transform: scale(0.94) translateY(20px);
  opacity: 0;
}
.modal-fade-leave-to .modal-card {
  transform: scale(0.96) translateY(10px);
  opacity: 0;
}

/* Photo crossfade */
.photo-fade-enter-active,
.photo-fade-leave-active { transition: opacity 0.25s ease; }
.photo-fade-enter-from,
.photo-fade-leave-to     { opacity: 0; }

/* ── Modal responsive ── */
@media (max-width: 680px) {
  .modal-backdrop { padding: 12px; }
  .modal-inner { flex-direction: column; }
  .modal-gallery { width: 100%; }
  .modal-main-img { min-height: 200px; }
  .modal-details { padding: 20px 18px; }
  .modal-title { font-size: 22px; }
}

</style>