import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowLeft, ArrowUpRight, AtSign, Disc3, ExternalLink, Headphones, Menu, Music2, Newspaper, Pause, Play, Sparkles, Video, X } from 'lucide-react';
import './styles.css';
import { newsItems, videos } from './content.js';

const spotifyArtist = 'https://open.spotify.com/intl-it/artist/4vdSzh5YOkN4yeyUDxePIO';
const officialChannels = {
  youtube: 'https://music.youtube.com/channel/UCWK9xQU8z_GsbfMjBWFtZZg',
  apple: 'https://music.apple.com/us/artist/dario-german%C3%A0/1788319620',
  amazon: 'https://music.amazon.it/artists/B0DS2SQXH4',
  spotify: spotifyArtist,
};

const platformPlayers = {
  youtube: { label: 'YouTube Music', src: 'https://www.youtube.com/embed/videoseries?list=UUWK9xQU8z_GsbfMjBWFtZZg', height: 500 },
  spotify: { label: 'Spotify', src: 'https://open.spotify.com/embed/artist/4vdSzh5YOkN4yeyUDxePIO?utm_source=generator&theme=0', height: 500 },
  apple: { label: 'Apple Music', src: 'https://embed.music.apple.com/us/artist/dario-german%C3%A0/1788319620', height: 450 },
  amazon: { label: 'Amazon Music', src: 'https://music.amazon.it/embed/B0DS2SQXH4', height: 500 },
};

const albums = [
  {
    title: 'Te lo dico così', year: '2026', type: 'Album', id: '621KqqyUUF384vI0UgZXKJ', cover: '/images/te-lo-dico-cosi.jpg',
    tracks: [
      ['La Neve Non Avvisa', '2lJE5aWB6r8IZOL5zdl8u0'], ['Benvenuta Vita', '26UlCaIQn1SBdvH2EDCcN7'], ['Cinque Minuti', '29LylTVkkBi27AWdeWa1vr'], ['Cuore Graffiato', '7hMtotK8gRLVtxCAQ8ymf4'], ['Dimentico Tutto', '0pwqwllCHmElZYczDggUNr'], ['Fermati', '1pdt7cOg1un0LZtD9MZ9LW'], ['Ho la pancia grossa', '3nspxmg3h8N9AvgmD4mu3v'], ['Il Battito Resta', '1fXPkTUD4vwYUGKQ9MIqFi'], ['Il Tocco Cenere', '1EBGqoJijmplWMPqIZ7h28'], ['Vogliamo Tutto', '1EpdhfcikAb3x8JErQgoNj'],
    ],
  },
  {
    title: 'No Direction', year: '2025', type: 'Album', id: '1kE331Eiha0SsGTX5PtwdK', cover: '/images/no-direction.jpg',
    tracks: [
      ['Birthday Horror', '4SGg9zd4cqwJoxwchcNK0G'], ['Change In My Mind', '6ulEo7VieYwmeY0guSBbdW'], ['Galactic Showdown', '4YsRWCRa2tdI4nDAqXNJFM'], ['Midnight Stars', '1NXWA60GlW4YzMkBEBxtul'], ["Oh, there’s a story I must tell", '4zqP0zoSXVpP0tivDuTitl'], ['Siri the chubby cat', '3uiX2LR3iiBWohbZ8wFmQ4'], ["There's a girl named Pulcettona", '3YirRvBNdTRuVvhNzYz4XX'],
    ],
  },
  {
    title: 'Zampa 360 Gradi', year: '2025', type: 'Album', id: '48JpNztZjhFN0m1CjMvU8W', cover: '/images/zampa-360-gradi.jpg',
    tracks: [
      ['Sotto la Luna', '3849C5jcZrhVDwhVvQG4Qu'], ['Libertà che chiama', '3exXeMz4G5zcFPpM1VsHtW'], ['Corriamo insieme', '2jaOxN7aWkMi3eJm9oIg5q'], ['Danza Notturna', '6LTzbTMGhEbJT2WXhHSRwL'], ['Microscopici destini', '68IxMyEoPCAtbhTwDz8BkT'], ['Vite da scoiattoli', '3nnqKkPd5yGbFO8raC0ajo'], ['Volo, volo, sto volando', '4btqrov7Gv5nH8v42CjzBx'],
    ],
  },
  {
    title: 'Sweat of the sands', year: '2026', type: 'EP', id: '1T9tXeSoeODq8AnJP06XpI', cover: '/images/sweat-of-the-sands.jpg',
    tracks: [
      ['Abu Simbel Reset', '3RA9yf2NzjHfZQAajR7NEY'], ['Four Colors', '0W2tShLHDOrHI7LlaLNK3s'], ['Procedural Basin', '3BnWWAtVyFccwlzS7ffLJS'], ['Red Sand Spirit (8-Bit Lo-Fi Edition)', '2jzLwGLdIscCrEe4MrwLgS'], ['Sixteen Colors', '5mRPezV54d9cB0mSRMniQI'], ['Sixty Four Ways', '3IIVNOYYfYymLnv0taSenf'],
    ],
  },
];

