// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'

// // https://vitejs.dev/config/
// export default defineConfig( {
//   plugins: [react()],
//   jsbi: path.resolve(__dirname, 'node_modules/jsbi'),
//   // base: "/truckingEmpire/",
//     build: {
//         target: 'es2020'
//     },
//     optimizeDeps: {
//         esbuildOptions : {
//             target: "es2020"
//         }
//     }

// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { nodePolyfills } from 'vite-plugin-node-polyfills'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      util: 'util',
      jsbi: path.resolve(__dirname, 'node_modules/jsbi'),
    }
  },
  base: "/truckingEmpire/",
  build: {
    minify: false,
    target: "es2020", // Enable Big integer literals
    commonjsOptions: {
      transformMixedEsModules: true, // Enable @walletconnect/web3-provider which has some code in CommonJS
    },

    rollupOptions: {
      // maxParallelFileOps: 2,
      cache: false,
    },
    outDir: "dist",
  },
  plugins: [
    react(),
    // nodePolyfills({
    //   // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
    //   include: ['path', 'https'],
    //   // To exclude specific polyfills, add them to this list. Note: if include is provided, this has no effect
    //   exclude: [
    //     'fs', // Excludes the polyfill for `fs` and `node:fs`.
    //   ],
    //   // Whether to polyfill specific globals.
    //   globals: {
    //     Buffer: true, // can also be 'build', 'dev', or false
    //     global: true,
    //     process: true,
    //   },
    //   // Whether to polyfill `node:` protocol imports.
    //   protocolImports: true,
    // })
  ],
    optimizeDeps: {
      esbuildOptions: {
        target: "es2020", // Enable Big integer literals
        define: {
          global: "globalThis",
        },
        supported: {
          bigint: true,
        },
      },
    },
})