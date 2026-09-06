import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './yo-image.css';

const name: string = 'yo-image';

@customElement(name)
export class YoImage extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add(name);
  }

  // LOCAL ASSETS
  private imageUrl600 = new URL('../../assets/image/600x400.jpg', import.meta.url).href;
  private imageUrl300 = new URL('../../assets/image/300x200.jpg', import.meta.url).href;

  @property()
  alt = 'My image'

  render() {
    return html`
      <picture>
        <source srcset="${this.imageUrl600}" media="(min-width: 600px)" />
        <img part="img" class="yo-image__img" src="${this.imageUrl300}" alt="MDN" />
      </picture>
    `
  }

  static styles = styles;
}
