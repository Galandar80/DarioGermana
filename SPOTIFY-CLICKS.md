# WD-01: outbound clicks, prepared 24 October 2026

Not deployed or collecting. Vercel Hobby pageviews remain separate.

GoatCounter permits free reasonable public use but requires initial account registration by a human: https://www.goatcounter.com/help/terms . No automated signup or paid plan.

After the owner registers manually, confirm the real endpoint and privacy settings. Import installSpotifyClicks in main.jsx and invoke it only in production with that endpoint. Add equivalent coverage to the existing generated static pages before claiming full-site coverage. No new song page is authorized.

The prepared module sends only supported Spotify artist/album/track destination IDs and a fixed source category. It omits URL queries, hash and referrer; no pageviews or custom identifiers. DNT/GPC and ?analytics=off suppress collection. Links remain functional if the script fails. Clicks before SDK readiness or from blocked scripts are not measured; iframe controls cannot be measured. Clicks are actions, not unique listeners or streams.

Checks: node --test scripts/spotify-clicks.test.mjs; npm run build. Then production deployment and one explicitly labelled technical click (no playback), verify event dashboard, and exclude that event from growth reporting. Until then KPI clicks=N/D.

Source: https://www.goatcounter.com/help/js and https://www.goatcounter.com/help/events . Rollback: remove integration imports/script tags and endpoint; existing site remains functional.
