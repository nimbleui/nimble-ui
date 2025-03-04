import {fileURLToPath, URL, resolve} from 'node:url';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
const rootDir = fileURLToPath(new URL('../', import.meta.url));
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@nimble-ui/move': resolve(rootDir, './packages/move/src/index.ts'),
      '@nimble-ui/utils': resolve(rootDir, './packages/utils/src/index.ts'),
    },
  },
  server: {
    host: '0.0.0.0',
  },
});
