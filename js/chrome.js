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
