---
name: my-preferences
description: Esta es una guía para el uso de la IA a la hora de desarrollar mis proyectos webs. A modo de buenas prácticas.
---

# Directrices de Desarrollo para Librería de Web Components

## Propósito

Guiar la creación, modificación y refactorización de componentes web dentro de esta librería, asegurando un código limpio, modular y mantenible.

## Stack Tecnológico y Configuración

- **Framework:** Lit (LitElement y html).
- **Lenguaje:** TypeScript (con tipado estricto, evitando el uso de `any`).
- **Estilos:** CSS externo. **Prohibido** incluir estilos en línea o dentro del mismo archivo TypeScript mediante la etiqueta `css` de Lit. Los estilos deben importarse desde un archivo `.css` independiente.
- **Entorno:** Entorno estático. **No** se debe levantar, configurar ni asumir la existencia de un servidor de desarrollo (dev server) local en los scripts o flujos de trabajo generados.

## Reglas de Diseño y Arquitectura

- **Simplicidad:** Los componentes deben tener una única responsabilidad (Single Responsibility Principle). Evitar lógica compleja de negocio dentro del componente.
- **Código Limpio (Clean Code):** Nombres de variables y funciones descriptivos, comentarios solo cuando sea estrictamente necesario y funciones pequeñas.
- **Restricción de Tamaño:** Ningún archivo de componente debe superar las **200 líneas de código** (incluyendo importaciones y decoradores). Si un componente supera este límite, debe dividirse en subcomponentes más pequeños o extraer la lógica a funciones utilitarias externas.

## Ejemplo de Estructura Esperada

### 1. Archivo de Estilos (`my-element.css`)

```css
:host {
  display: block;
  padding: 16px;
}
```

### 2. Archivo del Componente (`my-element.ts`)

```typescript
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import globalStyles from "./my-element.css" assert { type: "css" }; // O el método de importación configurado en el proyecto

@customElement("my-element")
export class MyElement extends LitElement {
  static styles = globalStyles;

  @property({ type: String })
  name = "Mundo";

  render() {
    return html`<p>Hola, ${this.name}!</p>`;
  }
}
```

## Restricciones Estrictas (Lo que NO debes hacer)

1. **NO** uses `css` de `lit` (ej. `static styles = css`...``). Usa siempre archivos CSS separados.
2. **NO** crees componentes masivos. Si llega a 200 líneas, detente y modulariza.
3. **NO** agregues comandos, scripts o dependencias para ejecutar servidores locales (como `vite`, `web-dev-server`, etc.). El proyecto debe compilarse como una librería estática.
