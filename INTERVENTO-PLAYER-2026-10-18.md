# Player pronti senza clic di caricamento — 18 ottobre 2026

Richiesta esplicita utente: rimuovere il passaggio «Carica player» da videoclip e player musicali. Manuale, Backlog, Report e Registro riletti; nessun intervento equivalente già completato. WD-01 resta parziale per misurazione clic.

## Modifica
src/main.jsx, ExternalPlayer: rimossa la barriera a clic, iframe creato subito con loading eager. Si applica ai due videoclip homepage, alla piattaforma selezionata e ai player delle pagine brano. Il cambio piattaforma crea direttamente il relativo iframe. Nessun parametro autoplay aggiunto e nessun ascolto automatico richiesto. Dimensioni, titoli accessibili e collegamenti Spotify invariati.

Il browser ora contatta i fornitori esterni al caricamento anziché al consenso del pulsante; è il comportamento richiesto dall’utente. Più richieste iniziali rispetto alla versione con segnaposto; nessun servizio o analytics aggiunto.

## Verifiche
Build Vite riuscita, otto pagine SEO generate; git diff --check superato. Collaudo browser e verifica deployment registrati nel Piano dopo pubblicazione. Il caricamento iframe non prova l’avvenuta riproduzione audio: nessun ascolto usato come metrica.

## Rollback
Revert del commit di questo intervento ripristina il caricamento a clic. Nessuna modifica a sitemap, routing, catalogo o menu.
