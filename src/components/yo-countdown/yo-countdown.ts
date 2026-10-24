import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './yo-countdown.css';

export interface Countdown {
  second: number;
  minute: number;
  hour: number;
  day: number;
}

const name: string = 'yo-countdown';

@customElement(name)
export class YoCountdown extends LitElement {
  @property({ type: String }) date = "06/12/2029";

  @state() show?: boolean = true;

  x: Countdown = {
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000,
  }

  @state()
  y: Countdown = {
    second: 0,
    minute: 0,
    hour: 0,
    day: 0,
  }

  private timerId?: ReturnType<typeof setInterval>;

  override connectedCallback() {
    super.connectedCallback();
    this.classList.add(name);
    this.countDown();
    this.timerId = setInterval(() => this.countDown(), 1000);
  }

  override disconnectedCallback() {
    if (this.timerId !== undefined) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
    super.disconnectedCallback();
  }

  countDown() {
    const countDownEnd: number = new Date(this.date).getTime();
    const now: number = new Date().getTime(),
      distance: number = countDownEnd - now;

    // Se reasigna el objeto completo: mutar `this.y.day = ...` no dispara
    // re-render en Lit (ni con @state). Al crear un objeto nuevo, Lit
    // detecta el cambio y actualiza el HTML. La alternativa sería llamar
    // a `this.requestUpdate()` (no existe `updateValue()`) tras mutar.
    this.y = {
      day: Math.floor(distance / this.x.day),
      hour: Math.floor((distance % this.x.day) / this.x.hour),
      minute: Math.floor((distance % this.x.hour) / this.x.minute),
      second: Math.floor((distance % this.x.minute) / this.x.second),
    };

    // if (distance < 0) {
    if (this.y.second === 35) {
      this.show = false;
    }
  }

  render() {
    if (this.show) {
      console.log('init Countdown');
    } else {
      console.log('Countdown error');
    }
    return html`
      ${this.show
        ? html`
          <div class="yo-countdown__content">
            <span part="day">${this.y.day.toString()} <small part="unit">D</small></span>
            <span part="day">${this.y.hour.toString()} <small part="unit">H</small></span>
            <span part="day">${this.y.minute.toString()} <small part="unit">M</small></span>
            <span part="day">${this.y.second.toString()} <small part="unit">S</small></span>
          </div>
        `
        : html`
          <p>Ups...</p>
        `
      }
    `
  }

  static styles = styles
}
