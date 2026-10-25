export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const EXPLICIT_KEY = "theme-explicit";

export function getPreferredTheme(): Theme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function isExplicitChoice(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(EXPLICIT_KEY) === "1";
  } catch {
    return false;
  }
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined" || !isExplicitChoice()) return null;
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}

export function applyTheme(theme: Theme, explicit = false): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
    if (explicit) {
      localStorage.setItem(EXPLICIT_KEY, "1");
    } else {
      localStorage.removeItem(EXPLICIT_KEY);
    }
    localStorage.setItem("yo-theme", theme);
  } catch {
    // ignore storage errors (private mode, etc.)
  }
}

let initialized = false;

export function initTheme(): Theme {
  const explicit = isExplicitChoice();
  const theme = explicit ? (getStoredTheme() ?? getPreferredTheme()) : getPreferredTheme();
  applyTheme(theme, explicit);

  if (initialized) return theme;
  initialized = true;

  if (typeof window !== "undefined" && window.matchMedia) {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (event: MediaQueryListEvent) => {
      if (!isExplicitChoice()) {
        applyTheme(event.matches ? "dark" : "light", false);
      }
    };
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handler);
    }
  }

  return theme;
}

export function toggleTheme(): Theme {
  const current: Theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  const next: Theme = current === "dark" ? "light" : "dark";
  applyTheme(next, true);
  return next;
}

// Apply the theme as soon as this module is loaded (e.g. when imported by a component).
if (typeof window !== "undefined") {
  initTheme();
}
