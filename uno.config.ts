import presetMini from "@unocss/preset-mini";
import presetRemToPx from "@unocss/preset-rem-to-px";
import { defineConfig } from "unocss";

export default defineConfig({
  presets: [
    presetMini(),
    presetRemToPx(),
    // ...other presets
  ],
});
