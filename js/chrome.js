// The top bar's menus (site/_build/chrome.js) are <details> elements, which work without
// script; this only closes an open one on a click elsewhere or on Escape, and closes an
// offer line for good.
(function () {
  function closeAll(except) {
    document.querySelectorAll('.gbar details[open]').forEach(function (menu) {
      if (menu !== except) menu.removeAttribute('open');
    });
  }
  document.addEventListener('click', function (e) {
    closeAll(e.target.closest ? e.target.closest('.gbar details') : null);
  });
  // Day or night: flip the page and remember it (govori-theme, read before the page is
  // drawn by the script at the top of <head>; the web dictionary reads the same key).
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest ? e.target.closest('[data-theme-toggle]') : null;
    if (!toggle) return;
    var root = document.documentElement;
    var current = root.getAttribute('data-theme') ||
      (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('govori-theme', next); } catch (err) {}
  });
  // The dictionary's dropdown draws its rows in the page's script: Cyrillic while /sr/ is
  // switched to it (i18n.js sets <html lang="sr">), else the reader's own setting.
  function scriptForSearch() {
    var cyrillic = document.documentElement.lang === 'sr';
    document.querySelectorAll('form[data-govori-search]').forEach(function (form) {
      if (cyrillic) form.setAttribute('data-govori-script', 'cyrillic');
      else form.removeAttribute('data-govori-script');
    });
  }
  // The language menu's chip shows the current language: on /sr/ the Cyrillic switch
  // changes it in place (i18n.js marks the active item).
  function currentLanguage() {
    document.querySelectorAll('.gbar-langs').forEach(function (menu) {
      var active = menu.querySelector('.lang-btn.active .gbar-lang-code');
      var chip = menu.querySelector('.gbar-lang-current');
      if (active && chip) chip.textContent = active.textContent;
    });
  }
  function onLanguage() { scriptForSearch(); currentLanguage(); }
  onLanguage();
  new MutationObserver(onLanguage).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  // A choice in the language menu closes it.
  document.addEventListener('click', function (e) {
    var item = e.target.closest ? e.target.closest('.gbar-langmenu .lang-btn') : null;
    if (item) { var menu = item.closest('details'); if (menu) menu.removeAttribute('open'); }
  });
  // An offer line under the bar, once closed, stays closed (site/_build/offers.js).
  document.addEventListener('click', function (e) {
    var close = e.target.closest ? e.target.closest('.goffer-x') : null;
    if (!close) return;
    var offer = close.closest('.goffer');
    try { localStorage.setItem('govori-offer-' + offer.getAttribute('data-offer'), '1'); } catch (err) {}
    offer.remove();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll(null);
  });
})();
