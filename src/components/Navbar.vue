<template>
    <nav class="navbar-wrapper">
      <div class="nav-pill">
        <a href="/" class="nav-logo-link">
          <img src="/kt_logo.png" alt="KT Logo" class="nav-logo" />
        </a>
  
        <div class="nav-links" :class="{ 'mobile-open': menuOpen }">
          <router-link to="/" class="nav-item" @click="closeMenu">Home</router-link>
          <router-link to="/about" class="nav-item" @click="closeMenu">About</router-link>
          <router-link to="/projects" class="nav-item" @click="closeMenu">Projects</router-link>
          <router-link to="/resume" class="nav-item" @click="closeMenu">Resume</router-link>
          <router-link to="/contact" class="nav-item" @click="closeMenu">Contact</router-link>
        </div>

        <div class="nav-right">
          <button class="hamburger" @click="toggleMenu" aria-label="Toggle Menu" :class="{ 'is-open': menuOpen }">
            <span class="ham-bar"></span>
            <span class="ham-bar"></span>
            <span class="ham-bar"></span>
          </button>

          <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle Theme">
            <div class="toggle-track">
              <div class="toggle-thumb" :class="{ 'is-dark': isDark }">
                <span v-if="!isDark">☀︎</span>
                <span v-else>⏾</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile Drawer -->
      <Transition name="drawer">
        <div v-if="menuOpen" class="mobile-drawer">
          <router-link to="/" class="drawer-item" @click="closeMenu">Home</router-link>
          <div class="drawer-divider"></div>
          <router-link to="/about" class="drawer-item" @click="closeMenu">About</router-link>
          <div class="drawer-divider"></div>
          <router-link to="/projects" class="drawer-item" @click="closeMenu">Projects</router-link>
          <div class="drawer-divider"></div>
          <router-link to="/resume" class="drawer-item" @click="closeMenu">Resume</router-link>
          <div class="drawer-divider"></div>
          <router-link to="/contact" class="drawer-item" @click="closeMenu">Contact</router-link>
        </div>
      </Transition>
  
      <div class="cursor-wrapper">
        <div 
          class="main-cursor-circle" 
          :style="cursorPos" 
          :class="{ 'cursor-active': isHovering }"
        ></div>
        
        <div 
          v-for="particle in particles" 
          :key="particle.id"
          class="dust-particle"
          :style="particle.style"
        ></div>
      </div>
    </nav>

    
  </template>
  
  <script setup>
  import { ref, inject, computed, onMounted, onUnmounted } from 'vue';
  import '../assets/foot-nav.css'

  // --- Mobile Menu Logic ---
  const menuOpen = ref(false);
  const toggleMenu = () => { menuOpen.value = !menuOpen.value; };
  const closeMenu = () => { menuOpen.value = false; };

  // --- Theme Toggle Logic (shared via App.vue provide/inject) ---
  const theme = inject('theme');
  const toggleTheme = inject('toggleTheme');
  const isDark = computed(() => theme.value === 'dark');
  
  // --- Cursor & Particle Logic ---
  const isHovering = ref(false);
  const particles = ref([]);
  const cursorPos = ref({ left: '0px', top: '0px' });
  let particleId = 0;
  
  const handleMouseMove = (e) => {
    cursorPos.value = { left: `${e.clientX}px`, top: `${e.clientY}px` };
    createParticle(e.clientX, e.clientY);
  };
  
  const createParticle = (x, y) => {
    const id = particleId++;
    const size = Math.random() * 4 + 2; 
    const destinationX = (Math.random() - 0.5) * 60;
    const destinationY = (Math.random() - 0.5) * 60;
    
    particles.value.push({
      id,
      style: {
        left: `${x}px`, top: `${y}px`, width: `${size}px`, height: `${size}px`,
        '--dx': `${destinationX}px`, '--dy': `${destinationY}px`
      }
    });
  
    setTimeout(() => {
      particles.value = particles.value.filter(p => p.id !== id);
    }, 1000);
  };
  
  const handleOver = (e) => {
    // Triggers cursor expansion only on specific interactive elements
    isHovering.value = !!e.target.closest('button, .nav-item, .deck-container, .acc-header, .pretty-link');
  };
  
  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleOver);
  });
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseover', handleOver);
  });
  </script>

<style scoped>
/* --- Logo always visible --- */
.nav-logo-link {
  display: flex !important;
  align-items: center;
  flex-shrink: 0;
}

.nav-logo {
  display: block !important;
  height: 36px;
  width: auto;
}

/* --- Right side wrapper for theme + hamburger --- */
.nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* --- Hamburger Button --- */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  z-index: 3000;
}

.ham-bar {
  display: block;
  width: 22px;
  height: 2px;
  background-color: var(--copper, #a67663);
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
  transform-origin: center;
}

/* Animate to X when open */
.hamburger.is-open .ham-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.is-open .ham-bar:nth-child(2) {
  opacity: 0;
  width: 0;
}
.hamburger.is-open .ham-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* --- Mobile Drawer --- */
.mobile-drawer {
  display: none;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  background: rgba(251, 248, 245, 0.97);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-top: 1px solid rgba(166, 118, 99, 0.15);
  padding: 8px 20px 28px;
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1500;
  box-shadow: 0 20px 40px rgba(166, 118, 99, 0.12);
}

.drawer-item {
  width: 100%;
  text-align: left;
  padding: 15px 16px;
  font-size: 1rem;
  font-weight: 500;
  color: #1a1210;
  text-decoration: none;
  letter-spacing: 0.02em;
  border-radius: 12px;
  transition: background 0.2s, color 0.2s, padding-left 0.2s;
  position: relative;
}

.drawer-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scaleY(0);
  width: 3px;
  height: 60%;
  background: #a67663;
  border-radius: 999px;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-item:hover,
.drawer-item.router-link-active {
  background: rgba(166, 118, 99, 0.08);
  color: #a67663;
  padding-left: 22px;
}

.drawer-item:hover::before,
.drawer-item.router-link-active::before {
  transform: translateY(-50%) scaleY(1);
}

.drawer-divider {
  height: 1px;
  background: rgba(166, 118, 99, 0.1);
  margin: 6px 16px;
}

/* Drawer slide-down transition */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* --- Responsive breakpoint --- */
@media (max-width: 768px) {
  .nav-links {
    display: none !important;
  }

  .hamburger {
    display: flex;
  }

  .mobile-drawer {
    display: flex;
  }
}

/* Dark theme support */
[data-theme="dark"] .mobile-drawer {
  background: rgba(18, 12, 10, 0.97);
  border-top-color: rgba(231, 193, 184, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

[data-theme="dark"] .drawer-item {
  color: #e7c1b8;
}

[data-theme="dark"] .drawer-item:hover,
[data-theme="dark"] .drawer-item.router-link-active {
  background: rgba(231, 193, 184, 0.08);
  color: #fbf8f5;
}

[data-theme="dark"] .drawer-item::before {
  background: #e7c1b8;
}

[data-theme="dark"] .drawer-divider {
  background: rgba(231, 193, 184, 0.08);
}

[data-theme="dark"] .ham-bar {
  background-color: var(--rose-gold, #e7c1b8);
}
</style>