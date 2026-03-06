# 🌐 MATVEY CV PROTECTION PROTOCOL - V1.1

## 🚀 Mission
Matvey's personal CV/Resume. Professional, clean, zero-bug policy. Optimized for viewport-fit mobile experience.

## 🏗 Architecture
- **Data-Driven:** All content lives in `js/data.js`.
- **Componentized:** HTML fragments are generated in `js/components.js`.
- **Logic:** Navigation and observers are in `js/script.js`.
- **Cache Busting:** Always update version `?v=X.X` in `index.html` script imports after changes.

## ⚠️ CRITICAL RULES
1.  **Bento Viewport Lock:** On mobile, the bento grid MUST fit within `85vh` to prevent internal scrolling. Use `mobile-only` class to hide non-essential items if height grows.
2.  **No Strings Transformation:** Do NOT use `.split(' ')[0]` or `.toUpperCase()` on company names or roles unless explicitly requested. Data in `data.js` is the source of truth.
3.  **CSS Integrity:** Use Vanilla CSS in `css/style.css`. Avoid inline styles unless they are dynamic.
4.  **Syntax Safety:** Replace entire functions in `js/components.js` to ensure block-level integrity.

## 🛠 Deployment (DEV)
- **Local Dev:** Edit files directly.
- **Docker:** `docker compose up -d --build` (Note: ensure docker is in PATH).
- **Hard Refresh:** Always test with `Ctrl + F5` to bypass JS module caching.

## 🧭 Session Status
- [x] Mode: Stabilization (DONE)
- [x] Bento Grid: Optimized for mobile (DONE)
- [x] Content: Russian translations & role sync (DONE)
- [x] Documentation: GEMINI.md updated (DONE)
