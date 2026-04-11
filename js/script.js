/**
 * KISHORE & SURUTHY WEDDING INVITATION
 * Main JavaScript - Animations, Scroll Reveals, Interactions
 */

(function () {
  'use strict';

  /* ============================================================
     OPENING OVERLAY
     ============================================================ */
  const overlay = document.getElementById('opening-overlay');
  const mainContent = document.getElementById('main-content');

  function openInvitation() {
    if (!overlay) return;
    overlay.classList.add('hidden');
    if (mainContent) {
      setTimeout(() => {
        mainContent.classList.add('visible');
      }, 200);
    }
  }

  if (overlay) {
    overlay.addEventListener('click', openInvitation);
    overlay.addEventListener('touchend', function (e) {
      e.preventDefault();
      openInvitation();
    }, { passive: false });

    // Auto-open after 6s if user doesn't click
    setTimeout(openInvitation, 6000);
  } else {
    // No overlay — just show content
    if (mainContent) mainContent.classList.add('visible');
  }

  /* ============================================================
     SCROLL REVEAL OBSERVER
     ============================================================ */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  function initReveal() {
    const targets = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right'
    );
    targets.forEach((el) => revealObserver.observe(el));
  }

  /* ============================================================
     PARALLAX HERO TEMPLE
     ============================================================ */
  function initParallax() {
    const temple = document.querySelector('.hero-bg-temple');
    if (!temple) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroH = document.getElementById('hero')?.offsetHeight || 0;
          if (scrollY <= heroH) {
            const offset = scrollY * 0.3;
            temple.style.transform = `translateX(-50%) translateY(${offset}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ============================================================
     GALLERY INFINITE SCROLL (clone items for seamless loop)
     ============================================================ */
  function initGallery() {
    const track = document.querySelector('.gallery-track');
    if (!track) return;

    // Clone children for seamless loop
    const items = Array.from(track.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
  }

  /* ============================================================
     SMOOTH SECTION TRANSITIONS (Fade-out / Fade-in sections)
     ============================================================ */
  function initSectionTransitions() {
    const sections = document.querySelectorAll('section[id]');

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.05 }
    );

    sections.forEach((s) => sectionObserver.observe(s));
  }

  /* ============================================================
     STAGGERED CHILD REVEALS
     ============================================================ */
  function initStaggeredReveal() {
    const staggerContainers = document.querySelectorAll('[data-stagger]');

    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('[data-stagger-child]');
            children.forEach((child, i) => {
              setTimeout(() => {
                child.classList.add('visible');
              }, i * 140);
            });
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    staggerContainers.forEach((el) => staggerObserver.observe(el));
  }

  /* ============================================================
     CANDLE FLICKER RANDOMIZATION
     ============================================================ */
  function initCandles() {
    const candles = document.querySelectorAll('.candle-item');
    candles.forEach((c, i) => {
      const duration = 2.5 + Math.random() * 1.5;
      const delay = Math.random() * 1.5;
      c.style.animationDuration = `${duration}s`;
      c.style.animationDelay = `${delay}s`;
    });
  }

  /* ============================================================
     CURSOR GLOW (subtle gold glow following cursor on desktop)
     ============================================================ */
  function initCursorGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // Skip touch

    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    glow.style.cssText = `
      position: fixed;
      width: 240px;
      height: 240px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(184, 150, 62, 0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
      opacity: 0;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
  }

  /* ============================================================
     HERO STARS ANIMATION (create random twinkling stars)
     ============================================================ */
  function initHeroStars() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const starsContainer = document.createElement('div');
    starsContainer.style.cssText = `
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    `;

    for (let i = 0; i < 55; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 2 + 0.8;
      const x = Math.random() * 100;
      const y = Math.random() * 45; // Only top half
      const delay = Math.random() * 4;
      const dur = 2 + Math.random() * 3;

      star.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, ${0.3 + Math.random() * 0.5});
        animation: starTwinkle ${dur}s ${delay}s ease-in-out infinite alternate;
      `;
      starsContainer.appendChild(star);
    }

    // Add keyframe style
    const style = document.createElement('style');
    style.textContent = `
      @keyframes starTwinkle {
        from { opacity: 0.15; transform: scale(0.8); }
        to { opacity: 0.9; transform: scale(1.2); }
      }
    `;
    document.head.appendChild(style);
    hero.insertBefore(starsContainer, hero.firstChild);
  }

  /* ============================================================
     SCROLL PROGRESS INDICATOR
     ============================================================ */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      background: linear-gradient(to right, #8B6914, #D4AF6A, #8B6914);
      z-index: 500;
      width: 0%;
      transition: width 0.1s linear;
      pointer-events: none;
    `;
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
      bar.style.width = pct + '%';
    });
  }

  /* ============================================================
     COUPLE NAMES TYPEWRITER EFFECT (Optional subtle effect)
     ============================================================ */
  function initNameReveal() {
    const nameEl = document.querySelector('.hero-names');
    if (!nameEl) return;
    // Names already revealed via CSS animation — nothing extra needed
  }

  /* ============================================================
     WHATSAPP BUTTON PULSE
     ============================================================ */
  function initWhatsappPulse() {
    const btn = document.querySelector('.whatsapp-btn');
    if (!btn) return;

    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
      .whatsapp-btn {
        animation: wpPulse 2.8s ease-in-out infinite;
      }
      @keyframes wpPulse {
        0%, 100% { box-shadow: 0 6px 24px rgba(37, 211, 102, 0.25); }
        50% { box-shadow: 0 8px 32px rgba(37, 211, 102, 0.45); }
      }
      .whatsapp-btn:hover {
        animation: none;
      }
    `;
    document.head.appendChild(pulseStyle);
  }

  /* ============================================================
     FLOATING DECORATIVE PARTICLES (gold dust on hero)
     ============================================================ */
  function initGoldDust() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      opacity: 0.5;
    `;
    hero.insertBefore(canvas, hero.querySelector('.hero-bg-overlay'));

    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const count = 30;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        alpha: Math.random() * 0.5 + 0.2,
        life: Math.random(),
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.003;

        if (p.life <= 0 || p.y < -10) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.life = 1;
          p.alpha = Math.random() * 0.5 + 0.2;
        }

        const alpha = p.alpha * p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 106, ${alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();
  }

  /* ============================================================
     INIT ALL
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initStaggeredReveal();
    initGallery();
    initSectionTransitions();
    initCandles();
    initCursorGlow();
    initHeroStars();
    initScrollProgress();
    initNameReveal();
    initWhatsappPulse();

    // Parallax & gold dust after overlay opens
    document.getElementById('opening-overlay')?.addEventListener('click', () => {
      setTimeout(() => {
        initParallax();
        initGoldDust();
      }, 400);
    });

    // If no overlay
    if (!document.getElementById('opening-overlay')) {
      initParallax();
      initGoldDust();
    }
  });

})();
