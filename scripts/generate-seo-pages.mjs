import { mkdir, readFile, writeFile } from 'node:fs/promises';

const origin = 'https://dario-germana.vercel.app';

const pages = [
  {
    path: '/album/te-lo-dico-cosi',
    output: 'album-te-lo-dico-cosi.html',
    title: 'Te lo dico così — Album di Dario Germanà',
    description: 'Scopri Te lo dico così, album di Dario Germanà: dieci canzoni italiane intime e dirette, tracklist completa e ascolto su Spotify.',
    image: '/images/te-lo-dico-cosi.jpg',
    schemaType: 'MusicAlbum',
  },
  {
    path: '/album/no-direction',
    output: 'album-no-direction.html',
    title: 'No Direction — Album di Dario Germanà',
    description: 'Scopri No Direction di Dario Germanà, un album dalle atmosfere internazionali e notturne. Consulta la tracklist e ascoltalo su Spotify.',
    image: '/images/no-direction.jpg',
    schemaType: 'MusicAlbum',
  },
  {
    path: '/album/zampa-360-gradi',
    output: 'album-zampa-360-gradi.html',
    title: 'Zampa 360 Gradi — Album di Dario Germanà',
    description: 'Scopri Zampa 360 Gradi di Dario Germanà, un progetto musicale giocoso e narrativo. Consulta la tracklist e ascoltalo su Spotify.',
    image: '/images/zampa-360-gradi.jpg',
    schemaType: 'MusicAlbum',
  },
  {
    path: '/album/sweat-of-the-sands',
    output: 'album-sweat-of-the-sands.html',
    title: 'Sweat of the sands — EP di Dario Germanà',
    description: 'Scopri Sweat of the sands, EP strumentale e digitale di Dario Germanà. Consulta la tracklist completa e ascoltalo su Spotify.',
    image: '/images/sweat-of-the-sands.jpg',
    schemaType: 'MusicAlbum',
  },
  {
    path: '/brani/mille-cuori',
    output: 'brano-mille-cuori.html',
    title: 'Mille Cuori — Brano di Dario Germanà',
    description: 'Mille Cuori di Dario Germanà è un brano su identità, libertà e diritto di seguire la propria voce. Leggi la storia e ascolta la canzone.',
    image: '/images/mille-cuori.jpg',
    schemaType: 'MusicRecording',
  },
  {
    path: '/brani/cuore-graffiato',
    output: 'brano-cuore-graffiato.html',
    title: 'Cuore Graffiato — Brano di Dario Germanà',
    description: 'Cuore Graffiato di Dario Germanà racconta fragilità e resistenza, trasformando le ferite delle esperienze in una parte della propria forza.',
    image: '/images/te-lo-dico-cosi.jpg',
    schemaType: 'MusicRecording',
  },
  {
    path: '/brani/la-neve-non-avvisa',
    output: 'brano-la-neve-non-avvisa.html',
    title: 'La Neve Non Avvisa — Brano di Dario Germanà',
    description: 'La Neve Non Avvisa di Dario Germanà racconta i cambiamenti improvvisi che arrivano senza preavviso e ridisegnano il paesaggio interiore.',
    image: '/images/te-lo-dico-cosi.jpg',
    schemaType: 'MusicRecording',
  },
];

const escapeAttribute = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const replaceTag = (html, pattern, replacement) => html.replace(pattern, () => replacement);

const template = await readFile('dist/index.html', 'utf8');
await mkdir('dist/seo', { recursive: true });

for (const page of pages) {
  const url = `${origin}${page.path}`;
  const image = `${origin}${page.image}`;
  const title = escapeAttribute(page.title);
  const description = escapeAttribute(page.description);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': page.schemaType,
    name: page.title.split(' — ')[0],
    description: page.description,
    url,
    image,
    byArtist: {
      '@type': 'Person',
      name: 'Dario Germanà',
      url: `${origin}/`,
    },
  };

  let html = template;
  html = replaceTag(html, /<title>.*?<\/title>/, `<title>${title}</title>`);
  html = replaceTag(html, /<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`);
  html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`);
  html = replaceTag(html, /<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${title}" />`);
  html = replaceTag(html, /<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${description}" />`);
  html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`);
  html = replaceTag(html, /<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${image}" />`);
  html = replaceTag(
    html,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n      ${JSON.stringify(structuredData)}\n    </script>`,
  );

  await writeFile(`dist/seo/${page.output}`, html);
}

console.log(`Generated ${pages.length} route-specific SEO pages.`);
