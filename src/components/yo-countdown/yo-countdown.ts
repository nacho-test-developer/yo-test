import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface Countdown {
  second: number;
  minute: number;
  hour: number;
  day: number;
}

const name: string = 'yo-countdown';

@customElement(name)
export class YoCountdown extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add(name);
  }

  @property({ type: String }) date = "06/12/2027";

  show?: boolean = true;

  x: Countdown = {
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000,
  }

  y: Countdown = {
    second: 0,
    minute: 0,
    hour: 0,
    day: 0,
  }

  countDown() {
    const countDownEnd: number = new Date(this.date).getTime();
    const now: number = new Date().getTime(),
      distance: number = countDownEnd - now;

    this.y.day = Math.floor(distance / this.x.day);
    this.y.hour = Math.floor((distance % this.x.day) / this.x.hour);
    this.y.minute = Math.floor((distance % this.x.hour) / this.x.minute);
    this.y.second = Math.floor((distance % this.x.minute) / this.x.second);

    // if (distance < 0) {
    if (this.y.second === 35) {
      this.show = false;
    }
  };

  timerId = setInterval(() => this.countDown(), 1000);

  render() {
    if (this.show) {
      console.log('init Countdown');
    } else {
      console.log('Countdown error');
    }
    this.timerId
    return html`
      ${this.show
        ? html`
          <div class="yo-countdown__content">
            <span part="day">${this.y.day.toString()} D</span>
            <span part="day">${this.y.hour.toString()} H</span>
            <span part="day">${this.y.minute.toString()} M</span>
            <span part="day">${this.y.second.toString()} S</span>
          </div>
        `
        : html`
          <p>Ups...</p>
        `
      }
    `
  }
}
