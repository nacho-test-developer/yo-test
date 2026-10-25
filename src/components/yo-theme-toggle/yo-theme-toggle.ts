import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import styles from "./yo-theme-toggle.css";
import { initTheme, toggleTheme } from "../../theme.js";

const name = "yo-theme-toggle";

@customElement(name)
export class YoThemeToggle extends LitElement {
  @state() private theme: "light" | "dark" = "light";

  connectedCallback(): void {
    super.connectedCallback();
    this.classList.add(name);
    initTheme();
    this.sync();
  }

  private sync(): void {
    this.theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  }

  private onClick = () => {
    toggleTheme();
    this.sync();
  };

  render() {
    const isDark = this.theme === "dark";
    return html`
      <button
        type="button"
        part="button"
        aria-label=${isDark ? "Switch to light theme" : "Switch to dark theme"}
        title=${isDark ? "Light theme" : "Dark theme"}
        @click=${this.onClick}
      >
        ${isDark ? "☀" : "☾"}
      </button>
    `;
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    "yo-theme-toggle": YoThemeToggle;
  }
}
