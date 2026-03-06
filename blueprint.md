# Blueprint: Mobile Bento & Stack Chip Refactor

## 1. Architecture Overview
**Issue:** The bento grid overflows on mobile because `.bento-inner` uses `overflow-y: auto` and `.bento-grid` has `height: auto`, which directly violates the `85vh` viewport lock rule. Additionally, the 'stack' card contains hardcoded inline styles in `components.js`, violating the CSS integrity rule.
**Solution:** Enforce strict CSS Grid rows using fractional (`fr`) units bounded by an `85vh` fixed height for mobile screens. Strip inline styles from JavaScript and move them to pure CSS classes. Utilize `desktop-only` classes to gracefully hide verbose text when layout space is constrained, ensuring the UI never scrolls.

## 2. Data Models / API Specs
No changes to `data.js` or external API schemas are required. The data model (`CV_DATA`) remains the absolute source of truth.

## 3. Component/Logic Mapping

### `css/style.css`
Modify the mobile breakpoint (`@media (max-width: 600px)`) to lock the viewport:
```css
@media (max-width: 600px) {
  .bento-inner { 
    padding: 0 var(--pad); 
    justify-content: center; /* Center the 85vh block vertically */
    height: 100vh;
    overflow: hidden; /* Disable parent scrolling */
  }
  .bento-grid { 
    grid-template-columns: repeat(2, 1fr); 
    grid-template-rows: repeat(7, 1fr); /* Strict 7-row layout */
    gap: 8px; 
    height: 85vh; /* Enforce height limit */
    width: 100%;
  }
  
  /* Assign explicit grid bounds for a perfect 14-cell pack */
  .bc-hero    { grid-column: 1; grid-row: 1 / span 2; }
  .bc-now     { grid-column: 2; grid-row: 1 / span 2; }
  .bc-qugo    { grid-column: 1; grid-row: 3 / span 2; }
  .bc-earlier { grid-column: 2; grid-row: 3 / span 2; }
  .bc-comp    { grid-column: 1; grid-row: 5 / span 2; }
  .bc-stack   { grid-column: 2; grid-row: 5 / span 2; }
  .bc-contact { grid-column: 1 / span 2; grid-row: 7 / span 1; min-height: unset; padding: 12px 16px; margin-top: 0; }
  
  .bc { padding: 12px; border-radius: 12px; overflow: hidden; height: 100%; }
}
```

Add Stack Chip utility classes to replace inline styles:
```css
/* Stack Component Specifics */
.bc-chip-cat { display: flex; flex-wrap: wrap; gap: 6px; align-content: flex-start; }
.bc-chip-cat-title { font-size: 11px; text-transform: uppercase; font-weight: bold; opacity: 0.8; margin-bottom: 10px; width: 100%; color: var(--c-accent); letter-spacing: 0.05em; }
.bc-chip-footer { font-size: 10px; opacity: 0.3; margin-top: auto; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.05); }
```

### `js/components.js`
1. **Clean up Inline Styles in `.bc-stack`:**
   Replace the heavily styled `<div style="...">` wrapper elements with the new `.bc-chip-cat`, `.bc-chip-cat-title`, and `.bc-chip-footer` classes. Remove `style="gap: 6px;"` from `.bc-chips-compact`.
2. **Protect Against Overflow:**
   - Add `.desktop-only` to verbose sections inside the mobile grid (e.g., `.bc-body` in `.bc-earlier`, or `.bc-tags` in `.bc-now`) to ensure they don't visually overflow their 2-row grid boundary. 
   - Apply `.mobile-only` elements specifically tailored to summarize content if needed.

## 4. Trade-offs
- **Truncation over Completeness:** By aggressively enforcing `85vh` and hiding content with `.desktop-only`, the mobile bento card will carry slightly less detailed information than the desktop version. However, this satisfies the "zero-bug policy" and strictly enforces the viewport lock, resulting in a cleaner user experience without scrolling traps.
- **CSS Grid Rigidity:** Hardcoding grid row coordinates ensures precise alignment and absolutely prevents visual collapsing, but makes adding a new component to the grid slightly more rigid. Given the personal CV nature of the project, structural changes are infrequent, making this stability trade-off worthwhile.