/* FAQ page: expand/collapse-all control and #anchor deep links.
   Progressive enhancement — every entry stays usable with JS disabled. */

(function () {
  const items = Array.from(document.querySelectorAll('.faq-item'));
  if (!items.length) return;

  const toggleAll = document.querySelector('.faq-toggle-all');

  function syncToggleLabel() {
    if (!toggleAll) return;
    const allOpen = items.every(item => item.open);
    toggleAll.textContent = allOpen
      ? toggleAll.dataset.labelCollapse
      : toggleAll.dataset.labelExpand;
    toggleAll.setAttribute('aria-expanded', String(allOpen));
  }

  if (toggleAll) {
    toggleAll.addEventListener('click', () => {
      const open = !items.every(item => item.open);
      items.forEach(item => { item.open = open; });
      syncToggleLabel();
    });
  }

  items.forEach(item => item.addEventListener('toggle', syncToggleLabel));

  // Open the entry addressed by the URL fragment (e.g. /faq.html#q7)
  function openFromHash() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    if (target && target.classList.contains('faq-item')) {
      target.open = true;
      target.scrollIntoView({ block: 'start' });
    }
  }

  window.addEventListener('hashchange', openFromHash);
  openFromHash();
  syncToggleLabel();
})();