const singles = [
  ['Silvermoon', 'Single · 2026', '4DLmyCjsNZgHSUjFPkPspP', '/images/silvermoon.jpg'],
  ['Draghi Di Carta', 'Single · 2026', '0AH8ccoFpHBBLuZVwOBjJy', '/images/draghi-di-carta.jpg'],
  ['Mille Cuori', 'Single · 2026', '4LErJbQpegpsLSqTh4NihW', '/images/mille-cuori.jpg'],
  ['Boom Boom Bikini', 'Single · 2025', '7ogdVeqrjYfyO8Vmw8WCy6', '/images/boom-boom-bikini.jpg'],
  ['Un legame inalterato', 'Single · 2025', '27ZjvvXAxIwT3YOgUcaXYV', '/images/un-legame-inalterato.jpg'],
];

const albumUrl = (id) => `https://open.spotify.com/album/${id}`;
const trackUrl = (id) => `https://open.spotify.com/track/${id}`;
const albumSlugs = ['te-lo-dico-cosi', 'no-direction', 'zampa-360-gradi', 'sweat-of-the-sands'];
const featuredSongs = [
  { slug: 'mille-cuori', title: 'Mille Cuori', meta: 'Singolo · 2026', trackId: '4BzSebu2dNibLDRuM1vjTj', cover: '/images/mille-cuori.jpg', eyebrow: 'Identità e libertà', text: 'Un brano diretto che mette al centro il diritto di seguire la propria voce, anche quando il mondo prova a imporre una direzione diversa.', video: 'Jq852TGFrBc' },
  { slug: 'cuore-graffiato', title: 'Cuore Graffiato', meta: 'Da “Te lo dico così” · 2026', trackId: '7hMtotK8gRLVtxCAQ8ymf4', cover: '/images/te-lo-dico-cosi.jpg', eyebrow: 'Fragilità e resistenza', text: 'Una canzone sull’impronta lasciata dalle esperienze: ferite visibili e invisibili che diventano parte della propria forza.' },
  { slug: 'la-neve-non-avvisa', title: 'La Neve Non Avvisa', meta: 'Da “Te lo dico così” · 2026', trackId: '2lJE5aWB6r8IZOL5zdl8u0', cover: '/images/te-lo-dico-cosi.jpg', eyebrow: 'Cambiamento improvviso', text: 'Un racconto per immagini sul modo in cui alcuni cambiamenti arrivano senza preavviso e ridisegnano il paesaggio interiore.' },
];

