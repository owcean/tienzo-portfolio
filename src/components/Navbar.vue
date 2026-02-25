<template>
    <nav class="navbar-wrapper">
      <div class="nav-pill">
        <a href="/" class="nav-logo-link">
          <img src="/kt_logo.png" alt="KT Logo" class="nav-logo" />
        </a>
  
        <div class="nav-links">
          <router-link to="/" class="nav-item">Home</router-link>
          <router-link to="/about" class="nav-item">About</router-link>
          <router-link to="/projects" class="nav-item">Projects</router-link>
          <router-link to="/resume" class="nav-item">Resume</router-link>
          <router-link to="/contact" class="nav-item">Contact</router-link>
        </div>
  
        <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle Theme">
          <div class="toggle-track">
            <div class="toggle-thumb" :class="{ 'is-dark': isDark }">
              <span v-if="!isDark">☀︎</span>
              <span v-else>⏾</span>
            </div>
          </div>
        </button>
      </div>
  
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
  import { ref, onMounted, onUnmounted } from 'vue';
  import '../assets/foot-nav.css'

  
  // --- Theme Toggle Logic ---
  const isDark = ref(false);
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
  };
  
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
  
  