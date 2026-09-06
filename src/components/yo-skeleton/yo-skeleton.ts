import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import styles from './yo-skeleton.css';

export type YoSkeletonType = 'circle' | 'default' | 'rectangle' | 'box';

type SkeletonVariant = 'circle' | 'rectangle' | 'box';

const name: string = 'yo-skeleton';
@customElement(name)
export class YoSkeleton extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add(name);
  }
  /**
   * Forma del skeleton: `circle`, `box` o `default` (`rectangle`).
   */
  @property({ type: String, reflect: true }) type: YoSkeletonType = 'rectangle';

  /**
   * Tamaño CSS: un valor para el ancho (`100%`, `64px`) o dos para
   * ancho y alto (`160px 120px`). En `circle`/`box` un solo valor
   * genera un cuadrado; en rectángulo la altura sale de
   * `--yo-skeleton-height`.
   */
  @property({ type: String }) size = '100%';

  /**
   * Mientras sea `true` muestra el skeleton; en `false` el slot.
   */
  @property({ type: Boolean, reflect: true }) show = true;

  private get variant(): SkeletonVariant {
    if (this.type === 'circle') return 'circle';
    if (this.type === 'box') return 'box';
    return 'rectangle';
  }

  private get dimensions(): { width: string; height?: string } {
    const parts = this.size.trim().split(/\s+/).filter(Boolean);
    const width = parts[0] ?? '100%';
    const explicitHeight = parts[1];
    if (explicitHeight) return { width, height: explicitHeight };
    if (this.variant === 'rectangle') return { width };
    return { width, height: width };
  }

  render() {
    if (!this.show) {
      return html`<slot></slot>`;
    }
    return html`
      <div
        class="yo-skeleton is-${this.variant}"
        style=${styleMap(this.dimensions)}
        role="status"
        aria-label="Cargando contenido"
      ></div>
    `;
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'yo-skeleton': YoSkeleton;
  }
}
