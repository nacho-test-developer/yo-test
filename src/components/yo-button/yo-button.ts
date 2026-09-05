import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

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

  static styles = css`
    :host {
      text-align: center;
    }

    :host([disabled]) {
      pointer-events: none;
      opacity: 0.2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      color: var(--yo-button-color);
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: var(--color-primary);
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    :host([ui="full"]) button {
      width: 100%;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'yo-button': YoButton
  }
}
