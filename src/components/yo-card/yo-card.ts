import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./yo-card.css";

const name: string = "yo-card";

@customElement(name)
export class YoCard extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add(name);
  }

  render() {
    return html`
      <slot name="image"></slot>
      <div class="yo-card__body flex">
        <slot></slot>
        <slot name="actions"></slot>
      </div>
    `;
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    "yo-card": YoCard;
  }
}
