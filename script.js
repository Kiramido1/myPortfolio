// Helpers
const onReady = (fn) =>
  document.readyState !== "loading"
    ? fn()
    : document.addEventListener("DOMContentLoaded", fn);

onReady(() => {
  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sequential fade-in for hero left content
  const seq = Array.from(document.querySelectorAll(".fade-seq"));
  seq.forEach((el, idx) => {
    setTimeout(() => el.classList.add("fade-in"), 150 + idx * 200);
  });

  // Social rail fade-in
  const socialRail = document.querySelector(".social-rail");
  if (socialRail) {
    setTimeout(() => socialRail.classList.add("fade-in"), 300);
  }

  // Slide-in for portrait card
  const media = document.querySelector(".hero-media");
  if (media) setTimeout(() => media.classList.add("slide-in-active"), 500);

  // Portrait fallback if assets/portrait.jpg missing
  const portrait = document.querySelector(".hero-portrait");
  if (portrait) {
    portrait.addEventListener("error", () => {
      const fallback = portrait.getAttribute("data-fallback");
      if (fallback && portrait.src.indexOf(fallback) === -1) {
        portrait.src = fallback;
      }
    });
  }

  // Pager buttons activate tiny dots indicator
  const tinyDots = Array.from(document.querySelectorAll(".tiny-dot"));
  const pagers = Array.from(document.querySelectorAll(".pager"));
  let current = 1;

  const setActive = (i) => {
    current = i;
    tinyDots.forEach((d, idx) => d.classList.toggle("active", idx === i));
  };

  pagers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-index")) || 0;
      setActive(idx);
    });
  });

  // Auto-advance indicator
  let autoTimer = setInterval(
    () => setActive((current + 1) % tinyDots.length),
    4000
  );

  // Pause on hover
  const hero = document.querySelector(".hero-section");
  if (hero) {
    hero.addEventListener("mouseenter", () => clearInterval(autoTimer));
    hero.addEventListener(
      "mouseleave",
      () =>
        (autoTimer = setInterval(
          () => setActive((current + 1) % tinyDots.length),
          4000
        ))
    );
  }

  // Global scroll direction class toggle
  let lastY = window.scrollY;
  const onDirScroll = () => {
    const y = window.scrollY;
    const body = document.body;
    if (y > lastY) {
      body.classList.add("scrolling-down");
      body.classList.remove("scrolling-up");
    } else if (y < lastY) {
      body.classList.add("scrolling-up");
      body.classList.remove("scrolling-down");
    }
    lastY = y;
  };
  window.addEventListener("scroll", onDirScroll, { passive: true });

  // Navbar style on scroll
  const nav = document.getElementById("siteNav");
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Footer animation on scroll
  const footer = document.querySelector(".footer-section");
  if (footer && "IntersectionObserver" in window) {
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("footer-animate");
          } else {
            e.target.classList.remove("footer-animate");
          }
        });
      },
      { threshold: 0.1 }
    );
    footerObserver.observe(footer);
  }

  // Tilt effect on image card
  const tiltCard = document.querySelector(".tilt");
  if (tiltCard) {
    const maxTilt = 6; // degrees
    const damp = 16; // lower is snappier
    let rx = 0,
      ry = 0;
    const apply = () => {
      tiltCard.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    tiltCard.addEventListener("mousemove", (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      ry = (px - 0.5) * maxTilt * 2;
      rx = -(py - 0.5) * maxTilt * 2;
      apply();
    });
    tiltCard.addEventListener("mouseleave", () => {
      rx = 0;
      ry = 0;
      apply();
    });
  }

  // Social link hover effects
  const socialLinks = Array.from(
    document.querySelectorAll(".social-link-vertical")
  );
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.style.transform = "translateX(4px)";
    });
    link.addEventListener("mouseleave", () => {
      link.style.transform = "translateX(0)";
    });
  });

  // Typing/deleting effect for "Fekry"
  const typingEl = document.getElementById('heroTyping');
  if (typingEl) {
    const fullText = 'FEKRY';
    const typeSpeed = 130;    // ms per char
    const deleteSpeed = 80;   // ms per char
    const holdTime = 900;     // pause when full / empty
    let idx = 0;
    let typing = true;

    const tick = () => {
      if (typing) {
        typingEl.textContent = fullText.slice(0, idx + 1);
        idx++;
        if (idx === fullText.length) {
          typing = false;
          setTimeout(tick, holdTime);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        typingEl.textContent = fullText.slice(0, idx - 1);
        idx--;
        if (idx === 0) {
          typing = true;
          setTimeout(tick, holdTime);
          return;
        }
        setTimeout(tick, deleteSpeed);
      }
    };
    // kick off
    setTimeout(tick, 400);
  }
});
