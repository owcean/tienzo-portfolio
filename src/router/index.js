// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue'; 

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: () => import('../components/About.vue') },
  { path: '/projects', name: 'Projects', component: () => import('../components/Projects.vue') },
  { path: '/resume', name: 'Resume', component: () => import('../components/Resume.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../components/Contact.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;