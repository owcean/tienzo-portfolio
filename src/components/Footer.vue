<footer class="f4-footer">
  <div class="f4-corner tl"></div>
  <div class="f4-corner tr"></div>
  <div class="f4-corner bl"></div>
  <div class="f4-corner br"></div>
  
  <div class="f4-inner">
    <div class="f4-col">
      <div class="f4-block-title">Contact Specs</div>
      <div v-for="spec in contactSpecs" :key="spec.label" class="f4-spec-row">
        <span>{{ spec.label }}</span>
        <span>{{ spec.value }}</span>
      </div>
    </div>

    <div class="f4-name-block">
      <div class="f4-name">KRIS<em>EAN</em><br>TIENZO</div>
      <div class="f4-role">Frontend Dev · UI/UX Designer</div>
    </div>

    <div class="f4-col">
      <div class="f4-block-title">Links</div>
      <div v-for="link in socialLinks" :key="link.label" class="f4-spec-row">
        <span>{{ link.label }}</span>
        <span>{{ link.value }}</span>
      </div>
      <div class="f4-spec-row">
        <span>Status</span>
        <span :class="{ 'status-active': isAvailable }">
          {{ isAvailable ? 'Available' : 'Unavailable' }}
        </span>
      </div>
    </div>
  </div>
  <div class="f4-copy">© 2026 Krisean Tienzo — All rights reserved</div>
</footer>
  <script setup>
  import { ref, onMounted } from 'vue';
  
  /**
   * Reactive data for Footer Blueprint
   * Managed for Krisean Tienzo Portfolio
   */
  const contactSpecs = ref([
    { label: 'Email', value: 'tienzokrisean@gmail.com' },
    { label: 'Phone', value: '+63 967 033 9338' },
    { label: 'Location', value: 'Angeles, Pampanga' }
  ]);
  
  const socialLinks = ref([
    { label: 'GitHub', value: 'github.com/owcean' },
    { label: 'LinkedIn', value: 'krisean-tienzo' }
  ]);
  
  // Status indicator for "Available for Work"
  const isAvailable = ref(true);
  
  onMounted(() => {
    // Logic for entry animations if needed
    console.log("Blueprint Footer Loaded: Krisean Tienzo 2026");
  });
  </script>
  <style lang="css" scoped>
/* ─────────────────────────────────────────
   FOOTER 4: BLUEPRINT STYLE FIXES
───────────────────────────────────────── */
#p4 { 
  background: var(--bg-color, #fbf8f5); /* Champagne */
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.f4-footer {
  background: var(--bg-color);
  border-top: 1.5px solid rgba(166, 118, 99, 0.3); /* Copper border */
  padding: 40px 60px;
  position: relative;
  overflow: hidden;
  margin-top: auto; /* Push to bottom for one-scroll */
}

/* Blueprint Grid Texture using Copper */
.f4-footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(166, 118, 99, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(166, 118, 99, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

.f4-inner {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr; /* Center name given more weight */
  gap: 60px;
  align-items: center;
}

.f4-block-title {
  font-size: 9px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent-color, #a67663); /* Copper */
  margin-bottom: 14px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(166, 118, 99, 0.2);
  font-family: 'Inter', sans-serif;
}

.f4-spec-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid rgba(166, 118, 99, 0.08);
  font-size: 11px;
  font-family: 'Inter', sans-serif;
  color: #5c3d2e; /* Warm Brown */
}

.f4-spec-row span:last-child { 
  color: var(--accent-color); 
  font-weight: 500;
}

.status-active { color: #5a9a6a !important; font-weight: 700; }

/* Branding Block using Anton for impact */
.f4-name {
  font-family: 'Anton', sans-serif;
  font-size: 42px;
  line-height: 0.9;
  color: #1a1210;
  text-align: center;
}

.f4-name em { 
  color: var(--accent-color); 
  font-style: italic; 
  font-family: inherit; /* Keep Anton but style as em */
}

.f4-role {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-color);
  margin-top: 8px;
  text-align: center;
}

/* Corner Blueprint Marks */
.f4-corner {
  position: absolute;
  width: 15px; height: 15px;
  border-color: var(--accent-color);
  border-style: solid;
  opacity: 0.4;
}
.f4-corner.tl { top: 15px; left: 15px; border-width: 1.5px 0 0 1.5px; }
.f4-corner.tr { top: 15px; right: 15px; border-width: 1.5px 1.5px 0 0; }
.f4-corner.bl { bottom: 15px; left: 15px; border-width: 0 0 1.5px 1.5px; }
.f4-corner.br { bottom: 15px; right: 15px; border-width: 0 1.5px 1.5px 0; }

.f4-copy {
  text-align: center;
  margin-top: 30px;
  font-size: 9px;
  letter-spacing: 0.15em;
  color: rgba(92, 61, 46, 0.4);
}
</style>
