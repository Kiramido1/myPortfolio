// Helpers
const onReady = (fn) => document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);

onReady(() => {
	// Year in footer
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// Hero fade-in animations
	const fadeElements = Array.from(document.querySelectorAll('.fade-in'));
	fadeElements.forEach((el, idx) => {
		setTimeout(() => {
			el.style.opacity = '1';
			el.style.transform = 'translateY(0)';
		}, 200 + idx * 300);
	});

	// Social rail fade-in
	const socialRail = document.querySelector('.social-rail');
	if (socialRail) {
		setTimeout(() => socialRail.classList.add('fade-in'), 300);
	}

	// Navbar style on scroll
	const nav = document.getElementById('siteNav');
	const onScroll = () => {
		if (!nav) return;
		if (window.scrollY > 8) nav.classList.add('scrolled'); 
		else nav.classList.remove('scrolled');
	};
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();

	// Reveal on scroll for sections
	const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
	if ('IntersectionObserver' in window) {
		const io = new IntersectionObserver((entries) => {
			entries.forEach(e => {
				if (e.isIntersecting) e.target.classList.add('is-visible');
			});
		}, { threshold: 0.15 });
		revealEls.forEach(el => io.observe(el));
	} else {
		revealEls.forEach(el => el.classList.add('is-visible'));
	}

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

	// Social link hover effects
	const socialLinks = Array.from(document.querySelectorAll('.social-link-vertical'));
	socialLinks.forEach(link => {
		link.addEventListener('mouseenter', () => {
			link.style.transform = 'translateX(4px)';
		});
		link.addEventListener('mouseleave', () => {
			link.style.transform = 'translateX(0)';
		});
	});

	// Parallax on scroll for elements with data-parallax
	const parallaxEls = Array.from(document.querySelectorAll('.parallax-el'));
	if (parallaxEls.length) {
		let ticking = false;
		const applyParallax = () => {
			const scrollY = window.scrollY || window.pageYOffset;
			parallaxEls.forEach(el => {
				const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
				el.style.transform = `translateY(${scrollY * speed}px)`;
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
	// Social rail hover effects
	const socialRailLinks = Array.from(document.querySelectorAll('.social-rail .social-link-vertical'));
	socialRailLinks.forEach(link => {
		link.addEventListener('mouseenter', () => {
			link.style.transform = 'translateX(4px)';
		});
		link.addEventListener('mouseleave', () => {
			link.style.transform = 'translateX(0)';
		});
	});

	// Portrait image fallback
	const portrait = document.querySelector('.portrait-card img');
	if (portrait) {
		portrait.addEventListener('error', () => {
			const fallback = portrait.getAttribute('data-fallback');
			if (fallback && portrait.src.indexOf(fallback) === -1) {
				portrait.src = fallback;
			}
		});
	}

	// Smooth scrolling for anchor links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});

	// Typing animation for About Me title (slower, with fixed red 'Me')
	const typeMain = document.getElementById('typeTitleMain');
	const typeAccent = document.getElementById('typeTitleAccent');
	if (typeMain && typeAccent) {
		const wordA = 'About ';
		const wordB = 'Me';
		let idx = 0;
		let deleting = false;
		const typeSpeed = 180; // even slower typing
		const deleteSpeed = 120; // even slower deleting
		const holdTime = 1500;

		const render = () => {
			if (!deleting) {
				idx++;
				// Main word shows fully once complete; caret sits on 'Me'
				typeMain.textContent = wordA;
				const bCount = Math.min(Math.max(0, idx - wordA.length), wordB.length);
				typeAccent.textContent = wordB.slice(0, bCount);
				if (idx >= wordA.length + wordB.length) {
					setTimeout(() => { deleting = true; render(); }, holdTime);
					return;
				}
				setTimeout(render, typeSpeed);
			} else {
				idx--;
				const bCount = Math.max(0, Math.min(wordB.length, idx - wordA.length));
				typeAccent.textContent = wordB.slice(0, bCount);
				typeMain.textContent = wordA;
				if (idx <= 0) {
					deleting = false;
				}
				setTimeout(render, deleteSpeed);
			}
		};

		setTimeout(render, 500);
	}
});
