# SEO-01 — 17 ottobre 2026

Responsabile: 04 Web Developer. Fonte: Piano Operativo, Report A21:I25.
Richiesta utente: implementare R1/R2/R3, budget 0 €.

## Assegnazioni e duplicazioni
Backlog WD-01 è Parziale; SEO-01 è Completata limitatamente ad audit/requisiti.
Nessuna nuova assegnazione Director nel Backlog letto; la richiesta corrente autorizza le tre correzioni a 04.
PR #1 aperta in bozza, non integrata: menu mobile e accessibilità. Questo ramo parte da main 7df75c8d1dfeb452e312f64b7d990d0a4276964d, senza incorporare quelle modifiche.

## Implementazione
- vercel.json: rimosso solo rewrite indiscriminato a index.html; conservati gli otto rewrite delle pagine reali. Vercel deve servire public/404.html come errore nativo 404.
- public/404.html: pagina autonoma italiana, noindex e link alla home.
- src/main.jsx: quattro link permanenti e descrittivi alle raccolte, indipendenti dal selettore; descrizione specifica di Draghi e paragrafo distinto in Dietro il brano. ID Spotify e CTA preservati.
- src/styles.css: link con wrapping e focus visibile.
- scripts/generate-seo-pages.mjs: description, OG/Twitter e JSON-LD di Draghi coerenti con bozza riga 24.
I link sono resi al primo mount React, senza clic; non è introdotto prerendering. Il successo del rendering Google nei due campioni non prova un problema causato da JavaScript.

## Controlli eseguiti
Generatore eseguito in memoria con I/O simulato sul template sorgente: 8 pagine, canonical 8/8 e JSON-LD 8/8 validi; 9 percorsi sitemap coperti da home + 8 rewrite esatti; nessun rewrite indiscriminato; ID Spotify e sitemap invariati. Non equivale a npm run build o test HTTP.

## Limiti e stato
Implementazione preparata; build e collaudo browser/HTTP non eseguiti localmente: ambiente indisponibile (exec-server handshake).
Nessun merge o deploy di produzione. Eventuale anteprima va verificata separatamente con gli stati del provider.
Nessuna richiesta GSC, reinvio sitemap, modifica Spotify o raccolta analytics.
Nessun risultato di crescita misurato.

## Accettazione prima della produzione
1. npm ci e npm run build.
2. Due URL casuali (anche sotto /album/) devono restituire 404; tutti i 9 URL sitemap devono restituire 200 con canonical corretto; controllare robots, sitemap, assets e immagini.
3. Homepage mobile e tastiera: quattro link presenti senza selezionare schede, navigazione funzionante, nessun overflow.
4. Draghi: intro e Dietro il brano diversi, CTA verso track/4RAbXw4ztzlEb1lLpsDGx4 e video invariati; metadati coerenti.
5. Registrare URL effettivo di produzione dopo deploy verificato e consegnare a 03 per controllo Google. Non duplicare richieste di indicizzazione oggi.

## Rollback
Revert del commit di questo ramo ripristina il comportamento precedente. Non alterare PR #1 o i task degli altri agenti.
