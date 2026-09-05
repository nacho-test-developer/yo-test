import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './yo-image.css';

@customElement('yo-image')
export class YoImage extends LitElement {

  @property()
  alt = 'My image'

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('yo-image');
  }

  render() {
    return html`
      <picture>
        <source srcset="https://picsum.photos/600/400" media="(min-width: 600px)" />
        <img part="img" class="yo-image__img" src="https://picsum.photos/300/200" alt="MDN" />
      </picture>
    `
  }

  static styles = styles;
}
