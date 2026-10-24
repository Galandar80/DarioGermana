// Disabled until a manually created, free GoatCounter account is configured.
export function spotifyClick(href, sourcePath) {
  let url;
  try { url = new URL(href); } catch { return null; }
  if (url.protocol !== 'https:' || url.hostname !== 'open.spotify.com' || url.port) return null;
  const match = url.pathname.match(/^\/(?:intl-[a-z]{2}\/)?(artist|album|track)\/([A-Za-z0-9]{22})\/?$/);
  if (!match) return null;
  const source = /^\/brani\/[a-z0-9-]+\/?$/.test(sourcePath) ? 'brano'
    : /^\/album\/[a-z0-9-]+\/?$/.test(sourcePath) ? 'album' : 'sito';
  return { path: `spotify:${source}:${match[1]}:${match[2]}`, title: `Spotify ${match[1]}`,
    event: true, no_session: true, referrer: '' };
}

export function allowedEndpoint(endpoint) {
  return typeof endpoint === 'string' && /^https:\/\/[a-z0-9][a-z0-9-]*\.goatcounter\.com\/count$/.test(endpoint);
}

export function installSpotifyClicks(endpoint, win = window, doc = document) {
  if (!allowedEndpoint(endpoint) || win.location.hostname !== 'dario-germana.vercel.app'
    || new URLSearchParams(win.location.search).has('analytics')
    || win.navigator.doNotTrack === '1' || win.navigator.globalPrivacyControl) return false;
  // No pageviews, automatic bindings, query strings or external referrers.
  win.goatcounter = { no_onload: true, no_events: true, endpoint };
  const script = doc.createElement('script');
  script.src = 'https://gc.zgo.at/count.js';
  script.async = true;
  script.referrerPolicy = 'no-referrer';
  doc.head.appendChild(script);
  const send = (event) => {
    if (!event.isTrusted || event.defaultPrevented) return;
    if (event.type === 'auxclick' ? event.button !== 1 : event.button !== 0) return;
    const link = event.target.closest?.('a[href]');
    const data = link && spotifyClick(link.href, win.location.pathname);
    const counter = win.goatcounter;
    if (!data || typeof counter?.count !== 'function') return;
    try {
      if (typeof counter.filter === 'function' && counter.filter()) return;
      counter.count(data);
    } catch { /* Measurement must never interrupt navigation. */ }
  };
  doc.addEventListener('click', send);
  doc.addEventListener('auxclick', send);
  return true;
}
