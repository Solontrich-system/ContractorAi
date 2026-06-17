document.addEventListener('DOMContentLoaded', () => {

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* Navbar shadow on scroll */
  const navEl = document.querySelector('nav');
  if (navEl) {
    window.addEventListener('scroll', () => {
      navEl.style.boxShadow = window.scrollY > 10 ? '0 4px 24px rgba(0,0,0,0.4)' : 'none';
    }, { passive: true });
  }

  /* Download button feedback */
  const downloadBtn = document.querySelector('.btn-download');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const label = downloadBtn.querySelector('.dl-name');
      if (label) {
        const orig = label.textContent;
        label.textContent = 'Starting download…';
        setTimeout(() => { label.textContent = orig; }, 2500);
      }
      setTimeout(() => {
        const guide = document.querySelector('.install-card');
        if (guide) guide.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 700);
    });
  }

  /* Scroll-reveal fade-in */
  if ('IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.info-block, .install-card, .btn-download');
    targets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    targets.forEach(el => observer.observe(el));
  }

  /* Mobile: collapsible install steps */
  const installHeader = document.querySelector('.install-card-header');
  const installSteps  = document.querySelector('.install-steps');
  const installNote   = document.querySelector('.install-note');
  if (installHeader && installSteps && window.innerWidth < 600) {
    installSteps.style.display = 'none';
    if (installNote) installNote.style.display = 'none';
    installHeader.style.cursor = 'pointer';
    const toggle = document.createElement('span');
    toggle.textContent = '▾ Expand';
    toggle.style.cssText = 'font-size:11px;color:var(--amber);margin-left:auto;white-space:nowrap;';
    installHeader.appendChild(toggle);
    let open = false;
    installHeader.addEventListener('click', () => {
      open = !open;
      installSteps.style.display = open ? 'block' : 'none';
      if (installNote) installNote.style.display = open ? 'block' : 'none';
      toggle.textContent = open ? '▴ Collapse' : '▾ Expand';
    });
  }

});
