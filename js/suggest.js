// Suggestions under the hero's search field (landing-page.md, R1c; S2): the dictionary's
// own results from /_/api/search on the same origin, drawn as rows that link to each
// word's page. Enter opens the highlighted word, or the top one; "All results" opens the
// results page. Without this script the field is a plain form to that page.
(function () {
  var form = document.querySelector('.hero-search');
  if (!form || !window.fetch) return;
  var input = form.querySelector('input[name="q"]');
  var base = form.getAttribute('action').replace(/search$/, '');   // /sr-en/ or /sr-ru/
  var lang = base.indexOf('/sr-ru/') === 0 ? 'ru' : 'en';
  var MAX = 6;

  var list = document.createElement('div');
  list.className = 'hero-suggest';
  list.id = 'hero-suggest';
  list.setAttribute('role', 'listbox');
  list.hidden = true;
  form.appendChild(list);
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-controls', list.id);
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-autocomplete', 'list');

  var rows = [], active = -1, timer = null, pending = null, shownFor = '';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  // A headline's styled runs: the matched part bold, accent marks as combining characters.
  function headline(h) {
    return (h && h.runs || []).map(function (r) {
      var text = esc(r.text + (r.mark || ''));
      return r.role === 'bold' ? '<b>' + text + '</b>' : text;
    }).join('');
  }
  // A form's row names the word it belongs to: "→ čóvek · nom. pl." (the dictionary's
  // "form of" caption, its grammar in the page's language).
  function caption(c) {
    if (!c || !c.word) return '';
    return ' <span class="hs-form">→ ' + headline(c.word) + (c.detail ? ' · ' + esc(c.detail) : '') + '</span>';
  }
  function entryHref(e) {
    return base + encodeURIComponent(e.w) + '#' + e.pos + '-' + e.etym;
  }
  function allLabel(q) {
    var el = document.querySelector('[data-i18n="hero_search_all"]');
    return (el ? el.textContent : 'All results for “{q}”').replace('{q}', q);
  }

  function close() {
    list.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    active = -1;
  }
  function highlight(i) {
    var links = list.querySelectorAll('.hs-row');
    if (active >= 0 && links[active]) links[active].classList.remove('is-active');
    active = i;
    if (active >= 0 && links[active]) {
      links[active].classList.add('is-active');
      input.setAttribute('aria-activedescendant', links[active].id);
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  }
  function render(q, items) {
    rows = items.filter(function (it) { return it.kind === 'hit' && it.row && it.row.entry; }).slice(0, MAX);
    if (!rows.length) { close(); return; }
    list.innerHTML = rows.map(function (it, i) {
      var r = it.row;
      return '<a class="hs-row" role="option" id="hs-' + i + '" href="' + esc(entryHref(r.entry)) + '">' +
        '<span class="hs-hw" lang="sr">' + headline(r.headline) + caption(r.caption) + '</span>' +
        '<span class="hs-gloss">' + esc(r.gloss || '') + '</span></a>';
    }).join('') +
      '<a class="hs-all" href="' + esc(base + 'search?q=' + encodeURIComponent(q)) + '">' + esc(allLabel(q)) + '</a>';
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    active = -1;
    shownFor = q;
  }

  function lookup() {
    var q = input.value.trim();
    if (!q) { close(); return; }
    if (q === shownFor && !list.hidden) return;
    if (pending) pending.abort();
    pending = 'AbortController' in window ? new AbortController() : null;
    var script = document.documentElement.lang === 'sr' ? 'cyrillic' : 'latin';
    var url = '/_/api/search?' + new URLSearchParams({ q: q, lang: lang, script: script });
    fetch(url, pending ? { signal: pending.signal } : undefined)
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        if (!data || input.value.trim() !== q) return;
        render(q, (data.list && data.list.items) || []);
      })
      .catch(function () {});
  }

  input.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(lookup, 120);
  });
  input.addEventListener('focus', function () {
    if (rows.length && input.value.trim() === shownFor) { list.hidden = false; input.setAttribute('aria-expanded', 'true'); }
  });
  input.addEventListener('keydown', function (e) {
    if (list.hidden) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); highlight(Math.min(active + 1, rows.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); highlight(Math.max(active - 1, -1)); }
    else if (e.key === 'Escape') { close(); }
  });
  // Enter: the highlighted word, else the top one; with nothing shown, the results page.
  form.addEventListener('submit', function (e) {
    var q = input.value.trim();
    if (list.hidden || !rows.length || q !== shownFor) return;
    e.preventDefault();
    location.href = entryHref(rows[active >= 0 ? active : 0].row.entry);
  });
  document.addEventListener('click', function (e) {
    if (!form.contains(e.target)) close();
  });
})();
