import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './yo-button.css';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('yo-button')
export class YoButton extends LitElement {
  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number }) count = 0

  render() {
    return html`
      <button @click=${this._onClick} part="button">
        <slot name="prefix"></slot>
        <slot></slot>
        <slot part="suffix" name="suffix"></slot>
      </button>
    `
  }

  private _onClick() {
    this.count++
  }

  static styles = styles
}

declare global {
  interface HTMLElementTagNameMap {
    'yo-button': YoButton
  }
}
