# 🌐 MATVEY CV PROTECTION PROTOCOL & DOCUMENTATION - V2.0

## 🚀 Mission
Matvey's personal CV/Resume. Professional, clean, zero-bug policy. Highly interactive with native-like feel, optimized for all viewports (Mobile, Tablet, Desktop, Landscape) and iOS Safari.

---

## 🏗 Architecture
- **Data-Driven (`js/data.js`):** The single source of truth for all text, roles, and lists. Do NOT manipulate strings (e.g., `.split(' ')`) in components; edit the data directly here.
- **Componentized (`js/components.js`):** Generates HTML strings for Fullscreen cards and Bento grid. Uses `navLabel` for short navigation/top-bar text, and `title` or `bentoTitle` for main headings.
- **Logic & Interaction (`js/script.js`):** Handles smooth scrolling, IntersectionObserver, Bento modal 3D transforms, keyboard/wheel navigation, and the custom Haptic Engine.
- **Styling (`css/style.css`):** Pure Vanilla CSS. Responsive grid system using `clamp()`, `minmax()`, and CSS Variables for theming.

---

## 📱 Adaptive & Responsive System
1. **Desktop (>1024px):** 12x12 Bento grid, viewport locked. 1st row has 4 rows of height, 3rd row has 4 rows to balance text (e.g., long titles like "Продуктовый аналитик").
2. **Tablet (601px - 1023px):** 2-column elastic grid. Prevents elements from stretching too wide or squashing too thin.
3. **Mobile Landscape (`max-height: 500px`):** 3-column scrollable grid. Prevents the layout from collapsing into unreadable slivers.
4. **Mobile Portrait (<600px):** 2-column grid. Cards 5 & 6 use `grid-row: span 3` to ensure enough vertical space for content.

---

## 🍎 iOS Safari & Native Feel Fixes (CRITICAL)
- **Viewport Meta:** `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">` (Prevents zoom on tap, enables Safe Area).
- **Safe Area Insets:** CSS uses `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` to prevent content from hiding under the iPhone Notch or Home Bar.
- **Anti-Rubber-Banding:** `html, body` are `position: fixed` with `100dvh` to prevent bouncy overscroll. Internal scrolling elements use `-webkit-overflow-scrolling: touch`.
- **Fast Clicks:** `touch-action: manipulation` applied to interactive elements to bypass the 300ms Safari tap delay.

---

## 📳 Haptics Engine (`navigator.vibrate`)
Custom vibration patterns simulate physical UI weight:
- **`light` (15ms):** UI clicks, bento item selection.
- **`selection` (20ms):** Nav dot taps.
- **`medium` (30ms):** General interactions.
- **`nudge` ([60, 50, 30, 50, 15, 50, 10]):** Forward scroll. Simulates a sliding momentum that fades out.
- **`reverse-nudge` ([10, 50, 15, 50, 30, 50, 60]):** Backward scroll. Simulates catching/stopping momentum.
- **`expand` / `collapse` (450ms):** Synchronized with the Bento 3D opening/closing animation. Expanding builds up, collapsing fades out.

---

## 🛠 Deployment & Infrastructure
The project is hosted in 3 environments:
1. **DEV (sslip.io):** Server `192.168.28.90`, Path: `/home/matveyrl-1/.openclaw/workspace/projects/cv-refactor/`
2. **PROD Docker (backup):** Server `192.168.28.90`, Path: `/home/matveyrl-1/.openclaw/workspace/projects/cv-matvey/` (Container: `cv-prod`)
3. **PROD Main (matveycv.ru):** Hosted on **GitHub Pages** via the `gh-pages` branch.

### Deployment Workflow
1. **Cache Busting (MANDATORY):** Before deploying, increment the `v=X.X` query parameter in `index.html` (`<script src="js/script.js?v=2.13">`) AND inside `js/script.js` for imports (`data.js?v=2.4`, `components.js?v=2.4`).
2. **Sync Server (Docker):**
   ```bash
   scp -r C:\dev\matveycv\* matveyrl-1@192.168.28.90:/home/matveyrl-1/.openclaw/workspace/projects/cv-matvey/
   ssh matveyrl-1@192.168.28.90 "cd /home/matveyrl-1/.openclaw/workspace/projects/cv-matvey/ && docker compose down && docker compose build --no-cache && docker compose up -d"
   ```
3. **Sync GitHub Pages (matveycv.ru):**
   Changes must be pushed to `master`, then merged into `stable` and `gh-pages`.
   ```bash
   git add . && git commit -m "update"
   git push origin master
   git checkout stable && git merge master && git push origin stable
   git checkout gh-pages && git merge master && git push origin gh-pages
   git checkout master
   ```

## 🎨 Visual Guidelines
- **Typography:** Instrument Serif (Headings) & Geist Mono (Text). *Always ensure `subset=cyrillic,latin` is in the Google Fonts import to prevent font-weight mismatch.*
- **Two-Color Headings:** Bento titles use `<em>` tags to render the second word italicized and slightly faded (e.g., `Стек <em>технологий</em>`).
- **Brand Consistency:** `alfatapes` is ALWAYS lowercase.