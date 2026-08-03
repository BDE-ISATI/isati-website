import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr';



// https://vite.dev/config/
export default defineConfig({
  plugins: [ react(), svgr(), tailwindcss() ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: /^lottie-react$/, replacement: 'lottie-react/build/index.es.js' },
    ],
  },
 
})
