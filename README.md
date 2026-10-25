# yo-test — `yo-*` Web Components

Prototipo de librería de Web Components (Lit 3 + Vite 5 + TypeScript) con la familia de elementos `yo-*`. Incluye demo en `index.html`, sistema de tokens CSS (light/dark) y despliegue a GitHub Pages.

- Repo: https://github.com/nacho-test-developer/yo-test
- Demo (Pages): https://nacho-test-developer.github.io/yo-test/

## Stack

- **Lit** 3.1 (Web Components)
- **Vite** 7.3 (dev server + build)
- **TypeScript** 5.2 (strict)
- **UnoCSS** (preset-mini + rem-to-px, modo `shadow-dom`)
- `vite-plugin-lit-css` para importar CSS como estilos Lit

## Requisitos

- Node.js 20 (ver `.github/workflows/deploy.yml`)
- npm

## Instalación

```bash
npm install
```

## Comandos

| Comando                   | Descripción                                        |
| ------------------------- | -------------------------------------------------- |
| `npm start`               | Servidor de desarrollo (Vite)                      |
| `npm run build`           | Typecheck (`tsc`) + build de producción en `dist/` |
| `npm run preview`         | Sirve `dist/` localmente                           |
| `npm run storybook`       | Servidor de Storybook (componentes y stories)      |
| `npm run build-storybook` | Build estático de Storybook en `storybook-static/` |

> Siempre ejecutar `npm run build` para verificar cambios: el typecheck es estricto (`strict`, `noUnusedLocals`, `noUnusedParameters`) y solo incluye `src/`.

## Estructura

```
src/
├── index.css                 # CSS global + demo (tokens, grid, theming)
├── theme.ts                  # lógica de tema light/dark (localStorage + OS pref)
├── assets/css/               # tokens (yo-primitive, yo-tokens, yo-reset, yo-components)
└── components/<name>/<name>.ts  # un directorio por elemento
index.html                    # entrypoint real (scripts de componentes)
```

> `src/my-element.ts` es plantilla sin uso. `src/components/yo-icon/yo-icon.ts` está vacío. Ignorar backups `*_old` / `index copy.html_`.

Los componentes **deben** registrarse en `index.html` con `<script type="module" src="/src/components/...">`, o no se cargarán.

## Componentes

### `<yo-button>`

Botón con slots para prefijo/sufijo y contador interno.

| Propiedad | Tipo     | Default | Descripción                         |
| --------- | -------- | ------- | ----------------------------------- |
| `count`   | `Number` | `0`     | Contador incrementado en cada click |

Slots: `prefix`, default, `suffix`. Partes: `button`, `suffix`.

```html
<yo-button ui="full"><span slot="suffix">pedro</span> Hola</yo-button>
```

### `<yo-card>`

Contenedor con slots para imagen, cuerpo y acciones.

Slots: `image`, default (cuerpo), `actions`.

```html
<yo-card>
  <yo-image slot="image"></yo-image>
  <p>Contenido</p>
  <yo-button slot="actions">Acción</yo-button>
</yo-card>
```

### `<yo-image>`

Imagen responsive con `<picture>` (300x200 por defecto, 600x400 para ≥600px).

| Propiedad | Tipo     | Default      |
| --------- | -------- | ------------ |
| `alt`     | `String` | `'My image'` |

Partes: `img`.

### `<yo-countdown>`

Cuenta regresiva hacia una fecha.

| Propiedad | Tipo     | Default        | Descripción                       |
| --------- | -------- | -------------- | --------------------------------- |
| `date`    | `String` | `"31/12/2026"` | Fecha objetivo (`new Date(date)`) |

Partes: `day`, `unit`. Se detiene al llegar a 0.

```html
<yo-countdown date="12/06/2026"></yo-countdown>
```

### `<yo-skeleton>`

Placeholder de carga con formas.

| Propiedad | Tipo      | Default       | Descripción                                      |
| --------- | --------- | ------------- | ------------------------------------------------ |
| `type`    | `String`  | `'rectangle'` | `circle`, `box`, `rectangle`/`default`           |
| `size`    | `String`  | `'100%'`      | Ancho o `"<ancho> <alto>"`                       |
| `show`    | `Boolean` | `true`        | `true` muestra skeleton, `false` muestra el slot |

```html
<yo-skeleton type="circle" size="80px" show></yo-skeleton>
```

### `<yo-collapse>`

Panel colapsable basado en `<details>`.

| Propiedad  | Tipo      | Default | Descripción                             |
| ---------- | --------- | ------- | --------------------------------------- |
| `open`     | `Boolean` | `false` | Abierto/cerrado (reflejado)             |
| `summary`  | `String`  | `''`    | Texto del encabezado (o slot `summary`) |
| `disabled` | `Boolean` | `false` | Deshabilita la interacción              |

Slots: `summary`, default. Partes: `summary`.

### `<yo-theme-toggle>`

Botón flotante (esquina superior derecha) para alternar tema light/dark. Persiste la elección en `localStorage` y sigue la preferencia del SO.

## Theming (tokens)

- Tokens globales en `src/assets/css/` (`yo-primitive.css`, `yo-tokens.css`, `yo-reset.css`, `yo-components.css`), cableados por `src/index.css`.
- Variables `--yo-*` para defaults de componentes (`src/assets/css/tokens/yo-components.css`).
- Personalizar componentes vía `--yo-*` o `::part`, nunca tocando el shadow DOM.
- Tema light/dark vía `prefers-color-scheme` y `data-theme` en `:root` (ver `src/theme.ts`).

## Convenciones de estilo (no obvias)

- CSS externo importado como estilos Lit **debe terminar con `@unocss-placeholder` sin `;` final** (ver `yo-card.css`), o los utilities de UnoCSS no aplican en shadow DOM.
- `vite.config.ts`: UnoCSS `mode: 'shadow-dom'` + `litCss({ exclude: './src/index.css' })`. CSS global queda global; el shadow CSS pasa por el plugin.
- El demo usa `main { container: parent / inline-size }` + `@container parent (width <= 600px)`; mantener ese naming/sintaxis.

## TypeScript / Lit

- `tsconfig.json`: `experimentalDecorators: true`, `useDefineForClassFields: false` (requerido para `@property`), `strict` + `noUnusedLocals/Parameters`.
- No copiar los patrones de `yo-countdown.ts` antiguos: `setInterval` sin limpiar, mutación sin `@state`, lógica de ocultado por `second === 35` es hack de demo.

## Despliegue

GitHub Pages vía `.github/workflows/deploy.yml` (build + deploy) en pushes a `main`, `master`, `develop` y `feature/**`, más ejecución manual. `base: '/ia-test/'` en `vite.config.ts`. No editar `dist/` a mano.

## Licencia

Privado (`"private": true`). Sin licencia declarada.
