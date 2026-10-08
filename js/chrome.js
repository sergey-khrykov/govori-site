// The top bar's menus (site/_build/chrome.js) are <details> elements, which work without
// script; this only closes an open one on a click elsewhere or on Escape.
(function () {
  function closeAll(except) {
    document.querySelectorAll('.gbar details[open]').forEach(function (menu) {
      if (menu !== except) menu.removeAttribute('open');
    });
  }
  document.addEventListener('click', function (e) {
    closeAll(e.target.closest ? e.target.closest('.gbar details') : null);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll(null);
  });
})();
