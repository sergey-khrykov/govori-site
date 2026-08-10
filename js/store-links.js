// Campaign pass-through for the store badges.
//
// The badges carry static campaign tags naming their placement (web_hero,
// web_footer). Those describe where on the page someone clicked, which is all
// we can know about a visitor who arrived untagged.
//
// When a visit *is* tagged — govoridictionaries.com/?utm_source=telegram —
// that is better information, so we forward it into the store links and the
// install is attributed to the channel that sent it rather than to the badge.
// One link works for both platforms, which a raw store URL cannot do.
//
// Nothing is stored and nobody is contacted: the parameter is read off the
// current URL and written into an outbound href, so the "no cookies, no
// analytics, no tracking scripts" claim in privacy.html still holds.
//
// Untagged visits are left exactly as authored — this only ever narrows.
(function () {
  'use strict';

  var params = new URLSearchParams(location.search);

  // Apple's campaign token allows more than this, but a conservative charset
  // is guaranteed to be accepted, survives a Play referrer round-trip, and
  // means nothing arbitrary from the query string reaches an href.
  function sanitize(value) {
    return (value || '').replace(/[^A-Za-z0-9._-]/g, '').slice(0, 30);
  }

  var source = sanitize(params.get('utm_source'));
  if (!source) return; // untagged visit: keep the authored placement tags

  // Fall back to the source when no campaign is given, so a bare
  // ?utm_source=telegram is still a usable, self-describing tag.
  var campaign = sanitize(params.get('utm_campaign')) || source;

  Array.prototype.forEach.call(
    document.querySelectorAll('a.appstore-badge-link'),
    function (link) {
      var url;
      try {
        url = new URL(link.href);
      } catch (e) {
        return;
      }

      if (url.hostname === 'apps.apple.com') {
        // ct is the only campaign field Apple offers, so the channel wins it
        // and the placement is not represented on iOS.
        url.searchParams.set('ct', campaign);
      } else if (url.hostname === 'play.google.com') {
        // The placement moves into utm_medium rather than being dropped. Play
        // Console reports only on source and campaign, so this costs nothing
        // there, and Adjust reads the whole referrer string later.
        var placement = new URLSearchParams(
          url.searchParams.get('referrer') || ''
        ).get('utm_campaign') || 'badge';

        // Assigning through URLSearchParams encodes the referrer as one opaque
        // parameter, which is the form the Play Store expects.
        url.searchParams.set(
          'referrer',
          'utm_source=' + source +
          '&utm_medium=' + placement +
          '&utm_campaign=' + campaign
        );
      } else {
        return;
      }

      link.href = url.toString();
    }
  );
})();