const previews = {
  '2lJE5aWB6r8IZOL5zdl8u0':'https://p.scdn.co/mp3-preview/a9afa83cd0677f3a62de30d7cdf26b46af75079a','26UlCaIQn1SBdvH2EDCcN7':'https://p.scdn.co/mp3-preview/061b992f73f5f0d1660900bed3f026eed91a997c','29LylTVkkBi27AWdeWa1vr':'https://p.scdn.co/mp3-preview/0064811d54ec011da99c129f9c23386a2873caaa','7hMtotK8gRLVtxCAQ8ymf4':'https://p.scdn.co/mp3-preview/d76deca4f7f0e6e1ff75599c64cee84ec757b8d1','0pwqwllCHmElZYczDggUNr':'https://p.scdn.co/mp3-preview/6767f433b57997d38c8c627082221a240d2c10ea','1pdt7cOg1un0LZtD9MZ9LW':'https://p.scdn.co/mp3-preview/205d3a95f30f44000308580a0256279078f4ea14','3nspxmg3h8N9AvgmD4mu3v':'https://p.scdn.co/mp3-preview/7df632dd5ba6ea561eb845c57236106b916cd62c','1fXPkTUD4vwYUGKQ9MIqFi':'https://p.scdn.co/mp3-preview/5fc269a33c1f8d046e20d7caad8672e8975bbed6','1EBGqoJijmplWMPqIZ7h28':'https://p.scdn.co/mp3-preview/fbce21f5c281c9bad90685de1759a5eab04af930','1EpdhfcikAb3x8JErQgoNj':'https://p.scdn.co/mp3-preview/257a4eeade2dddec8f5993dc91f5e3dfec22a783',
  '4SGg9zd4cqwJoxwchcNK0G':'https://p.scdn.co/mp3-preview/d6599cfd912019e02667d3ae028d46af56dfb053','6ulEo7VieYwmeY0guSBbdW':'https://p.scdn.co/mp3-preview/1c79c921529085c204d0426856ef303eaa066262','4YsRWCRa2tdI4nDAqXNJFM':'https://p.scdn.co/mp3-preview/d9bf4d495a64de427e4257dbdec1071619c427d8','1NXWA60GlW4YzMkBEBxtul':'https://p.scdn.co/mp3-preview/399af1c7dd6b836983203ae1cdeb240981d59ddf','4zqP0zoSXVpP0tivDuTitl':'https://p.scdn.co/mp3-preview/13060ccd8b48462969d7cbd08e60ab532a2c2313','3uiX2LR3iiBWohbZ8wFmQ4':'https://p.scdn.co/mp3-preview/6687ade6d1a8deb6dba8e2a53703e7d05407eaa6','3YirRvBNdTRuVvhNzYz4XX':'https://p.scdn.co/mp3-preview/320628d99e2b34e6e681dd83bc9ffd2d20976eb1',
  '3849C5jcZrhVDwhVvQG4Qu':'https://p.scdn.co/mp3-preview/702a89601344a83c2994eb1ec21d12174a4e219a','3exXeMz4G5zcFPpM1VsHtW':'https://p.scdn.co/mp3-preview/d51e104ed0d918068ce6bf9db22da2ab14e73e81','2jaOxN7aWkMi3eJm9oIg5q':'https://p.scdn.co/mp3-preview/2a262fae0afc356559217e55981039e4a44411fc','6LTzbTMGhEbJT2WXhHSRwL':'https://p.scdn.co/mp3-preview/cbe67ddc583915c7d5e02f9e9c09fb0b6256fdeb','68IxMyEoPCAtbhTwDz8BkT':'https://p.scdn.co/mp3-preview/8bea4dc40a249512a85c51c1ce8d02c1098a770b','3nnqKkPd5yGbFO8raC0ajo':'https://p.scdn.co/mp3-preview/5cbfabdd691c1aaeced2f351af94721885c83eac','4btqrov7Gv5nH8v42CjzBx':'https://p.scdn.co/mp3-preview/8417c9dc602edf62cf974dd47c8907d90e186b9d',
  '3RA9yf2NzjHfZQAajR7NEY':'https://p.scdn.co/mp3-preview/5adc4174eb8a83e09177fcc9143cba6d1e411457','0W2tShLHDOrHI7LlaLNK3s':'https://p.scdn.co/mp3-preview/d2d33baa9b7d9c7db1d19af68b6f81657c79ccc7','3BnWWAtVyFccwlzS7ffLJS':'https://p.scdn.co/mp3-preview/2c0118cc96357e8a3ab851d37be90450613f7314','2jzLwGLdIscCrEe4MrwLgS':'https://p.scdn.co/mp3-preview/3e8a2370e9d190867860fb31c5921296be6ac91a','5mRPezV54d9cB0mSRMniQI':'https://p.scdn.co/mp3-preview/f5e051b6e04b2be1018c357a4fac530b9920e335','3IIVNOYYfYymLnv0taSenf':'https://p.scdn.co/mp3-preview/4c69f4369db6a1719dc886059a6116742ffa02df',
  '496pXrSeHjbinW8TLDloTU':'https://p.scdn.co/mp3-preview/d9543d61b59d892c1f210993cf67f11e5a21a5d5','4RAbXw4ztzlEb1lLpsDGx4':'https://p.scdn.co/mp3-preview/3e37b27eec3d87bdeac096225334c2030338dbfe','4BzSebu2dNibLDRuM1vjTj':'https://p.scdn.co/mp3-preview/271ac1fb56f777716dcdd59553a702e7f8f880ca','2ineXHm9gSUabpAWykpaNj':'https://p.scdn.co/mp3-preview/af0fccdf00ce20dcbdee3e80a8a4b9a1a7c6f1cb','5Ak83UT9hQHZzTGJ8UpJXY':'https://p.scdn.co/mp3-preview/ce73e8e8306b6dec47988439adb4360363e9724b'
};

