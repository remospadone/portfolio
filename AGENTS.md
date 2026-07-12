# Sito Portfolio — Remo Spadone

## Struttura

```
/
├── index.html          # Home: hero + scramble text, presentazione, skills, servizi
├── works.html           # Griglia progetti, link a works/work-*.html
├── about.html           # Bio, strumenti
├── contacts.html        # Info contatti, social
├── privacy.html         # Informativa privacy (GDPR)
├── cookie.html          # Informativa cookie
├── AGENTS.md            # Questo file
├── css/
│   └── style.css        # @font-face locali, tema dark, animazioni, responsive, banner cookie
├── fonts/
│   ├── SpaceGrotesk-Regular.woff2
│   ├── SpaceGrotesk-Medium.woff2
│   ├── SpaceGrotesk-Bold.woff2
│   ├── Inter-Light.woff2
│   ├── Inter-Regular.woff2
│   └── Inter-SemiBold.woff2
├── js/
│   ├── main.js               # Cursore custom, skill-bar observer
│   ├── text-scramble.js       # Effetto scramble sui titoli (index.html, works.html)
│   ├── cookie-banner.js       # Banner consenso cookie (localStorage)
│   ├── home-sketch.js         # p5.js: onde fluide + particelle interattive
│   ├── works-sketch.js        # p5.js: nodi e connessioni
│   ├── about-sketch.js        # p5.js: anelli geometrici rotanti
│   ├── contacts-sketch.js     # p5.js: campo stellare con linee
│   └── work-detail-sketch.js  # p5.js: particelle colorate (condiviso da work-*.html)
├── img/                 # Cartella per immagini (vuota, da popolare)
└── works/
    ├── work-1.html  # Brand Identity — Aura
    ├── work-2.html  # Poster Sperimentale
    ├── work-3.html  # Generative Art — Flow
    ├── work-4.html  # Packaging — Organic
    ├── work-5.html  # Motion Reel 2025
    ├── work-6.html  # Editorial — Frame
    ├── work-7.html  # Social Campaign — Vibe
    └── work-8.html  # Web Prototype — Nexus
```

## Convenzioni

### Palette colori
- `--bg: #050508` (nero profondo)
- `--cyan: #00f0ff` (ciano neon)
- `--magenta: #ff00aa` (magenta neon)
- `--yellow: #ffcc00` (giallo)
- `--text: #e8e8f0` (bianco sporco)

### Font (hostati localmente in `fonts/`)
- Titoli: `Space Grotesk` (SIL OFL 1.1)
- Corpo: `Inter` (SIL OFL 1.1)
- Dichiarazioni `@font-face` in cima a `css/style.css`.
- Nessuna dipendenza da Google Fonts CDN.

### Naming immagini (cartella `img/`)
| File | Dove appare |
|---|---|
| `foto-remo.jpg` | Avatar in index.html e about.html |
| `work-1-thumb.jpg` … `work-8-thumb.jpg` | Thumbnail griglia in works.html |
| `work-1.jpg` … `work-8.jpg` | Showcase in works/work-*.html |

Le immagini hanno fallback automatico (`onerror`): se il file non esiste, viene mostrato il placeholder (avatar "RS", icone geometriche o gradienti).

### Pagine lavoro (works/work-*.html)
Ogni pagina ha palette colore personalizzata passata via `data-color` su `#work-detail-sketch`:
```html
data-color="R1,G1,B1,R2,G2,B2"  # primo colore, secondo colore
```
I link prev/next sono tra `work-N.html` (stessa cartella). I link a home/works/about/contacts usano prefisso `../`.

### Privacy e Cookie (GDPR)
- `privacy.html` e `cookie.html`: pagine con testo base GDPR, accessibili dal footer di ogni pagina.
- `js/cookie-banner.js`: banner consenso cookie, usa `localStorage` per salvare la scelta (`cookie_consent`: "accepted" / "rejected").
- Il banner compare solo se non esiste nessuna scelta salvata.
- Ogni pagina (incluse work-*.html) include `cookie-banner.js` e i link nel footer.
- Nessun cookie di profilazione o tracciamento è attivo.
- Font caricati localmente (nessun trasferimento IP a Google CDN).

### Creative coding (p5.js)
- Ogni pagina ha uno sketch p5.js eseguito su un container fisso (`sketch-container`, z-index: 0, pointer-events: none).
- Gli sketch sono reattivi a `windowResized`.
- Usano `clear()` per sfondo trasparente.
- I canvas NON bloccano gli eventi del mouse sugli elementi HTML sottostanti.

### Cursore custom
- Due elementi fissi: `#cursor` (cerchio, mix-blend-mode: difference) e `#cursor-dot` (punto centrale).
- I target interattivi (a, .btn, .work-card, .service-card, etc.) ingrandiscono il cerchio e cambiano colore al magenta.
- Gestito in `js/main.js`.

### Effetto testo (scramble)
- Usa classe `.scramble-text` sul tag da animare.
- Script `js/text-scramble.js`: trasforma il testo da caratteri casuali alla stringa finale.
- Dopo lo scramble, applica gradiente animato ciano↔magenta↔giallo.
- Presente su index.html e works.html.

### Skills (index.html)
Blocchi nel formato:
```html
<div class="skill-item">
  <div class="skill-header"><span>Nome</span><span>90%</span></div>
  <div class="skill-bar"><div class="skill-fill" data-width="90"></div></div>
</div>
```
La barra si anima all'interscroll grazie a `IntersectionObserver` in `main.js`.

### Modifiche rapide
- **Aggiungere/rimuovere skill**: modifica `index.html` nella sezione `.skills-grid`.
- **Aggiungere un lavoro**: crea `works/work-N.html` copiando un esistente e cambia contenuto + `data-color`. Poi aggiungi card in `works.html` e immagini in `img/`.
- **Percorsi immagini**: dalla root usano `img/...`, da `works/` usano `../img/...`.
