import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('yo-image')
export class YoImage extends LitElement {

  @property()
  alt = 'My image'

  render() {
    return html`
      <picture>
        <source srcset="https://picsum.photos/600/400" media="(min-width: 600px)" />
        <img src="https://picsum.photos/300/200" alt="MDN" />
      </picture>
    `
  }

  static styles = css`
    img {
      vertical-align: middle;
      width: 100%;
    }
  `
}
