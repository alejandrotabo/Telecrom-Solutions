/* ============================================
   TeleCrom Solutions — Portfolio Controller
   Filtros, Scroll Reveal, Menú Móvil y Modal
   (Workflows, Live Demos y Análisis de Diseño)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initPortfolioFilters();
  initPortfolioModal();
});

/* =============================================
   1. Navbar Scroll Effect
   ============================================= */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* =============================================
   2. Mobile Menu
   ============================================= */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

/* =============================================
   3. Scroll Reveal Animations
   ============================================= */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('revealed'));
  }
}

/* =============================================
   4. Portfolio Filters
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
          }, 250);
        }
      });
    });
  });
}

/* =============================================
   5. Portfolio Modal (Workflow, Live y Diseño)
   ============================================= */
function initPortfolioModal() {
  const modal = document.getElementById('portfolio-modal');
  if (!modal) return;

  const overlay    = modal;
  const closeBtn   = modal.querySelector('.modal-close');
  const modalTitle = modal.querySelector('.modal-header h3');

  const standardContent = modal.querySelector('.modal-standard-content');
  const liveContent     = modal.querySelector('.modal-live-content');
  const designContent   = modal.querySelector('.modal-design-content');

  if (!standardContent || !liveContent || !designContent) return;

  function showOnly(active) {
    [standardContent, liveContent, designContent].forEach(el => {
      el.style.display = 'none';
      el.hidden = true;
    });
    active.style.display = '';
    active.hidden = false;
  }

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
    if (!container) return;
    container.innerHTML = '';
    tagEls.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'portfolio-tag';
      span.textContent = tag.textContent;
      container.appendChild(span);
    });
  }

  function buildTech(container, techs) {
    if (!container) return;
    container.innerHTML = '';
    techs.forEach(tech => {
      const trimmed = tech.trim();
      if (!trimmed) return;
      const span = document.createElement('span');
      span.className = 'modal-tech-badge';
      span.textContent = trimmed;
      container.appendChild(span);
    });
  }

  const zonePositions = {
    'top-center':    { top: '18%', left: '50%' },
    'top':           { top: '10%', left: '68%' },
    'center':        { top: '50%', left: '45%' },
    'bottom-right':  { top: '62%', left: '72%' },
    'bottom-center': { top: '84%', left: '50%' },
    'bottom':        { top: '88%', left: '50%' },
    'background':    { top: '32%', left: '12%' },
  };

  function buildDesignView(imgSrc, tags, techs, desc, points) {
    if (designImg) {
      designImg.src = imgSrc;
      designImg.alt = modalTitle ? modalTitle.textContent : 'Diseño';
    }
    buildTags(designTags, tags);
    buildTech(designTools, techs);
    if (designIntro) designIntro.textContent = desc;

    if (designDots) designDots.innerHTML = '';
    if (designList) designList.innerHTML = '';

    points.forEach((p, i) => {
      const pos = zonePositions[p.zona] || { top: `${15 + i * 16}%`, left: '50%' };

      if (designDots) {
        const dot = document.createElement('button');
        dot.className = 'design-dot';
        dot.setAttribute('data-index', String(i));
        dot.setAttribute('data-label', p.label || `Punto ${p.n}`);
        dot.setAttribute('aria-label', `Punto ${p.n}: ${p.label}`);
        dot.style.top  = pos.top;
        dot.style.left = pos.left;
        dot.innerHTML  = `<span class="design-dot-num">${p.n}</span>`;
        designDots.appendChild(dot);
      }

      if (designList) {
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
      }
    });

    if (designDots && designList) {
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
  }

  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      const heading     = item.querySelector('.portfolio-info h3');
      const title       = heading ? heading.textContent : 'Detalle del Proyecto';
      const desc        = item.getAttribute('data-description') || (item.querySelector('.portfolio-info p') ? item.querySelector('.portfolio-info p').textContent : '');
      const tags        = item.querySelectorAll('.portfolio-tag');
      const techs       = item.getAttribute('data-tech')?.split(',') || [];
      const liveUrl_val = item.getAttribute('data-live');
      const designSrc   = item.getAttribute('data-design');
      const pointsRaw   = item.getAttribute('data-points');

      if (modalTitle) modalTitle.textContent = title;
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
        if (liveDescription) liveDescription.textContent = desc;
        buildTech(liveTech, techs);
        if (liveUrlEl) liveUrlEl.textContent = liveUrl_val.split('/').pop() || 'demo';
        if (liveIframe) liveIframe.src = liveUrl_val;

      } else {
        showOnly(standardContent);
        buildTags(standardTags, tags);
        if (standardDescription) standardDescription.textContent = desc;
        buildTech(standardTech, techs);
      }

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (liveIframe) liveIframe.src = '';
    modal.classList.remove('modal--live', 'modal--design');
    [standardContent, liveContent, designContent].forEach(el => {
      el.style.display = 'none';
      el.hidden = true;
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
