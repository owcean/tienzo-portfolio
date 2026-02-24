<template>
    <main class="contact-page" :class="{ 'start-animation': isVisible }">
      <div class="contact-container">
        
        <section class="info-column">
          <div class="info-top">
            <span class="info-eyebrow reveal-up">Let's Work Together</span>
            <h1 class="huge-text">
              <span class="word-reveal"><span>HELLO.</span></span>
            </h1>
            <p class="description-text reveal-up">
              Need a beautiful website you can maintain yourself?<br>
              Get in touch — I'd love to hear from you.
            </p>
          </div>
  
          <div class="contact-list reveal-up">
  <div class="contact-item">
    <label>Email</label>
    <a href="mailto:tienzokrisean@gmail.com" class="email-link">
      <i class="fa-regular fa-envelope"></i>
      <span>tienzokrisean@gmail.com</span>
    </a>
  </div>

  <div class="social-icons-grid">
  <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn" class="icon-link">
    <img src="/linkedin.png" alt="LinkedIn" class="social-icon-img" />
  </a>

  <a href="https://github.com/owcean" target="_blank" aria-label="GitHub" class="icon-link">
    <img src="/github.png" alt="GitHub" class="social-icon-img" />
  </a>

  <a href="https://www.facebook.com/kgtnzo" target="_blank" aria-label="Facebook" class="icon-link">
    <img src="/facebook.png" alt="Facebook" class="social-icon-img" />
  </a>

  <a href="https://instagram.com" target="_blank" aria-label="Instagram" class="icon-link">
    <img src="/instagram.png" alt="Instagram" class="social-icon-img" />
  </a>
</div>

</div>
        </section>
  
        <section class="form-column reveal-up">
          <div class="form-orb form-orb-1"></div>
          <div class="form-orb form-orb-2"></div>
          <div class="form-orb form-orb-3"></div>
          <div class="form-grain"></div>
  
          <div class="form-card">
            <div v-if="submitted" class="success-state">
              <div class="success-icon">✓</div>
              <h2 class="form-title">Message Sent</h2>
              <p class="form-subtitle">Thank you! I've received your inquiry and will get back to you at tienzokrisean@gmail.com shortly.</p>
              <button @click="submitted = false" class="submit-btn refresh-btn">Send Another</button>
            </div>
  
            <div v-else>
              <div class="form-header">
                <span class="form-tag">New Message</span>
                <h2 class="form-title">Send a Message</h2>
                <p class="form-subtitle">I usually reply within 24 hours.</p>
              </div>
  
              <form 
                action="https://formspree.io/f/xpqjygkd" 
                method="POST" 
                @submit.prevent="handleSubmit" 
                class="message-form"
              >
                <div class="input-row">
                  <div class="input-field">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Your Name" required />
                  </div>
                  <div class="input-field">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="email@example.com" required />
                  </div>
                </div>
  
                <div class="input-field">
                  <label>Subject</label>
                  <input type="text" name="subject" placeholder="Project inquiry..." />
                </div>
  
                <div class="input-field">
                  <label>Message</label>
                  <textarea name="message" placeholder="Tell me about your project..." rows="5" required></textarea>
                </div>
  
                <button type="submit" class="submit-btn" :disabled="isSubmitting">
                  <span class="submit-label">{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
                  <span v-if="!isSubmitting" class="submit-arrow">→</span>
                  <div class="submit-glow"></div>
                </button>
              </form>
            </div>
          </div>
  
        </section>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import '../assets/contact.css'
  
  const isVisible = ref(false)
  const isSubmitting = ref(false)
  const submitted = ref(false)
  
  const handleSubmit = async (event) => {
    isSubmitting.value = true
    const form = event.target
    const formData = new FormData(form)
  
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
  
      if (response.ok) {
        submitted.value = true
        form.reset()
      } else {
        alert('Submission failed. Please try again.')
      }
    } catch (error) {
      alert('Error connecting to the server.')
    } finally {
      isSubmitting.value = false
    }
  }
  
  onMounted(() => {
    setTimeout(() => { isVisible.value = true }, 100)
  })
  </script>
  
