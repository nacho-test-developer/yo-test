import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./yo-countdown.css";

export interface Countdown {
  second: number;
  minute: number;
  hour: number;
  day: number;
}

const name: string = "yo-countdown";

@customElement(name)
export class YoCountdown extends LitElement {
  @property({ type: String }) date = "31/12/2026";

  @state() show = true;

  private readonly units: Countdown = {
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000,
  };

  @state()
  remaining: Countdown = {
    second: 0,
    minute: 0,
    hour: 0,
    day: 0,
  };

  private timerId?: ReturnType<typeof setInterval>;

  override connectedCallback() {
    super.connectedCallback();
    this.classList.add(name);
    this.tick();
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  override disconnectedCallback() {
    this.stop();
    super.disconnectedCallback();
  }

  private stop() {
    if (this.timerId !== undefined) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }

  private tick() {
    const end = new Date(this.date).getTime();
    const now = Date.now();
    const distance = end - now;

    if (isNaN(end) || distance <= 0) {
      this.remaining = { day: 0, hour: 0, minute: 0, second: 0 };
      this.stop();
      return;
    }

    this.remaining = {
      day: Math.floor(distance / this.units.day),
      hour: Math.floor((distance % this.units.day) / this.units.hour),
      minute: Math.floor((distance % this.units.hour) / this.units.minute),
      second: Math.floor((distance % this.units.minute) / this.units.second),
    };
  }

  render() {
    return html`
      <div class="yo-countdown__content">
        <span part="day">${this.remaining.day} <small part="unit">D</small></span>
        <span part="day">${this.remaining.hour} <small part="unit">H</small></span>
        <span part="day">${this.remaining.minute} <small part="unit">M</small></span>
        <span part="day">${this.remaining.second} <small part="unit">S</small></span>
      </div>
    `;
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    "yo-countdown": YoCountdown;
  }
}
