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

- Patterns: `import styles from './x.css'`via`vite-plugin-lit-css` (`yo-card`). Follow the file's existing pattern.
- `vite.config.ts` uses UnoCSS `mode: 'shadow-dom'` + `litCss({ exclude: './src/index.css' })`. Global CSS stays global; shadow CSS goes through the plugin.
- External `.css` imported as Lit styles **must end with `@unocss-placeholder` without trailing `;`** (see `yo-card.css:21`) or UnoCSS utilities (e.g. `flex` in template) won't apply inside shadow DOM. The trailing `;` leaves a stray `};` in the generated CSS and triggers the esbuild `Unexpected ";"` warning.
- Tokens: `src/assets/css/yo-ui.css` (colors/spacing, light/dark via `prefers-color-scheme`) + `yo-config.css` (`--yo-*` component defaults), wired via `src/index.css`. Customize components via `--yo-*` vars or `::part`, never by reaching into shadow DOM.
- `src/index.css` demo uses `main { container: parent / inline-size }` + `@container parent (width <= 600px)` — keep that naming/syntax.

## TS / Lit quirks

- `tsconfig.json`: `experimentalDecorators: true`, `useDefineForClassFields: false` (required for Lit `@property`), `strict` + `noUnusedLocals/Parameters`. Keep them.
- Do not copy `yo-countdown.ts` patterns: `setInterval` at field init is never cleared, `y` is mutated without `@state` so renders are unreliable, and hide-on-`second === 35` logic is a demo hack.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Running Scripts

Run TypeScript and JavaScript files with `vpx <file>`, for example `vpx ./scripts/seed.ts --dry-run`. It handles enums, decorators, JSX, and tsconfig `paths`, so do not add `tsx` or `ts-node` to run scripts. `vpx --watch <file>` reruns the file when a file it uses changes, in place of `tsx watch`. `vp node <file>` runs plain Node.js.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
