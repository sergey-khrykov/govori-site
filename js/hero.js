// The home page's search is in the hero (site/_build/hero.js); while it is on screen the
// bar's field steps back, so the page never shows two (landing-page.md, N2).
(function () {
  var field = document.querySelector('.hero-search');
  if (!field || !('IntersectionObserver' in window)) return;
  var root = document.documentElement;
  new IntersectionObserver(function (entries) {
    root.classList.toggle('hero-search-in-view', entries[0].isIntersecting);
  }, { rootMargin: '-60px 0px 0px 0px' }).observe(field);
})();
