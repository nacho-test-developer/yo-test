import { defineConfig } from 'vite'
import litCss from 'vite-plugin-lit-css'

export default defineConfig({
  base: '/dist/',
  plugins: [
    litCss({
      exclude: './src/index.css'
    }),
  ],
})