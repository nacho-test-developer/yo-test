import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./yo-collapse-item.css";

const name: string = "yo-collapse-item";

@customElement(name)
export class YoCollapseItem extends LitElement {
  /**
   * Abre/cierra el collapse. Reflejado al atributo `open`.
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * Texto del encabezado (summary). También se puede pasar vía slot `summary`.
   */
  @property({ type: String }) summary = "";

  /**
   * Deshabilita la interacción.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _onToggle = (e: Event) => {
    const details = e.currentTarget as HTMLDetailsElement;
    if (this.disabled) {
      e.preventDefault();
      details.open = this.open;
      return;
    }
    if (details.open !== this.open) {
      this.open = details.open;
    }
  };

  private _onClick = (e: Event) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  render() {
    return html`
      <details ?open=${this.open} @toggle=${this._onToggle} @click=${this._onClick}>
        <summary part="summary">
          <slot name="summary">${this.summary}</slot>
          <span class="yo-collapse-item__icon" aria-hidden="true"></span>
        </summary>
        <div class="yo-collapse-item__content">
          <div class="yo-collapse-item__inner">
            <slot></slot>
          </div>
        </div>
      </details>
    `;
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    "yo-collapse-item": YoCollapseItem;
  }
}
