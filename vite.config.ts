


import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    'import.meta.env.REACT_APP_WEATHER_API_KEY': JSON.stringify(process.env.REACT_APP_WEATHER_API_KEY)
  }
})
