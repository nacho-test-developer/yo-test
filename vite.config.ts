import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import litCss from 'vite-plugin-lit-css'

export default defineConfig({
  // build: {
  //   lib: {
  //     entry: 'src/components/yo-card/yo-card.ts',
  //     formats: ['es'],
  //   },
  //   rollupOptions: {
  //     external: /^lit/,
  //   },
  // },
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
    }),
    litCss({
      exclude: './src/index.css'
    }),
  ],
})