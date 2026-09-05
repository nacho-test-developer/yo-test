import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './yo-card.css';
/**
 * An example element.
 *
 * @slot - This element has a slot
 */
@customElement('yo-card')
export class YoCard extends LitElement {
  render() {
    return html`
      <slot name="image"></slot>
      <div class="yo-card__body flex">
        <slot></slot>
        <slot name="actions"></slot>
      </div>
    `
  }

  static styles = styles
}

declare global {
  interface HTMLElementTagNameMap {
    'yo-card': YoCard
  }
}
