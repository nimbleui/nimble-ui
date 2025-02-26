import path from 'path';
import {type ViteUserConfig, defineConfig} from 'vitest/config';

const basePath = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  '../../../',
);
console.log(111, basePath);
export function defineViteConfig(config: ViteUserConfig) {
  return defineConfig({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias ?? {}),
      },
    },
    test: {
      globals: true,
      typecheck: {
        tsconfig: './tsconfig.test.json',
      },
      ...config.test,
    },
  });
}
