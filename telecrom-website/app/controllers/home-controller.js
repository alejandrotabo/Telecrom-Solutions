/* ============================================
   TeleCrom Solutions — Main JavaScript
   Animations, Particles, Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initAboutCarousel();
  initScrollReveal();
  initCounters();
  initPortfolioFilters();
  initPortfolioModal();
  initHorizontalScroll();
  initContactForm();
  initSmoothScroll();
  initMobileMenu();
});


/* =============================================
   3. About Story Carousel
   ============================================= */
function initAboutCarousel() {
  const mount = document.getElementById('about-story-mount');
  const model = window.TeleCromAboutModel;
  const View = window.TeleCromAboutView;
  if (!mount || !model || !View) return;

  new View(mount, model.slides).render();

  const carousel = mount.querySelector('[data-about-carousel]');
  const slides = [...carousel.querySelectorAll('[data-about-slide]')];
  const dots = [...carousel.querySelectorAll('[data-about-index]')];
  let currentIndex = 0;
  let autoplay;

  function showSlide(nextIndex) {
    currentIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const active = index === currentIndex;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, index) => {
      const active = index === currentIndex;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  }

  function restartAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(() => showSlide(currentIndex + 1), 6000);
  }

  carousel.addEventListener('click', event => {
    const arrow = event.target.closest('[data-about-direction]');
    const dot = event.target.closest('[data-about-index]');
    if (arrow) showSlide(currentIndex + (arrow.dataset.aboutDirection === 'next' ? 1 : -1));
    if (dot) showSlide(Number(dot.dataset.aboutIndex));
    if (arrow || dot) restartAutoplay();
  });
  carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
  carousel.addEventListener('mouseleave', restartAutoplay);
  restartAutoplay();
}
/* =============================================
  1. Particle / Node Network Animation (Hero)
  ============================================= */
function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrame;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.2;

      // Some particles are "nodes" (larger, red-tinted)
      this.isNode = Math.random() < 0.12;
      if (this.isNode) {
        this.size = Math.random() * 3 + 2.5;
        this.opacity = Math.random() * 0.4 + 0.4;
      }
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Boundary wrapping
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;

      // Mouse interaction
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }
      }
    }

    draw() {
      if (this.isNode) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 43, 43, ${this.opacity})`;
        ctx.fill();

        // Glow effect for nodes
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 43, 43, ${this.opacity * 0.15})`;
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(158, 168, 163, ${this.opacity})`;
        ctx.fill();
      }
    }
  }

  // Create particles
  const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 120);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 160;

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.15;
          const isRedConnection = particles[i].isNode || particles[j].isNode;

          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = isRedConnection
            ? `rgba(212, 43, 43, ${opacity * 1.5})`
            : `rgba(158, 168, 163, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConnections();
    animationFrame = requestAnimationFrame(animate);
  }

  animate();

  // Cleanup
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrame);
  });
}

/* =============================================
   2. Navbar Scroll Effect
   ============================================= */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  });

  // Active link highlighting
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* =============================================
   3. Scroll Reveal Animations
   ============================================= */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  reveals.forEach(el => observer.observe(el));
}

/* =============================================
   4. Counter Animation
   ============================================= */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }
}

/* =============================================
   5. Portfolio Filters
   ============================================= */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            item.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* =============================================
   7. Portfolio Modal
   ============================================= */
