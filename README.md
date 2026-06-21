# swamp.lost

An interactive, browser-based narrative game exploring digital trust, verification, and modern identity in a metaphorical "swamp" of synthetic content.

---

## 🎮 How to Play

The game runs as a client-side Single-Page Application (SPA) loaded natively via browser ES Modules. No build steps, bundlers, or packages are required.

### 1. Spin up the Dev Server
To bypass browser CORS restrictions on local ES modules, spin up a local development web server.

From the project root directory, run:
```bash
python3 -m http.server 8000
```

### 2. Open the Game
Once the server is running, open your web browser and navigate to:
[http://localhost:8000](http://localhost:8000)

---

## 🗺️ Project Structure

The project conforms to a clean, modular structure:

```text
swamp.lost/
├── index.html                  # Single SPA entry shell
├── README.md                   # Project documentation
├── technical-design.md         # Technical architecture details
│
├── content/
│   └── gameTexts.js            # Frozen database of all in-game content
│
├── css/
│   ├── tokens.css              # Color, spacing, and typography design tokens
│   ├── base.css                # Resets, layout grids, and ambient radial vignette styles
│   ├── components.css          # Styled inputs, terminal screens, buttons, and text cards
│   ├── pages.css               # Page-specific views & wisp portrait frames
│   └── responsive.css          # Breakpoints adjusting layout under 700px width
│
├── js/
│   ├── app.js                  # Application entry bootstrap
│   ├── router.js               # Hash routing implementation
│   ├── state.js                # Centralized state management & sessionStorage persistence
│   ├── gameLogic.js            # Scoring system rules and gate validation logic
│   ├── renderer.js             # Element factory & 600ms page transitions (fade-out/fade-in)
│   └── pages/                  # Rendering controllers for each page state
│       ├── introPage.js
│       ├── gatePage.js
│       ├── routePage.js
│       ├── questionPage.js
│       ├── answerPage.js
│       ├── decisionPage.js
│       └── resultPage.js
│
└── assets/
    └── images/                 # AI-generated portrait illustrations for Irrlichter
        ├── irrlicht-1.png      
        ├── irrlicht-2.png      
        └── irrlicht-3.png      
```

---

## ⚙️ Game Architecture & State

- **Zero-Dependency Core:** Standard vanilla ES module imports supported natively by modern web engines.
- **Session Persistence:** All choices are synchronized into the browser's `sessionStorage` so refreshing the browser preserves active game states. Clicking "Restart" at any point resets the session back to initial values.
- **Atmospheric Filters:** Background vignette radial lighting and full-screen noise are generated on-the-fly via responsive CSS overlays and inline SVG `<feTurbulence>` filters.
- **Journal Export:** Upon completing the final station, players can click **Download** on the results screen to save a complete, structured text file containing their answers, path selections, and score indicators (`swamp_lost_verification_log.txt`).
# swamp.lost
