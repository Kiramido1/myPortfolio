// Helpers
const onReady = (fn) => document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);

onReady(() => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar scroll style
  const nav = document.getElementById('siteNav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Social rail fade-in
  const socialRail = document.querySelector('.social-rail');
  if (socialRail) {
    setTimeout(() => socialRail.classList.add('fade-in'), 300);
  }

  // Reveal on scroll
  const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Global scroll direction animation helpers
  let lastY = window.scrollY;
  const onDirScroll = () => {
    const y = window.scrollY;
    const body = document.body;
    if (y > lastY) { body.classList.add('scrolling-down'); body.classList.remove('scrolling-up'); }
    else if (y < lastY) { body.classList.add('scrolling-up'); body.classList.remove('scrolling-down'); }
    lastY = y;
  };
  window.addEventListener('scroll', onDirScroll, { passive: true });

  // Parallax on scroll for hero
  const parallaxEls = Array.from(document.querySelectorAll('.parallax-el'));
  if (parallaxEls.length) {
    let ticking = false;
    const applyParallax = () => {
      const y = window.scrollY || window.pageYOffset;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        el.style.transform = `translateY(${y * speed}px)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(applyParallax);
        ticking = true;
      }
    }, { passive: true });
    applyParallax();
  }

  // View Certificate buttons -> modal with subtle animation
  const certButtons = Array.from(document.querySelectorAll('.btn-view-cert'));
  const modalEl = document.getElementById('projCertModal');
  const modalImg = document.getElementById('projCertPreview');
  let certModal;
  if (modalEl) certModal = new bootstrap.Modal(modalEl);
  certButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-cert') || '';
      if (modalImg) modalImg.src = src;
      if (certModal) certModal.show();
    });
  });

  // Project thumbs -> preview modal
  const projThumbs = Array.from(document.querySelectorAll('.project-card .thumb-img'));
  const projImageModalEl = document.getElementById('projImageModal');
  const projImagePreview = document.getElementById('projImagePreview');
  const projImageTitle = document.getElementById('projImageTitle');
  let projImageModal;
  if (projImageModalEl) projImageModal = new bootstrap.Modal(projImageModalEl);
  projThumbs.forEach(img => {
    img.addEventListener('click', () => {
      const src = img.getAttribute('src');
      const title = img.getAttribute('data-title') || 'Preview';
      if (projImagePreview) projImagePreview.src = src;
      if (projImageTitle) projImageTitle.textContent = title;
      if (projImageModal) projImageModal.show();
    });
  });

  // Footer ensure visible + animate
  const footer = document.querySelector('.footer-section');
  if (footer) {
    footer.classList.add('footer-animate');
    if ('IntersectionObserver' in window) {
      const fo = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('footer-animate');
          else e.target.classList.remove('footer-animate');
        });
      }, { threshold: 0.05 });
      fo.observe(footer);
    }
  }
});



