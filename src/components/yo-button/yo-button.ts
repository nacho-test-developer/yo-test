import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./yo-button.css";

const name: string = "yo-button";
@customElement(name)
export class YoButton extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add(name);
  }

  @property({ type: Number }) count = 0;

  render() {
    return html`
      <button @click=${this._onClick} part="button">
        <slot name="prefix"></slot>
        <slot></slot>
        <slot part="suffix" name="suffix"></slot>
      </button>
    `;
  }

  private _onClick = () => {
    this.count++;
  };

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    "yo-button": YoButton;
  }
}