function initPortfolioModal() {
  const modal = document.getElementById('portfolio-modal');
  if (!modal) return;

  const overlay   = modal;
  const closeBtn  = modal.querySelector('.modal-close');
  const modalTitle = modal.querySelector('.modal-header h3');

  // Buscar vistas con document.querySelector para máxima robustez
  const standardContent = document.querySelector('.modal-standard-content');
  const liveContent     = document.querySelector('.modal-live-content');
  const designContent   = document.querySelector('.modal-design-content');

  if (!standardContent || !liveContent || !designContent) {
    console.error('[Modal] Faltan vistas del modal', { standardContent, liveContent, designContent });
    return;
  }

  // Muestra solo la vista indicada, oculta las demás con display y hidden
  function showOnly(active) {
    [standardContent, liveContent, designContent].forEach(el => {
      el.style.display = 'none';
      el.hidden = true;
    });
    active.style.display = '';
    active.hidden = false;
  }

  // Elementos de cada vista
  const standardTags        = standardContent.querySelector('.modal-tags');
  const standardDescription = standardContent.querySelector('.modal-description');
  const standardTech        = standardContent.querySelector('.modal-tech');

  const liveTags        = liveContent.querySelector('.modal-tags');
  const liveDescription = liveContent.querySelector('.modal-description');
  const liveTech        = liveContent.querySelector('.modal-tech');
  const liveIframe      = document.getElementById('modal-live-iframe');
  const liveUrlEl       = document.getElementById('modal-live-url');

  const designImg   = document.getElementById('modal-design-img');
  const designDots  = document.getElementById('modal-design-dots');
  const designList  = document.getElementById('modal-design-list');
  const designTags  = designContent.querySelector('.modal-tags');
  const designTools = designContent.querySelector('.modal-design-tools');
  const designIntro = designContent.querySelector('.modal-design-intro');

  function buildTags(container, tagEls) {
    container.innerHTML = '';
    tagEls.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'portfolio-tag';
      span.textContent = tag.textContent;
      container.appendChild(span);
    });
  }

  function buildTech(container, techs) {
    container.innerHTML = '';
    techs.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'modal-tech-badge';
      span.textContent = tech.trim();
      container.appendChild(span);
    });
  }

  // Mapeo de zona → posición % dentro de la imagen
  const zonePositions = {
    'top-center':   { top: '18%', left: '50%' },
    'top':          { top: '10%', left: '68%' },
    'center':       { top: '50%', left: '45%' },
    'bottom-right': { top: '62%', left: '72%' },
    'bottom-center':{ top: '84%', left: '50%' },
    'bottom':       { top: '88%', left: '50%' },
    'background':   { top: '32%', left: '12%' },
  };

  function buildDesignView(imgSrc, tags, techs, desc, points) {
    designImg.src = imgSrc;
    designImg.alt = modalTitle.textContent;
    buildTags(designTags, tags);
    buildTech(designTools, techs);
    designIntro.textContent = desc;

    designDots.innerHTML = '';
    designList.innerHTML = '';

    points.forEach((p, i) => {
      const pos = zonePositions[p.zona] || { top: `${15 + i * 16}%`, left: '50%' };

      const dot = document.createElement('button');
      dot.className = 'design-dot';
      dot.setAttribute('data-index', String(i));
      dot.setAttribute('data-label', p.label);
      dot.setAttribute('aria-label', `Punto ${p.n}: ${p.label}`);
      dot.style.top  = pos.top;
      dot.style.left = pos.left;
      dot.innerHTML  = `<span class="design-dot-num">${p.n}</span>`;
      designDots.appendChild(dot);

      const li = document.createElement('li');
      li.className = 'design-analysis-item';
      li.setAttribute('data-index', String(i));
      li.innerHTML = `
        <div class="design-analysis-header">
          <span class="design-analysis-num">${p.n}</span>
          <strong class="design-analysis-label">${p.label}</strong>
        </div>
        <p class="design-analysis-desc">${p.desc}</p>
      `;
      designList.appendChild(li);
    });

    // Interacción bidireccional dot ↔ item
    designDots.querySelectorAll('.design-dot').forEach(dot => {
      const idx  = Number(dot.dataset.index);
      const item = designList.querySelectorAll('.design-analysis-item')[idx];

      function activate() {
        designDots.querySelectorAll('.design-dot').forEach(d => d.classList.remove('active'));
        designList.querySelectorAll('.design-analysis-item').forEach(it => it.classList.remove('active'));
        dot.classList.add('active');
        item?.classList.add('active');
      }

      dot.addEventListener('mouseenter', () => { dot.classList.add('active'); item?.classList.add('active'); });
      dot.addEventListener('mouseleave', () => { dot.classList.remove('active'); item?.classList.remove('active'); });
      dot.addEventListener('click', (e) => { e.stopPropagation(); activate(); item?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); });

      item?.addEventListener('mouseenter', () => dot.classList.add('active'));
      item?.addEventListener('mouseleave', () => dot.classList.remove('active'));
      item?.addEventListener('click', () => {
        activate();
        const modalBody = modal.querySelector('.modal-body');
        if (modalBody) modalBody.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // Abrir modal
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      const title       = item.querySelector('.portfolio-info h3').textContent;
      const desc        = item.getAttribute('data-description') || item.querySelector('.portfolio-info p').textContent;
      const tags        = item.querySelectorAll('.portfolio-tag');
      const techs       = item.getAttribute('data-tech')?.split(',') || [];
      const liveUrl_val = item.getAttribute('data-live');
      const designSrc   = item.getAttribute('data-design');
      const pointsRaw   = item.getAttribute('data-points');

      modalTitle.textContent = title;
      modal.classList.remove('modal--live', 'modal--design');

      if (designSrc && pointsRaw) {
        let points = [];
        try { points = JSON.parse(pointsRaw); } catch(e) { console.error('[Modal] JSON inválido:', e); }
        showOnly(designContent);
        modal.classList.add('modal--design');
        buildDesignView(designSrc, tags, techs, desc, points);

      } else if (liveUrl_val) {
        showOnly(liveContent);
        modal.classList.add('modal--live');
        buildTags(liveTags, tags);
        liveDescription.textContent = desc;
        buildTech(liveTech, techs);
        liveUrlEl.textContent = liveUrl_val.split('/').pop() || 'preview';
        liveIframe.src = liveUrl_val;

      } else {
        showOnly(standardContent);
        buildTags(standardTags, tags);
        standardDescription.textContent = desc;
        buildTech(standardTech, techs);
      }

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Cerrar modal
  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    liveIframe.src = '';
    modal.classList.remove('modal--live', 'modal--design');
    [standardContent, liveContent, designContent].forEach(el => {
      el.style.display = 'none';
      el.hidden = true;
    });
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

/* =============================================
   8. Horizontal Process Scroll
   ============================================= */
function initHorizontalScroll() {
  const sections = document.querySelectorAll('[data-horizontal-scroll]');
  if (sections.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  sections.forEach(section => {
    const viewport = section.querySelector('.horizontal-scroll-viewport');
    const track = section.querySelector('.horizontal-scroll-track');
    if (!viewport || !track) return;

    let maxTranslate = 0;

    function measure() {
      if (window.innerWidth <= 768) {
        section.style.height = '';
        track.style.transform = '';
        maxTranslate = 0;
        return;
      }

      maxTranslate = Math.max(0, track.scrollWidth - viewport.clientWidth);
      section.style.height = `${window.innerHeight + maxTranslate}px`;
      update();
    }

    function update() {
      if (!maxTranslate) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, (window.scrollY - sectionTop) / scrollDistance));
      track.style.transform = `translate3d(${-maxTranslate * progress}px, 0, 0)`;
    }

    measure();
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('scroll', update, { passive: true });
  });
}

/* =============================================
   9. Contact Form
   ============================================= */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const requestedService = new URLSearchParams(window.location.search).get('service');
  const serviceSelect = document.getElementById('contact-service');
  if (requestedService && serviceSelect) {
    const matchingOption = Array.from(serviceSelect.options).find(option => option.textContent === requestedService);
    if (matchingOption) serviceSelect.value = matchingOption.value;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate submission
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      const success = form.parentElement.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
      }
    }, 1500);
  });

  // Input animations
  form.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });
}

/* =============================================
  10. Smooth Scroll
   ============================================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const mobileMenu = document.querySelector('.navbar-links');
        const toggle = document.querySelector('.menu-toggle');
        if (mobileMenu?.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          toggle?.classList.remove('active');
        }
      }
    });
  });
}

/* =============================================
  11. Mobile Menu
   ============================================= */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.navbar-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
}
