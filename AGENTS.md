# AGENTS.md

Lit 3 + Vite 5 + TS prototype for `yo-*` Web Components. No README, tests, lint, or CI.

## Commands

- `npm start` — dev server (no test/preview needed for most changes).
- `npm run build` — always run to verify; it is `tsc && vite build` (strict typecheck, `include: ["src"]` only).
- `npm run preview` — serve `dist/`. Do not hand-edit `dist/`.

## Entrypoints

- Entry is `index.html`, not `src/main.ts`. New components must be added as `<script type="module" src="/src/components/...">` there or they won't load.
- Components live in `src/components/<name>/<name>.ts` (flat, one dir per element).
- Ignore: `src/my-element.ts` (unused Vite template), `src/components/yo-icon/yo-icon.ts` (empty), `*_old` / `index copy.html_` backups.

## Styling (non-obvious)

- Two patterns coexist: `static styles = css\`...\`` (`yo-button`, `yo-image`) vs `import styles from './x.css'`via`vite-plugin-lit-css` (`yo-card`). Follow the file's existing pattern.
- `vite.config.ts` uses UnoCSS `mode: 'shadow-dom'` + `litCss({ exclude: './src/index.css' })`. Global CSS stays global; shadow CSS goes through the plugin.
- External `.css` imported as Lit styles **must end with `@unocss-placeholder` without trailing `;`** (see `yo-card.css:21`) or UnoCSS utilities (e.g. `flex` in template) won't apply inside shadow DOM. The trailing `;` leaves a stray `};` in the generated CSS and triggers the esbuild `Unexpected ";"` warning.
- Tokens: `src/assets/css/yo-ui.css` (colors/spacing, light/dark via `prefers-color-scheme`) + `yo-config.css` (`--yo-*` component defaults), wired via `src/index.css`. Customize components via `--yo-*` vars or `::part`, never by reaching into shadow DOM.
- `src/index.css` demo uses `main { container: parent / inline-size }` + `@container parent (width <= 600px)` — keep that naming/syntax.

## TS / Lit quirks

- `tsconfig.json`: `experimentalDecorators: true`, `useDefineForClassFields: false` (required for Lit `@property`), `strict` + `noUnusedLocals/Parameters`. Keep them.
- Do not copy `yo-countdown.ts` patterns: `setInterval` at field init is never cleared, `y` is mutated without `@state` so renders are unreliable, and hide-on-`second === 35` logic is a demo hack.
