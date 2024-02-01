import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig( {
  plugins: [react()],
  jsbi: path.resolve(__dirname, 'node_modules/jsbi'),
  // base: "/truckingEmpire/",
    build: {
        target: 'es2020'
    },
    optimizeDeps: {
        esbuildOptions : {
            target: "es2020"
        }
    }

})
