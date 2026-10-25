import { defineConfig } from 'vite'
import litCss from 'vite-plugin-lit-css'

export default defineConfig({
  base: '/yo-test/',
  plugins: [
    litCss({
      exclude: './src/index.css'
    }),
  ],
})