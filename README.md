# Jobbfinner 🔍

En AI-drevet jobbanbefaling-app bygget med React og Anthropic Claude API.

Fyll inn profilen din — ferdigheter, utdanning, erfaring og preferanser — og få personlige jobbforslag med direkte lenker til stillinger på FINN.no.

## Funksjoner

- Profilskjema med klikkbare ferdighets- og preferansetagger
- AI-drevet jobbmatching via Claude API
- Hvert resultat lenker direkte til FINN.no jobbsøk
- Rent og responsivt design

## Teknologi

- React + Vite
- Anthropic Claude API
- CSS Modules

## Kom i gang

### 1. Klon repoet

```bash
git clone https://github.com/669830/Job-search.git
cd Job-search
```

### 2. Installer avhengigheter

```bash
npm install
```

### 3. Legg til API-nøkkel

Opprett en `.env`-fil i rotmappen:

```
VITE_ANTHROPIC_API_KEY=din_api_nøkkel_her
```

Hent API-nøkkelen din på https://console.anthropic.com

### 4. Start appen

```bash
npm run dev
```

Åpne http://localhost:5173

## Prosjektstruktur

```
src/
├── components/
│   ├── JobCard.jsx        # Jobbkort med lenke til FINN.no
│   ├── ProfileForm.jsx    # Profilskjema
│   ├── Results.jsx        # Resultatvisning
│   └── TagSelector.jsx    # Gjenbrukbar tagger-komponent
├── data/
│   └── options.js         # Ferdigheter og preferanser
├── hooks/
│   └── useJobFinder.js    # Tilstand og logikk
├── utils/
│   └── api.js             # Claude API-kall
└── App.jsx
```

## Veikart

- Fase 2: Legg til Node.js/Express backend + PostgreSQL database
- Lagre og gjenbesøk tidligere jobbforslag
- Hent norske stillinger direkte fra Arbeidsplassen.nav.no
- Brukerkontoer og innlogging

## Lisens

MIT
