// Screenshot carousels on the landing pages. Each .shot-carousel holds a
// scroll-snapping .carousel-track of <figure class="shot"> slides; this adds
// prev/next buttons overlaid on the screenshot, the dots underneath, and a
// slow auto-advance that runs only while the carousel is on screen and stops
// for good once the reader touches it.
(function () {
  'use strict';

  const AUTO_ADVANCE_MS = 4500;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.shot-carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const slides = Array.from(track.querySelectorAll('.shot'));
    if (slides.length < 2) {
      if (dotsContainer) dotsContainer.remove();
      return;
    }

    let current = 0;
    let userTouched = false;
    let timer = null;
    let inViewport = false;

    function scrollTo(idx) {
      const slide = slides[idx];
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    }

    // Prev/next buttons overlaid on the screenshot's left and right edges
    // (the dots stay underneath).
    const viewport = document.createElement('div');
    viewport.className = 'carousel-viewport';
    track.parentNode.insertBefore(viewport, track);
    viewport.appendChild(track);

    const arrow = (points, delta) => {
      const btn = document.createElement('button');
      btn.className = 'carousel-arrow ' + (delta < 0 ? 'carousel-arrow--prev' : 'carousel-arrow--next');
      btn.type = 'button';
      btn.setAttribute('aria-label', delta < 0 ? 'Previous screenshot' : 'Next screenshot');
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="' + points + '"/></svg>';
      btn.addEventListener('click', () => {
        stopAuto();
        scrollTo((current + delta + slides.length) % slides.length);
      });
      return btn;
    };

    const arrows = [arrow('15 18 9 12 15 6', -1), arrow('9 6 15 12 9 18', 1)];
    arrows.forEach(a => viewport.appendChild(a));

    // Centre the buttons on the image, not on the track (whose height also
    // includes the caption, which wraps differently per language).
    const firstImg = slides[0].querySelector('img');
    function positionArrows() {
      const h = firstImg.getBoundingClientRect().height;
      if (!h) return;
      arrows.forEach(a => { a.style.top = Math.round(h / 2 - a.offsetHeight / 2) + 'px'; });
    }
    positionArrows();
    firstImg.addEventListener('load', positionArrows);
    window.addEventListener('resize', positionArrows);

    const nav = document.createElement('div');
    nav.className = 'carousel-nav';
    dotsContainer.parentNode.insertBefore(nav, dotsContainer);
    nav.appendChild(dotsContainer);

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Screenshot ' + (i + 1));
      dot.addEventListener('click', () => { stopAuto(); scrollTo(i); });
      dotsContainer.appendChild(dot);
    });

    function updateDots(activeIdx) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === activeIdx);
      });
    }

    // Track the visible slide (also catches swipes and trackpad scrolls)
    const slideObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const idx = slides.indexOf(entry.target);
        if (idx === -1) return;
        current = idx;
        updateDots(idx);
      });
    }, { root: track, threshold: 0.6 });
    slides.forEach(s => slideObserver.observe(s));

    // Auto-advance while on screen, never after the reader has taken over.
    function stopAuto() {
      userTouched = true;
      clearInterval(timer);
      timer = null;
    }

    function startAuto() {
      if (userTouched || reduceMotion || timer) return;
      timer = setInterval(() => {
        if (!inViewport) return;
        scrollTo((current + 1) % slides.length);
      }, AUTO_ADVANCE_MS);
    }

    ['pointerdown', 'wheel', 'touchstart'].forEach(evt => {
      track.addEventListener(evt, stopAuto, { passive: true });
    });

    const viewportObserver = new IntersectionObserver(entries => {
      inViewport = entries[0].isIntersecting;
      if (inViewport) startAuto();
      else { clearInterval(timer); timer = null; }
    }, { threshold: 0.4 });
    viewportObserver.observe(carousel);
  });
})();
