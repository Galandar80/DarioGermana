# Come aggiornare news e videoclip

I contenuti modificabili si trovano nel file `src/content.js`.

## Aggiungere una news

Apri `src/content.js` su GitHub, premi la matita e inserisci il nuovo blocco all'inizio di `newsItems`:

```js
{
  date: '20 luglio 2026',
  tag: 'Nuova uscita',
  title: 'Titolo della notizia',
  text: 'Testo breve della notizia.',
  link: 'https://indirizzo-facoltativo.it',
  linkLabel: 'Scopri di più',
},
```

`link` e `linkLabel` sono facoltativi.

## Aggiungere un videoclip

Da un link come `https://www.youtube.com/watch?v=Jq852TGFrBc`, copia la parte dopo `v=` e inserisci questo blocco all'inizio di `videos`:

```js
{
  title: 'Titolo del videoclip',
  youtubeId: 'ID_DEL_VIDEO',
  description: 'Breve descrizione del video.',
  songPath: '',
},
```

`songPath` è facoltativo. Usalo se esiste una pagina del brano, per esempio `/brani/mille-cuori`.

## Pubblicare

Su GitHub seleziona **Commit changes**. Se il repository è collegato a Vercel, il salvataggio avvia automaticamente una nuova pubblicazione.

Controlla sempre che ogni elemento termini con una virgola, che i testi siano fra apici e che `youtubeId` contenga soltanto l'identificativo del video.
