// Helpers
const onReady = (fn) => document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);

onReady(() => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar scroll style (reuse behavior)
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
  if (socialRail) setTimeout(() => socialRail.classList.add('fade-in'), 300);

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

  // Certificate preview: click placeholder to open modal
  const certThumbs = Array.from(document.querySelectorAll('.cert-card .cert-thumb'));
  const certModalEl = document.getElementById('certModal');
  const certImg = document.getElementById('certPreview');
  let certModal;
  if (certModalEl) certModal = new bootstrap.Modal(certModalEl);

  certThumbs.forEach(thumb => {
    // If parent has data-cert, paint it as background and mark as has-image
    const parent = thumb.closest('.cert-card');
    const src = parent?.getAttribute('data-cert') || '';
    if (src) {
      thumb.style.backgroundImage = `url('${src}')`;
      parent.classList.add('has-image');
    }
    thumb.addEventListener('click', () => {
      // open preview modal
      if (certImg) certImg.src = src;
      if (certModal) certModal.show();
    });
  });

  // Footer animation on scroll
  const footer = document.querySelector('.footer-section');
  if (footer && 'IntersectionObserver' in window) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('footer-animate');
        } else {
          e.target.classList.remove('footer-animate');
        }
      });
    }, { threshold: 0.1 });
    footerObserver.observe(footer);
  }
});


