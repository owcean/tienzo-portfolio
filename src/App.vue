<template>
  <div id="app">
    <div v-if="showLanding" class="landing-container" :class="{ 'start-animation': isVisible }">
      <h1 class="name-wrapper">
        <span v-for="(l, i) in 'KRISEAN'" :key="i" class="char" :style="{ transitionDelay: `${i * 0.1}s` }">
          {{ l }}
        </span>
      </h1>
    </div>

    <div v-else>
      <Navbar /> <router-view />
      <!--<About />
      <Projects />
      <Resume />
      <Contact />  
     <Footer />-->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from './components/Navbar.vue'; // Import the component
//import About from './components/About.vue';
//import Projects from './components/Projects.vue';
//import Resume from './components/Resume.vue';
//import Contact from './components/Contact.vue';

//import Footer from './components/Footer.vue';

const isVisible = ref(false);
const showLanding = ref(true);

onMounted(() => {
  setTimeout(() => { isVisible.value = true; }, 100);
  setTimeout(() => { showLanding.value = false; }, 2500); 
});
</script>