function Waveform() {
  return <div className="waveform" aria-hidden="true">{Array.from({ length: 44 }, (_, i) => <i key={i} style={{ height: 12 + ((i * 17) % 58) }} />)}</div>;
}

function DetailPage({ type, item }) {
  const isAlbum = type === 'album';
  const spotify = isAlbum ? albumUrl(item.id) : trackUrl(item.trackId);
  return <main className="detail-page">
    <nav className="nav scrolled"><a className="brand artist-brand" href="/"><span>DARIO</span> GERMANÀ<i /></a><a className="detail-back" href="/"><ArrowLeft size={17}/> Torna al sito</a></nav>
    <header className="detail-hero section"><img src={item.cover} alt={`Copertina di ${item.title}`} /><div><span className="kicker">{isAlbum ? `${item.type} / ${item.year}` : item.meta}</span><h1>{item.title}</h1><p>{isAlbum ? `Un progetto di Dario Germanà composto da ${item.tracks.length} brani. Esplora la tracklist e ascolta l’album direttamente dal player.` : item.text}</p><a className="spotify-button" href={spotify} target="_blank" rel="noreferrer">Apri su Spotify <ArrowUpRight size={17}/></a></div></header>
    {isAlbum ? <section className="detail-content section"><div><span className="kicker">TRACKLIST</span><h2>{item.tracks.length} brani</h2></div><ol>{item.tracks.map(([name,id],i)=><li key={id}><span>{String(i+1).padStart(2,'0')}</span><b>{name}</b><a href={trackUrl(id)} target="_blank" rel="noreferrer" aria-label={`Ascolta ${name}`}><Play size={17}/></a></li>)}</ol></section> : <section className="detail-content section"><div><span className="kicker">DIETRO IL BRANO</span><h2>{item.eyebrow}</h2><p>{item.text}</p></div><iframe title={`${item.title} su Spotify`} src={`https://open.spotify.com/embed/track/${item.trackId}?utm_source=generator&theme=0`} width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /></section>}
    {item.video && <section className="video-feature section"><div className="video-copy"><span className="kicker">VIDEO UFFICIALE</span><h2>{item.title}</h2></div><div className="video-frame"><iframe src={`https://www.youtube.com/embed/${item.video}`} title={`Videoclip di ${item.title}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div></section>}
    <footer><a className="brand artist-brand" href="/"><span>DARIO</span> GERMANÀ<i /></a><p>© {new Date().getFullYear()} Dario Germanà</p></footer>
  </main>;
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const albumMatch = path.match(/^\/album\/([^/]+)$/);
  const songMatch = path.match(/^\/brani\/([^/]+)$/);
  if (albumMatch) { const index = albumSlugs.indexOf(albumMatch[1]); if (index >= 0) return <DetailPage type="album" item={albums[index]} />; }
  if (songMatch) { const item = featuredSongs.find(song => song.slug === songMatch[1]); if (item) return <DetailPage type="song" item={item} />; }
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(0);
  const [playing, setPlaying] = useState(null);
  const [platform, setPlatform] = useState('youtube');
  const [visibleVideos] = useState(() => [...videos].sort(() => Math.random() - 0.5).slice(0, 2));
  const audioRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => { setMenuOpen(false); document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const current = albums[activeAlbum];
  const playPreview = (id, title, cover) => {
    if (playing?.id === id && !audioRef.current?.paused) { audioRef.current.pause(); setPlaying({ id, title, cover, paused: true }); return; }
    setPlaying({ id, title, cover, paused: false });
    requestAnimationFrame(() => audioRef.current?.play());
  };

  return <main>
    <nav className={scrolled ? 'nav scrolled' : 'nav'}>
      <button className="brand artist-brand" onClick={() => go('#home')}><span>DARIO</span> GERMANÀ<i /></button>
      <div className="desktop-nav"><button onClick={() => go('#albums')}>Album</button><button onClick={() => go('#video')}>Video</button><button onClick={() => go('#songs')}>Brani</button><button onClick={() => go('#about')}>Biografia</button><button onClick={() => go('#news')}>News</button><button onClick={() => go('#contact')}>Contatti</button><a className="nav-cta" href={spotifyArtist} target="_blank" rel="noreferrer">Spotify <ArrowUpRight size={16} /></a></div>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Apri menu">{menuOpen ? <X /> : <Menu />}</button>
    </nav>
    {menuOpen && <div className="mobile-nav"><button onClick={() => go('#albums')}>Album</button><button onClick={() => go('#video')}>Video</button><button onClick={() => go('#songs')}>Brani</button><button onClick={() => go('#about')}>Biografia</button><button onClick={() => go('#news')}>News</button><button onClick={() => go('#contact')}>Contatti</button></div>}

    <section className="hero hero-real" id="home">
      <div className="noise" /><div className="orb orb-one" /><div className="orb orb-two" />
      <p className="eyebrow"><Sparkles size={15} /> Autore · Digital music producer</p>
      <h1>DARIO<br /><em>GERMANÀ</em></h1>
      <div className="hero-bottom"><p>Parole, melodie e produzione digitale. Un catalogo musicale che attraversa pop italiano, immaginari notturni e sperimentazione.</p><button className="circle-button" onClick={() => go('#albums')}><ArrowDown /></button></div>
      <Waveform />
    </section>

    <section className="latest-release section">
      <div className="latest-art"><img src="/images/te-lo-dico-cosi.jpg" alt="Copertina dell’album Te lo dico così"/><span>NUOVO ALBUM</span></div>
      <div className="latest-copy"><span className="kicker">IN PRIMO PIANO / 2026</span><h2>Te lo dico così</h2><p>Dieci canzoni in italiano, intime e dirette. Un album costruito attorno a emozioni, fragilità e momenti quotidiani.</p><div className="cta-row"><a className="spotify-button" href="/album/te-lo-dico-cosi">Scopri l’album <ArrowUpRight size={17}/></a><a className="outline-link" href={albumUrl(albums[0].id)} target="_blank" rel="noreferrer">Ascolta su Spotify</a></div></div>
    </section>

    <section className="catalog section" id="albums">
      <div className="section-head"><div><span className="kicker">01 / DISCOGRAFIA</span><h2>Album & EP</h2></div><Disc3 className="spin" size={58} strokeWidth={1} /></div>
      <div className="album-tabs">{albums.map((a, i) => <button key={a.id} className={i === activeAlbum ? 'active' : ''} onClick={() => setActiveAlbum(i)}><span>0{i + 1}</span>{a.title}<small>{a.year}</small></button>)}</div>
      <div className="album-detail">
        <a className="real-cover" href={albumUrl(current.id)} target="_blank" rel="noreferrer"><img src={current.cover} alt={`Copertina di ${current.title}`} /><span><Play fill="currentColor" /> Ascolta</span></a>
        <div className="album-tracks"><div className="album-title"><span>{current.type} · {current.year}</span><h3>{current.title}</h3><div className="album-actions"><a href={`/album/${albumSlugs[activeAlbum]}`}>Pagina dell’album <ArrowUpRight size={17}/></a><a href={albumUrl(current.id)} target="_blank" rel="noreferrer">Spotify <ExternalLink size={17} /></a></div></div><ol>{current.tracks.map(([title, id], i) => <li key={id}><button onClick={() => playPreview(id, title, current.cover)}><span>{String(i + 1).padStart(2, '0')}</span><b>{title}</b>{playing?.id === id && !playing.paused ? <Pause size={17} /> : <Play size={17} />}</button></li>)}</ol></div>
      </div>
    </section>

    <section className="singles section" id="singles">
      <div className="section-head"><div><span className="kicker">02 / PUBBLICAZIONI</span><h2>Singoli</h2></div><Music2 size={52} strokeWidth={1} /></div>
      <div className="single-grid">{singles.map(([title, meta, albumId, cover], index) => { const trackId=['496pXrSeHjbinW8TLDloTU','4RAbXw4ztzlEb1lLpsDGx4','4BzSebu2dNibLDRuM1vjTj','2ineXHm9gSUabpAWykpaNj','5Ak83UT9hQHZzTGJ8UpJXY'][index]; return <article className="single-card" key={albumId}><div><img src={cover} alt={`Copertina di ${title}`} /><button className="play-badge" onClick={() => playPreview(trackId,title,cover)} aria-label={`Ascolta ${title}`}>{playing?.id===trackId&&!playing.paused?<Pause fill="currentColor"/>:<Play fill="currentColor"/>}</button></div><h3>{title}</h3><p>{meta}</p><a href={albumUrl(albumId)} target="_blank" rel="noreferrer">Spotify <ExternalLink size={13}/></a></article>;})}</div>
    </section>

    <section className="videos-section section" id="video"><div className="section-head"><div><span className="kicker"><Video size={14}/> 03 / VIDEO</span><h2>Videoclip</h2><p className="random-note">Una selezione casuale dal catalogo video. Ricarica la pagina per scoprirne altri.</p></div></div><div className="videos-grid">{visibleVideos.map(video=><article className="video-card" key={video.youtubeId}><div className="video-frame"><iframe src={`https://www.youtube.com/embed/${video.youtubeId}`} title={`${video.title} — videoclip ufficiale`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" /></div><div><h3>{video.title}</h3><p>{video.description}</p>{video.songPath&&<a href={video.songPath}>Scopri il brano <ArrowUpRight size={16}/></a>}</div></article>)}</div></section>

    <section className="song-stories section" id="songs"><div className="section-head"><div><span className="kicker">04 / STORIE DEI BRANI</span><h2>Dentro le canzoni</h2></div><Music2 size={52} strokeWidth={1}/></div><div className="story-grid">{featuredSongs.map(song=><a className="story-card" href={`/brani/${song.slug}`} key={song.slug}><img src={song.cover} alt=""/><div><span>{song.eyebrow}</span><h3>{song.title}</h3><p>{song.text}</p><b>Leggi e ascolta <ArrowUpRight size={15}/></b></div></a>)}</div></section>

    <section className="spotify-section section" id="platforms">
      <div className="spotify-intro"><span className="kicker">03 / ASCOLTA ORA</span><h2>Tutta la musica.<br />Qui dentro.</h2><p>Con YouTube Music puoi riprodurre i brani completi senza lasciare il sito. Puoi anche scegliere il player della tua piattaforma preferita.</p><div className="platform-links">{Object.entries(officialChannels).map(([key,url])=><a key={key} href={url} target="_blank" rel="noreferrer">{platformPlayers[key].label}<ArrowUpRight size={14}/></a>)}</div></div>
      <div className="multi-player"><div className="platform-tabs">{Object.entries(platformPlayers).map(([key,item])=><button key={key} className={platform===key?'active':''} onClick={()=>setPlatform(key)}>{item.label}</button>)}</div><div className="spotify-frame"><iframe key={platform} title={`${platformPlayers[platform].label} di Dario Germanà`} src={platformPlayers[platform].src} width="100%" height={platformPlayers[platform].height} frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /></div></div>
    </section>

    <section className="artist-page section" id="about">
      <div className="artist-photo"><img src="/images/artist.jpg" alt="Ritratto di Dario Germanà" /><span>DARIO GERMANÀ · MESSINA</span></div>
      <div className="artist-story"><span className="kicker">05 / L'AUTORE</span><h2>Musica come racconto, tecnologia come strumento.</h2><p className="lead">Dario Germanà è un autore e digital music producer di Messina. Il suo lavoro nasce dall’incontro fra scrittura, immaginazione visiva, ricerca sonora e nuovi strumenti di produzione digitale.</p><p>Il punto di partenza è sempre un’idea da trasformare in racconto. A volte prende la forma di una canzone italiana intima e immediata; altre volte diventa un paesaggio elettronico, una scena cinematografica o un piccolo universo narrativo.</p><p>La discografia riflette questa libertà. “Te lo dico così” raccoglie emozioni, fragilità e momenti quotidiani; “No Direction” attraversa atmosfere internazionali e notturne; “Zampa 360 Gradi” segue una vena più giocosa e narrativa; “Sweat of the sands” esplora invece territori strumentali e digitali.</p><p>Progetti diversi, uniti dallo stesso intento: usare parole, suono e tecnologia per creare immagini mentali e una connessione autentica con chi ascolta.</p><div className="artist-facts"><span><b>03</b> Album</span><span><b>01</b> EP</span><span><b>2025</b> Esordio</span><span><b>Messina</b> Sicilia</span></div></div>
    </section>

    <section className="news-section section" id="news"><div className="section-head"><div><span className="kicker"><Newspaper size={14}/> 06 / AGGIORNAMENTI</span><h2>News</h2></div></div><div className="news-grid">{newsItems.map(item=><article key={`${item.date}-${item.title}`}><span>{item.date} · {item.tag}</span><h3>{item.title}</h3><p>{item.text}</p>{item.link&&<a href={item.link} target={item.link.startsWith('http')?'_blank':undefined} rel={item.link.startsWith('http')?'noreferrer':undefined}>{item.linkLabel||'Scopri di più'} <ArrowUpRight size={15}/></a>}</article>)}</div></section>

    <section className="contact-page section" id="contact">
      <div className="contact-intro"><span className="kicker">07 / CONTATTI</span><h2>Parliamo di musica.</h2><p>Per collaborazioni, interviste, playlist, utilizzi editoriali o altre proposte artistiche, scrivi direttamente a Dario Germanà.</p><a href="mailto:molesound0@gmail.com">molesound0@gmail.com</a><div className="contact-links"><a href={officialChannels.youtube} target="_blank" rel="noreferrer"><Music2 /> YouTube Music</a><a href={spotifyArtist} target="_blank" rel="noreferrer"><Headphones /> Spotify</a><a href="https://www.instagram.com/molesound/" target="_blank" rel="noreferrer"><AtSign /> Instagram</a></div></div>
      <form className="contact-form" action="mailto:molesound0@gmail.com" method="post" encType="text/plain"><div className="form-row"><label>Nome e cognome<input name="Nome" required placeholder="Il tuo nome" /></label><label>Email<input name="Email" type="email" required placeholder="nome@email.it" /></label></div><label>Motivo del contatto<select name="Motivo" defaultValue="Collaborazione"><option>Collaborazione</option><option>Intervista o media</option><option>Playlist e radio</option><option>Licenza o utilizzo musicale</option><option>Altro</option></select></label><label>Messaggio<textarea name="Messaggio" rows="7" required placeholder="Racconta brevemente la tua proposta..." /></label><label className="privacy-check"><input type="checkbox" required /> Acconsento all'utilizzo dei dati esclusivamente per ricevere una risposta.</label><button type="submit">Invia il messaggio <ArrowUpRight size={18}/></button><small>L'invio apre l'applicazione email configurata sul dispositivo.</small></form>
    </section>
    {playing && <div className="mini-player"><img src={playing.cover} alt="" /><div><small>ANTEPRIMA AUDIO</small><b>{playing.title}</b></div><button onClick={() => playPreview(playing.id,playing.title,playing.cover)}>{playing.paused?<Play fill="currentColor"/>:<Pause fill="currentColor"/>}</button><audio ref={audioRef} src={previews[playing.id]} onEnded={() => setPlaying({...playing,paused:true})} /></div>}
    <footer><button className="brand artist-brand" onClick={() => go('#home')}><span>DARIO</span> GERMANÀ<i /></button><p>© {new Date().getFullYear()} Dario Germanà</p><p>Autore e digital music producer · Messina</p></footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
